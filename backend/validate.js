const zod = require("zod");

const UserSchema = zod.object({
  rollNo: zod.number(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const MarksSchema = zod.object({
  rollNo: zod.number().optional(),
  daaMarks: zod.number().min(0).max(100),
  osMarks: zod.number().min(0).max(100),
  cnMarks: zod.number().min(0).max(100),
  dbmsMarks: zod.number().min(0).max(100),
});

const validateSchema = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Validation Error",
        errors: result.error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }
    next();
  } catch (error) {}
};

module.exports = {
  UserSchema,
  MarksSchema,
  validateSchema,
};
