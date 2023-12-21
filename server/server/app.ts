import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "../schema/schema";
import { ConnectOptions, connect, connection } from "mongoose";
import conrs from "cors";
require("dotenv").config();

const app = express();
const PORT = 3005;

connect(
  process.env.DATABASE_URL as string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions
);

const dbConnection = connection;
dbConnection.on("error", (err) => console.log(`Connection error: ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));
app.use(conrs());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
