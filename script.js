const cards = [
    { id: 1, title: "Degrade", description: "Digital fundo degrade", category: "Degrade", image: "img/relogio1.png", link: "relogio/relogio1.html" },
    { id: 2, title: "Desfocado", description: "Digital desfocado, imagem de fundo", category: "Imagem", image: "img/relogio2.png", link: "relogio/relogio2.html" }
];

let currentPage = 1;
const itemsPerPage = 6;

const cardContainer = document.getElementById('card-container');
const searchInput = document.getElementById('search');
const paginationContainer = document.createElement('div');
paginationContainer.classList.add('pagination');
document.body.appendChild(paginationContainer);

function displayCards(filteredCards, page = 1) {
    cardContainer.innerHTML = '';
    paginationContainer.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedCards = filteredCards.slice(start, end);

    paginatedCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <a href="${card.link}" class="card-link">
                <img src="${card.image}" alt="${card.title}" />
                <h2>${card.title}</h2>
                <p>${card.description}</p>
            </a>
        `;
        cardContainer.appendChild(cardElement);
    });

    const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => displayCards(filteredCards, i));
        paginationContainer.appendChild(pageButton);
    }
}

function filterCards(category) {
    let filteredCards;
    if (category === 'todos') {
        filteredCards = cards;
    } else {
        filteredCards = cards.filter(card => card.category === category);
    }
    displayCards(filteredCards, currentPage);
}

// Pesquisa
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCards = cards.filter(card => 
        card.title.toLowerCase().includes(searchTerm) ||
        card.description.toLowerCase().includes(searchTerm)
    );
    displayCards(filteredCards, currentPage);
});

// Exibir todos os cards inicialmente
displayCards(cards);
