import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename: {type: String, required: true},
    path: {type: String, required: true},
    filesize: {type: Number, required: true},
    uuid: {type: String, required: true},
    sender: {type: String, required: false},
    reciever: {type: String, required: false}
}, { timestamps: true});

export default mongoose.model('File', fileSchema,'files');