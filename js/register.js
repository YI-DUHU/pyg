window.onload = function() {
	// 设置验证正则表达式
	var regtel = /1[3|5|7|8|9]\d{9}/;
	var regnc = /^[\u4e00-\u9fa5a-zA-Z\d]{2,6}$/;
	var regqq = /^[1-9]\d{4,9}$/;
	var regdx = /^\d{6}$/;
	var regpwd = /^[0-9a-zA-Z._-]{6,16}$/;
	// 获取元素
	var nc = document.querySelector(".registerarea_bd li:nth-child(1) input");
	var qq = document.querySelector(".registerarea_bd li:nth-child(2) input");
	var tel = document.querySelector(".registerarea_bd li:nth-child(3) input");
	var dx = document.querySelector(".registerarea_bd li:nth-child(4) input");
	var pwd = document.querySelector(".registerarea_bd li:nth-child(5) input");
	var sure_pwd = document.querySelector(".registerarea_bd li:nth-child(7) input");
	var check = document.querySelector(".checkbox input");
	var btn = document.querySelector(".registerarea_bd li:last-child button");
	// 验证
	regexp(tel, regtel);
	regexp(nc, regnc);
	regexp(qq, regqq);
	regexp(dx, regdx);
	regexp(pwd, regpwd);

	// 验证函数
	function regexp(ele, reg) {
		ele.onfocus = function() {
			this.style.border = '2px solid skyblue';
		}
		ele.onblur = function() {
			this.style.border = '2px solid #ccc';
			if (ele.value.trim() !== '') {
				if (reg.test(ele.value)) {
					this.nextElementSibling.className = 'right';
					this.nextElementSibling.innerHTML = '格式正确';
				} else {
					this.nextElementSibling.className = 'wrong';
					this.nextElementSibling.innerHTML = '格式错误';
				}
			} else {
				this.nextElementSibling.innerHTML = '';
			}
		}
	}
	sure_pwd.onfocus = function() {
		this.style.border = '2px solid skyblue';
	}
	sure_pwd.onblur = function() {
		this.style.border = '2px solid #ccc';
		if (this.value.trim() !== '') {
			if (this.value == pwd.value) {
				this.nextElementSibling.className = 'right';
				this.nextElementSibling.innerHTML = '密码正确';
			} else {
				this.nextElementSibling.className = 'wrong';
				this.nextElementSibling.innerHTML = '密码不一致';
			}
		} else {
			this.nextElementSibling.innerHTML = '';
		}
	}
	check.onclick = function() {
		if (check.checked) {
			btn.style.backgroundColor = '#c81623';
		} else {
			btn.style.backgroundColor = '#b4b4b4';
		}
	}

	// btn.onclick = function(e) {
	// 	var spans = document.querySelectorAll(".registerarea_bd span");
	// 	for (var i = 0; i < spans.length -1 ; i++) {
	// 		if (spans[i].className === 'right' && check.checked == true) {
				
	// 		} 
	// 	}
	// }

}
