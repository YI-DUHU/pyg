function animate(obj, target, callback) {
	clearInterval(obj.timer); // 解决多个定时器影响动画的bug，这样每次只有一个定时器有效
	obj.timer = setInterval(function() {
		// 变化的步长值  实现缓动动画
		var step = (target - obj.offsetLeft) / 10; // 这个被除数可以任意修改,以提升动画的流畅度
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		if (obj.offsetLeft == target) {
			clearInterval(obj.timer);
			// if (callback) {
			// 	callback();
			// }
			 callback && callback();
		}
		obj.style.left = obj.offsetLeft + step + 'px';
	}, 15);
}
