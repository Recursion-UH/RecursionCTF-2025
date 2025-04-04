import tarfile

with tarfile.open("../src/c2-dockerimage/c2.tar", "r") as tar:
    blob = tar.extractfile('blobs/sha256/be0ee0f6e6d534f48c1696393f8d0e934ac03cdac9d7b297a02d05a82297d069')
    with tarfile.open(fileobj=blob, mode="r:gz") as blobtar:
        print(blobtar.extractfile('bin/pydoc').read().decode().strip())
