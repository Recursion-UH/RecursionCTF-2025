# Writeup

## Find the `ARCHIVE` file inside the `.rsrc\0\RCDATA\` directory

First, navigate to the directory path `\.rsrc\0\RCDATA\` inside the given file. This location contains a file labeled `ARCHIVE`. The `ARCHIVE` file is actually a `.CETRAINER` file.

## Use the `CETRAINER` to Extract the `.CT` File

Once you've located the `.CETRAINER` file, you need to extract the `.CT` file from it. To do this, you will need to use a `CETRAINER` extractor or decryptor. These tools are available online, and you can easily find one with a quick search.

## Find the Flag in the Decoded Lua Code

The decoded Lua script contains the flag, but it is **XOR-encrypted** with a **random string**. However, the random string is **generated using a fixed seed**, which means the same string is created every time the script runs.
