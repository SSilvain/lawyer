window.onload = function () {
	document.addEventListener("click", documentActions);

	// Actions (делегирование события click)
	function documentActions(e) {
		e.preventDefault();
		const targetElement = e.target;
		if (window.innerWidth > 768 && isMobile.any()) {
			if (targetElement.classList.contains("menu__arrow")) {
				targetElement.closest(".menu__item").classList.toggle("_hover");
			}
			if (
				!targetElement.closest(".menu__item") &&
				document.querySelectorAll(".menu__item._hover").length > 0
			) {
				_removeClasses(
					document.querySelectorAll(".menu__item._hover"),
					"_hover"
				);
			}
		}
	}

	//callback для smoothscroll, который выполняется перед тем, как он проскролит 
	//smoothscroll навекшивается на все ссылки у которых href="#link"
	//если такого блока (link) нет на странице, то скролл не срабатывает, но колбэк этот отрабатывает
	let closeHoverMenuListOnScroll = () => {
		_removeClasses(
			document.querySelectorAll(".menu__item._hover"),
			"_hover"
		);
		body_lock_remove();
		menu_close();
	};

	// Header
	const headerElement = document.querySelector(".header");

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			headerElement.classList.remove("_scroll");
		} else {
			headerElement.classList.add("_scroll");
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(headerElement);



	document.addEventListener('scrollStart', closeHoverMenuListOnScroll);

	//scroll show menu
	window.addEventListener('scroll', function (e) {

		const
			oldScroll = this.oldScroll || 0,
			newScroll = this.scrollY,
			isScrollUp = newScroll < oldScroll;
		if (window.innerWidth > 768 && !isMobile.any()) {
			if (newScroll >= 700) {
				document.querySelector('.menu__body').classList.add('out');
				document.querySelector('.menu__body').classList.toggle('scroll-up', isScrollUp);
			}
			if (newScroll < 600) {
				document.querySelector('.menu__body').classList.remove('scroll-up', isScrollUp);
			}
			if (newScroll < 100) {
				document.querySelector('.menu__body').classList.remove('out', isScrollUp);
			}
		}

		this.oldScroll = newScroll;
	});

};

//инициализация SmoothScroll
var scroll = new SmoothScroll('a[href*="#"]');

// //скрипт для вставки видео с ютуба
// function findVideos() {
//     let videos = document.querySelectorAll(".video");

//     for (let i = 0; i < videos.length; i++) {
//         setupVideo(videos[i]);
//     }
// }

// function setupVideo(video) {
//     let link = video.querySelector(".video__link");
//     let media = video.querySelector(".video__media");
//     let button = video.querySelector(".video__button");
//     let id = parseMediaURL(media);

//     video.addEventListener("click", () => {
//         let iframe = createIframe(id);

//         // link.remove();
//         // button.remove();
//         link.classList.add("video__link_hide");
//         button.classList.add("video__button_hide");
//         video.appendChild(iframe);
//     });

//     link.removeAttribute("href");
//     video.classList.add("video--enabled");
// }

// function parseMediaURL(media) {
//     let regexp =
//         /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
//     let url = media.src;
//     let match = url.match(regexp);

//     return match[1];
// }

// function createIframe(id) {
//     let iframe = document.createElement("iframe");

//     iframe.setAttribute("allowfullscreen", "");
//     iframe.setAttribute("allow", "autoplay");
//     iframe.setAttribute("src", generateURL(id));
//     iframe.setAttribute("id", "video__media");
//     iframe.classList.add("video__media");

//     return iframe;
// }

// function generateURL(id) {
//     let query = "?rel=0&showinfo=0&autoplay=1&enablejsapi=1";

//     return "https://www.youtube.com/embed/" + id + query;
// }

// findVideos();

