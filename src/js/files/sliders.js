// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Controller, Parallax, Pagination } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/


//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
}

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}

// Инициализация слайдеров

// Перечень слайдеров
// Проверяем, есть ли слайдер на стронице
if (document.querySelector('.slider-partners__body')) {
	// Создаем слайдер
	new Swiper('.slider-partners__body', { 
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 5,
		spaceBetween: 60,
		speed: 800,
		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.slider-partners .arrow-slider_prev',
			nextEl: '.slider-partners .arrow-slider_next',
		},

		breakpoints: {
			320: {
				centeredSlides: true,
				slidesPerView: 1.5,
				spaceBetween: 10,
			},
			550: {
				// centeredSlides: true,
				slidesPerView: 3,
				spaceBetween: 40,
			},
			768: {
				slidesPerView: 5,
				spaceBetween: 60,
			},
		},
		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		//preloadImages: false,
		//lazy: true,

		/*
		// Эффекты
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/

		// Пагинация
		/*
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		*/

		// Скроллбар
		/*
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		*/
		// События
		on: {

		}
	});
}

if (document.querySelector('.slider-steps__body')) {
	// Создаем слайдер
	new Swiper('.slider-steps__body', { 
		modules: [Navigation],
		observer: true,
		observeParents: true,
		slidesPerView: 5,
		spaceBetween: 35,
		speed: 800,
		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.slider-steps .arrow-slider_prev',
			nextEl: '.slider-steps .arrow-slider_next',
		},

		breakpoints: {
			320: {
				centeredSlides: true,
				slidesPerView: 1,
				spaceBetween: 20,
			},
			550: {
				slidesPerView: 2.5,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 4,
				spaceBetween: 15,
			},
			1170: {
				slidesPerView: 5,
				spaceBetween: 35,
			},
		},
		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		//preloadImages: false,
		//lazy: true,

		/*
		// Эффекты
		effect: 'fade',
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		*/

		// Пагинация
		/*
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		*/

		// Скроллбар
		/*
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
		},
		*/
		// События
		on: {

		}
	});
}

if (window.innerWidth <= 767.98) {
	if (document.querySelector('.slider-projects__body')) {
		// Создаем слайдер
		const slidesProjects = new Swiper('.slider-projects__body', { 
			modules: [Navigation, Controller],
			slidesPerView: 1,
			spaceBetween: 35,
			speed: 800,
			centeredSlides: true,
			slideToClickedSlide: true,
			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.slider-projects .arrow-slider_prev',
				nextEl: '.slider-projects .arrow-slider_next',
			},
	
			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				500: {
					slidesPerView: 1.5,
					spaceBetween: 20,
				}
			}
		});


		// добавляем точки на страницу
		const addDots = () => {
			const sliderDots = document.querySelector('.dots-slider-projects__body'),
						sliderDotsWrapper = sliderDots.querySelector('.swiper-wrapper');

			for (let i = 0; i < document.querySelectorAll('.slider-projects__slide').length; i++) {
				sliderDotsWrapper.insertAdjacentHTML("beforeend", `
					<div class="dots-slider-projects__slide swiper-slide">
						<div class="dots-slider-projects__dot"><span></span></div>
					</div>
				`);
			}
		};

		addDots();

		// Создаем слайдер точек
		const slidesProjectsDots = new Swiper('.dots-slider-projects__body', { 
			allowTouchMove: false,
			modules: [Controller],
			spaceBetween: 35,
			slidesPerView: 3,
			centeredSlides: true,
		});

		slidesProjects.controller.control = slidesProjectsDots;
	}

	if (document.querySelector('.slider-services__body')) {
	// Создаем слайдер
	new Swiper('.slider-services__body', { 
		modules: [Navigation],
		slidesPerView: 1,
		spaceBetween: 35,
		speed: 800,
		centeredSlides: true,
		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.slider-services .arrow-slider_prev',
			nextEl: '.slider-services .arrow-slider_next',
		},

		// breakpoints: {
		// 	320: {
		// 		slidesPerView: 1,
		// 	},
			// 500: {
			// 	slidesPerView: 1.5,
			// 	spaceBetween: 20,
			// }
		// }
	});
}
}		

if (document.querySelector('.slider-developments__body')) {
	// Создаем слайдер
	new Swiper('.slider-developments__body', { 
		modules: [Navigation, Parallax],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 100,
		speed: 800,
		parallax: true,
		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.slider-developments .arrow-slider_prev',
			nextEl: '.slider-developments .arrow-slider_next',
		},
	});
}
//

if (document.querySelector('.slider-main__body')) {
	// Создаем слайдер
	new Swiper('.slider-main__body', { 
		modules: [Navigation, Pagination],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 100,
		speed: 800,
		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.slider-main .arrow-slider_prev',
			nextEl: '.slider-main .arrow-slider_next',
		},

		pagination: {
			el: '.slider-main__dots',
			clickable: true,
		},
	});
}

//slider-main-blog

if (document.querySelector('.slider-main-blog__body')) {
	// Создаем слайдер
	new Swiper('.slider-main-blog__body', { 
		modules: [Navigation, Pagination, Parallax],
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 100,
		speed: 800,
		parallax: true,
		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.slider-main-blog .arrow-slider_prev',
			nextEl: '.slider-main-blog .arrow-slider_next',
		},

		pagination: {
			el: '.slider-main-blog__dots',
			clickable: true,
		},
	});
}

if (document.querySelector('.slider-news__body')) {
	// Создаем слайдер
	new Swiper('.slider-news__body', { 
		modules: [Navigation],
		observer: true,
		observeParents: true,
		spaceBetween: 100,
		speed: 800,
		// Кнопки "влево/вправо"
		navigation: {
			prevEl: '.slider-news .arrow-slider_prev',
			nextEl: '.slider-news .arrow-slider_next',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.1,
				spaceBetween: 20,
			},
			480: {
				slidesPerView: 1.5,
				spaceBetween: 20,
			},
			570: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			767: {
				slidesPerView: 2.5,
				spaceBetween: 30,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 50,
			},
			1130: {
				slidesPerView: 3,
				spaceBetween: 100,
			},
		},
	});
}
