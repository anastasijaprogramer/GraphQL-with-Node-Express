const express = require("express");
const app = express();
const PORT = 8000;
const userData = require("./MOCK_DATA.json");
const graphql = require("graphql");
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql;
const {graphqlHTTP} = require("express-graphql");

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLInt},
        first_name: {type: GraphQLString},
        last_name : {type: GraphQLString},
        email: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            args:{id: {type: GraphQLInt}},
            resolve(parent, args){
                return userData
            }
        },
    },
});

// update or delete users
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
             //args are neccessary if we want to create a new user
            args: {
                first_name: {type: GraphQLString},
                last_name : {type: GraphQLString},
                email: {type: GraphQLString}
            },
            resolve(parent, args){
                userData.push({
                    id: userData.length + 1,
                    first_name:args.first_name, 
                    last_name: args.last_name,
                    email: args.email
                });
                return args
            }
        }
    }
});

// schema requires two params, queries and mutations for the api call
const schema = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});

app.use("/graphql", graphqlHTTP({
    schema, 
    graphiql: true,
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
