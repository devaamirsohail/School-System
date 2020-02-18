import { config } from "dotenv";
config({ path: __dirname + "/.env" });
import { PORT } from "./config/constants";
import app from "./app";

app.listen(PORT, () => console.log("Express server listening on port " + PORT));
