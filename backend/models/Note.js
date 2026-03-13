import mongoose from "mongoose";

// موديل النوتة في قاعدة البيانات
const noteSchema = new mongoose.Schema(
{
title:{
type:String,
required:true
},
content:{
type:String,
required:true
}
},
{timestamps:true}
);

export default mongoose.model("Note",noteSchema);