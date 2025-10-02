const API_KEY = "DEMO_KEY"; 
const API_URL = "https://api.nasa.gov/planetary/apod";

const content = document.getElementById("content");
const loader = document.getElementById("loader");
const searchBtn = document.getElementById("searchBtn");
const dateInput = document.getElementById("dateInput");
const darkModeToggle = document.getElementById("darkModeToggle");

async function fetchAPOD(date = "") {
  loader.style.display = "block";
  content.innerHTML = "";
  
  let url = `${API_URL}?api_key=${API_KEY}`;
  if(date) url += `&date=${date}`;
  
  try {
    const response = await fetch(url);
    if(!response.ok) throw new Error("API request failed");

    const data = await response.json();
    loader.style.display = "none";

    displayCard(data);

  } catch (error) {
    loader.style.display = "none";
    content.innerHTML = `<p style="color:red;">Error fetching data: ${error.message}</p>`;
  }
}
function displayCard(data) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${data.url}" alt="${data.title}">
    <div class="card-body">
      <h3>${data.title}</h3>
      <p>${data.explanation}</p>
      <p><strong>Date:</strong> ${data.date}</p>
    </div>
  `;

  content.appendChild(card);
}

searchBtn.addEventListener("click", () => {
  const date = dateInput.value;
  if(date) fetchAPOD(date);
});

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

fetchAPOD();
