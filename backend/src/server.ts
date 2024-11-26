import express from "express";

const app = express();
const port = 3000;

app.get("/sinem", (req, res) => {
  res.send("This is NodeJS Typescript Application!");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
