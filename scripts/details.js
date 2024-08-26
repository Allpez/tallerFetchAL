const urlParam = window.location.search;
const urlObjeto = new URLSearchParams(urlParam);
const departmentId = urlObjeto.get('id');

let url = "https://api-colombia.com";
let urlDepartaments = `${url}/api/v1/Department`;
let urlCities = `${url}/api/v1/Department/${departmentId}/cities`;
let urlNaturalAreas = `${url}/api/v1/Department/${departmentId}/naturalareas`;

let citiesContainer = document.getElementById("citiesContainer");
let areasContainer = document.getElementById("areasContainer");
let categories = document.getElementById("categories");
let searchButton = document.getElementById("searchButton");
let searchInput = document.getElementById("searchInput");

let cities = [];
let naturalAreas = [];

fetch(urlCities)
    .then(response => response.json())
    .then(data => {
        cities = data;
        createCityCards(cities);
    })
    .catch(error => console.error("Error al obtener los datos de ciudades:", error));

fetch(urlNaturalAreas)
    .then(response => response.json())
    .then(data => {
        naturalAreas = data[0].naturalAreas;
        console.log(naturalAreas);
        createNaturalAreaCards(naturalAreas);
    })
    .catch(error => console.error("Error al obtener los datos de áreas naturales:", error));

fetch(urlDepartaments)
    .then(response => response.json())
    .then(departments => {
        if (departmentId) {
            const department = departments.find(d => d.id.toString() === departmentId);

            if (department) {
                const cardContainer = document.getElementById("card");
                const cardContent = document.createElement("div");
                cardContent.className = "card2 d-flex";
                cardContent.innerHTML = `
                    <div class="row align-items-center">
                        <div class="col-md-5 col-12 mb-3 mb-md-0 d-flex justify-content-center">
                            <img class="img-fluid object-fit-cover img_card_detail border border-success rounded w-75" src="../imgs/details.jpg">
                        </div>
                        <div class="content col-md-7 col-12">
                            <div class="card-body container-fluid">
                                <h4 class="name d-card pb-2 text-center">${department.name}</h4>
                                <ul class="list-group list-group-flush rounded bg-success-subtle flex-grow-1">                        
                                    <li class="list-group-item"><span class="fw-bold">Descripción: </span>${department.description}</li>
                                    <li class="list-group-item"><span class="fw-bold">Municipios: </span>${department.municipalities}</li>
                                    <li class="list-group-item"><span class="fw-bold">Población: </span>${department.population} hab</li>
                                    <li class="list-group-item"><span class="fw-bold">Superficie: </span>${department.surface} Km<sup>2</sup></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
                cardContainer.appendChild(cardContent);
            }
        }
    })
    .catch(error => console.error("Error al obtener los datos del departamento:", error));

function createCityCards(cities) {
    citiesContainer.innerHTML = '';

    if (cities.length > 0) {
        let header = document.createElement('h2');
        header.className = 'text-center';
        header.textContent = 'Ciudades';
        citiesContainer.appendChild(header);


        cities.forEach(city => {
            let card = document.createElement("div");
            card.className = "card col-10 col-sm-6 col-md-4 col-lg-3 text-center border border-success";

            card.innerHTML = `
            <img class="card-img" src="../imgs/Ciudades-capitales.jpg">
            <div class="card-body mt-2">
                <h5 class="card-name">${city.name}</h5>
            </div>`;

            citiesContainer.appendChild(card);
        });
    }
}

function createNaturalAreaCards(naturalAreas) {
    const uniqueAreas = Array.from(naturalAreas.reduce((map, area) => {
        if (!map.has(area.name)) {
            map.set(area.name, area);
        }
        return map;
    }, new Map()).values());

    areasContainer.innerHTML = '';

    if (uniqueAreas.length > 0) {
        let header = document.createElement('h2');
        header.className = 'text-center';
        header.textContent = 'Áreas Naturales';
        areasContainer.appendChild(header);

        uniqueAreas.forEach(area => {
            let card = document.createElement("div");
            card.className = "card col-10 col-sm-6 col-md-4 col-lg-3 text-center border border-success";

            card.innerHTML = `
            <img class="card-img" src="../imgs/img-card.jpg">
            <div class="card-body p-1 mt-2">
                <h5 class="card-name">${area.name}</h5>
            </div>`;

            areasContainer.appendChild(card);
        });
    }
}

function filterEvents() {
    const selectedCategories = Array.from(categories.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    
    const searchText = searchInput.value.toLowerCase();

    citiesContainer.innerHTML = '';
    areasContainer.innerHTML = '';

    if (selectedCategories.includes("cities") || selectedCategories.length === 0) {
        const filteredCities = cities.filter(city => city.name.toLowerCase().includes(searchText));
        createCityCards(filteredCities);
    }

    if (selectedCategories.includes("areas") || selectedCategories.length === 0) {
        const filteredAreas = naturalAreas.filter(area => area.name.toLowerCase().includes(searchText));
        createNaturalAreaCards(filteredAreas);
    }
}

categories.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', filterEvents);
});

searchInput.addEventListener('input', filterEvents);
searchButton.addEventListener('click', filterEvents);
