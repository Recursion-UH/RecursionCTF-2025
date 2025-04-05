import hashlib
import hmac
import time
import random

def sha256(s):
    return hashlib.sha256(s.encode()).hexdigest()

def get_game_hash(game_seed, client_seed):
    return hmac.new(game_seed.encode(), client_seed.encode(), hashlib.sha256).hexdigest()

def get_number_from_hash(game_hash):
    return int(game_hash[:52 // 4], 16)

def get_roll(game_hash):
    seed = get_number_from_hash(game_hash)
    roll = abs((seed % 1000) + 1)
    return roll

def initial_seed(offset):
    timestamp = int(time.time())
    random.seed(timestamp + offset)

    rounds = random.randint(1, 1000)
    for _ in range(rounds):
        seed = random.getrandbits(32)

    return hex(seed)[2:]

client_seed = initial_seed(random.randint(1, 1000))
server_seed = [ sha256(initial_seed(random.randint(1, 1000))) ]
for i in range(1, 32):
    server_seed.append(sha256(server_seed[i - 1]))

print(f"Active Client Seed: {client_seed}")
print(f"Active Server Seed (Hashed): {server_seed[0]}")

i = 32 - 1
keep_playing = True
while keep_playing:
    game_hash = get_game_hash(server_seed[i], client_seed)
    roll = get_roll(game_hash) 

    print(f"Dice: {roll / 10}")
    print(f"Roll: {roll}")
    print(f"Game Seed: {server_seed[i]}")
    print(f"Bets made with active Server Seed: {32 - i}")

    i -= 1
    if i < 0:
        print("Server Seed has been exhausted.")
        break

    # keep_playing = input("Continue game? (y/n): ") == "y"
