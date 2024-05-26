Emcey-Book-List
Emcey-Book-List is an online library application built using Vite.js, React, and MongoDB. Users can create their own accounts, manage their book lists, and explore a collection of books. Additionally, there is an admin panel that allows administrators to manage users, books, and perform administrative tasks.

Features
User Authentication: Users can sign up, log in, and manage their own book lists.
Book Management: Users can add, edit, and delete books from their lists.
Admin Panel: Administrators have access to an admin panel for managing users and books.
GraphQL API: The backend uses GraphQL for querying and manipulating data.
Installation
Clone the repository:
git clone https://github.com/Emceyy/Emcey-Book-List.git

Install dependencies for both the client and server:
# Client (Vite.js + React)
cd client
npm install

# Server (Express.js + MongoDB)
cd ../server
npm install

Set up your MongoDB connection:
Create a .env file in the server directory and add your MongoDB connection string:
MONGODB_URI=<your-mongodb-connection-string>

Start the development server:
# Client
cd client
npm run dev

# Server
cd ../server
node index

Contributing
Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.

License
This project is licensed under the ISC License.

Feel free to replace the placeholders with actual information relevant to your project. If you have any specific sections you’d like to add or need further assistance, let me know! 🚀

<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
  <img src="https://github.com/Emceyy/Emcey-Book-List/blob/master/client/pictures/emceybook.png?raw=true" alt="Emcey Book" width="400">
  <img src="https://github.com/Emceyy/Emcey-Book-List/blob/master/client/pictures/mainpagebooks.png?raw=true" alt="Books" width="400">
  <img src="https://github.com/Emceyy/Emcey-Book-List/blob/master/client/pictures/adminusers.png?raw=true" alt="Users" width="400">
  <img src="https://github.com/Emceyy/Emcey-Book-List/blob/master/client/pictures/adminpanel.png?raw=true" alt="New Book" width="400">
</div>
