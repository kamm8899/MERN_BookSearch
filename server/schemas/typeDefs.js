const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type USER{
        _id: ID
        username: String
        email: String
    }
    type Book{
        
    }
    type Query{
        me: User
        users: [User]
        user(username: String!): User
    }
    type Mutation{
        login(email: String!, password: String!): Auth

    }`


// const typeDefs = gql`

//   type Thought {
//     _id: ID
//     thoughtText: String
//     createdAt: String
//     username: String
//     reactionCount: Int
//     reactions: [Reaction]
//   }
//   type Auth {
//     token: ID!
//     user: User
//   }

//   type Mutation {
//     login(email: String!, password: String!): Auth
//     addUser(username: String!, email: String!, password: String!): Auth
//     addThought(thoughtText: String!): Thought
//     addReaction(thoughtId: ID!, reactionBody: String!): Thought
//     addFriend(friendId: ID!): User
//   }
// `;

module.exports= typeDefs;