const graphql = require("graphql");
const {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList} = graphql;
const UserType = require("./TypeDefs/UserType");
const userData = require("../MOCK_DATA.json");

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // name of the query
        getAllUsers: {
            type: new GraphQLList(UserType),
            args:{id: {type: GraphQLInt}},
            resolve(parent, args){
                console.log(userData)
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

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});