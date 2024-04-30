const {User, Finance, MoneyOut } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers ={
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, {email}) =>{
            return User.findOne({ email });
        }

    },
    Mutation: {
        addUser: async (parent, {firstname, lastname, email, password}) => {
            const existingUser = await User.findOne({  email });
            if(existingUser){
                throw new AuthenticationError('Already a user with this email');
            }
            const user = await User.create({ 
                firstname,
                lastname,
                initials,
                email, 
                password,
            });
            const token = signToken(user);

            return {token, user};
        },


    },
}

module.exports = resolvers;