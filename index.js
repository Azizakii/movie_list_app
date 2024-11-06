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
    films.unshift({ title: film, checked: false });
}

function renderFilms() {
    let filmsHtml = '';

    films.forEach((element, index) => {
        const elementHtml = `<li class="js-movies__item movies__item ${element.checked ? CHECKED_FILM_CLASSNAME : ''}">
            <label class="js-movies__item-label movies__item-label ${element.checked ? CHECKED_FILM_CLASSNAME : ''}">
                <input class="movies__item-input js-movies__item-input"
                type="checkbox" ${element.checked ? 'checked' : ''} data-index="${index}">
                ${element.title}
            </label>
            <button class="js-movies__item-btn movies__item-btn" data-index="${index}"></button>
        </li>`;

        filmsHtml += elementHtml;
    });

    listNode.innerHTML = filmsHtml;
}

function clearInput(input) {
    input.value = '';
}



listNode.addEventListener('click', (event) => {
    //кнопка просмотрено
    const filmToWatch =event.target.classList.contains('js-movies__item-input');
    if (filmToWatch) {
        const index = event.target.dataset.index;
        films[index].checked = event.target.checked;

        const label = event.target.closest('.js-movies__item-label');
        const listItem = event.target.closest('.js-movies__item');

        label.classList.toggle(CHECKED_FILM_CLASSNAME, event.target.checked);
        listItem.classList.toggle(CHECKED_FILM_CLASSNAME, event.target.checked);
    }

    //кнопка удаления
    const filmToDelete = event.target.classList.contains('js-movies__item-btn');
    if(filmToDelete) {
        const index = event.target.dataset.index;
        films.splice(index, 1); // Удаляем фильм из массива
        renderFilms(); // Перерендер списка
    }
    
});

