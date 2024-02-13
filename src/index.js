const express = require("express");
const cors = require('cors')
const app = express();
const morgan = require('morgan')
const patt = require('path')
const errorsHandler = require('./middlewares/errorsHandler')

app.use(cors({
  origin: '*'
}))

app.use(morgan('dev'))

const PORT = process.env.PORT || 7504;

app.use(errorsHandler)

app.use(express.static(patt.join(__dirname, 'docs')));

app.get('/', (req, res) => {
  res.sendFile (patt.join(__dirname, 'docs', 'index.html'))
});
/* ---------- V1 ---------- */
app.use(require("./routes/v1/cedula"));

/* ---------- V2 ---------- */
app.use("/api/v2/cedula", require("./routes/v2/cedula"));


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
