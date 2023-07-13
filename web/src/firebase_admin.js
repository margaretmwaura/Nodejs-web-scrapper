const admin = require("firebase-admin");

const serviceAccount = require("./../config/fbServiceAccountKey.json");

let firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  // FIXME: This should be moved to a config or .env
  databaseURL: "https://web-scrapper-364504-default-rtdb.firebaseio.com",
  storageBucket: "web-scrapper-364504.appspot.com",
});

module.exports = firebaseAdmin;
