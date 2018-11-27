from flask import Flask
from flask import request
from flask import render_template
from flask import url_for
from flask import redirect
from flask import make_response
from flask import session, escape


app = Flask(__name__)
app.secret_key = b'^\x97\x91S!\xc1\x1b\xce\x0b\x92\xd8\x15Q$\xfe\x9f'

@app.route('/')
def index():
    if 'username' in session:
        return render_template('index.html', username=session['username'])
    return redirect(url_for('login'))
    

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return render_template('login.html')

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run()
