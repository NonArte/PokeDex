const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=";
const urlW = "https://bulbapedia.bulbagarden.net/wiki/";
let url1 = url;
async function getData() {
  const data = await fetch(url1);
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
      const p = document.createElement("a");
      p.setAttribute("href", `${urlW}${element.name}`);
      p.setAttribute("target", "_blank");
      p.innerText = `${element.name}`;
      body.appendChild(p);
    })
  );
}
function clear() {
  const p = document.querySelectorAll("a");
  for (let i = 0; i < p.length; i++) {
    p[i].remove();
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
        offset = 0;
      } else {
        offset -= 20;
      }
    } else {
      if (offset >= 1260) {
        offset = 1279;
      } else {
        offset += 20;
      }
    }
    url1 = url + offset.toString();
    clear();
    text();
  });
});
