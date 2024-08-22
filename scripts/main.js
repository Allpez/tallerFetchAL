let description = document.getElementById("desciption")
let container = document.getElementById("card-container")
let url = "https://api-colombia.com/"
let urlFinal = url + "/api/v1/Country/Colombia"


fetch(urlFinal)
.then(response => response.json())
.then(res => {
    description.innerHTML = `<p>${res.description}</p>`
})
.catch(error => console.error("Error al obtener los datos:", error));

if (container.children.length === 0) {
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'no-results-message text-center';
    noResultsMessage.innerHTML = '<H2 class="text-success">No se encontraron resultados.</H2>';
    container.appendChild(noResultsMessage);
}
// } else {
//     filteredEvents.forEach(event => {
//         let card = document.createElement("div");
//         card.className = "card";
//         card.innerHTML = `
//             <img class="card-img" src="${event.image}">
//             <div class="card-body p-1 mt-2">
//                 <h5 class="card-title">${event.name}</h5>
//                 <p class="card-text">${event.description}</p>
//                 <div class="d-flex justify-content-between align-items-center mb-2">
//                     <p class="m-0">${event.price} $</p>
//                     <a href="./pages/details.html?id=${event._id}" class="btn button_card">Details</a>
//                 </div>
//             </div>`;
//         cardContainer.appendChild(card);
//     });







// function createCards(page) {
//     page.innerHTML = '';


//     fetch(urlFinal)
//     filteredSeries.forEach(card => {
//         let card = document.createElement("div");
//         card.className = "card m-2 col-6 col-sm-4 col-md-2 text-center object-fit-cover border border-primary";
//         card.innerHTML = `
//             <img class="card-img rounded-top" src="../imgs/image-1.webp" alt="${serie.title}">
//             <div class="card-body d-flex flex-column justify-content-between">
//                 <h5 class="card-title">${serie.title}</h5>
//                 <p class="card-text">${serie.platform}</p>
//             </div>`;
//         page.appendChild(card);
//     });
// }
