var main = {
	pageSwiper: null,
	gameVideo: null,
	videoOver: false,
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
	        			$('.nav').show();
	        		}else {
	        			$('.nav').hide();
	        		}
	        		$('.nav_item').removeClass('current');
	        		$('.nav_item').eq(this.activeIndex).addClass('current');
	            },
	          //   slideNextTransitionStart: function () {
	          //   	if(this.activeIndex > 0){
	        		// 	$('.logo, .playvideo_btn').hide();
	        		// }
	          //   },
	          //   slidePrevTransitionEnd: function () {
	          //   	if(this.activeIndex == 0){
	        		// 	$('.logo, .playvideo_btn').show();
	        		// }
	          //   }
	        }
		}); 
	},
	initVideo: function () {
		var self = this;
		var bvintro = new Bideo();
		var bvloop = new Bideo();
		console.log('hihihi111')
		bvintro.init({
			videoEl: document.querySelector('#video_intro'),
			container: document.querySelector('#video_intro_wrap'),
			resize: true,
			autoplay: false,
			src: [
		      {
		        src: '//nsg.bigkraken.com/res/pc/video/intro.mp4',
		        type: 'video/mp4'
		      }
		    ],
		    onLoad: function () {
		    	console.log('hihihi')
		    	if(!self.videoOver){
		    		bvloop.init({
						videoEl: document.querySelector('#intro_loop_video'),
						container: document.querySelector('#video_wrap'),
						resize: true,
						src: [
					      {
					        src: '//nsg.bigkraken.com/res/pc/video/loop.mp4',
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
		    src: '//nsg.bigkraken.com/res/common/gamevideo/video'+index+'.mp4',
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
	            delay: 500000,
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