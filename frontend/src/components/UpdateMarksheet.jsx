import { useState } from "react";
import axios from "axios";

export function UpdateMarksheet() {
  const [rollNo, setRollNo] = useState("");
  const [daaMarks, setDaaMarks] = useState("");
  const [osMarks, setOsMarks] = useState("");
  const [cnMarks, setCnMarks] = useState("");
  const [dbmsMarks, setDbmsMarks] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading

  const handleClick = async () => {
    if (!rollNo) {
      setErrorMessage("Roll number cannot be empty."); // Validate rollNo
      return;
    }

    const updatedMarks = {
      rollNo: Number(rollNo), // Ensure rollNo is sent as a number
      daaMarks: daaMarks ? Number(daaMarks) : undefined,
      osMarks: osMarks ? Number(osMarks) : undefined,
      cnMarks: cnMarks ? Number(cnMarks) : undefined,
      dbmsMarks: dbmsMarks ? Number(dbmsMarks) : undefined,
    };

    // Validate at least one mark is being updated
    if (
      !updatedMarks.daaMarks &&
      !updatedMarks.osMarks &&
      !updatedMarks.cnMarks &&
      !updatedMarks.dbmsMarks
    ) {
      setErrorMessage("At least one mark must be provided for update."); // Error message
      return;
    }

    setLoading(true); // Set loading state
    try {
      const response = await axios.put(
        "http://localhost:3000/updateMarks",
        updatedMarks
      );
      setSuccessMessage("Marks updated successfully");
      setErrorMessage(null);
    } catch (error) {
      console.error("Error response:", error.response);
      setErrorMessage(error.response?.data?.message || "Error updating marks"); // Show specific error message
      setSuccessMessage(null);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Update Marksheet
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Roll No"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Enter DAA Marks"
            value={daaMarks}
            onChange={(e) => setDaaMarks(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Enter OS Marks"
            value={osMarks}
            onChange={(e) => setOsMarks(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Enter CN Marks"
            value={cnMarks}
            onChange={(e) => setCnMarks(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Enter DBMS Marks"
            value={dbmsMarks}
            onChange={(e) => setDbmsMarks(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleClick}
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow hover:bg-blue-700 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Marks"}
          </button>
          <button
            onClick={() => {
              setRollNo("");
              setDaaMarks("");
              setOsMarks("");
              setCnMarks("");
              setDbmsMarks("");
            }}
            className="ml-4 w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Clear
          </button>
        </div>

        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
}
