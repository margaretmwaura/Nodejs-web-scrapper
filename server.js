import { parse } from "node-html-parser";
import fetch from "node-fetch";
import fs from "fs";

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
  console.log(audio);
}
