# Writeup frost

1. Attacker mendapat entrypoint dari command injection sebuah website
2. Attacker melakukan C2 dan privesc menggunakan Docker container
3. Flag part 1 didapat setelah mengambil file `/bin/pydoc` dari layer docker image yang digunakan attacker
4. C2 yang digunakan berbasis GitHub, hasil dari command akan dipush ke sebuah repository
5. Repository bisa diclone menggunakan PAT token yang ada di file `/bin/pytest`
6. Flag part 2 ada di salah satu hasil command
7. Setelah dekripsi file-file yang ada di GitHub, terlihat attacker exfiltrate data dari SMB
8. Password `johndoe` juga dileak di salah satu file di GitHub yang akan digunakan untuk decrypt SMB di Wireshark
9. Flag part 3 didapatkan dari kumpulan file yang diexfiltrate dari SMB
