---
title: 【HTB Machine】Facts
date: 2026-02-16
tags:
  - security
keywords:
  - htb
  - facts
  - facts.htb
  - recon
  - nmap
  - ssh
  - http
  - aws
  - s3
  - minio
  - s3
  - object-storage
  - bucket
  - aws-s3
  - s3-api
  - s3-compatible
  - golang
  - net-http
  - nginx
  - open-ssh
  - ubuntu
  - linux
  - htb-machine
  - hack-the-box
  - enumeration
  - reconnaissance
  - port-scan
  - port-scanning
  - tcp
  - ssh-banner
  - http-redirect
  - virtual-host
  - vhost
  - vhost-fuzzing
  - dns
  - host-header
  - http
  - https
  - web
  - web-server
  - web-enum
  - service-enum
  - service-detection
  - nmap-scripts
  - nmap
  - nmap-scv
  - min-rate
  - os-detection
  - fingerprint
  - http-enum
  - response-header
  - redirect
  - enumeration-notes
  - pentest
  - penetration-testing
  - ctf
  - lab
  - vuln-research
  - attack-surface
  - cloud
  - cloud-storage
  - storage
  - object-store
  - s3-bucket
  - s3-enum
  - s3-security
  - minio-admin
  - minio-console
  - web-recon
  - service-recon
  - host-discovery
  - port-54321
  - port-80
  - port-22
  - ssh
  - http-title
  - server-header
  - http-status
  - 400-bad-request
  - xml-response
  - xss-protection
  - hsts
  - content-type
  - accept-ranges
  - minio-server
  - golang-server
  - nethttp
  - ubuntu-3ubuntu3-2
  - openssh-9-9
  - nginx-1-26-3
  - minio-fingerprint
  - recon-notes
  - enumeration-steps
  - notes
  - writeup
url: "/posts/HTB/Facts/"
---

# Recon

```sh
nmap -sCV -p- --min-rate 10000 -oN nmap.txt Remote_IP
```

```
# Nmap 7.98 scan initiated Tue Feb 17 00:00:54 2026 as: /usr/lib/nmap/nmap -sCV -p- --min-rate 10000 -oN nmap.txt 10.129.246.48
Nmap scan report for 10.129.246.48
Host is up (0.077s latency).
Not shown: 65532 closed tcp ports (reset)
PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 9.9p1 Ubuntu 3ubuntu3.2 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|   256 4d:d7:b2:8c:d4:df:57:9c:a4:2f:df:c6:e3:01:29:89 (ECDSA)
|_  256 a3:ad:6b:2f:4a:bf:6f:48:ac:81:b9:45:3f:de:fb:87 (ED25519)
80/tcp    open  http    nginx 1.26.3 (Ubuntu)
|_http-server-header: nginx/1.26.3 (Ubuntu)
|_http-title: Did not follow redirect to http://facts.htb/
54321/tcp open  http    Golang net/http server
|_http-title: Did not follow redirect to http://10.129.246.48:9001
|_http-server-header: MinIO
| fingerprint-strings:
|   FourOhFourRequest:
|     HTTP/1.0 400 Bad Request
|     Accept-Ranges: bytes
|     Content-Length: 303
|     Content-Type: application/xml
|     Server: MinIO
|     Strict-Transport-Security: max-age=31536000; includeSubDomains
|     Vary: Origin
|     X-Amz-Id-2: dd9025bab4ad464b049177c95eb6ebf374d3b3fd1af9251148b658df7ac2e3e8
|     X-Amz-Request-Id: 1894C57C3B5C2D04
|     X-Content-Type-Options: nosniff
|     X-Xss-Protection: 1; mode=block
|     Date: Mon, 16 Feb 2026 16:01:30 GMT
|     <?xml version="1.0" encoding="UTF-8"?>
|     <Error><Code>InvalidRequest</Code><Message>Invalid Request (invalid argument)</Message><Resource>/nice ports,/Trinity.txt.bak</Resource><RequestId>1894C57C3B5C2D04</RequestId><HostId>dd9025bab4ad464b049177c95eb6ebf374d3b3fd1af9251148b658df7ac2e3e8</HostId></Error>
|   GenericLines, Help, RTSPRequest, SSLSessionReq:
|     HTTP/1.1 400 Bad Request
|     Content-Type: text/plain; charset=utf-8
|     Connection: close
|     Request
|   GetRequest:
|     HTTP/1.0 400 Bad Request
|     Accept-Ranges: bytes
|     Content-Length: 276
|     Content-Type: application/xml
|     Server: MinIO
|     Strict-Transport-Security: max-age=31536000; includeSubDomains
|     Vary: Origin
|     X-Amz-Id-2: dd9025bab4ad464b049177c95eb6ebf374d3b3fd1af9251148b658df7ac2e3e8
|     X-Amz-Request-Id: 1894C577BA3C5BDD
|     X-Content-Type-Options: nosniff
|     X-Xss-Protection: 1; mode=block
|     Date: Mon, 16 Feb 2026 16:01:11 GMT
|     <?xml version="1.0" encoding="UTF-8"?>
|     <Error><Code>InvalidRequest</Code><Message>Invalid Request (invalid argument)</Message><Resource>/</Resource><RequestId>1894C577BA3C5BDD</RequestId><HostId>dd9025bab4ad464b049177c95eb6ebf374d3b3fd1af9251148b658df7ac2e3e8</HostId></Error>
|   HTTPOptions:
|     HTTP/1.0 200 OK
|     Vary: Origin
|     Date: Mon, 16 Feb 2026 16:01:12 GMT
|_    Content-Length: 0
1 service unrecognized despite returning data. If you know the service/version, please submit the following fingerprint at https://nmap.org/cgi-bin/submit.cgi?new-service :
SF-Port54321-TCP:V=7.98%I=7%D=2/17%Time=69933F46%P=x86_64-pc-linux-gnu%r(G
SF:enericLines,67,"HTTP/1\.1\x20400\x20Bad\x20Request\r\nContent-Type:\x20
SF:text/plain;\x20charset=utf-8\r\nConnection:\x20close\r\n\r\n400\x20Bad\
SF:x20Request")%r(GetRequest,2B0,"HTTP/1\.0\x20400\x20Bad\x20Request\r\nAc
SF:cept-Ranges:\x20bytes\r\nContent-Length:\x20276\r\nContent-Type:\x20app
SF:lication/xml\r\nServer:\x20MinIO\r\nStrict-Transport-Security:\x20max-a
SF:ge=31536000;\x20includeSubDomains\r\nVary:\x20Origin\r\nX-Amz-Id-2:\x20
SF:dd9025bab4ad464b049177c95eb6ebf374d3b3fd1af9251148b658df7ac2e3e8\r\nX-A
SF:mz-Request-Id:\x201894C577BA3C5BDD\r\nX-Content-Type-Options:\x20nosnif
SF:f\r\nX-Xss-Protection:\x201;\x20mode=block\r\nDate:\x20Mon,\x2016\x20Fe
SF:b\x202026\x2016:01:11\x20GMT\r\n\r\n<\?xml\x20version=\"1\.0\"\x20encod
SF:ing=\"UTF-8\"\?>\n<Error><Code>InvalidRequest</Code><Message>Invalid\x2
SF:0Request\x20\(invalid\x20argument\)</Message><Resource>/</Resource><Req
SF:uestId>1894C577BA3C5BDD</RequestId><HostId>dd9025bab4ad464b049177c95eb6
SF:ebf374d3b3fd1af9251148b658df7ac2e3e8</HostId></Error>")%r(HTTPOptions,5
SF:9,"HTTP/1\.0\x20200\x20OK\r\nVary:\x20Origin\r\nDate:\x20Mon,\x2016\x20
SF:Feb\x202026\x2016:01:12\x20GMT\r\nContent-Length:\x200\r\n\r\n")%r(RTSP
SF:Request,67,"HTTP/1\.1\x20400\x20Bad\x20Request\r\nContent-Type:\x20text
SF:/plain;\x20charset=utf-8\r\nConnection:\x20close\r\n\r\n400\x20Bad\x20R
SF:equest")%r(Help,67,"HTTP/1\.1\x20400\x20Bad\x20Request\r\nContent-Type:
SF:\x20text/plain;\x20charset=utf-8\r\nConnection:\x20close\r\n\r\n400\x20
SF:Bad\x20Request")%r(SSLSessionReq,67,"HTTP/1\.1\x20400\x20Bad\x20Request
SF:\r\nContent-Type:\x20text/plain;\x20charset=utf-8\r\nConnection:\x20clo
SF:se\r\n\r\n400\x20Bad\x20Request")%r(FourOhFourRequest,2CB,"HTTP/1\.0\x2
SF:0400\x20Bad\x20Request\r\nAccept-Ranges:\x20bytes\r\nContent-Length:\x2
SF:0303\r\nContent-Type:\x20application/xml\r\nServer:\x20MinIO\r\nStrict-
SF:Transport-Security:\x20max-age=31536000;\x20includeSubDomains\r\nVary:\
SF:x20Origin\r\nX-Amz-Id-2:\x20dd9025bab4ad464b049177c95eb6ebf374d3b3fd1af
SF:9251148b658df7ac2e3e8\r\nX-Amz-Request-Id:\x201894C57C3B5C2D04\r\nX-Con
SF:tent-Type-Options:\x20nosniff\r\nX-Xss-Protection:\x201;\x20mode=block\
SF:r\nDate:\x20Mon,\x2016\x20Feb\x202026\x2016:01:30\x20GMT\r\n\r\n<\?xml\
SF:x20version=\"1\.0\"\x20encoding=\"UTF-8\"\?>\n<Error><Code>InvalidReque
SF:st</Code><Message>Invalid\x20Request\x20\(invalid\x20argument\)</Messag
SF:e><Resource>/nice\x20ports,/Trinity\.txt\.bak</Resource><RequestId>1894
SF:C57C3B5C2D04</RequestId><HostId>dd9025bab4ad464b049177c95eb6ebf374d3b3f
SF:d1af9251148b658df7ac2e3e8</HostId></Error>");
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
# Nmap done at Tue Feb 17 00:01:45 2026 -- 1 IP address (1 host up) scanned in 50.99 seconds
```

```sh
echo 'Remote_IP facts.htb' | sudo tee -a /etc/hosts
```

{{< cf-secret slug="htb-facts" >}}
