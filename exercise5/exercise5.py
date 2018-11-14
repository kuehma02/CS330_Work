import os
import requests
from flask import Flask, request, render_template, send_from_directory
from flask import redirect, url_for
import psycopg2 
import records

app = Flask(__name__)


def get_data_from_db(query: str) -> list:
    try:
        conn = psycopg2.connect(
            user="kuehma02", host="knuth.luther.edu", port=5432, dbname="world"
        )
    except:
        raise ConnectionError("Could not connect to the database")
    cur = conn.cursor()
    cur.execute(query)
    rows = cur.fetchall()
    return rows


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template("index.html")
    if request.form.get("country"):
        country = request.form.get("country")
        query = f"select * from country join city on country.capital = city.id where code='{country}';"
    if request.form.get("region"):
        region = request.form.get("region")
        query = f"select * from country join city on country.capital = city.id where region='{region}';"
    if request.form.get("continent"):
        continent = request.form.get("continent")
        query = f"select * from country join city on country.capital = city.id where continent='{continent}';"
    result = get_data_from_db(query)
    return render_template("result.html", rows=result)


@app.route("/country", methods=["GET"])
def country():
    all_countries = get_data_from_db("select code, name from country;")
    return render_template("country.html", options=all_countries)

@app.route("/region", methods=["GET"])
def region():
    all_regions = get_data_from_db("select distinct region from country;")
    print(all_regions)
    return render_template("region.html", options=all_regions)

@app.route("/continent", methods=["GET"])
def continent():
    all_continents = get_data_from_db("select distinct continent from country;")
    print(all_continents)
    return render_template("continent.html", options=all_continents)


if __name__ == "__main__":
    app.run(host="0.0.0.0")
