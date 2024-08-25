let url = "https://api-colombia.com";
let urlspecies = `${url}/api/v1/InvasiveSpecie`;

let tableContainer = document.getElementById("tableContainer");

fetch(urlspecies)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const species = data; // Declaración de la variable usando const
        createTable(species);
    })
    .catch(error => console.error("Error al obtener los datos de especies invasoras:", error));

   
function createTable(speciesList) {
    tableContainer.innerHTML = '';

    const table = document.createElement("table");
    table.className = "table";
    table.innerHTML = `                
        <thead>
            <tr class="color">
                <th class="color">Nombre</th>
                <th class="bg-secondary">Nombre científico</th>
                <th class="bg-secondary">Impacto</th>
                <th class="bg-secondary">Manejo</th>
                <th class="bg-secondary">Nivel de riesgo</th>
                <th class="bg-secondary">Imagen</th>
            </tr>
        </thead>
    `; 

    const tbody = document.createElement("tbody");
    tbody.className = "tbody";
    
    speciesList.forEach(specie => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${specie.name}</td>
            <td>${specie.scientificName}</td>
            <td>${specie.impact}</td>
            <td>${specie.manage}</td>
            <td>${specie.riskLevel}</td>
            <td><img src="${specie.urlImage}" alt="${specie.name}" style="width:100px; height:auto;"></td>
        `;
        pintar(tr, specie.riskLevel);
        console.log(specie.riskLevel)
            
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

function pintar(tr, riesgo) {
    if (riesgo === 1) {
        tr.classList.add('blue');
    } else if (riesgo === 2) {
        tr.classList.add('green');
    }
}
