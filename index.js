import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const bodyParser = require('body-parser');


import {ApolloServer, AuthenticationError, gql} from 'apollo-server-express';

import schema from './schema';
import models from './models';
import resolvers from './resolvers';



const app = express();

const MONGO_URI = "mongodb://testuser:password1@ds151892.mlab.com:51892/lyrics";

if (!MONGO_URI) {
    throw new Error('You must provide a MongoLab URI');
  };

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));



app.use(cors());
app.use(bodyParser.json());

const getMe = async req => {
    const token = req.headers['x-token'];

    if(token){
        try{
          return await jwt.verify(token, process.env.SECRET);
        }catch(e){
            console.log(e);
            throw new AuthenticationError('Your session expired, sign in again');
        }
    }
};


const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async({req}) => {
        const me = await getMe(req);
        return {
            models,
            me
        }
    }
});


server.applyMiddleware({app, path: '/graphql'});



app.listen(7000, () => {
    console.log('server started at 7000');
})