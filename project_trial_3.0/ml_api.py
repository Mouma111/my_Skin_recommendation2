from flask import Flask, request, jsonify
from predictor import SkinDiseaseMLModel

app = Flask(__name__)

model = SkinDiseaseMLModel()

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    disease = model.predict_from_dict(data)

    return jsonify({
        "predicted_disease": disease
    })

if __name__ == "__main__":
    app.run(port=8000)
