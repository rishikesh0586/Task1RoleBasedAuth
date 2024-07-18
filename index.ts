import express  from "express";
import {main} from "./src/util/db.js"
import {registerUser, loginUser, logout,getAllUser} from "./src/Controllers/userController.js";
import { verifyAdmin } from "./src/middleware/auth.js";
import bodyParser from "body-parser";
import cookieParsers from "cookie-parser";
import  cors from 'cors';
import { asignRole, createRole, getAllRole } from "./src/Controllers/roleController.js";
const app = express();

const port = 8888;

app.use(express.json());
app.use(cookieParsers());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.route("/register").post(registerUser);
app.route("/login").post(loginUser);
app.route("/logout").get(logout);
app.route("/users").get(getAllUser);

app.route("/create-role").post(createRole);
app.route("/getRole").get(getAllRole);

app.route('/:userId/:roleId').put(asignRole);

main();
app.listen(port, function(){
    console.log("server listening on port " + port);
});
