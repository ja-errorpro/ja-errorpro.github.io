---
title: 【普物】 Schrodinger Equation Derivation
date: 2023-01-03
tags:
  - mix
---

# 薛丁格方程

試著找到一方程式描述能量與波函數的關係。

## 波函數

已知波函數應形如
$$ \psi(x,t) = A e^{i(kx-\omega t)} $$
的形式

若波函數對時間微分，則有
$$ \frac{\partial \psi}{\partial t} = -i \omega A e^{i(kx-\omega t)} = -i \omega \psi $$

若波函數對位置微分，則有
$$ \frac{\partial \psi}{\partial x} = i k A e^{i(kx-\omega t)} = i k \psi $$

對位置的二次微分，則有
$$ \frac{\partial^2 \psi}{\partial x^2} = -k^2 A e^{i(kx-\omega t)} = -k^2 \psi $$

寫成三維空間形式為
$$ \nabla^2 \psi = -k^2 A e^{i(kx-\omega t)} = -k^2 \psi $$

## 動量

$h$ 為普朗克常數
$$ \hbar = \frac{h}{2\pi} $$
德布羅意公式
$$ p = \frac{2\pi \hbar}{\lambda}, k = \frac{p}{\hbar} $$

代回波函數二次微分式，
$$ \nabla^2 \psi = -\frac{p^2}{\hbar^2} \psi $$

## 能量

力學系統中的能量為動能與位能的總和，因為是量子力學，以哈密頓量表示總能量

$$ H = K + U $$

因為 $K = \frac{1}{2}mv^2 = \frac{p^2}{2m}$，所以重寫為

$$ E = \frac{p^2}{2m} + U $$

兩邊同乘 $\psi$，並代入動量
$$ E\psi = -\frac{\hbar^2}{2m} \nabla^2 \psi + U\psi $$

又因為 $E = hf = 2\pi \hbar f = \hbar \omega, \omega = \frac{E}{\hbar} $，
$$\frac{\partial \psi}{\partial t} = -i \omega \psi = -i \frac{E}{\hbar}\psi $$
$$\Rightarrow E \psi = -\frac{\hbar}{i} \frac{\partial \psi}{\partial t} $$

## 薛丁格方程

結合兩式，得到薛丁格方程
$$ -\frac{\hbar}{i} \frac{\partial \psi}{\partial t} = -\frac{\hbar^2}{2m} \nabla^2 \psi + U\psi $$

把左式乘上 $\frac{i}{i}$ 就是常看到的
$$ i\hbar \frac{\partial \psi}{\partial t} = -\frac{\hbar^2}{2m} \nabla^2 \psi + U\psi $$

推導結束。