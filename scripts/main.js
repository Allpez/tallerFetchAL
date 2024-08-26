
let description = document.getElementById("description");
let cardContainer = document.getElementById("cardContainer");
let checkboxContainer = document.getElementById("checkboxContainer");
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");

let url = `https://api-colombia.com/`
let urlDescription = `${url}/api/v1/Country/Colombia`
let urlDepartaments = `${url}/api/v1/Department`
let urlRegions = `${url}/api/v1/Region`

let departments = [];
let regions = [];

function cutText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
}

function removeDiacritics(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

fetch(urlDescription)
    .then(response => response.json())
    .then(res => {
        description.innerHTML = `<p>${res.description}</p>`
    })
    .catch(error => console.error("Error al obtener los datos:",
        error));

fetch(urlDepartaments)
    .then(response => response.json())
    .then(data => {
        departments = data;
        createCards(departments);
    })
    .catch(error => console.error("Error al obtener los datos:",
        error));

fetch(urlRegions)
    .then(response => response.json())
    .then(data => {
        regions = data;
        createCheckboxes();
    })
    .catch(error => console.error("Error al obtener los datos:",
        error));

function createCards(departments) {
    cardContainer.innerHTML = '';

    let header = document.createElement('h2');
    header.className = 'text-center';
    header.textContent = 'Departamentos';
    cardContainer.appendChild(header);

    departments.forEach(department => {
        let card = document.createElement("div");
        card.className = "card col-12 col-sm-6 col-md-4 col-lg-3 border border-success";

        let cutDescription = cutText(department.description, 100)

        card.innerHTML = `
            <img class="card-img rounded-top" src="../imgs/img-card.jpg">
            <div class="card-body p-1 mt-2  d-flex flex-column justify-content-between">
                <h5 class="card-name text-center">${department.name}</h5>
                <p class="card-text"><span class="fw-bold">Descripción:</span> ${cutDescription}</p>
                <p class="card-text"><span class="fw-bold">Población:</span> ${department.population} hab</p>
                <p class="card-text"><span class="fw-bold">Superficie:</span> ${department.surface} Km<sup>2</sup></p>
                <div class="d-flex justify-content-center mb-2">
                    <a href="./pages/details.html?id=${department.id}" class="btn button_card border border-success">Details</a>
                </div>
            </div>`;

        cardContainer.appendChild(card);
    });
}

function createCheckboxes() {
    checkboxContainer.innerHTML = '';

    let header = document.createElement('h4');
    header.className = 'text-center m-3';
    header.textContent = 'Busca el departamento por Región';
    checkboxContainer.appendChild(header);

    regions.forEach(region => {
        const checkbox = document.createElement('div');
        checkbox.className = 'form-check col-sm-2 text-center';
        checkbox.innerHTML = `
            <input class="form-check-input border border-success" type="checkbox" value="${region.id}" id="${region.id}">
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
    const searchNormalized = removeDiacritics(searchText);

    cardContainer.innerHTML = '';

    const filteredCards = departments.filter(department => {
        const departmentNameNormalized = removeDiacritics(department.name.toLowerCase());
        const departmentDescriptionNormalized = removeDiacritics(department.description.toLowerCase());
        const departmentPopulation = department.population.toString().toLowerCase();
        const departmentSurface = department.surface.toString().toLowerCase();

        const isRegionMatch = selectedRegionIds.length === 0 || selectedRegionIds.includes(department.regionId.toString());
        const isSearchMatch = departmentNameNormalized.includes(searchNormalized) ||
            departmentDescriptionNormalized.includes(searchNormalized) ||
            departmentPopulation.includes(searchNormalized) ||
            departmentSurface.includes(searchNormalized);
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



