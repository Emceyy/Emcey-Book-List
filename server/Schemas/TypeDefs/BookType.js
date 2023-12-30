const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;


const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLInt },
    bookName: { type: GraphQLString },
    authorid: { type: GraphQLInt },
    pages: { type: GraphQLInt },
    authorname: { type: GraphQLString },
    img_url: { type: GraphQLString },
    genre: { type: GraphQLString },
    publisher: { type: GraphQLString },
  }),
});

module.exports = BookType;