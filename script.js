import key from "./credential.js"; /* Create your credentials.js file based on credentials.js.dist and set credentials */

const map = L.map("map").setView([48.8583702, 2.2849537], 10);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);
let marker = L.marker([48.8559324, 2.2932441]).addTo(map);

const myIcon = L.icon({
  iconUrl: "my-icon.png",
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: "my-icon-shadow.png",
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
});

const input = document.querySelector("#search");
const btn = document.querySelector("button");
let inputValue = "";

btn.addEventListener("click", () => {
  marker.remove();
  inputValue = input.value;
  if (inputValue == "") {
  } else {
    fetchdata();
  }
});

async function fetchdata() {
  const url = "http://api.ipstack.com/" + inputValue + "?access_key=" + key;
  const fetcher = await fetch(url);
  const resp = await fetcher.json();
  const ip = document.querySelector("#ip-adress");
  const location = document.querySelector("#location");
  const cp = document.querySelector("#zip");
  const continent = document.querySelector("#continent");
  ip.innerHTML = resp.ip;
  location.innerHTML = resp.city + " ";
  cp.innerHTML = resp.zip;
  continent.innerHTML = resp.continent_name;

  map.setView([resp.latitude, resp.longitude], 10);
  marker = L.marker([resp.latitude, resp.longitude])
    .addTo(map)
    .bindPopup("Welcome in " + resp.city + " !");
}
