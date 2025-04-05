import hashlib
import threading

def find_hash(start, end, target_hash):
    for i in range(start, end):
        if hashlib.sha256(str(i).encode()).hexdigest() == target_hash:
            print(i)
            return

target_hash = "c965bcf9b845087a45e7238544dfb07313f8537e9844e05930cc6f1f6dfed5e3"
num_threads = 8
range_per_thread = 2**32 // num_threads
threads = []

for i in range(num_threads):
    start = i * range_per_thread
    end = start + range_per_thread
    thread = threading.Thread(target=find_hash, args=(start, end, target_hash))
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()