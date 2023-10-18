import express, { Request, Response } from "express";
import router from "./api/api.route";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router)


app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});