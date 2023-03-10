const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const cors = require('cors')
const app = express();

app.use(cors({
  origin: '*'
}))
const PORT = process.env.PORT || 4000;

app.get("/cedula=:cedula", (req, res) => {
  scrapeLogic(res,req.params.cedula);
});

app.get("/", (req, res) => {
    res.send('Servidor para obtener datos del TSE por cedula')
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
