import hashlib
import sys
import time

def generate_proof_of_work(challenge, difficulty):
    start_time = time.time()
    target = 2 ** (256 - difficulty)
    nonce = 0

    while nonce < (1 << 64):
        unique_value = f"{challenge}|{nonce}".encode()
        digest = hashlib.sha256(unique_value).hexdigest()
        digest_int = int(digest, 16)

        if digest_int < target:
            elapsed_time = time.time() - start_time
            return nonce, digest, elapsed_time
        
        nonce += 1
    
    return None, None, None, None

if len(sys.argv) != 3:
    print("Usage: python pow.py <challenge> <difficulty>")
    sys.exit(1)

challenge = sys.argv[1]
difficulty = int(sys.argv[2])

print("Generating Proof of Work...")
nonce, digest_hex, elapsed_time = generate_proof_of_work(challenge, difficulty)

if nonce is not None:
    print("Proof of Work Found!")
    print(f"Nonce: {nonce}")
    print(f"SHA-256 Hash: {digest_hex}")
    print(f"Time Taken: {elapsed_time:.4f} seconds")
else:
    print("Failed to find a valid proof of work.")
