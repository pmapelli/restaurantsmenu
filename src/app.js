const express = require("express"); // importando framework
const cors = require("cors"); // ./referencia na mesma pasta
const routes = require("./routes"); // ./referencia na mesma pasta
const { errors } = require("celebrate");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

//se for para produção alterar
// app.use(cors({
//     origin: 'http://meuapp.com'
// }));

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
