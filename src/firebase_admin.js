const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");
const serviceAccount = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../config/fbServiceAccountKey.json"),
    "utf8"
  )
);
// const serviceAccount = require("../config/fbServiceAccountKey.json");

let firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  // FIXME: This should be moved to a config or .env
  databaseURL: "https://web-scrapper-364504-default-rtdb.firebaseio.com",
  storageBucket: "web-scrapper-364504.appspot.com",
});

module.exports = firebaseAdmin;
