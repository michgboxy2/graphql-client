import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        me: User
        user(id: ID!): User
        users: [User!]
    }


    extend type Mutation {
        signUp(
            firstName: String!
            lastName: String!
            email: String!
            password: String!
        ) : Token!

        signIn(email: String!, password: String!) : Token!

        deleteUser(id: ID!): Boolean!

    }

    type Token {
        token: String!
    }


    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        tweets: [Tweet!]!
    }

`;