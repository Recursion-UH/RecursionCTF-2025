def rar_encrypt(pt):
    ct = "z"  # Prefix 'z'
    for i, c in enumerate(pt):
        if c.isdigit():
            value = int(c)
        elif c in "abcdef":
            value = ord(c) - ord('a') + 10
        else:
            continue
        ct += "a" * value if i % 2 == 0 else "r" * value
    return ct

def rar_decrypt(ct):
    if not ct.startswith("z"):
        return "Invalid ciphertext (missing prefix 'z')"
    
    ct = ct[1:]  # Remove 'z' prefix
    i = 0
    result = []
    even = True

    while i < len(ct):
        count = 0
        target = 'a' if even else 'r'
        while i < len(ct) and ct[i] == target:
            count += 1
            i += 1

        if count < 10:
            result.append(str(count))
        else:
            # Convert 10-15 back to 'a'-'f'
            result.append(chr(ord('a') + count - 10))
        even = not even

    hex_string = ''.join(result)
    
    if len(hex_string) % 2 != 0:
        hex_string = "0" + hex_string
    
    try:
        return bytes.fromhex(hex_string).decode('utf-8')
    except Exception as e:
        return f"Decryption failed: {e}"

def main():
    print("Welcome to Zarrar Cipher Service (Encrypt/Decrypt Mode)")
    while True:
        print("\nOptions:\n1. Encrypt\n2. Decrypt\n3. Exit")
        choice = input("Choose an option: ").strip()

        if choice == "1":
            data = input("Input your message to encrypt (plaintext): ").strip()
            if not data:
                print("Invalid input.")
                continue
            hex_input = "".join(hex(ord(c))[2:] for c in data)
            encrypted_message = rar_encrypt(hex_input)
            print(f"Encrypted message: {encrypted_message}")

        elif choice == "2":
            data = input("Input the encrypted message: ").strip()
            if not data:
                print("Invalid input.")
                continue
            decrypted_message = rar_decrypt(data)
            print(f"Decrypted message: {decrypted_message}")

        elif choice == "3":
            print("Exiting...")
            break

        else:
            print("Invalid choice. Please select 1, 2, or 3.")

if __name__ == "__main__":
    main()
