def main():
    questions = [
        { 
            "question": "What is the Event ID for malicious PowerShell execution?",
            "format": "number"
        },
        { 
            "question": "What is the name of the malware executable that was dropped?",
            "format": "name.exe"
        },
        { 
            "question": "What encoding was used in the PowerShell command?",
            "format": "lowercase"
        },
        { 
            "question": "What credential-stealing tool was executed?",
            "format": "lowercase"
        },
        { 
            "question": "What registry key was modified to maintain persistence?",
            "format": "this\is\example\path"
        },
        { 
            "question": "What is the name of the backdoor service installed?",
            "format": "NameSvc"
        },
        { 
            "question": "Which LOLBin was used for process injection?",
            "format": "binary.exe"
        },
        { 
            "question": "What is the IP address used by the attacker to access RDP?",
            "format": "xxx.xxx.x.xxx"
        },
        { 
            "question": "What file was accessed in the C:\\Finance directory?",
            "format": "filename.ext"
        },
        { 
            "question": "What protocol was used for data exfiltration?",
            "format": "lowercase"
        }
    ]

    answers = [
        "4104",
        "payload.exe",
        "base64",
        "mimikatz",
        "HKLM\Software\Microsoft\Windows\CurrentVersion\Run\Malware",
        "BackdoorSvc",
        "rundll32.exe",
        "192.168.1.100",
        "secret.docx",
        "ftp"
    ]

    print("Welcome, analyst. Please answer the following questions:")

    correct_answers = 0

    for index, q in enumerate(questions, start=1):
        print(f"\nQuestion {index}: " + q["question"])
        # print("Prompt: " + )
        print("Format: " + q["format"])
        user_answer = input("Answer: ")

        if user_answer.strip() == answers[index - 1]:
            correct_answers += 1
            print("Correct")
        else:
            print("Incorrect")
            return
    
    if correct_answers == len(questions):
        print("\nCongratulations! Flag: RECURSION{y0u_4r3_4_r3l14bl3_blu3_t34m_4n4lys7_09_URRRAAAHHH}")

if __name__ == "__main__":
    main()
