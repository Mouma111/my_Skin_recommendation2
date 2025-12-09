import { useState } from "react";
import DiseaseForm from "./components/DiseaseForm";
import DoctorsList from "./components/DoctorsList";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🩺 Skin Disease Detector and Specialist Finder</h1>

      <DiseaseForm onResult={setResult} />

      {result && <DoctorsList data={result} />}
    </div>
  );
}

export default App;
