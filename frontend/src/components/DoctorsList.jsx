function DoctorsList({ data }) {
  return (
    <div>
      <h2>🧪 Predicted Disease: {data.predictedDisease}</h2>
      <h3>Condition: {data.condition}</h3>

      <h3>👨‍⚕️ Recommended Doctors</h3>

      {data.doctors.length === 0 && <p>No doctors found</p>}

      {data.doctors.map((doc, index) => (
        <div key={index} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "8px"
        }}>
          <p><b>Name:</b> {doc.name}</p>
          <p><b>Specialization:</b> {doc.specialization}</p>
          <p><b>Experience:</b> {doc.experience}</p>
          <p><b>Hospital:</b> {doc.hospital}</p>
          <p><b>Location:</b> {doc.location}</p>
          <p><b>Contact:</b> {doc.contact}</p>
          <p><b>Rating:</b> ⭐ {doc.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default DoctorsList;
