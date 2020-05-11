let loginLink = document.querySelector(".main-header-navigation-login-link");

let blackoutWrapperLogin = document.querySelector(".blackout-wrapper-modal-login");
let modalLogin = document.querySelector(".modal-login");

let form = modalLogin.querySelector("form");
let inputLogin = document.querySelector("[name=login]");
let inputPass = document.querySelector("[name=password]");

let blurWrapperLogin = document.querySelector(".blur-modal-wrapper");
let closeModalLogin = document.querySelector(".modal-login-close-button");


// На локальном сервере локальное хранилище не поддерживается
// Делаем код, которые убирает ошибку при обращении к хранилищу
let isStorageSupport = true;
let storage = "";
try {
	storage = localStorege.getItem("inputLogin");
} catch (err) {
	isStorageSupport = false;
	console.log("Нет хранилища");
}


// console.log(link);


// Открываем модальную форму входа

function animLoginDel() {
	modalLogin.classList.remove("anim-show-modal-login");
	blackoutWrapperLogin.classList.add("anim-overlay-in");
}

loginLink.addEventListener("click", function (evt) {
	// Сбрасываем стандартное поведение (переход по ссылке)
	evt.preventDefault();

	console.log("Кнопка открыть логин");

	// добавляем класс, прописанный в css, для переопределения display:none
	blackoutWrapperLogin.classList.add("js-show-modal");
	modalLogin.classList.add("js-show-modal");
	// добавляем анимацию и удаляем через секунду из-за конфликта с анимацией тряски
	modalLogin.classList.add("anim-show-modal-login");
	blackoutWrapperLogin.classList.add("anim-overlay-in");
	blurWrapperLogin.classList.add("blur");
	setTimeout(animLoginDel, 700);

	// если хранилище работает, записываем данные в поле логин
	if (storage) {
		login.value = storage;
		// и ставил фокус на поле пароль
		inputPass.focus();
	}	else {
		// Если пусто - ставим фокус в поле логина
		inputLogin.focus();
	}
});


// Закрываем модальную форму входа
// Задаем функцию, которая скрывает модалку логина для того, чтоб повесить на нее таймер
function closeLogin() {
	blackoutWrapperLogin.classList.remove("js-show-modal");
	modalLogin.classList.remove("js-show-modal");
	modalLogin.classList.remove("anim-hide-modal-login");
	modalLogin.classList.remove("anim-empty-input");
	blackoutWrapperLogin.classList.remove("anim-overlay-out");
}

closeModalLogin.addEventListener("click", function (evt) {
 	evt.preventDefault();
 	console.log("Кнопка закрыть логин");
 	// Подключаем анимацию ухода влево
 	modalLogin.classList.add("anim-hide-modal-login");
 	blackoutWrapperLogin.classList.add("anim-overlay-out");
 	blurWrapperLogin.classList.remove("blur");
 	// через время убираем классы
 	setTimeout(closeLogin, 400);
});



// Сделаем форму валидную, чтоб не отправлять пустые поля
// Функция убирает анимацию тряски. В дальнейшем зададим таймер.
function animEmptyRemove() {
	modalLogin.classList.remove("anim-empty-input");
	console.log("Убираем анимацию тряски");
}

form.addEventListener("submit", function (evt) {
	
	// Если значение введенного логин или пароля пустое, тогда запрещаем отправку формы и производим действие
	if (!inputLogin.value || !inputPass.value) {
		evt.preventDefault();
		console.log("Введите логин и пароль");
		modalLogin.classList.add("anim-empty-input");
		setTimeout(animEmptyRemove, 1000);
	// Иначе (если все ок) - запишем данные логина в локальное хранилище
	} else 
	{
		// Если локальное хранилище поддерживается
		if (isStorageSupport) {
			localStorage.setItem("login", inputLogin.value);
			console.log("Запись в хранилище");
		}
		console.log("Локальное хранилище неподдерживается");
	}
});


//Обработчик событий, который закрывает форму входа при нажатии кнопки ESC
window.addEventListener("keydown", function(evt) {
	// Если нажата кнопка ESC (код 27) убираем стандартное поведение (например в полноэкранном режиме выход из него)
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (modalLogin.classList.contains("js-show-modal")) {
			modalLogin.classList.add("anim-hide-modal-login");
		 	blackoutWrapperLogin.classList.add("anim-overlay-out");
		 	blurWrapperLogin.classList.remove("blur");
		 	// через время убираем классы
		 	setTimeout(closeLogin, 400);
			console.log("Закрыто клавишей ESC");
		}
	}
});