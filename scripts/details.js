const url = window.location.search;
const urlObjeto = new URLSearchParams(url);
const eventId = urlObjeto.get('id')

if (eventId) {
    const event = data.events.find(e => e._id === eventId);

    if (event) {
        const cardContainer = document.getElementById("card-container");
        const cardContent = document.createElement("div");
        cardContent.className = "card2 d-flex";
        cardContent.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-5 col-12 mb-3 mb-md-0 d-flex justify-content-center">
                <img class="img-fluid object-fit-cover img_card_detail" src="${event.image}" alt="${event.name}">
            </div>
            <div class="col-md-7 col-12">
                <div class="card-body container-fluid">
                    <h4 class="name d-card pb-2 rounded bg-success"> ${event.name}</h4>
                    <ul class="list-group list-group-flush rounded bg-success-subtle flex-grow-1">                        
                        <li class="list-group-item rounded"><span class="fw-bold">Date: </span>${event.date}</li>
                        <li class="list-group-item rounded"><span class="fw-bold">Description: </span>${event.description}</li>
                        <li class="list-group-item rounded"><span class="fw-bold">Category: </span>${event.category}</li>
                        <li class="list-group-item rounded"><span class="fw-bold">Place: </span>${event.place}</li>
                        <li class="list-group-item rounded"><span class="fw-bold">Capacity: </span>${event.capacity}</li>
                        ${event.assistance ? `<li class="list-group-item rounded"><span class="fw-bold">Assistance: </span>${event.assistance} people</li>` : ''}
                        ${event.estimate ? `<li class="list-group-item rounded"><span class="fw-bold">Estimate: </span>${event.estimate} people</li>` : ''}
                        <li class="list-group-item rounded"><span class="fw-bold">Price: </span>${event.price} $</li>
                    </ul>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardContent);
    } 
} 
