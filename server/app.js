const express = require("express");
const app = express();
const { PORT = 3000 } = process.env;
const cors = require("cors");
const mongoose = require("mongoose");
const mongoDBClusterURL =
  "mongodb+srv://csr15:TtNFDMQb4YmYpDSV@tutorial.innnd.mongodb.net/drawq?retryWrites=true&w=majority";
const versionPrefix = "/api/v1";

//Cors Configuration
app.use(cors({ credentials: true }));
app.use(express.json());

//Routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const leaderboardRouter = require("./routes/leaderboard");

// mongo "mongodb+srv://tutorial.innnd.mongodb.net/myFirstDatabase" --username csr15

//Mongoose configuration to connect to MongoDB Atlas
mongoose
  .connect(mongoDBClusterURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//Initial Request
app.get(`${versionPrefix}`, (req, res) => {
  res.status(200).json("Hello world from server");
});

//Authentication Router
app.use(`${versionPrefix}/auth`, authRouter);

//Userdetails Router
app.use(`${versionPrefix}/user`, userRouter);

//Userdetails Router
app.use(`${versionPrefix}/leaderboard`, leaderboardRouter);

//Server startup
app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
