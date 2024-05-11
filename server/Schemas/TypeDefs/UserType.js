const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt  } = graphql;


const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    UserName: { type: GraphQLString },
    Password: { type: GraphQLString },
    Email: { type: GraphQLString },
    UserList: { type: GraphQLList(GraphQLString)},
  }),
});

module.exports = UserType;