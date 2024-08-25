let url = "https://api-colombia.com";
let urlspecies = `${url}/api/v1/InvasiveSpecie`;

let tableContainer = document.getElementById("tableContainer");

fetch(urlspecies)
    .then(response => response.json())
    .then(data => {
        const species = data; // Asegúrate de que esto sea una lista de especies
        console.log(species);

        createTable(species);
    })
    .catch(error => console.error("Error al obtener los datos de especies invasoras:", error));

function createTable(speciesList) {
    tableContainer.innerHTML = '';

    const table = document.createElement("table");
    table.className = "table";
    table.innerHTML = `                
        <thead>
            <tr>
                <th class="bg-secondary">Nombre</th>
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

    // Itera sobre la lista de especies y crea filas dinámicamente
    speciesList.forEach(specie => {
        const tr = document.createElement("tr");
        
        // Aplica la clase a la fila según el nivel de riesgo
        if (specie.riskLevel === 1) {
            tr.classList.add('table-primary');
        } else if (specie.riskLevel === 2) {
            tr.classList.add('table-success');
        }
        // Puedes agregar más condiciones según los niveles de riesgo

        // Genera el contenido de la fila
        tr.innerHTML = `
            <td>${specie.name}</td>
            <td>${specie.scientificName}</td>
            <td>${specie.impact}</td>
            <td>${specie.manage}</td>
            <td>${specie.riskLevel}</td>
            <td><img src="${specie.urlImage}" alt="${specie.name}" style="width:100px; height:auto;"></td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
}
