var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var bookShelf = [
    {
        title: 'Harry Potter',
        date: '10/12/2020'
    },
    {
        title: 'Cavaleiros do Zodiaco: O livro',
        date: '10/12/2020'
    },
    {
        title: 'Titulo criativo 1',
        date: '10/12/2020'
    },
    {
        title: 'Titulo criativo 2',
        date: '10/12/2020'
    },
    {
        title: 'Titulo criativo 3',
        date: '10/12/2020'
    }
];
var typeDefs = gql(__makeTemplateObject(["\n    type Book {\n        title: String,\n        date: String\n    }\n\n    type Query {\n        books: [Book]\n    }\n"], ["\n    type Book {\n        title: String,\n        date: String\n    }\n\n    type Query {\n        books: [Book]\n    }\n"]));
var resolvers = {
    Query: {
        books: function () { return bookShelf; }
    }
};
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen().then(function (_a) {
    var url = _a.url;
    return console.log("\uD83D\uDE80 To the moon! \uD83D\uDE80 \nServer started at: " + url);
});
