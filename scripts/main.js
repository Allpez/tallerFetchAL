let description = document.getElementById("description");
let cardContainer = document.getElementById("cardContainer");
let checkboxContainer = document.getElementById("checkboxContainer");
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");

let url = "https://api-colombia.com/"
let urlDescription = url + "/api/v1/Country/Colombia"
let urlDepartaments = url + "/api/v1/Department"
let urlRegions = url + "/api/v1/Region"

let departments = [];
let regions = [];

function cutText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
}

fetch(urlDescription)
    .then(response => response.json())
    .then(res => {
        description.innerHTML = `<p>${res.description}</p>`
    })
    .catch(error => console.error("Error al obtener los datos:", error)
    );

fetch(urlDepartaments)
    .then(response => response.json())
    .then(data => {
        departments = data;
        createCards(departments);
    })
    .catch(error => console.error("Error al obtener los datos:", error)
    );

fetch(urlRegions)
    .then(response => response.json())
    .then(data => {
        regions = data;
        createCheckboxes();
    })
    .catch(error => console.error("Error al obtener los datos:", error)
    );

function createCards(departments) {
    cardContainer.innerHTML = '';

    departments.forEach(department => {
        let card = document.createElement("div");
        card.className = "card";

        let cutDescription = cutText(department.description, 100)

        card.innerHTML = `
            <img class="card-img w-25" src="../imgs/img-card.jpg">
            <div class="card-body p-1 mt-2">
                <h5 class="card-name">${department.name}</h5>
                <p class="card-text"><span class="fw-bold">Descripción:</span> ${cutDescription}</p>
                <p class="card-text"><span class="fw-bold">Población:</span> ${department.population}</p>
                <p class="card-text"><span class="fw-bold">Superficie:</span> ${department.surface}</p>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <a href="./pages/details.html?id=${department.id}" class="btn button_card">Details</a>
                </div>
            </div>`;

        cardContainer.appendChild(card);
    });
}

function createCheckboxes() {
    checkboxContainer.innerHTML = `<h4>Busca el departamento por Región</h4>`;
    
    regions.forEach(region => {
        const checkbox = document.createElement('div');
        checkbox.className = 'form-check';
        checkbox.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${region.id}" id="${region.id}">
            <label class="form-check-label" for="${region.id}"><span class="p_check">${region.name}</span></label>
        `;
        checkboxContainer.appendChild(checkbox);
    });

    checkboxContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterEvents);
    });
}

function filterEvents() {
    const selectedRegionIds = Array.from(checkboxContainer.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    const searchText = searchInput.value.toLowerCase();

    cardContainer.innerHTML = '';

    const filteredCards = departments.filter(department => {
        const isRegionMatch = selectedRegionIds.length === 0 || selectedRegionIds.includes(department.regionId.toString());
        const isSearchMatch = department.name.toLowerCase().includes(searchText) || 
                              department.description.toLowerCase().includes(searchText) || 
                              department.population.toString().includes(searchText) || 
                              department.surface.toString().includes(searchText);
        return isRegionMatch && isSearchMatch;
    });

    if (filteredCards.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'no-results-message text-center';
        noResultsMessage.innerHTML = '<H2 class="text-success">No se encontraron resultados.</H2><p class"text-success-emphasis">Por favor intenta con una nueva busqueda.</p>';
        cardContainer.appendChild(noResultsMessage);
    } else {
        createCards(filteredCards);
    }
}

searchButton.addEventListener('click', filterEvents);



