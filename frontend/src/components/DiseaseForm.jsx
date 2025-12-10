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
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ml/predict",
        form
      );
      onResult(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ background: "#ffffff", padding: "36px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}>
      <h3 style={{ margin: "0 0 24px 0", color: "#5b6bf0" }}>Enter Your Symptoms</h3>
      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginBottom: "16px" }}>
        {Object.keys(form).map((field) => (
          <input
            key={field}
            placeholder={field.replace(/_/g, " ")}
            name={field}
            value={form[field]}
            onChange={handleChange}
            type={field.includes("age") || field.includes("days") ? "number" : "text"}
          />
        ))}
        <button type="submit" style={{ gridColumn: "1 / -1", padding: "11px 18px", background: "#5b6bf0", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Detect Disease</button>
      </form>
    </div>
  );
}

export default DiseaseForm;