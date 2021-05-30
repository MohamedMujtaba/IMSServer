const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const data = require("./allData/semesterOne");
const allowedOrigins = ["http://localhost:3000", "http://localhost:8000"];

app.use("/stats", express.static("./stats/"));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./temp/index.html"));
});
app.get("/api/v1/courses", (req, res) => {
  const course = data.map((cor) => {
    const { id, name, image } = cor;
    return { id, name, image };
  });
  res.json(course);
});
app.get("/api/v1/courses/:ID", (req, res) => {
  const { ID } = req.params;
  const lect = data.find((lec) => lec.id === Number(ID));
  res.json(lect);
});

app.listen(process.env.PORT || 8000, () => {
  console.log("server is running in port 8000");
});
