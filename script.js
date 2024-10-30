let currentPage = 1;
const profilesPerPage = 8; // Nombre de profils par page
let profiles = [];

async function loadProfiles() {
  try {
    const response = await fetch("./data/profiles.json");
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: Impossible de charger les profils.`);
    }
    profiles = await response.json();
    displayProfiles();
    setupPagination();
  } catch (error) {
    displayError(error.message || "Erreur lors du chargement des profils. Veuillez réessayer plus tard.");
  }
}

function displayError(message) {
  const errorMessageContainer = document.getElementById("error-message");
  errorMessageContainer.style.color = '#ff0000';
  errorMessageContainer.textContent = message;
}

function displayProfiles() {
  const container = document.getElementById("profiles-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * profilesPerPage;
  const end = start + profilesPerPage;
  const profilesToShow = profiles.slice(start, end);

  profilesToShow.forEach((profile) => {
    const card = document.createElement("div");
    card.classList.add("profile-card");

    card.innerHTML = `
      <img src="${profile.image}" alt="${profile.name}">
      <h3>${profile.name}</h3>
      <p>${profile.bio}</p>
      <div class="skills"><strong>Skills:</strong> ${profile.skills.join(", ")}</div>
      <a href="${profile.github}" target="_blank">GitHub Profile <i class="fa-brands fa-github"></i></a>
    `;
    container.appendChild(card);
  });

  // Met à jour les boutons de pagination
  updatePaginationButtons();
}

function setupPagination() {
  const paginationContainer = document.getElementById("pagination-container");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(profiles.length / profilesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.classList.add("pagination-button");

    // Ajout de la classe active à la page actuelle
    if (i === currentPage) {
      button.classList.add("active");
    }

    button.onclick = () => {
      currentPage = i;
      displayProfiles();
      updatePaginationButtons();
    };

    paginationContainer.appendChild(button);
  }
}

function updatePaginationButtons() {
  const buttons = document.querySelectorAll(".pagination-button");
  buttons.forEach((button, index) => {
    button.classList.toggle("active", index + 1 === currentPage);
  });
}

loadProfiles();
