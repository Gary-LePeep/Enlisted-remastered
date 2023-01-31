import json
import math
import os
import time
import traceback

from flask import Flask, jsonify, render_template, send_from_directory, request

app = Flask(__name__, template_folder='web')
app.url_map.strict_slashes = False

######################################
#               ENTRY                #
######################################
@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')


def get_language():
    language = 'English'
    if 'language' in request.cookies.to_dict():
        language = request.cookies.to_dict()['language']
    return json.load(open('static/translations/' + language + '.json'))


@app.route("/")
def home():
    return comparison()


@app.route("/comparison")
def comparison():
    language_json = get_language()
    weapons_json = json.load(open('static/datamine/weapons.json'))
    bullets_json = json.load(open('static/datamine/bullets.json'))
    return render_template('comparison.html', language=language_json, weaponsJson=weapons_json, bulletsJson=bullets_json)


@app.route("/datamine")
def datamine():
    language_json = get_language()
    weapons_json = json.load(open('static/datamine/weapons.json'))
    bullets_json = json.load(open('static/datamine/bullets.json'))
    return render_template('datamine.html', language=language_json, weaponsJson=weapons_json, bulletsJson=bullets_json)


@app.route("/soldierStats")
def soldier_stats():
    language_json = get_language()
    soldier_stats_json = json.load(open('static/soldierStats/solderStats.json'))
    damage_parts_json = json.load(open('static/soldierStats/soldierDamage.json'))
    return render_template('soldierStats.html', language=language_json, damageParts=damage_parts_json, soldierStats=soldier_stats_json)


@app.route("/tanks")
def tanks():
    language_json = get_language()
    return render_template('tanks.html', language=language_json)


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
