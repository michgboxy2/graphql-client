import jwt from 'jsonwebtoken';
import {combineResolvers} from 'graphql-resolvers';
import {AuthenticationError} from 'apollo-server';
import { model } from 'mongoose';

const createToken = async (id) => {
    return await jwt.sign({id: id}, 'jsonwebtoken',{expiresIn : '30m'});
}


export default {
    Query: {
        users: async (parent, args, {models}) => {
            return await models.user.find({});
        },

        user: async (parent, {id}, {models}) => {
            return await models.user.findById(id);
        }
    }, 

    Mutation: {
        signUp: async (parent, args, {models}) => {
            const user = await new models.user(args).save();
            return {token : createToken(user._id)}
        },

        signIn: async(parent, {email, password}, {models}) => {
            console.log(email, password);
            if(!email || !password){
                throw new AuthenticationError("Please enter your email and password");
            }

            let user = await models.user.findOne({email});

            if(!user){throw new AuthenticationError('invalid user');}

            if(!user.authenticate(password)){
                throw new AuthenticationError('invalid user');
            }

            return {token: createToken(user._id)}


        }
    }
}