var main = {
	pageSwiper: null,
	init: function () {
		this.initPage();
		this.bind();
		this.initVideo();
		this.initHero();
		this.initFeature();
	},
	bind: function () {
		var self = this;
		$('.nav_item').on('click', function () {
			var index = $(this).index();
			self.pageSwiper.slideTo(index, 500, true);
		})
	},
	initVideo: function () {
		var bv = new Bideo();
		bv.init({
			videoEl: document.querySelector('#intro_video'),
			container: document.querySelector('#video_wrap'),
			resize: true,
			src: [
		      {
		        src: 'asserts/video/loop.mp4',
		        type: 'video/mp4'
		      }
		    ],
		})
	},
	initPage: function () {
		var self = this;
		self.pageSwiper = new Swiper ('.swiper-container', {
		    direction: 'vertical',
		    spaceBetween: 0,
        	slidesPerView: 1,
        	mousewheel: true,
        	preventIntercationOnTransition: true,
        	hashNavigation: {
	            watchState: true
	        },
	        on: {
	        	slideChangeTransitionStart: function () {
	        		$('.nav_item').removeClass('current');
	        		$('.nav_item').eq(this.activeIndex).addClass('current');
	            }
	        }
		}); 
	},
	initHero: function () {
		var heroSwiper = new Swiper ('.hero_list', {
		    autoplay: {
	            delay: 50000,
	            disableOnInteraction: false
	        },
	        loop: true,
	        centeredSlides: true,
	        spaceBetween: 0,
	        slidesPerView: "auto",
	        speed: 1000,
	        touchStartForcePreventDefault : false,
	        mousewheel: false,
	        mousewheel: {
	            forceToAxis: true,
	        },
	        loopedSlides: 5
		}); 
		var heroHeadSwiper = new Swiper ('.hero_head', {
		    loop: true,
	        slideToClickedSlide: true,
	        spaceBetween: 50,
	        speed: 800,
	        slidesPerView: "auto",
	        centeredSlides: true,
	        effect : 'coverflow',
	        coverflowEffect: {
	            rotate: 0,
	            stretch: 10,
	            depth: 10,
	            modifier: 1,
	            slideShadows: false
	        },
	        loopedSlides: 5,
	        grabCursor: true,
		}); 
		// 双向控制
	    heroSwiper.controller.control = heroHeadSwiper;
	    heroHeadSwiper.controller.control = heroSwiper;
	},
	initFeature: function () {
		var self = this;
	    var gameSwiper = new Swiper('.game_feature', {
		    cssMode: true,
		    pagination: {
		        el: '.game_pagination',
		        clickable: true,
		    },
		    mousewheel: true,
		    keyboard: true,
		    autoplay: {
		        delay: 5000,
		        disableOnInteraction: false
		    },
		    loop: true,
		});
	}
}
main.init();