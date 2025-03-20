import os
from Crypto.Cipher import ARC4

git_dir = "../src/c2-git/"

for file in os.listdir(git_dir):
    if file == '.git':
        continue
    filepath = git_dir+file
    with open(filepath, "rb") as f:
        output = ARC4.new(b"353588e6283cc4e13b7473a677aa7d14").decrypt(f.read())
        print(output.decode())
        input()
