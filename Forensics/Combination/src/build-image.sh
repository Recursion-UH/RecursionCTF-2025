#!/bin/bash

# config
IMAGE_NAME="image.dd"
IMAGE_SIZE_MB=100
MOUNT_POINT="/mnt/image"
ZIP_NAME="chall.zip"

dd if=/dev/zero of=$IMAGE_NAME bs=1M count=$IMAGE_SIZE_MB

# fat32 format
mkfs.vfat $IMAGE_NAME

# mount image
sudo mkdir -p $MOUNT_POINT
sudo mount -o loop $IMAGE_NAME $MOUNT_POINT

# make windows folder structure
mkdir -p WinFS/Users/Ciro/{Documents,Desktop,Downloads,Music,Pictures,Videos,AppData/Roaming}

# copy file
cp MyData/z3cret.7z WinFS/Users/Ciro/Documents/
cp asik-jadi-maba/Data_Mahasiswa_Baru_ITB_2029.xlsx WinFS/Users/Ciro/Desktop/
cp asik-jadi-maba/pengumuman.pdf WinFS/Users/Ciro/Desktop/

# optional
touch WinFS/Users/Ciro/Downloads/VLCSetup.exe
touch WinFS/Users/Ciro/Downloads/tugas_matematika.docx
touch WinFS/Users/Ciro/Music/lo_fi_chill.mp3
touch WinFS/Users/Ciro/Pictures/profil.jpg
touch WinFS/Users/Ciro/Pictures/random_meme.png
touch WinFS/Users/Ciro/Videos/kuliah_online_2029.mp4
echo "theme=dark" > WinFS/Users/Ciro/AppData/Roaming/config.ini

# copy to image
sudo cp -r WinFS/Users $MOUNT_POINT/

# unmount image
sudo umount $MOUNT_POINT

# zip the image
zip $ZIP_NAME $IMAGE_NAME

echo "✅ Challenge berhasil dibuat dan dibungkus: $ZIP_NAME"
