import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
  name: 
  {
    type : String,
    required : true,
  },
  email: {
    type : String,
    required : true,
  },
  age:
  {
    type : Number,
    required : true,
  }
} ,{timestamps : true});

const AddDATA = mongoose.model("User", userSchema);

export default AddDATA