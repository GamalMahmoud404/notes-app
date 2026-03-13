import Note from "../models/Note.js";

// جلب كل النوتات
export const getNotes = async(req,res)=>{

const notes = await Note.find().sort({createdAt:-1});

res.json(notes);

};

// اضافة نوتة
export const createNote = async(req,res)=>{

const note = new Note(req.body);

await note.save();

res.json(note);

};

// تعديل نوتة
export const updateNote = async(req,res)=>{

const note = await Note.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.json(note);

};

// حذف نوتة
export const deleteNote = async(req,res)=>{

await Note.findByIdAndDelete(req.params.id);

res.json({message:"Note deleted"});

};