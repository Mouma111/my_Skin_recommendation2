import { useState } from "react";
import axios from "axios";

function DiseaseForm({ onResult }) {
  const [form, setForm] = useState({
    location: "",
    color: "",
    texture: "",
    size: "",
    duration_days: "",
    itching: 0,
    pain: 0,
    scaling: 0,
    spreading: 0,
    age: "",
    gender: "",
    family_history: 0,
    seasonal_variation: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/ml/predict",
      form
    );

    onResult(res.data);
  };

  return (
    <div style={{ background: "#ffffff", padding: "36px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", border: "1px solid #e5e7eb", width: "100%", maxWidth: "1000px" }}>
      <h3 style={{ margin: "0 0 24px 0", color: "#5b6bf0", fontSize: "18px", fontWeight: "600" }}>Enter Symptoms</h3>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {Object.keys(form).map((field) => (
          <input
            key={field}
            placeholder={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
          />
        ))}

        <button type="submit" style={{ marginTop: "16px", padding: "11px 18px", background: "#5b6bf0", color: "white", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "14px" }}>Detect Disease</button>
      </form>
    </div>
  );
}

export default DiseaseForm;
