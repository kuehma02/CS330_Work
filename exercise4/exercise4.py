from flask import Flask
from flask import redirect, url_for
from flask import request, make_response
from flask import render_template
import math

app = Flask(__name__)


def is_prime(n: int) -> bool:
    for i in range(2, n-1):
        if n % i == 0:
            return False
    return True


def get_n_primes(n: int) -> list:
    primeList = []
    num = 1
    while len(primeList) < n:
        num += 1
        if is_prime(num):
            primeList.append(num)
    return primeList


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        numPrimes = request.cookies.get('number')
        if numPrimes:
            return make_response(redirect(url_for('get_primes', n=numPrimes)))
        else:
            return make_response(redirect(url_for('ask_a_number'))) 

@app.route('/<int:n>', methods=['GET', 'POST'])
def get_primes(n):
    if request.method == 'GET':
        primeList = get_n_primes(n)
        response = make_response(render_template('prime_table.html', primeList = primeList))
        response.set_cookie('number', str(n))
    return response
    

    

@app.route('/ask', methods=['GET', 'POST'])
def ask_a_number():
    if request.method == 'GET':
        return render_template('ask.html')
    if request.form.get('click'):
        enteredNum = request.form['numPrimes']
        if enteredNum != "":
            response = make_response(redirect(url_for('get_primes', n=enteredNum)))
            return response
        else:
            return render_template('ask.html')   




if __name__ == '__main__':
    app.run()
