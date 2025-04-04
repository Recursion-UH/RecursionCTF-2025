query = "I searching my, a device wireless, network router, how"
query = query.split(", ")
ip = []

for octet in query:
    digits = octet.split()
    digits_string = ""
    for digit in digits:
        digits_string += str(len(digit))
    ip.append(digits_string)

print(".".join(ip))
