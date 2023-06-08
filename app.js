const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cookie = require("cookie-parser");
const session = require("express-session");
var LokiStore = require("connect-loki")(session);
var options = {}; // See available options below

app.use(cookie());
app.use(
  session({
    //secret:"D8L56czf9-_-Ctwh8wmCahqD_TDa5g52Qqw5RrSD-TyCBcOgJ6NiJ2KS_aU1yp7106IuYnanCryTfHC5AUuwBhF_4bGe7TStV9r3CBRvgro8nBDeQ9EPh62HKqn5hcezysxyF9sAa8lQd1T3-nKwYEslWDhlhYfmGWg7RLHXD4y9VLJY0fVlwKEdSAAf4ZiK6NdHR5Z-iriL5mqPA6oJ1l5_jRr7_g9PrMJORJnayV9O6MsJQJwjDfjin7Aokg2",
    //   resave: false,
    //   saveUninitialized: true,
    //   //cookie: { secure: true, maxAge: 1000 * 60 * 15 },
    // })
    store: new LokiStore(options),
    secret: "dumb cat",
    cookie: {
      secure: false,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: "none",
      //httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, "./build")));
app.use(express.static("public"));
//app.use(require("./src/server/authentication"), { prefix: "/authentication" });
app.use(bodyParser.json());
app.use(require("./src/server/routes"));
app.use(require("./src/server/api"));
app.listen(8080, "0.0.0.0", (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server running on post: ", 8080);
});
