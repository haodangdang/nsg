var main = {
	pageSwiper: null,
	init: function () {
		this.initPage();
		this.bind();
		this.initVideo();
		// this.initPlayBtn();
		this.initHero();
		this.initFeature();
		
	},
	bind: function () {
		var self = this;
		$('.nav_item').on('click', function () {
			var index = $(this).index();
			self.pageSwiper.slideTo(index, 500, true);
		});
		$('.about_btn').on('click', function () {
			self.showModal();
		});
		$('.close_modal').on('click', function () {
			self.hideModal();
		})
	},
	initPlayBtn: function () {
		var player = new SVGA.Player('#homePlay');
		var parser = new SVGA.Parser('#homePlay'); 
		parser.load('asserts/svga/playbtn.svga', function(videoItem) {
		    player.setVideoItem(videoItem);
		    player.startAnimation();
		})
	},
	initHeroPlay: function (id) {
		console.log('idid', id);
		var player = new SVGA.Player('#'+id);
		var parser = new SVGA.Parser('#'+id); 
		parser.load('asserts/svga/'+id+'.svga', function(videoItem) {
		    player.setVideoItem(videoItem);
		    player.startAnimation();
		})
	},
	initVideo: function () {
		var self = this;
		var bvintro = new Bideo();
		var bvloop = new Bideo();
		bvintro.init({
			videoEl: document.querySelector('#video_intro'),
			container: document.querySelector('#video_intro_wrap'),
			resize: true,
			autoplay: false,
			src: [
		      {
		        src: 'asserts/video/intro.mp4',
		        type: 'video/mp4'
		      }
		    ],
		    onLoad: function () {
		    	bvloop.init({
					videoEl: document.querySelector('#intro_loop_video'),
					container: document.querySelector('#video_wrap'),
					resize: true,
					src: [
				      {
				        src: 'asserts/video/loop.mp4',
				        type: 'video/mp4'
				      }
				    ],
				    onLoad: function () {
				    	self.hideLoading();
		    			bvintro.videoEl.play();
				    }
				});
		    }
		});
	},
	hideLoading: function () {
		$('.loading').hide();
		setTimeout(function () {
			$('#video_intro_wrap').hide();
		},700)
	},
	initPage: function () {
		var self = this;
		self.pageSwiper = new Swiper ('.swiper-container', {
		    direction: 'vertical',
		    spaceBetween: 0,
        	slidesPerView: 1,
        	mousewheel: true,
        	freeModeSticky : true,
	        on: {
	        	slideChangeTransitionStart: function () {
	        		$('.nav_item').removeClass('current');
	        		$('.nav_item').eq(this.activeIndex).addClass('current');
	            }
	        }
		}); 
	},
	initHero: function () {
		var self = this;
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
	        loopedSlides: 5,
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
	},
	showModal: function () {
		$('.about_modal').show();
	},
	hideModal: function () {
		$('.about_modal').hide();
	},
}
main.init();