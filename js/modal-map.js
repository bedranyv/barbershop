let mapLink = document.querySelector(".contacts-button-show-map");

let blackoutWrapperMap = document.querySelector(".blackout-wrapper-modal-map");
let modalMap = document.querySelector(".modal-map");

let blurWrapperMap = document.querySelector(".blur-modal-wrapper");
let closeModalMap = document.querySelector(".modal-map-close-button");


// console.log(link);


// Открываем модальное окно с картой

function animMapDel() {
	blackoutWrapperMap.classList.remove("anim-overlay-in");
	}

mapLink.addEventListener("click", function (evt) {
	evt.preventDefault();

	console.log("Кнопка открыть карту");
	blackoutWrapperMap.classList.add("js-show-modal");
	modalMap.classList.add("js-show-modal");
	blackoutWrapperMap.classList.add("anim-overlay-in");
	blurWrapperMap.classList.add("blur");
	setTimeout(animMapDel, 700);
});


// Закрываем модальное окно с картой
// Функция для задержки, чтоб сработала анимация постепенного убирания фона
function closeMap() {
	blackoutWrapperMap.classList.remove("js-show-modal");
	blackoutWrapperMap.classList.remove("anim-overlay-out");
}

closeModalMap.addEventListener("click", function (evt) {
	evt.preventDefault();

	console.log("Кнопка закрыть карту");
	modalMap.classList.remove("js-show-modal");
	blackoutWrapperMap.classList.add("anim-overlay-out");
	blurWrapperMap.classList.remove("blur");
	setTimeout(closeMap, 400);
});


//Обработчик событий, который закрывает карту при нажатии кнопки ESC
window.addEventListener("keydown", function(evt) {
	// Если нажата кнопка ESC (код 27) убираем стандартное поведение (например в полноэкранном режиме выход из него)
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (modalMap.classList.contains("js-show-modal")) {
			modalMap.classList.remove("js-show-modal");
			blackoutWrapperMap.classList.add("anim-overlay-out");
			blurWrapperMap.classList.remove("blur");
			setTimeout(closeMap, 400);
			console.log("Закрыто клавишей ESC");
		}
	}
});