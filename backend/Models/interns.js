const mongoose=require('mongoose')


const InternSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      course: {
        type: String,
        required: true
      },
      college: {
        type: String,
        required: true
      },
      domain: {
        type: String,
        required: true
      },
      duration: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      alternatePhoneNumber: {
        type: String
      },
      dateAdded: {
        type: Date,
      },
      dob: {
        type: String
      }

});


const InternModel=mongoose.model("interns", InternSchema)
module.exports=InternModel