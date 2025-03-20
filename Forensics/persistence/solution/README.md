# Writeup persistence

1. Dari file UsrClass.dat, ada modifikasi file association di MSEdgeHTM untuk execute msedge_proxy.exe yang sudah diganti oleh attacker
2. Setelah reverse exe nya, terlihat ada C2 keylogger yang akan exfiltrate melalui JWT token di request HTTP ke IP attacker
3. Tinggal di decrypt dan parse sj
