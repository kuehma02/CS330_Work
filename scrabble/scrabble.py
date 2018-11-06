from flask import Flask
from flask import redirect, url_for
from flask import request, make_response
from flask import render_template
import math
import itertools
import operator

app = Flask(__name__)

amerWords = [line.strip() for line in open('/usr/share/dict/american-english', 'r')]
britWords = [line.strip() for line in open('/usr/share/dict/british-english', 'r')]
points = {'*':0, 'e':1, 'a':1, 'i':1, 'o':1, 'n':1, 'r':1, 't':1, 'l':1,
         's':1, 'u':1, 'd':2, 'g':2, 'b':3, 'c':3, 'm':3, 'p':3, 'f':4,
         'h':4, 'v':4, 'w':4, 'y':4, 'k':5, 'j':8, 'x':8, 'q':10, 'z':10}

def wordInformation(words):
    wordsInfo = []
    for word in words:
        wordInfo = []
        wordInfo.append(word)
        wordInfo.append(len(word))
        score = 0
        for ch in word:
            score += points[ch]
        wordInfo.append(score)
        wordsInfo.append(wordInfo)
    
    return wordsInfo

def getWords(perm, dictname):
    if dictname == "american-english":
        dictionary = amerWords
    else:
        dictionary = britWords
    actualWords = []
    for item in perm:
        if item in dictionary:
            actualWords.append(item)
    return actualWords
    
def wordPosibilites(let1, let2, let3, let4, let5, let6, let7, exist = ""):
    items = [let1, let2, let3, let4, let5, let6, let7]
    letterCombos = set()
    if exist == "":
        for i in range(len(items)):
            letterCombos.update(list(map("".join, itertools.permutations(items, i+1))))

    else:
        for i in range(len(items)):
            words= list(map("".join, itertools.permutations([items[i], exist], 2)))
            print(words)
            letterCombos.update(words)
        print(letterCombos)
    #return letterCombos



   
   
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return make_response(render_template('index.html'))
    else:
        let1 = request.form['letter1']
        let2 = request.form['letter2']
        let3 = request.form['letter3']
        let4 = request.form['letter4']
        let5 = request.form['letter5']
        let6 = request.form['letter6']
        let7 = request.form['letter7']
        diction = request.form['dict']
        check = request.form.get('attachExistingCheck')
        print(check)
        if check == None:
            return make_response(redirect(url_for('makeresults', let1 = let1, let2 = let2, let3 = let3, let4 = let4, let5 = let5, let6 = let6, let7 = let7, dict=diction)))
        else:
            existing = request.form['existingletters']
            print('checked')
            return make_response(redirect(url_for('makeresults', let1 = let1, let2 = let2, let3 = let3, let4 = let4, let5 = let5, let6 = let6, let7 = let7, dict=diction, exist = existing)))

@app.route('/results', methods=['GET', 'POST'])
def makeresults():
    if request.method == 'GET':
        let1 = (request.args['let1']).lower()
        let2 = (request.args['let2']).lower()
        let3 = (request.args['let3']).lower()
        let4 = (request.args['let4']).lower()
        let5 = (request.args['let5']).lower()
        let6 = (request.args['let6']).lower()
        let7 = (request.args['let7']).lower()
        
        if 'exist' in request.args:
            existing = request.args['exist']
            permutations = wordPosibilites(let1, let2, let3, let4, let5, let6, let7, existing)
        else:
            permutations = wordPosibilites(let1, let2, let3, let4, let5, let6, let7)
        
        print(len(permutations))
        playableWords = getWords(permutations, request.args['dict'])
        print(len(playableWords))
        print(playableWords)

        wordInfo = wordInformation(playableWords)
        print()
        print()
        sorted_info = sorted(wordInfo, key=operator.itemgetter(2), reverse=True)
        print()
        print()

        #print('made it to results')
        #return render_template('results.html', resultsList = sorted_info)

    else:
        let1 = request.form['letter1']
        let2 = request.form['letter2']
        let3 = request.form['letter3']
        let4 = request.form['letter4']
        let5 = request.form['letter5']
        let6 = request.form['letter6']
        let7 = request.form['letter7']
        diction = request.form['dict']
        check = request.form.get('attachExistingCheck')
        print(check)
        if check == None:
            return make_response(redirect(url_for('makeresults', let1 = let1, let2 = let2, let3 = let3, let4 = let4, let5 = let5, let6 = let6, let7 = let7, dict=diction)))
        else:
            return make_response(redirect(url_for('makeresults', let1 = let1, let2 = let2, let3 = let3, let4 = let4, let5 = let5, let6 = let6, let7 = let7,  dict=diction, exist = request.form['existingletters'])))


if __name__ == '__main__':
    app.run()