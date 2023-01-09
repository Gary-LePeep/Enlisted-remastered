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


@app.route("/")
def home():
    return render_template('comparison.html')


@app.route("/comparison")
def comparison():
    return render_template('comparison.html')


@app.route("/datamine")
def datamine():
    return render_template('datamine.html')


@app.route("/soldierStats")
def soldier_stats():
    return render_template('soldierStats.html')


@app.route("/tanks")
def tanks():
    return render_template('tanks.html')


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
