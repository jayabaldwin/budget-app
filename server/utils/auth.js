const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;
const expiration = process.env.EXPIRATION;

module.exports = {
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),

  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const data = jwt.verify(token, secret);
      req.user = data;
    } catch (error) {
      console.log("Invalid token");
    }

    return req;
  },

  signToken: function ({ firstname, email, _id }) {
    console.log(process.env);
    console.log(secret, expiration);
    const payload = { firstname, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};