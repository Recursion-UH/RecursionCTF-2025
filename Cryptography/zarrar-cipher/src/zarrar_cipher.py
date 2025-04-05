def rar_encrypt(pt):
    """Fungsi untuk mengenkripsi string menggunakan Zarrar Cipher, dengan '_' untuk 0"""
    ct = "z"
    for i, c in enumerate(pt):
        if c.isdigit():
            value = int(c)
        elif c in "abcdef":
            value = ord(c) - ord('a') + 10
        else:
            continue

        if value == 0:
            ct += "_"
        else:
            ct += "a" * value if i % 2 == 0 else "r" * value
    return ct

def main():
    while True:
        print("\n=== Zarrar Cipher Service ===")
        print("1. Encrypt")
        print("2. Decrypt")
        print("3. Exit")
        choice = input("Choose an option (1/2/3): ").strip()

        if choice == '1':
            plaintext = input("Enter plaintext to encrypt: ").strip()
            hex_representation = "".join(hex(ord(c))[2:] for c in plaintext)
            encrypted = rar_encrypt(hex_representation)
            print(f"Encrypted text: {encrypted}\n")

        elif choice == '2':
            print("\n[!] This option is not available for you.")

        elif choice == '3':
            print("Goodbye!")
            break

        else:
            print("Invalid choice. Please select 1, 2, or 3.")

if __name__ == "__main__":
    main()