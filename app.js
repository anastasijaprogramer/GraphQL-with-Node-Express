const express = require("express");
const app = express();
const PORT = 8000;
const userData = require("./MOCK_DATA.json");
const graphql = require("graphql");
const {graphqlHTTP} = require("express-graphql");


app.use("/grapql", graphqlHTTP({
    schema, 
    grapiql: true,
}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
