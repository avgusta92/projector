import '../styles/main.scss'
import { dropdowns, discs } from './data.js'

function showDataPage(start, end) {
    const selectedCards = discs.slice(start, end);
    let cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';

    selectedCards.forEach(disc => {
        let card = document.createElement('div');
        card.className = 'gallery-section__card card';
        cardsContainer.appendChild(card);

        let imgContainer = document.createElement('div');
        card.appendChild(imgContainer);

        let likeButton = document.createElement('a');
        likeButton.className = 'card__like-button';
        likeButton.addEventListener('click', () => setFavorite(disc));
        imgContainer.appendChild(likeButton);

        let likeIcon = document.createElement('div');
        likeIcon.className = 'card__like-icon';
        likeButton.appendChild(likeIcon);

        let img = document.createElement('img');
        img.className = 'card__image';
        img.src = disc.imgUrl;
        img.alt = disc.alt;
        imgContainer.appendChild(img);

        let info = document.createElement('div');
        info.className = 'card__info';
        card.appendChild(info);

        let h1 = document.createElement('div');
        h1.className = 'card__info--h1';
        h1.innerHTML = disc.h1;
        info.appendChild(h1);

        let h2 = document.createElement('div');
        h2.className = 'card__info--h2';
        h2.innerHTML = disc.h2;
        info.appendChild(h2);

        let specification = document.createElement('div');
        specification.className = 'card__info--specification';
        info.appendChild(specification);

        Object.keys(disc.specification).forEach((key) => {
            disc.specification[key]

            let textConteiner = document.createElement('div');
            specification.appendChild(textConteiner);

            let type = document.createElement('span');
            type.innerHTML = `${key} : `;
            textConteiner.appendChild(type);

            let text = document.createElement('span');
            text.innerHTML = disc.specification[key];
            textConteiner.appendChild(text);
        })

        let button = document.createElement('button');
        button.className = 'card__info--button button';
        button.innerHTML = 'Add';
        card.appendChild(button);

        let buttonIcon = document.createElement('div');
        buttonIcon.className = 'button__icon button__icon--plus';
        button.appendChild(buttonIcon);
    });
}

function initPugination(selectedPage) {
    let page = 1;
    const noOfCardsOnPage = 6;
    let pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let noOfCards = 0; noOfCards < discs.length; noOfCards += noOfCardsOnPage) {
        let button = document.createElement('button');
        button.innerHTML = page;

        if (selectedPage === page) {
            button.className = 'pagination__button button';
            showDataPage(noOfCards, noOfCards + noOfCardsOnPage);
        } else {
            button.className = 'pagination__button button button--inactive';
            button.addEventListener('click', setPage.bind(null, page));
        }

        pagination.appendChild(button);
        page++;
    }
    
}

function setFavorite(disc) {
    const favorite = JSON.parse(localStorage.getItem("favorite"));

    if (favorite && favorite.find(el => el === disc.id)) {
        return;
    }

    const newData = [...favorite || [], disc.id];
    const dataForSave = JSON.stringify(newData);
    localStorage.setItem("favorite", dataForSave);

    let countText = document.getElementById('count-text');

    if (countText) {
        countText.innerHTML = newData.length;
    } else {
        createFavoriteEl(newData);
    }
}

function createFavoriteEl(newData) {
    let favoriteEl = document.getElementById('favorite');

    let count = document.createElement('div');
    count.className = 'nav__count nav__count--favorite';
    count.id = 'count';
    favoriteEl.appendChild(count);

    let text = document.createElement('span');
    text.innerHTML = newData.length;
    count.id = 'count-text';
    count.appendChild(text);
}

function setPage(page) {
    location.search = `?page=${page}`
}

function setFormError(key, value) {
    const element = document.getElementById(key);
    element.innerHTML = value;
}

function initDropdowns() {
    Object.keys(dropdowns).forEach((key) => {
        const dropdown = document.getElementById(`${key}-dropdown`);
        dropdowns[key].forEach((el) => {
            let dropdownItem = document.createElement('li');
            dropdownItem.innerHTML = el;
            dropdown.appendChild(dropdownItem);
        })
    })
}

function initInput() {
    const artist = document.getElementById('artist');
    artist.addEventListener("input", (e) => {
        if (e.target.value.length > 10) {
            setFormError("artist-error", "Invalid email address.")
        } else {
            setFormError("artist-error", "")
        }
    });
}

function initFavorite() {
    const favorite = JSON.parse(localStorage.getItem("favorite"));
    if (favorite) {
        createFavoriteEl(favorite || []);
    }
}

function getPage() {
    let page = location.search.slice(6);

    if (!page) {
        page = localStorage.getItem("page") || 1;
        setPage(page);
    }

    localStorage.setItem("page", page);

    return page;
}

function initApp() {
    initFavorite();
    initInput();
    initDropdowns();
    initPugination(Number(getPage()));
}

initApp()