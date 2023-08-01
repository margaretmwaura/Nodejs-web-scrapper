const { parse } = require("node-html-parser");
const fetch = require("node-fetch");
const axios = require("axios");
const fs = require("fs");
const { Vowel } = require("../../models");
const firebaseAdmin = require("./../../src/firebase_admin");

// We have imported this to allow for importing of a json file
const { createRequire } = require("module");
const { compileFunction } = require("vm");
// const require = createRequire(import.meta.url);

let signedUrls = [];
signedUrls.length = 26;

let allLetters = [];
allLetters.length = 26;

let allDescriptions = [];
allDescriptions.length = 26;

let bucket = firebaseAdmin.storage().bucket();

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

async function getAllData() {
  const url = "https://www.rocketlanguages.com/french/lessons/french-alphabet";
  await fetch(`${url}`)
    .then((res) => res.text())
    .then((body) => (root = parse(body)))
    .then(async () => {
      await extractData(root);
    });
  // console.log("items all: ");
}

async function getAudio(root) {
  let i = 0;
  const audios = root.querySelectorAll("audio").slice(0, 26);

  const dir = "./audio";

  // check if directory exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, true);
    console.log("created file nyadhiwa");
  } else {
    console.log("file already existed nyadhiwa");
  }

  // const promises = audios.map(async (audio_element) => {
  for (audio_element of audios) {
    // console.log(audio_element);
    const audio = audio_element.getAttribute("src");
    const { data } = await axios.get(audio, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "audio/wav",
      },
    });
    const outputFilename = `${dir}/${audio.split("/")[6]}`;
    fs.writeFileSync(outputFilename, data);
    // No space within names
    await uploadFile(outputFilename, audio.split("/")[6]);
    let url = await generateSignedUrl(audio.split("/")[6]);
    signedUrls[i] = url;
    i++;
  }

  // The promises can only be used if we are using a map
  // await Promise.all(promises);
  fs.rmdirSync(dir, { recursive: true });
}

async function getAllLetters(root) {
  let i = 0;
  const letters = root.querySelectorAll(".output").slice(0, 26);

  // console.log(letters.length);

  const promises = letters.map(async (letter) => {
    const element = letter
      .querySelectorAll("div")[0]
      .querySelectorAll("p")[0].text;
    allLetters[i] = element;
    i++;
  });
  await Promise.all(promises);
}

async function getAllDescription(root) {
  let i = 0;
  const descriptions = root.querySelectorAll(".ws-english").slice(0, 26);

  const promises = descriptions.map(async (description) => {
    const element = description
      .querySelectorAll("div")[0]
      .querySelectorAll("p")[0].text;
    allDescriptions[i] = element;
    i++;
  });
  await Promise.all(promises);
}

async function extractData(root) {
  await getAudio(root);
  await getAllLetters(root);
  await getAllDescription(root);

  // if (checkIfDataHasBeenScrappedSuccessfully()) {
  //   await truncateTheDB();
  // } else {
  //   return;
  // }

  let i = 0;
  for (i = 0; i < allDescriptions.length; i++) {
    let letter = allLetters[i];
    let description = allDescriptions[i];
    let url = signedUrls[i];

    console.log(letter);
    console.log(description);
    console.log(url);
    try {
      Vowel.create({
        name: letter,
        description: description,
        filename: url,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

// FIXME: We should be calling the mutation here

async function truncateTheDB() {
  await Vowel.destroy({
    where: {},
    truncate: true,
  })
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
}

async function checkIfDataHasBeenScrappedSuccessfully() {
  if (
    allDescriptions.length > 0 &&
    allLetters.length > 0 &&
    signedUrls.length > 0
  ) {
    return true;
  } else {
    return false;
  }
}

getAllData();

module.exports = { getAllData };
