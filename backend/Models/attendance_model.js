const mongoose=require('mongoose')


const AttendanceSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      domain: {
        type: String,
        required: true
      },
      date: {
        type: Date,
      },
    status:{
        type:String
    }

});


const AttendanceModel=mongoose.model("attendance", AttendanceSchema)
module.exports=AttendanceModel