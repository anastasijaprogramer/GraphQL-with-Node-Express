const express = require("express");
const app = express();
const PORT = 8001;
const {graphqlHTTP} = require("express-graphql");
const schema = require("./Schemas/index.js");



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


// query {
//     getAllUsers {
//       id,
//       first_name,
//       last_name,
//       email
//     }
//   }

// mutation{
//     createUser(first_name:"Anastasija", last_name: "Radulovic", email: "ancideveloper4@gmail.com"){
//       first_name,
//       last_name,
//       email
//     }
//   }
  