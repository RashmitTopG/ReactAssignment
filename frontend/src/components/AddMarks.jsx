import { useState } from "react";
import axios from "axios";

export function AddMarks() {
  const [rollNo, setRollNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [daaMarks, setDaaMarks] = useState("");
  const [osMarks, setOsMarks] = useState("");
  const [cnMarks, setCnMarks] = useState("");
  const [dbmsMarks, setDbmsMarks] = useState("");
  const [errorM, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/addMarks", {
        rollNo: Number(rollNo), // Convert to number
        firstName: firstName,
        lastName: lastName,
        daaMarks: Number(daaMarks),
        osMarks: Number(osMarks),
        cnMarks: Number(cnMarks),
        dbmsMarks: Number(dbmsMarks),
      });

      console.log(res);
      console.log("Request Sent");

      // Set success message
      if (res.status === 201) {
        setSuccessMessage("Marks added successfully!");
        setError(null); // Clear any previous errors
      } else if (res.status === 200) {
        // Handle user already exists
        setError(res.data.message); // Set error message from server
        setSuccessMessage(null); // Clear any previous success message
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add marks."); // Improved error handling
      setSuccessMessage(null); // Clear any previous success message
    } finally {
      // Reset all fields after request (successful or not)
      setRollNo("");
      setFirstName("");
      setLastName("");
      setDaaMarks("");
      setOsMarks("");
      setCnMarks("");
      setDbmsMarks("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Add Marks</h2>

      <input
        type="text"
        placeholder="Enter Roll No"
        value={rollNo}
        onChange={(e) => {
          setRollNo(e.target.value);
        }}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Enter First Name"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Enter Last Name"
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Enter DAA Marks"
        value={daaMarks}
        onChange={(e) => {
          setDaaMarks(e.target.value);
        }}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Enter OS Marks"
        value={osMarks}
        onChange={(e) => {
          setOsMarks(e.target.value);
        }}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Enter CN Marks"
        value={cnMarks}
        onChange={(e) => {
          setCnMarks(e.target.value);
        }}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Enter DBMS Marks"
        value={dbmsMarks}
        onChange={(e) => {
          setDbmsMarks(e.target.value);
        }}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Marks
        </button>
        <button
          onClick={() => {
            setRollNo("");
            setFirstName("");
            setLastName("");
            setDaaMarks("");
            setOsMarks("");
            setCnMarks("");
            setDbmsMarks("");
          }}
          className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>

      {errorM && <p className="text-red-500 mt-2">{errorM}</p>}
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
    </div>
  );
}
