import { useState } from "react";
import axios from "axios";

export function ShowMarksheet() {
  const [rollNo, setRollNo] = useState("");
  const [marks, setMarks] = useState(null); // State to store retrieved marks
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleClick = async () => {
    if (!rollNo) {
      setErrorMessage("Roll number cannot be empty."); // Validate rollNo
      return;
    }

    setLoading(true); // Set loading state
    try {
      const res = await axios.get(`http://localhost:3000/marksheet/${rollNo}`); // Correct URL
      setMarks(res.data.marks);
      setErrorMessage(null); // Clear any previous errors
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching marks"); // Handle error
      setMarks(null); // Clear previous marks if any
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Roll No"
        value={rollNo}
        onChange={(e) => setRollNo(e.target.value)}
      />
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Get Marks"}
      </button>
      {marks && (
        <div>
          <h3>Marks:</h3>
          <p>DAA: {marks.daaMarks}</p>
          <p>OS: {marks.osMarks}</p>
          <p>CN: {marks.cnMarks}</p>
          <p>DBMS: {marks.dbmsMarks}</p>
        </div>
      )}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
      {/* Styling error message */}
    </div>
  );
}
