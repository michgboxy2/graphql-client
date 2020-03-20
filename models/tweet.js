import {Schema, model, connect} from 'mongoose';
import mongoose from 'mongoose';

const TweetSchema = new Schema({
    tweet: {
        type: String,
        required: true
    },
    
    user : { type : mongoose.Schema.Types.ObjectId, ref : 'user', required : "You must be logged in"},

});


module.exports = mongoose.model('tweet', TweetSchema);