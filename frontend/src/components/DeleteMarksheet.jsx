import { useState } from "react";
import axios from "axios";

export function DeleteMarksheet() {
  const [rollNo, setRollNo] = useState("");
  const [successMessage, setSMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClick = async () => {
    if (!rollNo) {
      setErrorMessage("Roll number cannot be empty.");
      return;
    }

    try {
      const res = await axios.delete("http://localhost:3000/deleteMarksheet", {
        data: { rollNo }, // Correctly include rollNo in the data property
      });
      console.log(res);
      setSMessage("Marksheet deleted successfully");
      setErrorMessage(null); // Clear error message on success
    } catch (error) {
      console.error(error);
      setErrorMessage("Some error occurred while deleting");
      setSMessage(null); // Clear success message on error
    } finally {
      setRollNo(""); // Clear the roll number input

      // Clear messages after a delay
      setTimeout(() => {
        setSMessage(null);
        setErrorMessage(null);
      }, 3000); // Show messages for 3 seconds
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Roll No"
        value={rollNo} // Bind value to state
        onChange={(e) => setRollNo(e.target.value)}
      />
      <button onClick={handleClick}>Delete Marksheet</button>
      {successMessage && (
        <div style={{ color: "green" }}>{successMessage}</div>
      )}{" "}
      {/* Display success message */}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
      {/* Display error message */}
    </div>
  );
}
