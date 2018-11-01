from flask import Flask
from flask import redirect, url_for
from flask import request, make_response
from flask import render_template
import math

app = Flask(__name__)

@app.route('/')
def index():
    return make_response(render_template('index.html'))


if __name__ == '__main__':
    app.run()