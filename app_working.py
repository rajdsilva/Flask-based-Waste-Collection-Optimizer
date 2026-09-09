from datetime import datetime
from flask import Flask, jsonify, redirect, render_template, request, url_for, session
from functools import wraps
from joblib import load as joblib_load
import math
import os
import pickle
import warnings
import pandas as pd

app = Flask(__name__, template_folder="templates", static_folder="stat", static_url_path="/static")
app.secret
