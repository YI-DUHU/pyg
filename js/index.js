window.addEventListener('load', function() {
	// 动态生成小圆圈
	var dot = document.querySelector('.dot');
	var ul = dot.querySelector('ul');
	var focus = document.querySelector('.focus');
	var focus_pic = document.querySelector('.focus_pic');
	var prev = document.querySelector('.prev');
	var next = document.querySelector('.next');
	var focusWidth = focus.offsetWidth;
	var circle = 0;
	var num = 0;
	var flag = true; // 节流阀标签，为了防止连续点击按钮，动画过快
	for (var i = 0; i < focus_pic.children.length; i++) {
		var li = document.createElement('li');
		li.innerHTML = '<a href="javascript:;"></a>';
		li.firstChild.setAttribute('index', i);
		ul.appendChild(li);
		li.addEventListener('click', function() {
			for (var i = 0; i < ul.children.length; i++) {
				ul.children[i].firstChild.className = '';
			}
			this.firstChild.className = 'current';
			var index = this.firstChild.getAttribute('index');
			// num circle 要跟着index
			num = index;
			circle = index;
			animate(focus_pic, -(focusWidth * index));
		});

	}
	var length = focus_pic.children.length;
	ul.children[0].firstChild.className = 'current';
	dot.style.width = focus_pic.children.length * ul.children[0].offsetWidth + 'px';
	var first = ul.children[0].cloneNode(true);
	first.innerHTML = '<img src="images/focus.png">';
	focus_pic.appendChild(first);
	// 右侧按钮
	next.addEventListener('click', function() {
		if (flag) {
			flag = false;
			if (num == length) {
				num = 0;
				focus_pic.style.left = 0;
			}
			num++;
			animate(focus_pic, -(focusWidth * num), function() {
				flag = true;
			});

			circle++;
			if (circle == length) {
				circle = 0;
			}
			circleChange();
		}
	})
	// 左侧按钮
	prev.addEventListener('click', function() {
		if (flag) {
			flag = false;
			if (num == 0) {
				num = length;
				focus_pic.style.left = -num * focusWidth + 'px';
			}
			num--;
			animate(focus_pic, -(focusWidth * num), function() {
				flag = true;
			});

			circle--;
			if (circle < 0) {
				circle = length - 1;
			}
			circleChange();
		}

	})
	// 封装圆圈切换函数
	function circleChange() {
		for (var i = 0; i < ul.children.length; i++) {
			ul.children[i].firstChild.className = '';
		}
		ul.children[circle].firstChild.className = 'current';
	}
	var timer = setInterval(function() {
		next.click();
	}, 2000);
	focus.addEventListener('mouseover', function() {
		clearInterval(timer);
		timer = null;
	})
	focus.addEventListener('mouseout', function() {
		timer = setInterval(function() {
			next.click();
		}, 2000);
	})

	// 侧边导航栏
	// 节流阀 互斥锁
	var flag = true;

	$(window).scroll(function() {
		if ($(document).scrollTop() >= $(".recom").offset().top) {
			$(".slideBar").fadeIn(200);
		} else {
			$(".slideBar").fadeOut(200);
		}

		if (flag) {
			$(".floor").each(function(i, ele) {
				if ($(document).scrollTop() >= $(ele).offset().top) {
					$(".slideBar li").eq(i).children().addClass("sliderCurrent").parent().siblings().children().removeClass();
				}
			})
		}
	});


	$(".slideBar li").click(function() {
		flag = false;
		var current = $(".floor").eq($(this).index()).offset().top;
		$("body, html").stop().animate({
			scrollTop: current + 100
		}, function() {
		flag = true;
	})
	$(this).children().addClass("sliderCurrent").parent().siblings().children().removeClass();
	})
	//页面刷新自动回到顶部
	window.onbeforeunload = function() {
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}
})
