const express = require("express");
const cors = require("cors");
const PORT = 3000;
const app = express();
const { User, Marks } = require("../backend/db");
const { validateSchema, MarksSchema, UserSchema } = require("./validate");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello World");
});

// Get marksheet by roll number
app.get("/marksheet/:rollNo", async (req, res) => {
  const { rollNo } = req.params;
  try {
    const result = await User.findOne({ rollNo }).populate("marks");

    if (!result) {
      return res.status(400).json({
        message: "No user found with this roll number",
      });
    }

    return res.status(200).json({
      message: "Marksheet retrieved successfully",
      marks: result.marks,
    });
  } catch (error) {
    console.log("Some Error Occurred: " + error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

// Add marks
app.post(
  "/addMarks",
  validateSchema(UserSchema),
  validateSchema(MarksSchema),
  async (req, res) => {
    const { rollNo, firstName, lastName } = req.body;
    const { daaMarks, osMarks, cnMarks, dbmsMarks } = req.body;

    try {
      const existUser = await User.findOne({ rollNo });
      if (!existUser) {
        const user = await User.create({ rollNo, firstName, lastName });
        const newMarks = await Marks.create({
          daaMarks,
          osMarks,
          cnMarks,
          dbmsMarks,
        });

        user.marks = newMarks._id;
        await user.save();
        return res.status(201).json({
          message: "Marks added successfully",
          user,
        });
      }
      return res.status(200).json({
        message: "User Already Exists",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Some Error Occurred",
        error: error.message,
      });
    }
  }
);

// Update marks
app.put("/updateMarks", validateSchema(MarksSchema), async (req, res) => {
  const { rollNo } = req.body;
  const { daaMarks, osMarks, cnMarks, dbmsMarks } = req.body;

  try {
    const user = await User.findOne({ rollNo }).populate("marks");

    if (!user || !user.marks) {
      return res.status(404).json({
        message: "User or marks not found",
      });
    }

    const updatedMarks = {};
    if (daaMarks !== undefined) updatedMarks.daaMarks = daaMarks;
    if (osMarks !== undefined) updatedMarks.osMarks = osMarks;
    if (cnMarks !== undefined) updatedMarks.cnMarks = cnMarks;
    if (dbmsMarks !== undefined) updatedMarks.dbmsMarks = dbmsMarks;

    const newMarks = await Marks.findByIdAndUpdate(
      user.marks._id,
      updatedMarks,
      { new: true }
    );

    return res.status(200).json({
      message: "Marks updated successfully",
      marks: newMarks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Error Occurred",
      error: error.message,
    });
  }
});

// Delete marksheet
// Delete marksheet
app.delete("/deleteMarksheet", async (req, res) => {
  const { rollNo } = req.body;
  try {
    const user = await User.findOneAndDelete({ rollNo });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Delete associated marks if they exist
    if (user.marks) {
      await Marks.findByIdAndDelete(user.marks);
    }

    return res.status(200).json({
      message: "Marksheet deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some Error Occurred",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("Server is Running on Port " + PORT);
});
