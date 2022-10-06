const { parse } = require("node-html-parser");
// const fetch = require("node-fetch");
const axios = require("axios");
const fs = require("fs");

// We have imported this to allow for importing of a json file
const { createRequire } = require("module");
// const require = createRequire(import.meta.url);

const admin = require("firebase-admin");
const { isDataView } = require("util/types");
const serviceAccountKey = require("/Users/margaretmwaura/Downloads/web-scrapper-364504-firebase-adminsdk-ajo9y-3cac0a8d1e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  storageBucket: "web-scrapper-364504.appspot.com",
});

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
}

// Store the signed url in the database
async function generateSignedUrl(filename) {
  const options = {
    version: "v2",
    action: "read",
    expires: Date.now() + 1000 * 60 * 60,
  };

  const [url] = await bucket.file(filename).getSignedUrl(options);
  return url;
}

// async function downloadFile(srcFilename) {
//   const options = {
//     // The path to which the file should be downloaded, e.g. "./file.txt"
//     destination: `./audio/${srcFilename}`,
//   };

//   // Downloads the file
//   await bucket.file(srcFilename).download(options);
// }

let root = [];
let signedUrls = [];
signedUrls.length = 52;

const url = "https://www.rocketlanguages.com/french/lessons/french-alphabet";
axios
  .get(`${url}`)
  .then((res) => res.data)
  .then((body) => (root = parse(body)))
  .then(async () => {
    await extractData(root);
  });
console.log("items all: ", signedUrls);

async function getAudio(root) {
  let i = 0;
  const audios = root.querySelectorAll("audio");

  const promises = audios.map(async (audio_element) => {
    const audio = audio_element.getAttribute("src");
    const { data } = await axios.get(audio, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "audio/wav",
      },
    });
    const outputFilename = `./${audio.split("/")[6]}`;
    fs.writeFileSync(outputFilename, data);
    // No space within names
    await uploadFile(outputFilename, audio.split("/")[6]);
    let url = await generateSignedUrl(audio.split("/")[6]);
    console.log(url);
    console.log(i);
    signedUrls[i] = url;
    i++;
  });
  await Promise.all(promises);

  console.log("we here");
}

async function extractData(root) {
  await getAudio(root);
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

  // console.log(signedUrls);

  // FIXME: No need for this really
  // await downloadFile(audio.split("/")[6]);

  // console.log(data);
  // console.log(audio.split("/")[6]);
}

module.exports = { extractData };
