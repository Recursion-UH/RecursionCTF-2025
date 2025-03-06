# Recursion CTF 2025 Challenges

This repository contains the challenges for Recursion CTF 2025.

## Rules

- Flag format: `RECURSION{.*}`

## Repository Structure

For each category, there are two directories: `warmup` and `final`.

```txt
warmup
    Binary Exploitation
    Cryptography
    Forensics
    Miscellaneous
    Reverse Engineering
    Web Exploitation
final
    Binary Exploitation
    Cryptography
    Forensics
    Miscellaneous
    Reverse Engineering
    Web Exploitation
```

### Challenge Directory Structure

Each challenge directory should have the following structure:

```txt
<challenge-name>/
    dist/
    src/
    solution/
    README.md
```

Explanation of the directories and files:

- **\<challenge-name>**: The name of the challenge.
    - **dist**: Contains the files that will be distributed to the participants.
    - **src**: Contains the source code of the challenge.
    - **solution**: Contains the solution of the challenge.
    - **README.md**: Contains the details of the challenge.

#### README.md

The `README.md` file should contain the following structure:

```md
# \<challenge-name>

## Description

Description of the challenge.

by `<author>`

## Difficulty

Easy/Medium/Hard

## Tags

`tag1`, `tag2` (Separate tags with commas)

## Flag

`RECURSION{test_flag}`

## Deployment

Explain how to deploy the challenge.
```

For more details, refer to the `Template` directory.
