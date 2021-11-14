const { User, Book} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
      me: async(parent, args, context) =>{
        if(context.user){
        let userInfo= await User.findOne({_id: context.user._id});
        return userInfo;
        }
        throw new AuthenticationError("User not Found!");
      }
        },
    Mutation:{
        login: async(parent, args, context) =>{
            let userInfo = await User.findOne({email: args.email});
            if(!userInfo){
                throw new AuthenticationError("Error logging in!");
            }
            let correctPw=await userInfo.isCorrectPassword(args.password);

            if (!correctPw) {
                throw new AuthenticationError;
              }
              const token = signToken(user);
              return { token, user };
        },
        //how do I query this in graphql
        addUser: async(parent, args, context) =>{
            const user = await User.create(args);
            if (!user) {
                throw new AuthenticationError("Error creating User!");
        }
            const token = signToken(user);
            return { token, user };
    },
    saveBook: async(parent, {input}, context) =>{
        if(context.user){
            const updateUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                { $addToSet: { savedBooks: input } },
                { new: true, runValidators: true }
            );
            return updatedUser;
        }
        throw new AuthenticationError("You are not logged in!")
    },
    removeBook: async(parent, {bookId}, context) => {
        if(context.user){
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        )
        if (!updatedUser) {
          throw new AuthenticationError("Couldn't find user with this id!");
        }
        return updatedUser;
    }

}
    }
    
};
  
  module.exports = resolvers;

  //test the addUser
  //saveBook
  //removeBook
