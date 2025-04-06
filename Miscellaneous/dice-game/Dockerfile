FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
# ENV FOUNDRYUP_VERSION=nightly

RUN apt-get update && apt-get install -y curl unzip git

RUN useradd -m recursionctf
RUN chsh -s /bin/bash recursionctf

WORKDIR /home/recursionctf

COPY ./src/blockchain/src /home/recursionctf/blockchain/src
COPY ./src/sandbox /home/recursionctf/sandbox
COPY ./src/website /home/recursionctf/website
COPY ./src/pow.py /home/recursionctf/pow.py
COPY ./src/flag.txt /flag.txt

RUN chown -R recursionctf:recursionctf /home/recursionctf

USER recursionctf

RUN curl -fsSL https://bun.sh/install | bash
RUN curl -L https://foundry.paradigm.xyz | bash

ENV BUN_INSTALL="/home/recursionctf/.bun"
ENV PATH="/home/recursionctf/.foundry/bin:$BUN_INSTALL/bin:$PATH"

RUN foundryup

EXPOSE 8545

RUN cd /home/recursionctf/website && bun install && bun run build
RUN cd /home/recursionctf/blockchain && forge init --force --no-commit && forge build
RUN cd /home/recursionctf/sandbox && bun install

CMD ["/bin/bash", "-c", "cd /home/recursionctf/sandbox && bun index.ts"]
