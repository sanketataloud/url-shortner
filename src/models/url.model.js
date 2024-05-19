import mongoose from "mongoose";

const { Schema } = mongoose;
 
const urlSchema = new Schema({
    urlId :{
        type : String,
        required : true,
    },
    originalUrl : {
        type : String,
        required : true,
    },
    shortenedUrl :{
        type : String,
        required : true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    isActive : {
        type : Boolean,
        default : true,
    },
    date : {
        type : Date,
        default : Date.now
    }
},{
    timestamps : true,
    collection : 'urls'
})

export default mongoose.model('Url',urlSchema);