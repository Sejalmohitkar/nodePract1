import mongoose from "mongoose";

const SuperAdminSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  email : {
    type : String,
    require : true
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const SuperAdminRegister = mongoose.models.SuperAdminRegister|| mongoose.model("SuperAdminRegister", SuperAdminSchema);

export default SuperAdminRegister;
