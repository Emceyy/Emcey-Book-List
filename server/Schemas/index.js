const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const { Author, Book, User } = require("../data")

const randomId = () => {
  const randomNumber = Math.random() * 1000;
  const randomInteger = Math.floor(randomNumber);
  return randomInteger;
};


const AuthorType = require("./TypeDefs/AuthorType.js");
const BookType = require("./TypeDefs/BookType.js");
const UserType = require("./TypeDefs/UserType.js");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllAuthors: {
      type: new GraphQLList(AuthorType),
      args: { id: { type: GraphQLInt } },
      resolve: async (parent, args) => { 
        try {
          const author = await Author.find({}).lean(); 
          return author; 
        } catch (err) {
          console.error(err);
        }
      },
    },
    getAuthorByName: {
      type: AuthorType,
      args: { AuthorName: { type: GraphQLString } },
      resolve: async (parent, args) => {
        try {
           const author = await Author.findOne({ AuthorName: args.AuthorName }).lean();
           if (!author) {
             throw new Error('Author not found');
           }
           return author;
        } catch (error) {
           console.error('Error in getAuthorByName resolver:', error);
           throw new Error('Error in getAuthorByName resolver');
        }
       },
    },

    getBookByName: {
      type: BookType,
      args: { BookName: { type: GraphQLString } },
      resolve: async (parent, args) => {
          try {
            const book = await Book.findOne({ bookName: args.BookName }).lean();
            if (book) {
              return book;
            }
            throw new Error('Book not found');
          } catch (error) {
            console.error('Error in getBookByName resolver:', error);
            throw new Error('Error in getBookByName resolver');
          }
      },
    },
    
      getAllBooks: {
        type: new GraphQLList(BookType),
        resolve: async (parent, args) => { 
          try {
            const books = await Book.find({}).lean(); //lean ile plain text olarak veri çekiyoruz, böylece mongonun gereksiz ekstra özellikleri gelmiyor.
            return books; 
          } catch (err) {
            console.error(err);
          }
        },
      },
      getBookByPublisher: {
        type: new GraphQLList(BookType),
        args: { publisher: { type: GraphQLString } },
        resolve: async (parent, args) => {
          try {
            return await Book.find({ publisher: args.publisher }).lean();
          } catch (error) {
            console.error(error);
            return [];
          }
        },
      },
      getBookByGenre: {
        type: new GraphQLList(BookType),
        args: { genre: { type: GraphQLString } },
        resolve: async (parent, args) => {
          return await Book.find({ genre: args.genre }).lean();
        },
      },
      getBookByPublisher: {
        type: new GraphQLList(BookType),
        args: { publisher: { type: GraphQLString } },
        resolve: async (parent, args) => {
          return await Book.find({ publisher: args.publisher }).lean();
        },
      },
      getAllUsers: {
        type: new GraphQLList(UserType),
        resolve: async (parent, args) => { 
          try {
            const users = await User.find({}).lean(); //lean ile plain text olarak veri çekiyoruz, böylece mongonun gereksiz ekstra özellikleri gelmiyor.
            return users;
          } catch (err) {
            console.error(err);
          }
        },
      },
      getUser: {
        type: UserType,
        args: {
           Password: { type: GraphQLString },
            Email: { type: GraphQLString },
      },
        resolve: async (parent, args) => {
            try{
            const user = await User.findOne({ Password: args.Password, Email: args.Email }).lean();
            if (user) {
              return user;
            }
      
            throw new Error('User not found');
          } catch (error) {
            console.error('Error in getUser resolver:', error);
            throw new Error('Error in getUser resolver');
          }
        }
      },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    AddBook: {
      type: BookType,
      args: {
        bookName: { type: GraphQLString },
        pages: { type: GraphQLString },
        img_url: { type: GraphQLString },
        genre: { type: GraphQLString },
        publisher: { type: GraphQLString },
        authorname: { type:GraphQLString },
      },
      resolve: async (parent, args) => { 
        try {
           const book = await Book.create({
            id: randomId(),
            bookName: args.bookName,
            pages: args.pages, 
            img_url: args.img_url,
            genre: args.genre,
            publisher: args.publisher,
            authorname: args.authorname,
           }); 
           return book; 
        } catch (err) {
           console.error(err); 
        }
       },
    },

    DeleteBook: {
      type: BookType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve (parent, args) {
        
        return Book.findOneAndDelete({id: args.id});
      }
    },
    
    createAuthor: {
      type: AuthorType,
      args: {
        AuthorName: { type: GraphQLString },
      },
      resolve: async (parent, args) => { 
        try {
           const author = await Author.create({
             id: Book.length + 1,
             AuthorName: args.AuthorName,
           }); 
           return author; 
        } catch (err) {
           console.error(err); 
        }
       },
    },

      AddUser: {
      type: UserType,
      args: {
        UserName: { type: GraphQLString },
        Password: { type: GraphQLString },
        Email: { type: GraphQLString },
        UserList: { type: GraphQLList(GraphQLString)},
      },
      resolve: async (parent, args) => { 
        try {
           const user = await User.create({
            id: randomId(),
            UserName: args.UserName,
            Password: args.Password, 
            Email: args.Email,
            UserList: args.UserList,
           }); 
           return user; 
        } catch (err) {
           console.error(err); 
        }
       },
    },

    DeleteBookList:{
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        bookname: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        try {
          const user = await User.findOne({id: args.id});
          if (!user) {
            console.error('User not found:', args.id);
            throw new Error('User not found');
          }
          user.UserList = user.UserList.filter(book => book !== args.bookname);
          await user.save();
          console.log('Book deleted successfully');
          return user;
        } catch (err) {
          console.error('Error deleting book:', err);
          throw err;
        }
      }
  },

  AddBookList:{
    type: UserType,
    args: {
      id: { type: GraphQLInt },
      bookname: { type: GraphQLString }
    },
    resolve: async (parent, args) => {
      try{
        const user = await User.findOne({id: args.id});
        const book = args.bookname.toUpperCase();
        if(!user || !book){
          throw new Error("user not found");
        }
        user.UserList.push(book);
        await user.save();
        return user;
      } catch(err){
        console.log(err);
      }
      
  }
},

    DeleteUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve (parent, args) {
        
        return User.findOneAndDelete({id: args.id});
      }
    },

  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });