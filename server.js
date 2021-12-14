import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv  from "dotenv";

dotenv.config();

import router from "./routes/index.js";

const app = express();
const port = process.env.PORT || 5005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if(process.env.NODE_ENV === 'development') {
	app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`));
