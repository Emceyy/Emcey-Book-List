const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} = graphql;
const { Book } = require("../../data.js");
const BookType = require("./BookType.js");

const AuthorType = new GraphQLObjectType({
  name: "Auther",
  fields: () => ({
    id: { type: GraphQLInt },
    AuthorName: { type: GraphQLString },
    Books: {
      type: new GraphQLList(BookType),
      resolve: async (parent, args) => {
        try {
          const books = await Book.find({ authorid: parent.id }).lean();
          return books;
        } catch (error) {
          console.error('Error in Books resolver:', error);
          throw new Error('Error in Books resolver');
        }
      },
    },
    
  }),
});

module.exports = AuthorType;