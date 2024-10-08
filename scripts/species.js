let url = "https://api-colombia.com";
let urlspecies = `${url}/api/v1/InvasiveSpecie`;

let tableContainer = document.getElementById("tableContainer");

fetch(urlspecies)
    .then(response => response.json())
    .then(data => {
        const species = data;
        console.log(species);

        createTable(species);
    })
    .catch(error => console.error("Error al obtener los datos de especies invasoras:", error));

function createTable(speciesList) {
    tableContainer.innerHTML = '';

    const table = document.createElement("table");
    table.className = "table border border-success my-3 ";
    table.innerHTML = `                
        <thead>
            <tr">
                <th class="bg-warning bg-opacity-50 text-center">Nombre</th>
                <th class="bg-warning bg-opacity-50 text-center">Nombre científico</th>
                <th class="bg-warning bg-opacity-50 text-center">Impacto</th>
                <th class="bg-warning bg-opacity-50 text-center">Manejo</th>
                <th class="bg-warning bg-opacity-50 text-center">Riesgo</th>
                <th class="bg-warning bg-opacity-50 text-center">Imagen</th>
            </tr>
        </thead>
    `;

    const tbody = document.createElement("tbody");
    tbody.className = "tbody border border-success";

    speciesList.forEach(specie => {
        const tr = document.createElement("tr");
        
        if (specie.riskLevel === 1) {
            tr.classList.add('table-primary');
        } else if (specie.riskLevel === 2) {
            tr.classList.add('table-success');
        }

        tr.innerHTML = `
            <td class="border border-success">${specie.name}</td>
            <td class="border border-success">${specie.scientificName}</td>
            <td class="border border-success">${specie.impact}</td>
            <td class="border border-success">${specie.manage}</td>
            <td class="border border-success">${specie.riskLevel}</td>
            <td class="border border-success"><img src="${specie.urlImage}" alt="${specie.name}" class="object-fit-cover" style="width:100px; height:50%;"></td>
        `;
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
}
