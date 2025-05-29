import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    CollegeTaskname: {
      type: String,
      required: true,
      unique: true,
    },
   collegeId:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]

  },
  { timestamps: true }
);

collegeSchema.index({ collegeId: 1 });

const College = mongoose.model("College", collegeSchema);
export default College;