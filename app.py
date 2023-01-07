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
    return render_template('index.html')


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5000)
