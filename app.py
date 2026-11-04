import importlib.util
import os
import sys

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FINAL_APP_PATH = os.path.join(BASE_DIR, "final", "app.py")

final_dir = os.path.join(BASE_DIR, "final")
if final_dir not in sys.path:
    sys.path.insert(0, final_dir)

spec = importlib.util.spec_from_file_location("final_app", FINAL_APP_PATH)
final_app_module = importlib.util.module_from_spec(spec)
sys.modules["final_app"] = final_app_module
spec.loader.exec_module(final_app_module)

app = final_app_module.app

if __name__ == "__main__":
    app.run(debug=True)
