import axios from "axios";
import SkinIssue from "../models/SkinIssue.js";

export const predictDisease = async (req, res) => {
  try {
    // 1. Call Python ML API
    const mlResponse = await axios.post(
      "http://127.0.0.1:8000/predict",
      req.body
    );

    const disease = mlResponse.data.predicted_disease;
    const diseaseLower = disease.toLowerCase();  // acne, eczema etc

    // 2. Find matching disease in MongoDB
    const skinData = await SkinIssue.findOne({
      name: diseaseLower
    });

    // 3. If no doctors found
    if (!skinData) {
      return res.json({
        predictedDisease: disease,
        doctors: []
      });
    }

    // 4. Send disease + doctors
    res.json({
      predictedDisease: disease,
      condition: skinData.condition,
      doctors: skinData.doctors
    });

  } catch (error) {
    console.error("ML Service Error:", error.message);
    res.status(500).json({ message: "ML Service Error", error: error.message });
  }
};
