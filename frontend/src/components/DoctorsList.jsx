import { useState } from "react";
import axios from "axios";

function DoctorsList({ data }) {
  const [selectedCity, setSelectedCity] = useState("");
  const [doctors, setDoctors] = useState(data.doctors || []);
  const cities = ["Kolkata", "Delhi", "Mumbai", "Bangalore"];

  const handleCityFilter = async (city) => {
    setSelectedCity(city);
    try {
      const res = await axios.post("http://localhost:5000/api/skin/filter", {
        symptom: data.condition.toLowerCase(),
        location: city
      });
      setDoctors(res.data.doctors || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>🧪 Disease: {data.predictedDisease}</h2>
      <h3>City Filter</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "20px" }}>
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => handleCityFilter(city)}
            style={{
              padding: "10px",
              background: selectedCity === city ? "#5b6bf0" : "#e5e7eb",
              color: selectedCity === city ? "white" : "#333",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            {city}
          </button>
        ))}
      </div>

      <h3>Recommended Doctors {selectedCity && `(${selectedCity})`}</h3>
      {doctors.map((doc, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px", borderRadius: "8px" }}>
          <p><strong>{doc.name}</strong> ⭐ {doc.rating}</p>
          <p><strong>Specialization:</strong> {doc.specialization}</p>
          <p><strong>Experience:</strong> {doc.experience}</p>
          <p><strong>Hospital:</strong> {doc.hospital}</p>
          <p><strong>Location:</strong> {doc.location}</p>
          <p><strong>Contact:</strong> {doc.contact}</p>
        </div>
      ))}
    </div>
  );
}

export default DoctorsList;