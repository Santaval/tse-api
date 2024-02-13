const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const cors = require('cors')
const app = express();
const morgan = require('morgan')

app.use(cors({
  origin: '*'
}))

app.use(morgan('dev'))

const PORT = process.env.PORT || 7504;

/* ---------- V1 ---------- */
app.use(require("./routes/v1/home"));
app.use(require("./routes/v1/cedula"));

/* ---------- V2 ---------- */


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
