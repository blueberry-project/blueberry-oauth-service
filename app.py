from flask import Flask, render_template, request, redirect, url_for, session
import random
import hashlib
from pymemcache.client import base
from email_manager import EmailSMTP

app = Flask(__name__)
app.secret_key = 'urubu100'  
memcached_client = base.Client(('localhost', 11211))

def generate_2fa_code():
    return str(random.randint(100000, 999999))
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(stored_password_hash, provided_password):
    return stored_password_hash == hash_password(provided_password)

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        stored_password_hash = memcached_client.get(username)
        if stored_password_hash and verify_password(stored_password_hash.decode(), password):
            session['2fa_code'] = generate_2fa_code()
            print("Enviando email ...")
            email = EmailSMTP()
            email.receiver_email = username 
            email.subject = 'Blueberry - Verificação de duas etapas'
            email.text = 'O seu código para autenticação de duas etapas é: ' + session['2fa_code']
            email.send_email()
            return redirect(url_for('oauth_page'))
        else:
            return "Credenciais inválidas", 403
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        hashed_password = hash_password(password)
        memcached_client.set(username, hashed_password)
        
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/oauth', methods=['GET', 'POST'])
def oauth_page():
    if request.method == 'POST':
        entered_code = request.form['2fa_code']
        if entered_code == session.get('2fa_code'):
            session.pop('2fa_code', None)
            return redirect(url_for('success'))
        else:
            return "Código 2FA inválido", 403

    return render_template('oauth.html', code=session.get('2fa_code'))

@app.route('/success')
def success():
    return redirect('https://docs.google.com/spreadsheets/d/13AoqYl6250BpyeT4sZW7rulwIxwZ15mqwL1rLruCWJM/edit?usp=sharing')

if __name__ == '__main__':
    app.run(debug=True)
