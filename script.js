const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=";
const urlW = "https://bulbapedia.bulbagarden.net/wiki/";
let url1 = url;

async function getData() {
  const data = await fetch(url1);
  const response = await data.json();
  return response;
}
async function getImg(link) {
  const data = await fetch(link);
  const response = await data.json();
  return response;
}

function init() {
  text();
}
function text() {
  const body = document.querySelector(".text");
  getData().then((res) =>
    res.results.forEach((element) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const a = document.createElement("a");
      a.setAttribute("href", `${urlW}${element.name}`);
      a.setAttribute("target", "_blank");
      a.innerText = `${element.name}`;
      getImg(element.url).then((png) =>
        img.setAttribute("src", png.sprites.front_default.toString())
      );
      body.appendChild(article);
      article.appendChild(img);
      article.appendChild(a);
    })
  );
}
function clear() {
  const body = document.querySelectorAll("article");
  for (let i = 0; i < body.length; i++) {
    body[i].remove();
  }
}

init();
let offset = 0;

const btn = document.querySelectorAll(".btn");

btn.forEach(function (btn) {
  btn.addEventListener("click", function (a) {
    const styles = a.currentTarget.classList;
    if (styles.contains("prev")) {
      if (offset <= 0) {
        document.getElementById("prev").disabled = true;
      } else {
        offset -= 20;
        document.getElementById("next").disabled = false;
      }
    } else {
      if (offset >= 1279) {
        document.getElementById("next").disabled = true;
      } else {
        offset += 20;
        document.getElementById("prev").disabled = false;
      }
    }
    url1 = url + offset.toString();
    clear();
    text();
  });
});
