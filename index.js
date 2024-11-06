const CHECKED_FILM_CLASSNAME = 'checked';

const inputNode = document.querySelector('.js-movies__input');
const buttonNode = document.querySelector('.js-movies__button');
const listNode = document.querySelector('.js-movies__list');


let films = [];


buttonNode.addEventListener('click', function() {
    //получение данных от пользователя
    const film = getFilmsFromUser();

    if(!film) {
        return;
    }
    
    //добавляем в список 
    trackFilms(film);

    //зарендерить список 
    renderFilms();

    //отчистить инпут
    clearInput(inputNode);
})

function getFilmsFromUser() {
    if(!inputNode.value) {
        return null;
    }

    const film = inputNode.value;
    return film;
}

function trackFilms(film) {
    films.unshift(film);
}

function renderFilms() {
    let filmsHtml = '';

    films.forEach(element => {
        const elementHtml = `<li class="js-movies__item movies__item">
        <label class="js-movies__item-label movies__item-label">
            <input class="movies__item-input js-movies__item-input"
            type="checkbox">${element}
        </label>
        <button class="js-movies__item-btn movies__item-btn"></button>
        </li>`;

        filmsHtml += elementHtml;
    })

    listNode.innerHTML = filmsHtml;
}

function clearInput(input) {
    input.value = '';
}


listNode.addEventListener('click', (event) => {
    //кнопка просмотрено
    const filmToWatch =event.target.classList.contains('js-movies__item-input');
    if (filmToWatch) {
        const label = event.target.closest('.js-movies__item-label');
        const listItem = event.target.closest('.js-movies__item');

        label.classList.toggle(CHECKED_FILM_CLASSNAME, event.target.checked);
        listItem.classList.toggle(CHECKED_FILM_CLASSNAME, event.target.checked);
    }

    //кнопка удаления
    const filmToDelete = event.target.classList.contains('js-movies__item-btn');
    if(filmToDelete) {
        const filmItem = event.target.closest('.js-movies__item');
        if (filmItem) {
            filmItem.remove(); // Удаляем элемент из DOM
        }
        return;
    }
});

