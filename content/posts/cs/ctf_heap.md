---
title: 【CTF】Heap Exploitation(Part 1 - Overview, UAF)
date: 2023-11-16
tags:
  - ctf
  - security
---

# Heap Exploitation

## 預備知識

- 需要注意glibc的版本
- 知道典型的Memory layout
- 記憶體計算

## 1. Heap

### Overview

- 跟資料結構的Heap不同
- 存動態資料的記憶體區段
- 在Memory中由低往高生長

### Allocator

- Linux中由glibc實作
  - dlmalloc (Doug Lea Malloc) - General-purpose allocator
  - ptmalloc (Per-thread malloc) - glibc
  - jemalloc - FreeBSD / Firefox / Facebook...
  - tcmalloc - Google / Golang / Chrome...

### malloc

- dynamic memory allocator

### 第一次呼叫 malloc

```cpp
if(要分配的大小小於128KB){
    if(是第一次呼叫)
        呼叫 brk() -> sys_brk() 分配 132KB 的Segment，此Segment稱為 main arena
}else{ // 超過128KB
    mmap() -> sys_mmap()
}
```

- 程式執行中free掉記憶體後不會馬上還給系統，會由glib代管

### Chunk

- glibc做記憶體管理的資料結構
- malloc分配的空間單位，分配出來的大小必須對齊0x10
  - Ex: malloc(0x15) -> 得到大小 0x20 + 0x10(header) 的chunk
- 依大小分類，發生free時會放到linked list中，這個linked list稱為bin
  - fastbin (<64B)
  - smallbin (<512B)
  - largebin (>=512B)
  - unsortedbin (如果free的chunk大小>64B，先放到這裡一段時間後再加到對應的bin)
- 種類
  - Allocated Chunk
    - prev_size: 如果前一個chunk是free的，就存前一個chunk的大小
    - size: 這個chunk的大小 + Status flag(最後3個bit)(因為0x10 padding，後面4bit可以不存)
      - bit 0: PREV_INUSE: 前一個chunk是否正被使用
      - bit 1: IS_MMAPPED: 是否是mmap分配的
      - bit 2: NON_MAIN_ARENA: 是否不是main arena
    - User Data
  - Free Chunk
    - prev_size
    - size
    - fd: 指標指向下一個chunk
    - bk: 指標指向上一個chunk
    - fd_nextsize: 下一個largebin的指標
    - bk_nextsize: 上一個largebin的指標
    - Data
  - Top Chunk
    - prev_size
    - size: 還剩多少空間

```c
struct malloc_chunk {
  INTERNAL_SIZE_T      mchunk_prev_size;  /* Size of previous chunk (if free).  */
  INTERNAL_SIZE_T      mchunk_size;       /* Size in bytes, including overhead. */
  struct malloc_chunk* fd;                /* double links -- used only if free. */
  struct malloc_chunk* bk;
  /* Only used for large blocks: pointer to next larger size.  */
  struct malloc_chunk* fd_nextsize; /* double links -- used only if free. */
  struct malloc_chunk* bk_nextsize;
};
typedef struct malloc_chunk* mchunkptr;
```

### bin

- Linked list
- 在free掉一個chunk時，會把這個chunk放到對應的bin中
- tcache
- fastbin
  - Single Linked list
  - size < 64B
  - 存在mfastbinptr fastbinsY[NFASTBINS]
  - 最多8個
  - LIFO(Last In First Out)
- smallbin
  - Circular Doubly Linked list
  - size < 512B
  - FIFO
  - bins[1:64]
- largebin
  - Circular Doubly Linked list
  - size >= 512B
  - FIFO
  - free chunk 多了 fd_nextsize和bk_nextsize指標指向下一個和上一個 large chunk
  - 每個bin中chunk大小不固定，存的時候會sort，大的放前面，小的放後面
  - bins[64:126]
- unsortedbin
  - Circular Doubly Linked list
  - LIFO
  - malloc會先把要free的、大於64B的chunk先放到這裡整理，再放到對應的bin中
  - bins[0:0]

### Main arena header

```c
struct malloc_state
{
 /* Serialize access. */
 __libc_lock_define (, mutex);
 /* Flags (formerly in max_fast). */
 int flags;//0x4
 /* Set if the fastbin chunks contain recently inserted free blocks. */
 /* Note this is a bool but not all targets support atomics on booleans. */
 int have_fastchunks;//0x4
 /* Fastbins */
 mfastbinptr fastbinsY[NFASTBINS];
 /* Base of the topmost chunk -- not otherwise kept in a bin */
 mchunkptr top;
 /* The remainder from the most recent split of a small request */
 mchunkptr last_remainder;
 /* Normal bins packed as described above */
 mchunkptr bins[NBINS * 2 - 2];
 /* Bitmap of bins */
 unsigned int binmap[BINMAPSIZE];
 /* Linked list */
 struct malloc_state *next;
 /* Linked list for free arenas. Access to this field is serialized
    by free_list_lock in arena.c. */
 struct malloc_state *next_free;
 /* Number of threads attached to this arena. 0 if the arena is on
    the free list. Access to this field is serialized by
    free_list_lock in arena.c. */
 INTERNAL_SIZE_T attached_threads;
 /* Memory allocated from the system in this arena. */
 INTERNAL_SIZE_T system_mem;
 INTERNAL_SIZE_T max_system_mem;
}
```

- 存在bss section

## 2. Exploitation

- 即使[保護機制](/posts/2023/linux_system_security)全開也能攻擊
- 目標是改到fd

### Unlink

- 為了避免chunk太碎，free的時候會檢查周圍的chunk是否為free然後merge
- 早期版本(libc-2.23? 大概2004年以前)不會檢查fd、bk、size是否正常，可以做unlink attack
- 現在多了這段檢查，繞過很麻煩，已經很難打了，除非沒更新

```c
FD = P->fd; // P is the chunk to be freed
BK = P->bk;
/* 檢查size */
if (__builtin_expect (chunksize(P) != prev_size (next_chunk(P)), 0))
      malloc_printerr ("corrupted size vs. prev_size");
/* 檢查fd、bk */
if (__builtin_expect (FD->bk != P || BK->fd != P, 0))
    malloc_printerr (check_action, "corrupted double-linked list", P, AV);

```

### Use After Free

- 記憶體被釋放後還被使用

三種情況：

- 使用nullptr，結果崩潰
- 釋放後沒有其他進程使用，可能繼續正常運作
- 釋放後有其他進程使用，造成亂七八糟的結果

釋放後沒有設為nullptr的指標稱為 dangling pointer

1. 當free(p)，chunk被放到對應bin
2. q = malloc(N)，如果N跟p chunk的大小一樣，記憶體位址會是剛剛free的p chunk的位址
3. p是dangling pointer，如果繼續用，結果不可預期

#### Double Free

當一個fastbin chunk被free，fd變成nullptr，第二次free，libc會檢查有沒有 free(A);free(A);的情況(old == p)

繞過：不要讓double free chunk在fastbin第一個

free(A) -> free(B) -> free(A)

然後malloc一樣大小的空間，會拿到 chunk A，隨便寫東西進去就能蓋掉fd(Create a fake chunk)

## Reference

- [Heap exploitation](https://bamboofox.cs.nctu.edu.tw/uploads/material/attachment/13/heap_exploit.pdf)
- [Angelboy](https://www.slideshare.net/AngelBoy1/heap-exploitation-51891400)
- [ctf-wiki](https://ctf-wiki.org/pwn/linux/user-mode/heap/ptmalloc2/fastbin-attack/)
- [程式安全筆記](https://hackmd.io/@minyeon/HJOnEqaTw#UAF)
- [Heap Exploit](https://r888800009.github.io/software/security/binary/heap/)
