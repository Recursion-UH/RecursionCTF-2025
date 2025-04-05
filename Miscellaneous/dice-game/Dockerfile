FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV FOUNDRYUP_VERSION=nightly

RUN apt-get update && apt-get install -y curl unzip

RUN useradd -m recursionctf

WORKDIR /home/recursionctf

RUN curl -fsSL https://bun.sh/install | bash && \
    curl -L https://foundry.paradigm.xyz | bash && \
    /home/recursionctf/.foundry/bin/foundryup

ENV PATH="/home/recursionctf/.foundry/bin:$PATH"

COPY ./src/blockchain/src /home/recursionctf/blockchain/src
# COPY ./src/sandbox /home/recursionctf/sandbox
# COPY ./src/website /home/recursionctf/website
COPY ./src/flag.txt /flag.txt

RUN chown -R recursionctf:recursionctf /home/recursionctf
RUN chmod -R 550 /home/recursionctf 

USER recursionctf

EXPOSE 8545

CMD cd /home/recursionctf/website && bun install && bun run build && \
    cd /home/recursionctf/blockchain && forge init --force --no-commit && forge build && \
    cd /home/recursionctf/sandbox && bun install && bun index.ts
