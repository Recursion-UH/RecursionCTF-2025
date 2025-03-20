for i in range(1, 32):
    print(open(f"../src/smb/%5cflag-{i}.txt", encoding="utf-8-sig").read().strip(), end="")
