import { model } from "mongoose";


export default {
    Query: {
        tweets: async (parent, args, {models, me}) => {
            console.log(me);
            return await models.tweet.find();
        },

        tweet: async (parent, {id}, {models}) => {
            return await models.tweet.findById(id);

        }

    },

    Mutation: {
        createTweet: async (parent, {tweet}, {models, me}) => {
            console.log(me);
            return await models.tweet.create({tweet, user: me.id});
        }
    },

    Tweet: {
        user: async (tweet, args, {models}) => {
            return await models.user.findById(tweet.user);
        }
    }
}