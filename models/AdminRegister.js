import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
  username: 
  {
    type : String,
    required : true,
  },
  email: {
    type : String,
    required : true,
  },
  name: {
    type : String,
    required : true,
  },
  password : {
    type : String,
    require : true,
  },
  age:
  {
    type : Number,
    required : true,
  }
} ,{timestamps : true});

const Adminregister =mongoose.models.Adminregister || mongoose.model("Adminregister", AdminSchema);

export default Adminregister;