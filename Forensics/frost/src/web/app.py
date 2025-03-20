from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/check')
def checkdns():
    host = request.args.get('host')
    if host is None:
        return 'Host must be set!', 404
    output = os.popen(f'dig {host}').read()
    return output, 200

@app.route('/')
def home():
    return 'OK', 200

if __name__ == '__main__':
    app.run()
