import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        tweet(id: ID!): Tweet!
        tweets: [Tweet!]
    }

    extend type Mutation {
        createTweet(tweet: String!): Tweet!
    }

    type Tweet {
       id: ID!
       tweet : String!
       user: User!
    }

`;