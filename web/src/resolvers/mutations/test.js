const path = require("path");
require("dotenv").config({ path: require("find-config")(".env") });

let sid = process.env.SID;
let auth_token = process.env.AUTH_TOKEN;
console.log("The twilio access details");
console.log(sid);
console.log(auth_token);
