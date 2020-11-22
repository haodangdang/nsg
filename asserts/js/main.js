var main = {
	init: function () {
		this.initPage();
		this.initHero();
	},
	initPage: function () {
		var self = this;
		var pageSwiper = new Swiper ('.swiper-container', {
		    direction: 'vertical',
		    spaceBetween: 0,
        	slidesPerView: 1,
        	mousewheel: true,
        	hashNavigation: {
	            // 配合控制浏览器的前进后退按钮
	            watchState: true
	        },
	        on: {
	        	slideChangeTransitionEnd: function () {
	        		console.log(this.activeIndex);
	        		$('.nav_item').removeClass('current');
	        		$('.nav_item').eq(this.activeIndex).addClass('current');
	        		// if(this.activeIndex === 1){
	        		// 	self.initHero();
	        		// }
	                // switch(this.realIndex) {
	                // }
	            }
	        }
		}); 
	},
	initHero: function () {
		var heroSwiper = new Swiper ('.hero_list', {
		    autoplay: {
	            delay: 5000,
	            disableOnInteraction: false
	        },
	        loop: true,
	        centeredSlides: true,
	        spaceBetween: 0,
	        slidesPerView: "auto",
	        speed: 1000,
	        // allowTouchMove: false,
	        touchStartForcePreventDefault : false,
	        mousewheel: false,
	        mousewheel: {
	            forceToAxis: true,
	        },
	        loopedSlides: 5
		}); 
		var heroHeadSwiper = new Swiper ('.hero_head', {
		    loop: true,
	        // 点击slide会过渡到这个slide
	        slideToClickedSlide: true,
	        spaceBetween: 50,
	        speed: 800,
	        // 设置slider容器能够同时显示的slides数量
	        slidesPerView: "auto",
	        // 设定为true时，active slide会居中，而不是默认状态下的居左。
	        centeredSlides: true,
	        effect : 'coverflow',
	        // 3D效果切换设置
	        coverflowEffect: {
	            // 做3D旋转时Y轴的旋转角度
	            rotate: 0,
	            // 每个slide之间的拉伸值，越大slide靠得越紧
	            stretch: 10,
	            // slide的位置深度。值越大z轴距离越远，看起来越小。
	            depth: 10,
	            // depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。
	            modifier: 1,
	            // 是否开启slide阴影
	            slideShadows: false
	        },
	        // 左右箭头
	        // navigation: {
	        //     prevEl: ".swiper-arrow-prev",
	        //     nextEl: ".swiper-arrow-next",
	        // },
	        loopedSlides: 5,
	        // 设置为true时,鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
	        grabCursor: true,
		}); 
		// 双向控制
	    heroSwiper.controller.control = heroHeadSwiper;
	    heroHeadSwiper.controller.control = heroSwiper;
	},
}
main.init();