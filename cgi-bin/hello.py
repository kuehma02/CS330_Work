#!/usr/bin/env python3 

import cgi
from datetime import datetime as dt


def isPrime(n:int) -> bool:
    '''Check if the number is prime'''
    for i in range(2, (n//2)+1):
        if n % i == 0:
            return False
    return True

def getNPrimes(n:int):
    primeList = []
    count = 2
    while len(primeList) != n:
        if isPrime(count):
            primeList.append(count)
        count += 1
    return primeList


params = cgi.FieldStorage()
name = params['name'].value
n = int(params['n'].value)

print('Content-type: text/html')
print()

print('<html>')
print('<head>')
print('<title>Hello CS330</title>')
print('<script src="../prime.js"></script>')
print('</head>')
print('<body>')
print('<h1>Hi {}!</h1>'.format(name))
print('<p>Today is <em>{}</em></p>'.format(dt.now()))
if isPrime(n):
    print('{} is prime'.format(n))
else:
    print('{} is not prime'.format(n))

print('<br><br>')

if ('<script>isPrime(n)</script>'):
    print('<script>document.write("Javascript says {} is prime")</script>'.format(n))
else:
    print('<script>document.write("Javascript says {} is NOT prime")</script>'.format(n))
print('<br><br>')
print()
print('Python prime list says: {}'.format(getNPrimes(n)))
print('<br><br>')

print('Javascript prime list says: {}'.format('<script>getNPrimes({})</script>').format(n))

print('<br><br>')

print('</html>')

