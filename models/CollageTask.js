import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    CollegeTaskname: {
      type: String,
      required: true,
    },
   collegeId:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]

  },
  { timestamps: true }
);

const College = mongoose.model("College", collegeSchema);
export default College;