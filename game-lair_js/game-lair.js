// мультиязычный сайт
const langButtons = document.querySelectorAll('[data-btn]');
let currentLang = localStorage.getItem('current-language') || 'ru';

function changeLanguage() {
    for (const key in textObject) {
        const elem = document.querySelector(`[data-lang=${key}]`);
        if(elem) {
            elem.innerHTML = textObject[key][currentLang];
        }
    }
}

langButtons.forEach(langButton => {
    langButton.addEventListener('click', function() {
        currentLang = this.dataset.btn;
        localStorage.setItem('current-language', this.dataset.btn);
        changeLanguage();
        location.href = window.location.pathname + '#' + this.dataset.btn;
    });
});

function changeURL() {
	let hash = window.location.hash;
	hash = hash.slice(1);
    const allLangs = ['ru', 'en'];
    if (!allLangs.includes(hash)) {
        location.href = window.location.pathname + '#ru';
        currentLang = 'ru';
    }
    const eng = 'en';
    const rus =  'ru';
    if (eng.includes(hash)) {
        location.href = window.location.pathname + '#en';
        currentLang = 'en';
    }
    if (rus.includes(hash)) {
        location.href = window.location.pathname + '#ru';
        currentLang = 'ru';
    }
    changeLanguage();
}
changeURL();

// Инициализация слайдера; условие => содержимое всех слайдов должно умещаться по высоте в полноэкранный блок
let swiper = new Swiper('.page-swiper', {
    direction: 'vertical',
    keyboard: true,
    mousewheel: true,
    speed: 800,
    spaceBetween: 50,
    init: false,
    on: {
        init: function() {
            setScrollType();
            menuSlider();
        },
        resize: function() {
            setScrollType();
        }
    }
});

function setScrollType() {
    if(swiper.params.freeMode.enabled = true) {
        swiper.params.freeMode.enabled = false;
    }
    const slides = document.querySelectorAll('.slide-content');
    slides.forEach(slide => {
        if(slide.offsetHeight > window.innerHeight) {
            swiper.params.freeMode.enabled = true;
        }
    });
}

// Бургер-меню и переход по ссылкам
const menuIcon = document.querySelector('.menu__icon');
const menuNav = document.querySelector('nav');
menuIcon.addEventListener('click', function() {
    menuIcon.classList.toggle('_active');
	menuNav.classList.toggle('_active');
    if(menuIcon.classList.contains('_active')) {
        swiper.disable();
    }
    else if(!menuIcon.classList.contains('_active')) {
        swiper.enable();
    }
    document.body.classList.toggle('_lock');
});

let navLinks = document.querySelectorAll('.nav-link');
function menuSlider() {
    for (let index = 0; index < navLinks.length; index++) {
        const navLink = navLinks[index];
        navLink.addEventListener("click", function(e){
            if (menuIcon.classList.contains('_active')) {
                menuIcon.classList.remove('_active');
                menuNav.classList.remove('_active');
                swiper.enable();
                document.body.classList.remove('_lock');
            }
            if(navLink.classList.contains('goto-block3')) {
                swiper.slideTo(2, 800);
            }
            else if(navLink.classList.contains('goto-block4')) {
                swiper.slideTo(3, 800);
            }
            else if(navLink.classList.contains('goto-block2')) {
                swiper.slideTo(1, 800);
            }
            else if(navLink.classList.contains('goto-block1')) {
                swiper.slideTo(0, 800);
            }
            e.preventDefault();
        });
    }
}

swiper.init();

// Контакты
const contactLinks = document.querySelectorAll('.contact-link');
contactLinks.forEach(contactLink => {
    contactLink.addEventListener('click', function(e) {
        document.body.classList.add('_lock');
        document.querySelector('.fixed-block').style.display = 'flex';
        e.preventDefault();
    });
});

document.querySelector('.fixed-block__box div').addEventListener('click', function() {
    if(!menuIcon.classList.contains('_active')) {
        document.body.classList.remove('_lock');
    }
    document.querySelector('.fixed-block').style.display = 'none';
});

// Слайдер для игровых карточек
const gamesSwiper = new Swiper('.games-swiper', {
    freeMode: {
        enabled: true,
        sticky: true,
    },
    keyboard: true,
    speed: 800,
    loop: true,
    autoplay: {
        disableOnInteraction: true
    },
    slidesPerView: 1,
    breakpoints: {
        '@0.45': {slidesPerView: 2},
        '@1.00': {slidesPerView: 3}
    }
});

const gameContainers = document.querySelectorAll('.game-container');
gameContainers.forEach(gameContainer => {
    gameContainer.addEventListener('click', function() {
        gameContainer.classList.toggle('_active');
        gameContainers.forEach(gameContainer2 => {
            if(gameContainer2 != gameContainer) {
                gameContainer2.classList.remove('_active');
            }
        });
    });
});