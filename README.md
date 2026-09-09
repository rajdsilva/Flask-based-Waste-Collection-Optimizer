Placement and run instructions

- Put your trained model file named `waste_prediction_model.pkl` (or one of the supported names) into either:
  - `models/waste_prediction_model.pkl` (preferred) or
  - `models/waste_model.pkl` or
  - project root `waste_prediction_model.pkl` or `waste_model.pkl`.

- Install dependencies (example):

```bash
python -m venv .venv
.venv\Scripts\activate
pip install flask pandas
```

- Run the app:

```bash
python app.py
```

- Test prediction API (example):

```bash
curl -X POST http://127.0.0.1:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"fill_level":45, "temperature":28, "humidity":60, "day_of_week":3}'
```

If you want, I can add a `requirements.txt` and test the server locally now.