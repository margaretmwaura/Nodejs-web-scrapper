import { parse } from "node-html-parser";
import fetch from "node-fetch";
import fs from "fs";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method

import admin from "firebase-admin";
const serviceAccountKey = require("/Users/margaretmwaura/Downloads/web-scrapper-364504-firebase-adminsdk-ajo9y-3cac0a8d1e.json");

// from "/Users/margaretmwaura/Downloads/web-scrapper-364504-firebase-adminsdk-ajo9y-3cac0a8d1e.json";

//initialize the app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  storageBucket: "web-scrapper-364504.appspot.com", //you can find in storage.
});

//get your bucket
var bucket = admin.storage().bucket();

//function to upload file
async function uploadFile(filepath, filename) {
  await bucket.upload(filepath, {
    gzip: true,
    destination: filename,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  console.log(`${filename} uploaded to bucket.`);
}

let root = [];

const url = "https://www.rocketlanguages.com/french/lessons/french-alphabet";
fetch(`${url}`)
  .then((res) => res.text())
  .then((body) => (root = parse(body)))
  .then(() => extractData(root));

function extractData(root) {
  const description = root
    .querySelectorAll(".ws-french")[0]
    .querySelectorAll("div")[0]
    .querySelectorAll("p")[0].text;
  console.log(description);
  const description2 = root
    .querySelectorAll(".ws-english")[0]
    .querySelectorAll("div")[0]
    .querySelectorAll("p")[0].text;
  console.log(description2);

  const audio = root.querySelectorAll("audio")[0].getAttribute("src");
  let filepath =
    "/Users/margaretmwaura/Downloads/web-scrapper-364504-firebase-adminsdk-ajo9y-3cac0a8d1e.json";
  let filename = "test_file"; //can be anything, it will be the name with which it will be uploded to the firebase storage.

  uploadFile(filepath, filename);
  console.log(audio);
}
