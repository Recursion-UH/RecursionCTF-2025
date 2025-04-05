FROM python:3.10.4

RUN useradd -U -m -s /bin/bash ctf
RUN apt-get update && apt-get install -y socat && rm -rf /var/lib/apt/lists/*

WORKDIR /home/ctf
COPY src/zarrar_cipher.py ./

RUN chmod 500 zarrar_cipher.py && chown -R ctf:root /home/ctf

USER ctf

# Pilih salah satu CMD:
# CMD ["python3", "zarrar_cipher.py"]  # versi CLI
CMD socat TCP-L:13339,fork EXEC:"python3 /home/ctf/zarrar_cipher.py",reuseaddr,stderr  # versi socket/server
