import {Schema, model, connect} from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import {AuthenticationError, UserInputError} from 'apollo-server-express';
import mongoose from 'mongoose';

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true

    },

    password: {type: String, required: true}
});

UserSchema.pre('save', function(next){
    this.password = this.encryptPassword(this.password);
    next();
});

UserSchema.methods = {
    authenticate: function(plaintext){
        return bcrypt.compareSync(plaintext, this.password);
    },

    encryptPassword: (plaintext) => {
        if(!plaintext){ throw new AuthenticationError('enter password'); }

        var salt = bcrypt.genSaltSync();

        return bcrypt.hashSync(plaintext, salt);
    }
}

module.exports = mongoose.model('user', UserSchema);