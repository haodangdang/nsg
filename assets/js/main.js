var main = {
	pageSwiper: null,
	gameVideo: null,
	videoOver: false,
	init: function () {
		var self = this;
		self.initPage();
		self.initHeroSize();
		self.bind();
		self.initVideo();
		self.initHero();
		self.initHeroFly();
		self.initFeature();
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
		$('.close_modal, .about_modal').on('click', function () {
			self.hideModal();
		});
		$('.video_btn').on('click', function () {
			var id = $(this).data('id');
			self.playGameVideo(id);
		});
		$('.close_video').on('click', function () {
			self.gameVideo.pause();
			$('.video_modal').hide();
		})
	},
	initHeroSize: function () {
		var baseW = 1920, baseH = 1080;
		var sw = document.body.clientWidth;
		var sh = document.body.clientHeight;
		var needResize = false;
		var h = baseH, wScale = 1;
		if(sh <= 768){
			var h = 768;
		}else if( sh > 768 && sh <= 810){
			var h = 810;
		}else if(sh > 810 && sw < baseW){
			wScale = baseW / sw;
		}
		var scale = sh / h * wScale;
		var moveX = 50 / scale;
		var dom = document.querySelectorAll('.hero_box_item');
		for (i = 0; i < dom.length; i++) {
			dom[i].style.transform =  `scale(${scale}) translateX(-${moveX}%)`;
		}
	},
	initPage: function () {
		var self = this;
		self.pageSwiper = new Swiper ('.swiper-container', {
		    direction: 'vertical',
		    spaceBetween: 0,
        	// slidesPerView: 1,
        	mousewheel: true,
        	forceToAxis: true,
        	freeMode: false,
        	freeModeSticky : true,
	        on: {
	        	slideChange: function () {
	        		if(this.activeIndex > 0){
	        			$('.arrow_wrap').hide();
	        		}else {
	        			$('.arrow_wrap').show();
	        		}
	        		$('.nav_item').removeClass('current');
	        		$('.nav_item').eq(this.activeIndex).addClass('current');
	            }
	        }
		}); 
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
		        src: 'https://imgs.it2048.cn/nsg/pc/video/intro.mp4',
		        type: 'video/mp4'
		      }
		    ],
		    onLoad: function () {
		    	if(!self.videoOver){
		    		bvloop.init({
						videoEl: document.querySelector('#intro_loop_video'),
						container: document.querySelector('#video_wrap'),
						resize: true,
						src: [
					      {
					        src: 'https://imgs.it2048.cn/nsg/pc/video/loop.mp4',
					        type: 'video/mp4'
					      }
					    ],
					    onLoad: function () {
					    	self.videoOver = true;
					    	self.hideLoading();
			    			bvintro.videoEl.play();
					    }
					});
		    	}
		    }
		});
	},
	playGameVideo: function (index) {
		var self = this;
		// if(self.gameVideo){
		// 	self.gameVideo.dispose();
		// }
		if(!self.gameVideo){
			self.gameVideo = videojs('game_video',{
				controls : true,
				controlBar: {
					pictureInPictureToggle: false
				}
			});
		}
		
		var data = {
		    src: 'https://imgs.it2048.cn/nsg/common/gamevideo/video'+index+'.mp4',
		    type: 'video/mp4'
		};
		self.gameVideo.pause();
		self.gameVideo.src(data);
		self.gameVideo.load(data);
		self.gameVideo.play();
		$('.video_modal').show();
	},
	hideLoading: function () {
		// $('.loading').hide();
		setTimeout(function () {
			$('#video_intro_wrap').hide();
		},700)
	},
	initHero: function () {
		var self = this;
		var heroSwiper = new Swiper ('.hero_list', {
		    autoplay: {
	            delay: 6000000,
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
		var space = document.documentElement.clientWidth * 50 / 1920;
		var heroHeadSwiper = new Swiper ('.hero_head', {
		    loop: true,
	        slideToClickedSlide: true,
	        spaceBetween: space < 50 ? 50 : space,
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
		// 鍙屽悜鎺у埗
	    heroSwiper.controller.control = heroHeadSwiper;
	    heroHeadSwiper.controller.control = heroSwiper;
	},
	initHeroFly: function () {
		new particleCanvas(
        "hero_particle",
        [
            {
                // 鏉愭枡
                "type": {
                    "typeName": "image",
					"url": "https://imgs.it2048.cn/nsg/pc/image/fire/2.png"
                },
                // 鏁伴噺
                "number": 5,
                // 灏哄
                "size": {
                    "min": 30,
                    "max": 80
                },
                // 閫熷害
                "speed": {
                    "min": 2,
                    "max": 12
                },
                // 鍋忕Щ(杩愬姩)瑙掑害
                "angle": {
                    "value": 160,
                    "float": 10
                },
                // 鏃嬭浆
                "rota": {
                    "value": 15,
                    "speed": 0.1,
                    "floatValue": 1,
                    "floatSpeed": 0.2
                },
                "area": {
                    "leftTop": [1300, 100],
                    "rightBottom": [1900, 300]
                },
            },
            {
                // 鏉愭枡
                "type": {
                    "typeName": "image",
					"url": "https://imgs.it2048.cn/nsg/pc/image/fire/1.png"
                },
                // 鏁伴噺
                "number": 2,
                // 灏哄
                "size": {
                    "min": 60,
                    "max": 80
                },
                // 閫熷害
                "speed": {
                    "min": 2,
                    "max": 5
                },
                // 鍋忕Щ(杩愬姩)瑙掑害
                "angle": {
                    "value": 160,
                    "float": 5
                },
                // 鏃嬭浆
                "rota": {
                    "value": 10,
                    "speed": 0.1,
                    "floatValue": 10,
                    "floatSpeed": 0.3
                },
                "area": {
                    "leftTop": [200, 600],
                    "rightBottom": [500, 1000]
                },
            },
            {
                // 鏉愭枡
                "type": {
                    "typeName": "image",
					"url": "https://imgs.it2048.cn/nsg/pc/image/fire/4.png"
                },
                // 鏁伴噺
                "number": 1,
                // 灏哄
                "size": {
                    "min": 360,
                    "max": 380
                },
                // 閫熷害
                "speed": {
                    "min": 5,
                    "max": 7
                },
                // 鍋忕Щ(杩愬姩)瑙掑害
                "angle": {
                    "value": 170,
                    "float": 5
                },
                // 鏃嬭浆
                "rota": {
                    "value": 30,
                    "speed": 0.5,
                    "floatValue": 10,
                    "floatSpeed": 0.3
                },
                "area": {
                    "leftTop": [1000, 600],
                    "rightBottom": [1000, 800]
                },
            },
            {
                // 鏉愭枡
                "type": {
                    "typeName": "image",
					"url": "https://imgs.it2048.cn/nsg/pc/image/fire/3.png"
                },
                // 鏁伴噺
                "number": 3,
                // 灏哄
                "size": {
                    "min": 10,
                    "max": 30
                },
                // 閫熷害
                "speed": {
                    "min": 2,
                    "max": 4
                },
                // 鍋忕Щ(杩愬姩)瑙掑害
                "angle": {
                    "value": 160,
                    "float": 10
                },
                // 鏃嬭浆
                "rota": {
                    "value": 3,
                    "speed": 0.1,
                    "floatValue": 1,
                    "floatSpeed": 0.2
                },
                "area": {
                    "leftTop": [1000, 100],
                    "rightBottom": [1500, 300]
                },
            },
        ]);
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