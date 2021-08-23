const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')

const Users = require('./simplerUser.json')

function getUserInContext(args){
    let user = Users.find(user => user.id == args.id)
    return {
        id: Users.indexOf(user),
        user: user
    }
}

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        senha: String!
        lastUpdate: String
    }

    type Query {
        users: [User!]!
        getUserByCredentials(email : String!, senha: String!): [User!]!
    }

    type Mutation{
        createUser(name: String!, email : String!, senha: String!) : User!
        deleteUser(id: String!) : [User!]!
        updateUser(id: String!, name: String!, email : String!, senha: String!) : [User]!
    }

`

const resolvers = {
    Query: {
        users: () => Users,
        getUserByCredentials: (_, args) => {
            return Users.filter((data) => data.email == args.email && data.senha == args.senha)
        }
    },
    Mutation:{
        createUser: (_, args) => {
            let newUser = {
                id: Math.floor(Math.random() * 10000000),
                name: args.name,
                email: args.email,
                senha: args.senha
            }
            Users.push(newUser)
            return newUser
        },
        deleteUser: (_, args)=> {
            let userInContext = getUserInContext(args)
            if(!userInContext.user) return []

            Users.splice(userInContext.id, 1)
            return Users
        },
        updateUser: (_, args)=>{
            let userInContext = getUserInContext(args)
            
            if(!userInContext.user) return []

            let newUser ={
                id: userInContext.user.id,
                name: args.name,
                email: args.email,
                senha: args.senha,
                lastUpdate: new Date(Date.now()).toISOString()
            }

            Users.splice(userInContext.id, 1)
            Users.push(newUser)
            return [newUser]
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`\t   🚀 To the moon! 🚀 \nServer started at: ${url}`))