from flask import Flask
from flask import redirect, url_for
from flask import request, make_response
from flask import render_template
import math
import itertools

app = Flask(__name__)


def wordPosibilites(let1, let2, let3, let4, let5, let6, let7, exist = ""):
    if exist != "":
        items = [let1, let2, let3, let4, let5, let6, let7, exist]
    else:
        items = [let1, let2, let3, let4, let5, let6, let7]
    
    letterCombos = []
    for i in range(len(items)):
        letterCombos += list(map("".join, itertools.permutations(items, r+1)))
    
    return letterCombos

@app.route('/', method=['GET'])
def index():
    return make_response(render_template('index.html'))
    

def 


if __name__ == '__main__':
    app.run()