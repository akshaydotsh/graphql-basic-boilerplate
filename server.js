var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema }  = require('graphql');

var app = express();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
        book(id: Int!): Book
        books: [Book!]!
    }

    type Book {
        id: Int!
        name: String
        author: String
        published: String
        genre: String
        rating: String
    }
`);

// Getting data locally instead of DB
var bookArray = [
    {
        id: 1,
        name: 'Anna Karenina',
        author: 'Leo Tolstoy',
        published: '1877',
        genre: 'Literary realism',
        rating: '4/5'
    },
    {
        id: 2,
        name: 'Madame Bovary',
        author: 'Gustave Flaubert',
        published: '1856',
        genre: 'Literary realism',
        rating: '3.6/5'
    },
    {
        id: 3,
        name: 'War and Peace',
        author: 'Leo Tolstoy',
        published: '1867',
        genre: 'Historical Fiction',
        rating: '4.1/5'
    },
    {
        id: 4,
        name: 'Hamlet',
        author: 'William Shakespeare',
        published: '1609',
        genre: 'Tragedy',
        rating: '4.1/5'
    },
    {
        id: 5,
        name: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        published: '1925',
        genre: 'Historical Fiction',
        rating: '3.9/5'
    },
];


// The root provides a resolver function for each API endpoint
var root = {
    // Get Book By ID
    book: ({id}) => {
        return bookArray.filter((book) => {
            return book.id === id;
        })[0];
    },

    // Get all books
    books: () => {
        return bookArray;
    }
}


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

// Start Server
app.listen(4000, () => {
    console.log('Server started on localhost:4000/graphql');
});