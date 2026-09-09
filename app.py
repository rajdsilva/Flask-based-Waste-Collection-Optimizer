from flask import Flask, jsonify, render_template

app = Flask(__name__, template_folder="templates", static_folder="stat", static_url_path="/static")

# Demo bin data. Coordinates are stored as latitude/longitude floats so the
# frontend can place markers without parsing or rounding the values.
WASTE_BINS = [
    {"id": "BIN-001", "name": "Main Gate Bin", "latitude": 19.076090, "longitude": 72.877426, "fill_level": 86, "status": "Needs Collection"},
    {"id": "BIN-002", "name": "Market Road Bin", "latitude": 19.082300, "longitude": 72.881100, "fill_level": 62, "status": "Normal"},
    {"id": "BIN-003", "name": "School Road Bin", "latitude": 19.070800, "longitude": 72.872700, "fill_level": 91, "status": "Needs Collection"},
    {"id": "BIN-004", "name": "Bus Stop Bin", "latitude": 19.089600, "longitude": 72.874900, "fill_level": 45, "status": "Normal"},
    {"id": "BIN-005", "name": "Park Bin", "latitude": 19.071500, "longitude": 72.885200, "fill_level": 78, "status": "Monitor"},
]


@app.get("/")
def index():
    return render_template("map.html")


@app.get("/api/bins")
def bins():
    return jsonify({"bins": WASTE_BINS})


@app.get("/api/health")
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True)
