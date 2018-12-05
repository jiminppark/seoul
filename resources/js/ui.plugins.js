//Polyfill
if (!Object.create) {
	Object.create = function (o) {
		if (arguments.length > 1) {
			throw new Error('Sorry the polyfill Object.create only accepts the first parameter.');
		}
		function F() {}
		F.prototype = o;
		return new F();
	};
}
if (!Array.indexOf){ 
	Array.prototype.indexOf = function(obj){ 
		for(var i=0; i<this.length; i++){ 
			if(this[i]==obj){ return i; } 
		} 
		return -1; 
	}
}
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback,thisArg) {
		var T,k;
		if(this === null) {
			throw new TypeError('error');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if(typeof callback !== "function"){
			throw new TypeError('error');
		}
		if(arguments.length > 1){
			T = thisArg;
		}
		k = 0;
		while(k < len){
			var kValue;
			if(k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}
if (!Array.isArray) {
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === '[object Array]';
	}
}
if (!Object.keys){
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toDtring : null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;
		
		return function(obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non=object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}()); 
}

/*!
  * CodeGhost v1.0.1 
  * Copyright 2018-2018 The CodeGhost Authors (http://github.com/asever77)
  */

//utils module
;(function ($, win, doc, undefined) {
	console.log('plguins.js  ======================================');

	'use strict';

	var global = "$plugins", 
		namespace = "codeGhost.plugins",
		easings = {
			linear : function(t,b,c,d){return c*t/d+b;},
			easeInQuad : function(t,b,c,d){return c*(t/=d)*t+b;},
			easeOutQuad : function(t,b,c,d){return -c*(t/=d)*(t-2)+b;},
			easeInOutQuad : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return -c/2*((--t)*(t-2)-1)+b;},
			easeOutInQuad : function(t,b,c,d){if(t < d/2)return easings.easeOutQuad(t*2,b,c/2,d);return easings.easeInQuad((t*2)-d,b+c/2,c/2,d);},
			easeInCubic : function(t,b,c,d){return c*(t/=d)*t*t+b;},
			easeOutCubic : function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},
			easeInOutCubic : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},
			easeOutInCubic : function(t,b,c,d){if(t<d/2)return easings.easeOutCubic(t*2,b,c/2,d);return easings.easeInCubic((t*2)-d,b+c/2,c/2,d);},
			easeInQuart : function(t,b,c,d){return c*(t/=d)*t*t*t+b;},
			easeOutQuart : function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b;},
			easeInOutQuart : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return -c/2*((t-=2)*t*t*t-2)+b;},
			easeOutInQuart : function(t,b,c,d){if(t<d/2)return easings.easeOutQuart(t*2,b,c/2,d);return easings.easeInQuart((t*2)-d,b+c/2,c/2,d);},
			easeInQuint : function(t,b,c,d){return c*(t/=d)*t*t*t*t+b;},
			easeOutQuint : function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},
			easeInOutQuint : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},
			easeOutInQuint : function(t,b,c,d){if(t<d/2)return easings.easeOutQuint(t*2,b,c/2,d);return easings.easeInQuint((t*2)-d,b+c/2,c/2,d);},
			easeInSine : function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b;},
			easeOutSine : function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},
			easeInOutSine : function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b;},
			easeOutInSine : function(t,b,c,d){if(t<d/2)return easings.easeOutSine(t*2,b,c/2,d);return easings.easeInSine((t*2)-d,b+c/2,c/2,d);},
			easeInExpo : function(t,b,c,d){return (t==0)? b : c*Math.pow(2,10*(t/d-1))+b-c*0.001;},
			easeOutExpo : function(t,b,c,d){return (t==d)? b+c : c*1.001*(-Math.pow(2,-10*t/d)+1)+b;},
			easeInOutExpo : function(t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b-c*0.0005;return c/2*1.0005*(-Math.pow(2,-10*--t)+2)+b;},
			easeOutInExpo : function(t,b,c,d){if(t<d/2)return easings.easeOutExpo(t*2,b,c/2,d);return easings.easeInExpo((t*2)-d,b+c/2,c/2,d);},
			easeInCirc : function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},
			easeOutCirc : function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},
			easeInOutCirc : function(t,b,c,d){if((t/=d/2)<1)return -c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},
			easeOutInCirc : function(t,b,c,d){if (t<d/2)return easings.easeOutCirc(t*2,b,c/2,d);return easings.easeInCirc((t*2)-d,b+c/2,c/2,d);},		
			easeInElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},
			easeOutElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return (a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b);},
			easeInOutElastic : function(t,b,c,d,a,p){if(t==0)return b;if((t/=d/2)==2)return b+c;var s,p=d*(.3*1.5),a=0;var s,p=(!p||typeof(p)!='number')? d*(.3*1.5) : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return -.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},
			easeOutInElastic : function(t,b,c,d,a,p){if (t<d/2)return easings.easeOutElastic(t*2,b,c/2,d,a,p);return easings.easeInElastic((t*2)-d,b+c/2,c/2,d,a,p);},
			easeInBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*(t/=d)*t*((s+1)*t-s)+b;},
			easeOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},
			easeInOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},
			easeOutInBack : function(t,b,c,d,s){if(t<d/2)return easings.easeOutBack(t*2,b,c/2,d,s);return easings.easeInBack((t*2)-d,b+c/2,c/2,d,s);},			
			easeInBounce : function(t,b,c,d){return c-easings.easeOutBounce(d-t,0,c,d)+b;},
			easeOutBounce : function(t,b,c,d){if((t/=d)<(1/2.75))return c*(7.5625*t*t)+b;else if(t<(2/2.75))return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;else if(t<(2.5/2.75))return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;else return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},
			easeInOutBounce : function(t,b,c,d){if(t<d/2)return easings.easeInBounce(t*2,0,c,d)*.5+b;else return easings.easeOutBounce(t*2-d,0,c,d)*.5+c*.5+b;},
			easeOutInBounce : function(t,b,c,d){if(t<d/2)return easings.easeOutBounce(t*2,b,c/2,d);return easings.easeInBounce((t*2)-d,b+c/2,c/2,d);}
		},
		easing;

	//IIFE - device & browser setup check
	(function () {
		var width = document.documentElement.offsetWidth,
			devsize = [1024, 768],
			size_len = devsize.length,
			sizeMode,
			colClass = width > devsize[0] ? 'rsp-d' : width > devsize[1] ? 'rsp-t' : 'rsp-m',
			html5tags = ['article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'nav', 'main', 'section', 'summary'],
			i = 0,
			max = html5tags.length,
			timer;

		deviceSizeClassName(width);

		for (i = 0; i < max; i++) {
			document.createElement(html5tags[i]);
		}

		document.documentElement.className += (' ' + colClass);

		$(win).resize(function () {
			clearTimeout(timer);
			timer = setTimeout(function () {
				width = $(win).outerWidth();

				colClass = width > devsize[0] ? 'rsp-d' : width > devsize[1] ? 'rsp-t' : 'rsp-m';
				$('html').removeClass('rsp-d');
				$('html').removeClass('rsp-t');
				$('html').removeClass('rsp-m').addClass(' ' + colClass);
			}, 100);
		});

		function deviceSizeClassName(w){
			for (var j = 0; j < size_len; j++) {
				if (w > devsize[j]) {
					sizeMode = devsize[j];
					break;
				} else {
					w < devsize[size_len - 1] ? sizeMode = 0 : '';
				}
			}
		}
	})();
	(function () {
		var ua = navigator.userAgent,
			ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
			deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'],
			filter = "win16|win32|win64|mac|macintel",
			uAgent = ua.toLowerCase(),
			deviceInfo_len = deviceInfo.length,
			browser = $.borwser,
			support = $.support,
			device = $.device,
			i = 0,
			version,
			j;

		!browser ? $.browser = browser = {} : '';

		for (i = 0; i < deviceInfo_len; i++) {
			if (uAgent.match(deviceInfo[i]) != null) {
				device = deviceInfo[i];
				break;
			}
		}
		
		browser.local = (/^http:\/\//).test(location.href);
		browser.firefox = (/firefox/i).test(ua);
		browser.webkit = (/applewebkit/i).test(ua);
		browser.chrome = (/chrome/i).test(ua);
		browser.opera = (/opera/i).test(ua);
		browser.ios = (/ip(ad|hone|od)/i).test(ua);
		browser.android = (/android/i).test(ua);
		browser.safari = browser.webkit && !browser.chrome;
		browser.app = ua.indexOf('appname') > -1 ? true : false;

		//touch, mobile 환경 구분
		support.touch = browser.ios || browser.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
		browser.mobile = support.touch && ( browser.ios || browser.android);
		//navigator.platform ? filter.indexOf(navigator.platform.toLowerCase()) < 0 ? browser.mobile = false : browser.mobile = true : '';
		
		//false 삭제
		// for (j in browser) {
		// 	if (!browser[j]) {
		// 		delete browser[j]
		// 	}
		// }
		
		//os 구분
		browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
		browser.os = browser.os ? browser.os[1].toLowerCase() : '';

		//version 체크
		if (browser.ios || browser.android) {
			version = ua.match(/applewebkit\/([0-9.]+)/i);
			version && version.length > 1 ? browser.webkitversion = version[1] : '';
			if (browser.ios) {
				version = ua.match(/version\/([0-9.]+)/i);
				version && version.length > 1 ? browser.ios = version[1] : '';
			} else if (browser.android) {
				version = ua.match(/android ([0-9.]+)/i);
				version && version.length > 1 ? browser.android = parseInt(version[1].replace(/\./g, '')) : '';
			}
		}


		if (ie) {
			browser.ie = ie = parseInt( ie[1] || ie[2] );
			browser.oldie = false;
			browser.ie9 = false;
			( 9 > ie ) ? browser.oldie = true : ( 9 == ie ) ? browser.ie9 = true : '';
			( 11 > ie ) ? support.pointerevents = false : '';
			( 9 > ie ) ? support.svgimage = false : '';
		} else {
			browser.ie = false;
			browser.oldie = false;
			browser.ie9 = false;
		}

		//class 생성
		$('html')
		.addClass(browser.os)
		.addClass(browser.chrome? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : '')
		.addClass(browser.ie && 8 > browser.ie ? 'oldie' : '')
		.addClass(browser.ios ? "ios" : browser.android ? "android" : '')
		.addClass(browser.mobile ? 'ui-m' : 'ui-d')
		.addClass(browser.app ? 'ui-a' : '');
	})();

	//requestAnimationFrame
	win.requestAFrame = (function () {
		return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame ||
			//if all else fails, use setTimeout
			function (callback) {
				return win.setTimeout(callback, 1000 / 60); //shoot for 60 fp
			};
	})();
	win.cancelAFrame = (function () {
		return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame ||
			function (id) {
				win.clearTimeout(id);
			};
	})();

	//jquery easing add
	for (easing in easings) {
		$.easing[easing] = (function(easingname) {
			return function(x, t, b, c, d) {
				return easings[easingname](t, b, c, d);
			}
		})(easing);
	}

	//function
	function uiNameSpace(identifier, module){
		if (identifier === undefined) {
			return false;
		}
		
		var w = win, 
			name = identifier.split('.'), 
			p;
	
		if (!!identifier) {
			for (var i = 0; i < name.length; i += 1) {
				!w[name[i]] ? (i === 0) ? w[name[i]] = {} : w[name[i]] = {} : '';
				w = w[name[i]];
			}
		}
		if (!!module) {
			for (p in module) {
				if (!w[p]) {
					w[p] = module[p];
				} else {
					throw new Error('module already exists! >> ' + p);
				}
			}
		}
		return w;
	}
	function uiComma(n) {
		var parts = n.toString().split(".");
			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
	}
	function partsAdd0(x, y, z) {
		//숫자 한자리수 일때 0 앞에 붙이기
		var y = y === undefined ? 10 : y,
			z = z === undefined ? '0' : z;

		return ((x < 10) ? z + x : x);
	}

	//global namespace
	if (!!win[global]) {
		throw new Error("already exists global!> " + global);
	} else {
		win[global] = uiNameSpace(namespace, {});
	}

	//components option
	win[global].option = {
		keys: { 
			'tab': 9, 'enter': 13, 'alt': 18, 'esc': 27, 'space': 32, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'left': 37, 'up': 38, 'right': 39, 'down': 40,
		},
		//http://cubic-bezier.com - css easing effect
		effect: {
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			easeIn: '0.420, 0.000, 1.000, 1.000',
			easeOut: '0.000, 0.000, 0.580, 1.000',
			easeInOut: '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		}
	};

	/* ------------------------------------------------------------------------
	 * common components
	 * - consoleGuide
	 * - ajax
	 * - scroll move
	 * - paramiter check
	 * - is scroll?
	 * - focus tab check
	 * - window popup
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiConsoleGuide: function (opt) {
			return createUiConsoleGuide(opt);
		},
		uiAjax: function (opt) {
			return createUiAjax(opt);
		},
		uiScroll: function (opt) {
			return createUiScroll(opt);
		},
		uiPara: function (v) {
			return createUiPara(v);
		},
		uiHasScrollBar: function (opt) {
			return createUiHasScrollBar(opt);
		},
		uiFocusTab: function (opt) {
			return createUiFocusTab(opt);
		},
		uiPopup: function (opt) {
			return createUiPopup(opt);
		}
	});
	function createUiConsoleGuide(opt) {
		if (!$.browser.ie) {
			console.log('');
			for (var i = 0; i < opt.length; i++) {
				(i === 0) ? console.log("%c" + opt[i], "background:#333; color:#ffe400; font-size:12px"): console.log(opt[i]);
			}
			console.log('');
		}
	}
	win[global].uiAjax.option = {
		page: true,
		add: false,
		prepend: false,
		type: 'GET',
		callback: false,
		errorCallback: false
	};
	function createUiAjax(opt) {
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiAjax({ id:'아이디명', url:'링크주소', add:true/false, page:true/false, callback:function(){...} );",
				"- id: #을 제외한 아이디명만 입력(!필수)",
				"- url: 링크 주소 입력(!필수)",
				"- page: true일 경우 html추가 및 값 전달, false일 경우 값만 전달, (!선택 - 기본값 true)",
				"- add: false일 경우 삭제추가, true일 경우 추가(!선택 - 기본값 false)",
				"- callback: 콜백함수 (!선택)",
			]);
			return false;
		}

		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiAjax.option, opt),
			$id = $('#' + opt.id),
			callback = opt.callback === undefined ? false : opt.callback,
			errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;

		$.ajax({
			type: opt.type,
			url: opt.url,
			cache: false,
			async: false, //비동기 통신 여부 
			headers: {
				"cache-control": "no-cache",
				"pragma": "no-cache"
			},
			error: function (request, status, err) {
				errorCallback ? errorCallback() : '';
			},
			success: function (result) {
				opt.page ? opt.add ? opt.prepend ? $id.prepend(result) : $id.append(result) : $id.html(result) : '';
				callback ? callback(result) : '';
			}
		});
	}
	win[global].uiScroll.option = {
		value: 0,
		speed: 0,
		callback: false,
		ps: 'top',
		focus: false,
		target: false
	};
	function createUiScroll(opt){
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiScroll({ value:0, speed:600, focus:'#name', callback:function(){...} );",
				"- value: 움직일 위치값(!선택 - 기본값 0)",
				"- speed: 속도(!선택 - 기본값 600)",
				"- p: 방향(!선택 - 기본값 'top')",
				"- focus: 포커스이동  (!선택)",
				"- callback: 콜백함수 (!선택)"
			]);
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiScroll.option, opt),
			v = opt.value,
			s = opt.speed,
			c = opt.callback,
			p = opt.ps,
			overlap = false,
			f = typeof opt.focus === 'string' ? '#' + opt.focus : opt.focus,
			$target = opt.target === false ? $('html, body') : opt.target;
		
		if (p === 'top') {
			$target.stop().animate({ 
				scrollTop : v 
			}, { 
				duration: s,
				step: function(now) { 
					!!c && now !== 0 ? c({ scrolltop:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					if (overlap) {
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? $(f).attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		} else if (p === 'left') {
			$target.stop().animate({ 
				scrollLeft : v 
			}, { 
				duration: s,
				step: function(now) { 
					!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					if (overlap) {
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? $(f).attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		}
	}
	function createUiPara(paraname){
		var _tempUrl = win.location.search.substring(1),
			_tempArray = _tempUrl.split('&'),
			_tempArray_len = _tempArray.length,
			_keyValue;

		for (var i = 0, len = _tempArray_len; i < len; i++) {
			_keyValue = _tempArray[i].split('=');

			if (_keyValue[0] === paraname) {
				return _keyValue[1];
			}
		}
	}
	function createUiHasScrollBar(opt) {
		var $this = opt.selector;
		return ($this.prop('scrollHeight') == 0 && $this.prop('clientHeight') == 0) || ($this.prop('scrollHeight') > $this.prop('clientHeight'));
	}
	win[global].uiFocusTab.option = {
		focusitem : '.ui-select-tit, iframe, a:not([data-disabled]), button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), label, [role="button"]',
		callback: false,
		focusnot: false,
		type: 'hold' //'hold', 'sense'
	};
	function createUiFocusTab(opt){
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiFocusHold({ id:'css셀렉트' );",
				"- selector: css셀렉터 형식 예) '#aaa', '.aa .bb' ...(!필수)",
				"※  지정한 특정영역에서 tab 이동 시 포커스 홀딩 "
			]);
			return false;
		}
		
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiFocusTab.option, opt),
			$focus = $(opt.selector),
			$item = $focus.find(opt.focusitem),
			callback = opt.callback,
			focusnot = opt.focusnot,
			type = opt.type,
			timer; 

		if (!!$item.length) {
			$item.eq(0).addClass('ui-fctab-s').attr('tabindex', 0).attr('holds', true);
			$item.eq(-1).addClass('ui-fctab-e').attr('tabindex', 0).attr('holde', true);
		} else {
			$focus.prepend('<div class="ui-fctab-s" tabindex="0" holds="true"></div>');
			$focus.append('<div class="ui-fctab-e" tabindex="0" holde="true"></div>');
			$item = $focus.find('.ui-fctab-s, .ui-fctab-e');
		}
		
		clearTimeout(timer);
		timer = setTimeout(function(){
			!focusnot ? $item.eq(0).focus() : '';
		},0);
		timer = '';

		$focus.find('.ui-fctab-s').off('keydown.holds').on('keydown.holds', function (e) {
			if (type === 'hold') {
				if (e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-e').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(e.shiftKey && e.keyCode == 9) ? callback('before') : '';
			}
		});
		$focus.find('.ui-fctab-e').off('keydown.holde').on('keydown.holde', function (e) {
			if (type === 'hold') {
				if (!e.shiftKey && e.keyCode == 9) {
					e.preventDefault();
					$focus.find('.ui-fctab-s').focus();
				}
			} else if (type === 'sense') {
				$focus.off('keydown.holds');
				(!e.shiftKey && e.keyCode == 9) ? callback('after') : '';
			}
		});
	}
	win[global].uiPopup.option = {
		name: 'new popup',
		width: 790,
		height: 620,
		align: 'center',
		top: 0,
		left: 0,
		toolbar: 'no',
		location: 'no',
		memubar: 'no',
		status: 'no',
		resizable: 'no',
		scrolbars: 'yes'
	};
	function createUiPopup(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiPopup.option, opt),
			specs;

		if (opt.align === 'center') {
			opt.left = ($(win).outerWidth() / 2) - (opt.width / 2);
			opt.top = ($(win).outerHeight() / 2) - (opt.height / 2);
		}

		specs = 'width=' + opt.width + ', height='+ opt.height + ', left=' + opt.left + ', top=' + opt.top;
		specs += ', toolbar=' + opt.toolbar + ', location=' + opt.location + ', resizable=' + opt.resizable + ', status=' + opt.status + ', menubar=' + opt.menubar + ', scrollbars=' + opt.scrollbars;
		
		win.open(opt.link, opt.name , specs);
	}


	/* ------------------------------------------------------------------------
	 * cookie set & get & del v1.1 
	 * date : 2018-07-28
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiCookieSet: function (opt) {
			return creaeteUiCookieSet(opt);
		},
		uiCookieGet: function (opt) {
			return creaeteUiCookieGet(opt);
		},
		uiCookieDel: function (opt) {
			return creaeteUiCookieDel(opt);
		}
	});
	function creaeteUiCookieSet(opt){
		var cookieset = opt.name + '=' + opt.value + ';',
			expdate;
		if (opt.term) {
			expdate = new Date();
			expdate.setTime( expdate.getTime() + opt.term * 1000 * 60 * 60 * 24 ); // term 1 is a day
			cookieset += 'expires=' + expdate.toGMTString() + ';';
		}
		(opt.path) ? cookieset += 'path=' + opt.path + ';' : '';
		(opt.domain) ? cookieset += 'domain=' + opt.domain + ';' : '';
		document.cookie = cookieset;
	}
	function creaeteUiCookieGet(opt){
		var match = ( document.cookie || ' ' ).match( new RegExp(opt.name + ' *= *([^;]+)') );
		return (match) ? match[1] : null;
	}
	function creaeteUiCookieDel(opt){
		var expireDate = new Date();

		expireDate.setDate(expireDate.getDate() + -1);
		win[global].uiCookieSet({ name:opt.name, term:'-1' });
	}
	
	/* ------------------------------------------------------------------------
	 * accordion tab v1.0 
	 * $plugins.uiAccordion
	 * date : 2018-04-21
	 * option
	 * - id : 'name' / [string]
	 * - current : [0,0,...] or null or 'all' / [array] 복수선택 가능, null(기본값)인 경우 전체 닫힌상태, 'all'인 경우 전체 열린상태"
	 * - autoclose : true or false / [boolean] true(기본)일 경우 단일 열림으로 다른 아이템은 닫힘
	 * - callback : 함수실행문 / [function] 아코디언 열리고 닫힐때마다 콜백 실행
	 ------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiAccordion: function (opt) {
			return createUiAccordion(opt);
		},
		uiAccordionToggle: function (opt) {
			return createUiAccordionToggle(opt);
		}
	});
	win[global].uiAccordion.option = {
	 	current: null,
		autoclose: false,
		callback: false,
		level: 3
	};
	function createUiAccordion(opt){
		//option guide
		if (opt === undefined || !$('#' + opt.id).length) {
			return false;
		}
		var opt = $.extend(true, {}, win[global].uiTab.option, opt),
			id = opt.id,
			current = opt.current,
			callback = opt.callback,
			autoclose = opt.autoclose,
			level = opt.lavel,
			$acco = $('#' + id),
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl = $wrap.children('.ui-acco-pnl'),
			$tit = $wrap.children('.ui-acco-tit'),
			$btn = $tit.find('.ui-acco-btn'),
			len = $wrap.length, 
			keys = win[global].option.keys,
			i = 0, 
			optAcco;
		
		//set up
		!$pnl ? $pnl = $tit.children('.ui-acco-pnl') : '';
		$acco
			.attr('role','presentation')
			.data('opt', { 
				id:id, 
				close: autoclose, 
				callback: callback
			});
		$tit.attr('role','heading')
			.attr('aria-level', level);
		$pnl.attr('role','region');

		for (i = 0; i < len; i++) {
			var $accobtn = $wrap.eq(i).find('> .ui-acco-tit > .ui-acco-btn'),
				$accotit = $wrap.eq(i).find('> .ui-acco-tit'),
				$accopln = $wrap.eq(i).find('> .ui-acco-pnl');
			
			!$accopln ? $accopln = $accotit.children('.ui-acco-pnl') : '';
			$accotit.attr('id') === undefined ? $accobtn.attr('id', id + '-btn' + i) : '';
			$accopln.attr('id') === undefined ? $accopln.attr('id', id + '-pnl' + i) : '';
			
			$accobtn
				.data('selected', false)
				.attr('data-n', i)
				.attr('data-len', len)
				.attr('aria-expanded', false)
				.attr('aria-controls', $accopln.attr('id'))
				.removeClass('selected')
				.find('.ui-acco-txt').text('열기');
			$accopln
				.attr('data-n', i)
				.attr('data-len', len)
				.attr('aria-labelledby', $accobtn.attr('id'))
				.attr('aria-hidden', true).hide();

			i === 0 ? $accobtn.attr('acco-first', true) : '';
			i === len - 1 ? $accobtn.attr('acco-last', true) : ''
		}
		
		current !== null ? 
			win[global].uiAccordionToggle({ 
				id: id, 
				current: current, 
				motion: false 
			}) : '';

		//event
		$btn
			.off('click.uitab keydown.uitab')
			.on({
				'click.uitab': evtClick,
				'keydown.uitab': evtKeys
			});

		function evtClick(e) {
			if (!!$(this).closest('.ui-acco-wrap').find('.ui-acco-pnl').length) {
				e.preventDefault();
				var $this = $(this);

				optAcco = $this.closest('.ui-acco').data('opt');
				win[global].uiAccordionToggle({ 
					id: optAcco.id, 
					current: [$this.data('n')], 
					close: optAcco.close, 
					callback: optAcco.callback
				});
			}
		}
		function evtKeys(e) {
			var $this = $(this),
				n = Number($this.data('n')),
				m = Number($this.data('len')),
				id = $this.closest('.ui-acco').attr('id');

			switch(e.keyCode){
				case keys.up: upLeftKey(e);
				break;

				case keys.left: upLeftKey(e);
				break;

				case keys.down: downRightKey(e);
				break;

				case keys.right: downRightKey(e);
				break;

				case keys.end: endKey(e);
				break;

				case keys.home: homeKey(e);
				break;
			}

			function upLeftKey(e) {
				e.preventDefault();
				
				!$this.attr('acco-first') ?
				$('#' + id + '-btn' + (n - 1)).focus():
				$('#' + id + '-btn' + (m - 1)).focus();
			}
			function downRightKey(e) {
				e.preventDefault();

				!$this.attr('acco-last') ? 
				$('#' + id + '-btn' + (n + 1)).focus():
				$('#' + id + '-btn0').focus();
			}
			function endKey(e) {
				e.preventDefault();

				$('#' + id + '-btn' + (m - 1)).focus();
			}
			function homeKey(e) {
				e.preventDefault();
				$('#' + id + '-btn0').focus();
			}
		}
	}
	function createUiAccordionToggle(opt){
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiAccordionToggle({ id:'name', current:[0,1], motion:false, state:'open', callback:function(v){...} });",
				"- id [String]: #을 제외한 아이디명만 입력 (!필수)",
				"- current [Array]: [0,1,2] 복수선택 가능, null 인 경우 무선택 (!선택, 기본 0)",
				"- state [String]: 'toggle'일 토글, 'open' 열림 , 'close' 닫힘 .(!선택- 기본 toggle)",
				"- motion [Boolean]: true 일 경우 animate효과, false 일 경우 모션없음 (!선택, -기본 true)",
				"- callback [Function]: 콜백함수 실행 (!선택)",
				"※ 아코디언 탭"
			]);
			return false;
		}
		
		var id = opt.id,
			$acco = $('#' + id),
			dataOpt = $acco.data('opt'),
			current = opt.current === undefined ? null : opt.current,
			callback = opt.callback === undefined ? dataOpt.callback : opt.callback,
			state = opt.state === undefined ? 'toggle' : opt.state,
			motion = opt.motion === undefined ? true : opt.motion,
			autoclose = dataOpt.close,
			allshow = opt.allshow,
			allhide = opt.allhide,
			open = null,
			$wrap = $acco.children('.ui-acco-wrap'),
			$pnl,
			$tit,
			$btn,
			len = $wrap.length,
			speed = 200,
			i, c = 0;
		
		(motion === false) ? speed = 0 : speed = 200;

		if (current !== 'all') {
			for (i = 0 ; i < current.length; i++) {
				$pnl = $wrap.eq(current[i]).children('.ui-acco-pnl');
				$tit = $wrap.eq(current[i]).children('.ui-acco-tit');
				$btn = $tit.find('.ui-acco-btn');
				
				if (state === 'toggle') {
					(!$btn.data('selected')) ? act('down') : act('up');
				} else {
					(state === 'open') ? act('down') : (state === 'close') ? act('up') : '';
				}
			}
			!!callback ? callback({ id:id, open:open, current:current}): '';
		} else if (current === 'all') {
			checking();
		}

		function checking() {
			//열린상태 체크하여 전체 열지 닫을지 결정
			c = 0;
			$wrap.each(function(i){
				c = ($wrap.eq(i).find('> .ui-acco-tit .ui-acco-btn').attr('aria-expanded') === 'true') ? c + 1 : c + 0;
			});
			//state option 
			if (state === 'open') {
				c = 0;
				$acco.data('allopen', false);
			} else if (state === 'close') {
				c = len;
				$acco.data('allopen', true);
			}
			//all check action
			if (c === 0 || !$acco.data('allopen')) {
				$acco.data('allopen', true);
				act('down');
			} else if (c === len || !!$acco.data('allopen')) {
				$acco.data('allopen', false);
				act('up');
			}
		}
		//모션
		function act(v) {
			var isDown = v === 'down',
				a = isDown ? true : false, 
				cls = isDown ? 'addClass' : 'removeClass', 
				updown = isDown ? 'slideDown' : 'slideUp',
				txt = isDown ? '닫기' : '열기';
			
			open = isDown ? true : false;

			if (autoclose === true && isDown) {
				$wrap.each(function(i){
					$wrap
						.eq(i)
						.find('> .ui-acco-tit .ui-acco-btn')
						.data('selected', false)
						.removeClass('selected')
						.attr('aria-expanded', false)
						.find('.ui-acco-txt')
						.text('열기');
					$wrap
						.eq(i)
						.find('> .ui-acco-pnl')
						.attr('aria-hidden',true)
						.stop()
						.slideUp(speed);
				});
			}
			if (current === 'all') {
				$wrap.each(function(i){
					$wrap
						.eq(i)
						.find('> .ui-acco-tit .ui-acco-btn')
						.data('selected', a)[cls]('selected')
						.attr('aria-expanded', a)
						.find('.ui-acco-txt')
						.text(txt);
					$wrap
						.eq(i)
						.find('> .ui-acco-pnl')
						.attr('aria-hidden', !a)
						.stop()
						[updown](speed, function(){
							// 초기화
							$(this).css({ 
								height: '', 
								padding: '', 
								margin: '' 
							}); 
						});
				});
			} else {
				$btn
					.data('selected', a)
					.attr('aria-expanded', a)
					[cls]('selected')
					.find('.ui-acco-txt')
					.text(txt);
				$pnl
					.attr('aria-hidden', !a)
					.stop()
					[updown](speed, function(){
						// 초기화
						$(this).css({ 
							height: '', 
							padding: '', 
							margin: '' 
						}); 
					});
			}
		}
	}

	/* ------------------------------------------------------------------------
	 * dropdown v2.0 
	 * date : 2018-08-15
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiDropdown: function (opt) {
			return createUiDropdown(opt);
		},
		uiDropdownToggle: function (opt) {
			return createUiDropdownToggle(opt);
		},
		uiDropdownHide: function () {
			return createUiDropdownHide();
		},
	});
	win[global].uiDropdown.option = {
		eff: 'base',
		ps: 'bl',
		hold: true,
		back_close: true,
		_offset: false,
		_close: true,
		_expanded: false,
		eff_ps: 10,
		eff_speed: 100
	};
	function createUiDropdown(opt){
		if (opt === undefined) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiDropdown.option, opt),
			id = opt.id,
			eff = opt.eff,
			ps = opt.ps,
			hold = opt.hold,
			back_close = opt.back_close,
			_offset = opt._offset,
			_close = opt._close,
			_expanded = opt._expanded,
			eff_ps = opt.eff_ps,
			eff_speed = opt.eff_speed,

			$btn = $('#' + id),
			$pnl = $('[data-id="'+ id +'"]'); 
				
		//set up
		$btn.attr('aria-expanded', false)
			.data('opt', { 
				id: id, 
				eff: eff, 
				ps: ps,
				hold: hold, 
				_offset: _offset, 
				_close :_close, 
				_expanded: _expanded,
				eff_ps: eff_ps,
				eff_speed: eff_speed

			});
		$pnl.attr('aria-hidden', true).attr('aria-labelledby', id).addClass(ps)
			.data('opt', { 
				id: id, 
				eff: eff, 
				ps: ps,
				hold: hold, 
				_offset: _offset, 
				_close: _close, 
				_expanded: _expanded,
				eff_ps: eff_ps,
				eff_speed: eff_speed
			});
		
		//event
		$btn.off('click.dropdown').on('click.dropdown', function(e){
			action(this);
		});
		$(doc)
		.off('click.dropdownclose').on('click.dropdownclose', '.ui-drop-close', function(e){
			var pnl_opt = $('#' + $(this).closest('.ui-drop-pnl').data('id')).data('opt');

			pnl_opt._expanded = true;
			win[global].uiDropdownToggle({ id: pnl_opt.id });
			$('#' + pnl_opt.id).focus();
		})
		.off('click.bd').on('click.bd', function(e){
			//dropdown 영역 외에 클릭 시 판단
			if (!!$('body').data('dropdownOpened')){
				if ($('.ui-drop-pnl').has(e.target).length < 1) {
					win[global].uiDropdownHide();
				}
			}
		});

		!back_close ? $(doc).off('click.bd') : '';

		function action(t) {
			var $this = $(t),
				btn_opt = $this.data('opt');

			$this.data('sct', $(doc).scrollTop());
			win[global].uiDropdownToggle({ id: btn_opt.id });
		}
	}
	function createUiDropdownToggle(opt){
		if (opt === undefined) {
			return false;
		}
		
		var id = opt.id,
			$btn = $('#' + id),
			$pnl = $('.ui-drop-pnl[data-id="'+ id +'"]'),
			defaults = $btn.data('opt'),
			opt = $.extend(true, {}, defaults, opt),
			eff = opt.eff,
			ps = opt.ps,
			hold = opt.hold,
			_offset = opt._offset,
			_close = opt._close,
			_expanded =  $btn.attr('aria-expanded'),
			eff_ps = opt.eff_ps, 
			eff_speed = opt.eff_speed,
			is_modal = !!$btn.closest('.ui-modal').length,
			btn_w = Math.ceil($btn.outerWidth()),
			btn_h = Math.ceil($btn.outerHeight()),
			btn_t = Math.ceil($btn.position().top),
			btn_l = Math.ceil($btn.position().left),
			pnl_w = Math.ceil($pnl.outerWidth()),
			pnl_h = Math.ceil($pnl.outerHeight());

		//_offset: ture 이거나 modal안의 dropdown 일때 position -> offset 으로 위치 값 변경
		if (_offset || is_modal) {
			btn_t = Math.ceil($btn.offset().top);
			btn_l = Math.ceil($btn.offset().left);
			is_modal ? btn_t = btn_t - $(win).scrollTop(): '';
		}

		_expanded === 'false' ? pnlShow(): pnlHide();

		function pnlShow(){
			var org_t, 
				org_l,
				drop_inner = $btn.closest('.ui-drop-pnl').data('id');
			
			//다른 dropdown 닫기가 활성화일때
			if (_close) {
				//dropdown in dropdown 인 경우
				if (!!drop_inner) {
					$('.ui-drop').not('#' + drop_inner).attr('aria-expanded', false);
					$('.ui-drop-pnl').not('[data-id="' + drop_inner +'"]').attr('aria-hidden', true).attr('tabindex', -1).removeAttr('style');
				} else {
					win[global].uiDropdownHide();
				}
			}

			$btn.attr('aria-expanded', true);
			$pnl.attr('aria-hidden', false).attr('tabindex', 0);

			//focus hold or sense
			hold ?	
				win[global].uiFocusTab({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'hold' }):
				win[global].uiFocusTab({ selector:'.ui-drop-pnl[data-id="'+ id +'"]', type:'sense', callback:pnlHide });

			switch (ps) {
				case 'bl': $pnl.css({ top: btn_t + btn_h, left: btn_l }); 
					break;
				case 'bc': $pnl.css({ top: btn_t + btn_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
					break;
				case 'br': $pnl.css({ top: btn_t + btn_h, left: btn_l - (pnl_w - btn_w) }); 
					break;
				case 'tl': $pnl.css({ top: btn_t - pnl_h, left: btn_l }); 
					break;
				case 'tc': $pnl.css({ top: btn_t - pnl_h, left: btn_l - ((pnl_w - btn_w) / 2) }); 
					break;
				case 'tr': $pnl.css({ top: btn_t - pnl_h, left: btn_l - (pnl_w - btn_w) }); 
					break;
				case 'rt': $pnl.css({ top: btn_t, left: btn_l + btn_w }); 
					break;
				case 'rm': $pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left:  btn_l + btn_w  }); 
					break;
				case 'rb': $pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l + btn_w }); 
					break;
				case 'lt': $pnl.css({ top: btn_t, left: btn_l - pnl_w }); 
					break;
				case 'lm': $pnl.css({ top: btn_t - ((pnl_h - btn_h) / 2), left: btn_l - pnl_w  }); 
					break;
				case 'lb': $pnl.css({ top: btn_t - (pnl_h - btn_h), left: btn_l - pnl_w }); 
					break; 
			}
			
			org_t = parseInt($pnl.css('top')),
			org_l = parseInt($pnl.css('left'));
			
			switch (eff) {
				case 'base': $pnl.stop().show(0); 
					break;
				case 'fade': $pnl.stop().fadeIn(eff_speed); 
					break;
				case 'st': $pnl.css({ top: org_t - eff_ps, opacity: 0, display: 'block' }).stop().animate({ top: org_t, opacity: 1 }, eff_speed); 
					break;
				case 'sb': $pnl.css({ top: org_t + eff_ps, opacity: 0, display: 'block' }).stop().animate({ top: org_t, opacity: 1 }, eff_speed); 
					break;
				case 'sl': $pnl.css({ left: org_l + eff_ps, opacity: 0, display: 'block' }).stop().animate({ left: org_l, opacity: 1 }, eff_speed); 
					break;
				case 'sr': $pnl.css({ left: org_l - eff_ps, opacity: 0, display: 'block' }).stop().animate({ left: org_l, opacity: 1 }, eff_speed); 
					break;
			}

			setTimeout(function(){
				$('body').data('dropdownOpened',true).addClass('dropdownOpened');
			},0);
		}
		function pnlHide(){
			var org_t = parseInt($pnl.css('top')),
				org_l = parseInt($pnl.css('left'));
			
			if ($pnl.closest('.ui-drop-box').length < 1) {
				$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
			}
			$btn.attr('aria-expanded', false).focus();
			$pnl.attr('aria-hidden', true).attr('tabindex', -1);
			
			switch (eff) {
				case 'base': $pnl.stop().hide(0, pnlHideEnd); 
					break;
				case 'fade': $pnl.stop().fadeout(eff_speed, pnlHideEnd); 
					break;
				case 'st': $pnl.stop().animate({ top: org_t - eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sb': $pnl.stop().animate({ top: org_t + eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sl': $pnl.stop().animate({ left: org_l + eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
				case 'sr': $pnl.stop().animate({ left: org_l - eff_ps, opacity: 0 }, eff_speed, pnlHideEnd); 
					break;
			}

			function pnlHideEnd(){
				$pnl.hide().removeAttr('style'); 
			}
		}
	}
	function createUiDropdownHide(){
		$('body').data('dropdownOpened',false).removeClass('dropdownOpened');
		$('.ui-drop').attr('aria-expanded', false);
		$('.ui-drop-pnl').attr('aria-hidden', true).attr('tabindex', -1).removeAttr('style');
	}

	/* ------------------------------------------------------------------------
	 * date picker v1.0 
	 * $plugins.uiDatePicker
	 * date : 2018-08-15
	 * option : 
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiDatePicker: function (opt) {
			return createUiDatePicker(opt);
		}
	});
	win[global].uiDatePicker.option = {
		selector: '.ui-datepicker',
		date_split: '-',
		callback: function(v){ console.log(v) },
		shortDate: false, //DDMMYYYY
		dateMonths: new Array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'),
		weekDay: new Array('일', '월', '화', '수', '목', '금', '토'),
		remove: false
	};
	function createUiDatePicker(opt){
		var opt = $.extend(true, {}, win[global].uiDatePicker.option, opt),

			date_split = opt.date_split,
			selector = opt.selector,
			callback = opt.callback,
			dateMonths = opt.dateMonths,
			weekDay = opt.weekDay,
			shortDate = opt.shortDate,
			remove = opt.remove,

			$datepicker = $(selector),
			date = new Date(),
			dateToday = date,
			calVar;

		$datepicker.data('opt', { callback: callback, shortDate: shortDate });

		//이달의 날짜 텍스트화
		function textDate(d, m, y, whatday) {
			var text_date = new Date(y, m - 1, d);
			
			if (whatday === true) {
				//요일 추가
				return (text_date.getFullYear() + date_split + dateMonths[text_date.getMonth()] + date_split + partsAdd0(text_date.getDate()) + " (" + weekDay[text_date.getDay()] + ")");
			} else {
				return (text_date.getFullYear() + date_split + dateMonths[text_date.getMonth()] + date_split + partsAdd0(text_date.getDate()));
			}
		}

		//사용여부확인 필요
		function subtractDate(oneDate, anotherDate) { 
			return (anotherDate - oneDate); 
		}

		//DD.MM.YYYY 순으로 정렬
		function toDDMMYYY(d) {
			var d = new Date(d);
			return (partsAdd0(d.getDate()) + date_split + partsAdd0(d.getMonth() + 1) + date_split + d.getFullYear());
		}
		//input에 출력
		function writeInputDateValue(calendarEl, obj) {
			var d = $(obj).data("day"),
				id = calendarEl.inputId,
				opt = $("#" + id).closest('.ui-datepicker').data('opt');

			calendarEl.shortDate ? d = toDDMMYYY(d) : ''; //DD.MM.YYYY로 설정

			$("#" + id).val(d);
			!!opt.callback ? opt.callback({ id:id, value:d }): '';
		}

		function calendarObject(opt) {
			this.calId = opt.calId;
			this.inputId = opt.inputId;
			this.buttonId = opt.buttonId;
			this.shortDate = opt.shortDate;
		}

		//사용여부확인 필요
		function matchToday() {
			$('.tbl-datepicker button').each(function () {
				var $this = $(this);

				$this.data('day') === $('.datepicker-wrap .today button.today').data('day') ?
					$this.attr('title', $this.attr('title')+' (오늘)').addClass('today') : '';
			});
		}

		//달력 Build
		function buildCalendar(date, calendarEl, v) {
			var inp_val = $('#' + calendarEl.inputId).val(),
				nVal = inp_val.split(date_split),
				generate = v === 'generate' ? true : false,
				day = !generate ? date.getDate() : inp_val === '' ? date.getDate() : Number(nVal[2]),
				month = !generate ? date.getMonth() : inp_val === '' ? date.getMonth() : Number(nVal[1] - 1),
				year = !generate ? date.getFullYear() : inp_val === '' ? date.getFullYear() : Number(nVal[0]),
				thisMonth = new Date(year, month, 1),
				nextMonth = new Date(year, month + 1, 1),
				firstWeekDay = thisMonth.getDay(),
				daysInMonth = Math.floor((nextMonth.getTime() - thisMonth.getTime()) / (1000 * 60 * 60 * 24)),
				$input = $('#' + calendarEl.inputId).eq(0),
				tit = $input.attr('title'),
				_minDay = new Array(),
				_maxDay = new Array(),
				_calendarHtml = '',
				//_isOver = false,
				mm = nextMonth.getMonth(),
				week_day;

			$input.data('min') !== undefined ? _minDay = $input.data('min').split(date_split, 3) : _minDay[0] = 1910;// 최소 선택 가능
			$input.data('max') !== undefined ? _maxDay = $input.data('max').split(date_split, 3) : _maxDay[0] = 2050;// 최대 선택 가능
			month === 2 ? daysInMonth = 31 : '';
			
			/* datepicker-head -------------------- */
			_calendarHtml += '<div class="datepicker-head">';
			/* title: datepicker-head-tit */
			_calendarHtml += '<div class="datepicker-head-tit">'+ tit +'</div>';
		
			/* 년월 선택: datepicker-head-select */
			_calendarHtml += '<div class="datepicker-head-select">';
			_calendarHtml += '<div class="ui-select datepicker-head-year">';
			_calendarHtml += '<select title="년도 선택">';

			for (var y = Number(_minDay[0]); y < Number(_maxDay[0]) + 1; y++) {
				_calendarHtml += y === year ? '<option value="'+ y +'" selected>'+ y +'년</option>': '<option value="'+ y +'">'+ y +'년</option>';
			}

			_calendarHtml += '</select>';
			_calendarHtml += '</div>';

			_calendarHtml += '<div class="ui-select datepicker-head-month">';
			_calendarHtml += '<select title="월 선택">';

			for (var m = 1; m < 13; m++) {
				_calendarHtml += m === month + 1 ? '<option value="'+ m +'" selected>'+ m +'월</option>': '<option value="'+ m +'">'+ m +'월</option>';
			}

			_calendarHtml += '</select>';
			_calendarHtml += '</div>';
			_calendarHtml += '</div>';

			/* 년월 선택: button */
			_calendarHtml += '<div class="datepicker-head-btn">';
			_calendarHtml += year < _minDay[0] || year == _minDay[0] && dateMonths[month] <= _minDay[1] ? 
				'<button type="button" class="ui-datepicker-prev disabled" disabled>': '<button type="button" class="ui-datepicker-prev">';
			_calendarHtml += '<span>이전 ' + dateMonths[(month === 0) ? 11 : month - 1] + ' 월로 이동</span></button>';

			_calendarHtml += year > _maxDay[0] || year == _maxDay[0] && dateMonths[month] >= _maxDay[1] ? 
				'<button type="button" class="ui-datepicker-next disabled" disabled>': '<button type="button" class="ui-datepicker-next">';
			_calendarHtml += '<span>다음 ' + dateMonths[(month == 11) ? 0 : month + 1] + ' 월로 이동</span></button>';
			_calendarHtml += '</div>';

			/* today */
			_calendarHtml += '<div class="today"><button type="button" class="today" data-day=' + textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), true) + '><span>오늘 - '+ textDate(dateToday.getDate(), dateToday.getMonth() + 1, dateToday.getFullYear(), true) +' 이동</span></button></div>';
			/* datepicker-head-date */
			_calendarHtml += '<div class="datepicker-head-date">';
			_calendarHtml += '<span class="year" data-y="'+ year +'"><strong>' + year + '</strong>년<span class="hide"> - 선택된 년도</span></span>';
			_calendarHtml += '<span class="month" data-m="'+ dateMonths[month] +'"><strong>' + dateMonths[month] + '</strong>월<span class="hide"> - 선택된 월</span></span>';
			_calendarHtml += '</div>';
			_calendarHtml += '</div>';
			
			/* datepicker-core -------------------- */
			_calendarHtml += '<div class="datepicker-core">';
			_calendarHtml += '<table class="tbl-datepicker">';
			_calendarHtml += '<caption>날짜 선택 양식입력 테이블</caption>';
			_calendarHtml += '<thead><tr><th scope="col"><abbr title="일요일">일</abbr></th><th scope="col"><abbr title="월요일">월</abbr></th><th scope="col"><abbr title="화요일">화</abbr></th><th scope="col"><abbr title="수요일">수</abbr></th><th scope="col"><abbr title="목요일">목</abbr></th><th scope="col"><abbr title="금요일">금</abbr></th><th scope="col" class="weekend"><abbr title="토요일">토</abbr></th></tr></thead>';
			_calendarHtml += '<tbody><tr>';

			for (var week = 0; week < firstWeekDay; week++) {
				if (week === 0) {
					_calendarHtml += '<td>&nbsp;</td>';
				} else if (week === 6) {
					_calendarHtml += '<td>&nbsp;</td>';
				} else {
					_calendarHtml += '<td>&nbsp;</td>';
				}
			}

			mm < 1 ? mm = 12 : '';
			mm = partsAdd0(mm);
			week_day = firstWeekDay;

			for (var dayCounter = 1; dayCounter <= daysInMonth; dayCounter++) {
				week_day %= 7;
				week_day === 0 ? daysInMonth - dayCounter < 7 ? _calendarHtml += '</tr>' : _calendarHtml += '</tr><tr>' : '';
				
				if (week_day === 0) {
					_calendarHtml += '<td class="day-sun">'; //일요일
				} else if (week_day === 6) {
					_calendarHtml += '<td class="day-sat">'; //토요일
				} else {
					_calendarHtml += '<td>';
				}

				// 예상은 남은 여백에 지난달 다음달 날짜가 아닐지.. 
				if ((year < _minDay[0]) || (year == _minDay[0] && dateMonths[month] < _minDay[1]) || (year == _minDay[0] && dateMonths[month] == _minDay[1] && dayCounter < _minDay[2])) {
					//_isOver = true;
					_calendarHtml += '<span title="'+ textDate(dayCounter, mm, year, true) +'">' + partsAdd0(dayCounter) + '</span></td>';
				} else if ((year > _maxDay[0]) || (year == _maxDay[0] && dateMonths[month] > _maxDay[1]) || (year == _maxDay[0] && dateMonths[month] == _maxDay[1] && dayCounter > _maxDay[2])) {
					//_isOver = true;
					_calendarHtml += '<span title="'+ textDate(dayCounter, mm, year, true) +'">' + partsAdd0(dayCounter) + '</span></td>';
				} else {
					//_isOver = false;
					_calendarHtml += '<button type="button" title="'+ textDate(dayCounter, mm, year, true) +'" data-day="'+ textDate(dayCounter, mm, year, false) +'" value="'+ dayCounter +'">'+ partsAdd0(dayCounter) +'</button></td>';
				}
				week_day++;
			}

			// 빈 셀 채우기
			for (week_day = week_day; week_day < 7; week_day++) { 
				if (week_day === 0) {
					_calendarHtml += '<td>&nbsp;</td>'; //일요일
				} else if (week_day == 6) {
					_calendarHtml += '<td>&nbsp;</td>'; //토요일
				} else {
					_calendarHtml += '<td class="empty">&nbsp;</td>';
				}
			}

			_calendarHtml += '</tr></tbody></table>';
			_calendarHtml += '</div>';
			_calendarHtml += '<button type="button" class="btn-close ui-datepicker-close"><span class="hide">닫기</span></button>';

			return _calendarHtml;
		}

		//달력 Hide&Remove
		function hideCalendar(calendarEl) {
			$("#" + calendarEl.calId).animate({
				opacity: 0
			}, 300, function () {
				$(this).remove();
			});
		}
		function datepickerClose(t, calendarEl){
			var $btn = $(t).closest('.ui-datepicker').find('.ui-datepicker-btn');

			win[global].uiDropdownToggle({ id:$btn.attr('id') });
			win[global].uiScroll({ value:$btn.data('sct'), speed:200 });

			remove ? hideCalendar(calendarEl): '';
		}

		//달력 Show
		function displayCalendar(calendarEl, v) {
			var $calWrap = $("#" + calendarEl.calId);
			
			$calWrap.empty().append(buildCalendar(date, calendarEl, v));
			win[global].uiFocusTab({ selector:$('#' + calendarEl.calId), type:'hold' });

			//datepicker event--------------------------------------------------------
			//select year & month
			$calWrap.find('.datepicker-head-year select').off('change.uidpsel').on('change.uidpsel', function(){
				yearMonthSelect(this, 'year')
			});
			$calWrap.find('.datepicker-head-month select').off('change.uidpsel').on('change.uidpsel', function(){
				yearMonthSelect(this, 'month')
			});
			//next & prev month
			$calWrap.find('.ui-datepicker-prev').off('click.uidatepicker').on('click.uidatepicker', function() {
				monthNextPrev(this, 'prev');
			});
			$calWrap.find('.ui-datepicker-next').off('click.uidatepicker').on('click.uidatepicker', function() {
				monthNextPrev(this, 'next');
			});

			function yearMonthSelect(t, v){
				var $currentDate = $(t).closest('.datepicker-head').find('.datepicker-head-date'),
					_y = v === 'year' ? $(t).closest('.datepicker-head-year').find('select').eq(0).val(): Number($currentDate.find('.year').data('y')),
					_m = v === 'year' ? Number($currentDate.find('.month').data('m') - 1): $(t).closest('.datepicker-head-month').find('select').eq(0).val(),
					dateTemp = v === 'year' ? new Date(_y, _m, 1): new Date(_y, _m - 1, 1);

				date = dateTemp;
				displayCalendar(calendarEl);
				v === 'year' ? $calWrap.find('.datepicker-head-year select').eq(0).focus(): $calWrap.find('.datepicker-head-month select').eq(0).focus();
			}
			function monthNextPrev(t, v){
				var $this = $(t),
					limit = v === 'next' ? 'max': 'min',
					$currentDate = $this.closest('.datepicker-head').find('.datepicker-head-date'),
					_y = Number($currentDate.find('.year').data('y')),
					_m = Number($currentDate.find('.month').data('m') - 1),
					dateTemp = v === 'next' ? new Date(_y, _m + 1, 1): new Date(_y, _m - 1, 1);

				if ($this.hasClass('disabled')) {
					alert($('#'+ calendarEl.inputId).data(limit) +' 을 벗어난 달은 선택이 불가능 합니다.');
				} else {
					date = dateTemp;
					setTimeout(function(){
						displayCalendar(calendarEl);
						$this.eq(0).focus();
					},0);
				}
			}
			
			//close
			$('.ui-datepicker-close').off('click.uidpclose').on('click.uidpclose', function(){
				datepickerClose(this, calendarEl);
			});

			$calWrap.find('td button').off('click.uidpday').on('click.uidpday', function() {
				var $this = $(this),
					$btn = $this.closest('.ui-datepicker').find('.ui-datepicker-btn');

				writeInputDateValue(calendarEl, $this);
				datepickerClose(this, calendarEl);
			});

			$calWrap.find('.today button').off('click.uidatepicker').on('click.uidatepicker', function() {
				date = new Date();

				setTimeout(function(){
					displayCalendar(calendarEl);
					$calWrap.find('td button.today').eq(0).focus();
				},0);
				
			});

			var _btnOffset = $("#" + calendarEl.buttonId).offset();
			matchToday();
			
			return false;
		}

		//dropdown 설정
		$datepicker.each(function() {
			var $this = $(this),
				$btn = $this.find('.ui-datepicker-btn');
			
			callback = !!$this.data('callback') ?
				$this.data('callback') : callback;

			win[global].uiDropdown({ id:$(this).attr('id'), eff:'st', ps:'bc' });

			$.browser.mobile ? 
				$('#' + $btn.data('inp')).prop('readonly', true).attr('aria-hidden', true) : '';
		});

		//위치 지정
		$datepicker.find('.ui-datepicker-btn').off('focus.uidpbtn mouseover.uidpbtn').on('focus.uidpbtn mouseover.uidpbtn', function(){
			var $this = $(this),
				dropid = $this.attr('id'),
				_ps = 'bc',
				_ef = 'st';
			
			if (Math.abs($(win).scrollTop() - $this.offset().top - $this.outerHeight()) < Math.abs($(win).scrollTop() + $(win).outerHeight() / 2)) {
				_ps = 'bc';
				_ef = 'st';
				$('#' + dropid+'_pnl').addClass('type-bottom').removeClass('type-top');
			} else {
				_ps = 'tc';
				_ef = 'sb';
				$('#' + dropid+'_pnl').addClass('type-top').removeClass('type-bottom');
			}

			$this.attr('ps', _ps).attr('eff', _ef);
			$this.attr('aria-expanded') === 'false' || $this.attr('aria-expanded') === undefined ?
				win[global].uiDropdown({ id:dropid, eff:_ef, ps:_ps}) : '';
		});

		$datepicker.find('.ui-datepicker-btn').off('click.uidpbtn').on('click.uidpbtn', function() {
			var $this = $(this),
				dropid = $this.attr('id'),
				inputId = $this.data('inp'),
				regExp = /^([0-9]{4})-([0-9]{2})-([0-9]{2})/g,
				_val = $('#' + inputId).val(),
				reset = regExp.test(_val),
				calspaceHTML = '';

			$this.data('sct', $(doc).scrollTop());
			!reset ? $('#' + inputId).val(''): '';
			$this.closest('.ui-datepicker').find('.datepicker-sec').remove();
			
			calVar = new calendarObject({ 
				calId: "calWrap_" + dropid, 
				inputId: inputId, 
				buttonId: "calBtn_" + dropid,
				shortDate: shortDate
			});

			calspaceHTML += '<div id="'+ calVar.calId +'" class="datepicker-sec">';
			calspaceHTML += '<div class="datepicker-wrap">';
			calspaceHTML += '</div>';
			calspaceHTML += '</div>';

			$this.closest('.ui-datepicker').find('.ui-datepicker-wrap').append(calspaceHTML);
			displayCalendar(calVar, 'generate');
			$datepicker.find('.tbl-datepicker button[data-day="' + $('#' + inputId).val() + '"]').addClass('selected').attr('aria-selected', true);
		});
	}

	/* ------------------------------------------------------------------------
	 * modal layer popup v2.0 
	 * date : 2018-08-21
	 * 
	 * modal cookie check close & open
	 * $plugins.uiCookieModalClose
	 * date : 2018-07-28
	 * term 부분 옵션값 필요
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiModal: function (opt) {
			return createUiModal(opt);
		},
		uiModalOpen: function (opt) {
			return createUiModalOpen(opt);
		},
		uiModalClose: function (opt) {
			return createUiModalClose(opt);
		},
		uiModalResize: function (opt) {
			return createUiModalResize(opt);
		},
		uiCookieModal: function (opt) {
			return creaeteUiCookieModal(opt);
		},
		uiCookieModalClose: function (opt) {
			return creaeteUiCookieModalClose(opt);
		}
	});
	win[global].uiModal.option = {
		//base
		width: false,
		height: false,
		full: false,
		src: false,
		autofocus: true,
		endfocus: false,
		remove: true,
		callback: false,
		callback_close: false,
		space: 10,
		ps: 'center',
		//system alert, confirm
		words: false,
		btn_txt1: '확인',
		btn_txt2: '취소',
		//iframe
		iname: false,
		ititle: '빈 프레임',
		isrc: false,
		iwidth: 1000,
		iheight: $(win).outerHeight() - 20,
		icallback: false,
		icallback_close: false
	};
	function createUiModal(opt){
		if ($('#'+ opt.id +'[opened="true"]').length > 0 || opt === undefined) {
			return false;
		}
		
		var opt = $.extend(true, {}, win[global].uiModal.option, opt),
			id = opt.id,
			endfocus = !opt.endfocus ? document.activeElement : opt.focus,
			src = opt.src,
			$modal = $('#' + id);
		
		opt.endfocus = endfocus;
		
		//iframe modal
		if (!!opt.isrc && !$modal.length) {
			console.log('iframe modal ready');
			var	iname = opt.iname,
				ititle = opt.ititle,
				isrc = opt.isrc,
				iwidth = opt.iwidth,
				iheight = opt.iheight,
				icallback = opt.icallback,
				icallback_close = opt.icallback_close,
				imodal_html = '';

			imodal_html += '<section class="ui-modal" id="'+ id +'" role="dialog" aria-hidden="true">';
			imodal_html += '<div class="ui-modal-wrap">';
			imodal_html += '<div class="ui-mdal-iframe" data-orgw="'+ iwidth +'" data-orgh="'+ iheight +'" style="height:'+ iheight +'px">';
			imodal_html += '<iframe id="'+ iname +'" name="'+ iname +'" src="'+ isrc +'" width="'+ iwidth +'" height="'+ iheight +'" title="'+ ititle +'" orgw="'+ iwidth +'" orgh="'+ iheight +'"></iframe>';
			imodal_html += '</div>';
			imodal_html += '<button type="button" class="btn-close ui-modal-close-iframe"><span>'+ ititle +' 닫기</span></button>';
			imodal_html += '</div>';
			imodal_html += '</section>';

			$('#baseLayer').prepend(imodal_html);

			document.getElementById(iname).onload = function(){
				$modal.data('iframeload', true);
				frames[iname].$plugins.callback.modal(opt.id);
				!!icallback ? icallback(): '';
			};
	
			modalReady();
		}
		
		if (!src) {
			//내부
			console.log('inner modal ready');
			$modal.attr('aria-hidden') === 'true' ? modalReady(): '';
		} else {
			//Ajax
			console.log('ajax modal ready', $modal.length);
			!$modal.length ?
				win[global].uiAjax({ id:'baseLayer', url: src, page: true, add: true, callback: modalReady }): 
				modalReady();
		}
		
		function modalReady(){
			modalOpen(opt);
		}
	}
	function modalOpen(opt){
		var id = opt.id,
			//root
			$body = $('body'),
			$baseLayer = $('#baseLayer'),
			$modal = $('#' + opt.id),
			$modalWrap = $modal.find('.ui-modal-wrap'),
			$modalHead = $modal.find('.ui-modal-head'),
			$modalCont = $modal.find('.ui-modal-cont'),
			$modalFoot = $modal.find('.ui-modal-foot'),

			//option : base
			w = !opt.width ? Math.ceil($modal.outerWidth()) : opt.width,
			h = !opt.height ? Math.ceil($modal.outerHeight()) : opt.height,
			full = opt.full, 
			p = opt.ps, // 'top, center, bottom'
			s = opt.space,
			callback = opt.callback,

			//info
			winW = $(win).outerWidth(),
			winH = $(win).outerHeight(),
			overW = winW <= w,
			overH = winH <= h,
			iw,
			ih,
			is_m = $.browser.mobile,
			is_head = !!$modalHead.length,
			is_foot = !!$modalFoot.length,
			is_full_h,
			is_full_w,
			is_iframe,
			mh_h,
			mf_h,
			timer,
			modal_n = 0,
			re_num = 0,
			re_timer,
			modalbackdrop,

			//system
			words = opt.words,
			btn_txt1 = opt.btn_txt1,
			btn_txt2 = opt.btn_txt2,
			//iframe
			iname = opt.iname;
		
		console.log('mdoal open: ', opt);	
		
		$('body').data('scrolling') === 'yes' ? win[global].uiScrollingCancel(): '';
		
		//full modal
		if (full) {
			s = 0;
			$modal.addClass('type-full');
		}

		//system modal
		if (words) {
			words && is_m ? opt.width = winW - (s * 2): '';
			$modal.find('#modalAlerTxt').append(words);
			!!btn_txt1 ? $modal.find('#_confirm').text(btn_txt1): '';
			!!btn_txt2 ? $modal.find('#_cancel').text(btn_txt2): '';
		}

		//modal ready
		$body.addClass('modal-open');
		$('#baseWrap').attr('aria-hidden', true);
		$modal
			.data('opt', opt)
			.data('scrolltop', $(win).scrollTop())
			.attr('opened', true)
			.attr('aria-hidden',false)
			.attr('aria-labelledby', id + '-tit')
			.find('.ui-modal-tit').attr('id', id + '-tit');

		//single or multi modal
		modal_n = $baseLayer.find('.ui-modal[opened="true"]').length;
		
		if (modal_n === 1) {
			modalBackdrop('open');
		} else {
			modalbackdrop = $baseLayer.find('.modal-backdrop').detach();
			$baseLayer.append(modalbackdrop);
			$modal.siblings('.ui-modal').attr('aria-hidden', true);
			$('.modal-backdrop').css('z-index', modal_n - 1).attr('n', modal_n);
		}

		//
		$modal
			.css({ 
				display: 'block',
				opacity: 0,
				position: 'fixed' ,
				zIndex: modal_n
			})
			.attr('n', modal_n);

		//위치에 따른 기본설정
		switch (p){
			case 'top': 
				$modal.css('top', h * -1);
				break;

			case 'center': 
				$.browser.mobile ?
					$modal.css({ top:'100%', opacity:1 }):
					$modal.css('top', '50%');
				break;

			case 'bottom': 
				$modal.css('bottom', h * -1);
				break;
		}

		function reModal(v){
			//초기화 세팅
			winH = $(win).outerHeight();
			winW = $(win).outerWidth();

			$modal.css('height', 'auto');

			if (winW > $modal.outerWidth() && winH > $modal.outerHeight() && v.resize && !$.browser.mobile) {
				return false;
			}

			mh_h = !!$modalHead.outerHeight() ? $modalHead.outerHeight() : 0;
			mf_h = !!$modalFoot.outerHeight() ? $modalFoot.outerHeight() : 0;
			
			if (!opt.height) {
				$modalCont.css('height', 'auto');
				is_head && is_foot ? $modalCont.css('height', Math.ceil($modalWrap.outerHeight() - (mh_h + mf_h)) ): '';
				is_head && !is_foot ? $modalCont.css('height', Math.ceil($modalWrap.outerHeight() - mh_h) ): '';
				!is_head && is_foot ? $modalCont.css('height', Math.ceil($modalWrap.outerHeight() - mf_h) ): '';
				!is_head && !is_foot ? $modalCont.css('height', Math.ceil($modalWrap.outerHeight()) ): '';

			} else {
				is_head && is_foot ? $modalCont.css('height', Math.ceil(h - (mh_h + mf_h)) ): '';
				is_head && !is_foot ? $modalCont.css('height', Math.ceil(h - mh_h) ): '';
				!is_head && is_foot ? $modalCont.css('height', Math.ceil(h - mf_h) ): '';
				!is_head && !is_foot ? $modalCont.css('height', h): '';
			}

			h = !opt.height ? Math.ceil($modal.outerHeight()) : opt.height;
			w = !opt.width ? Math.ceil($modal.outerWidth()) : opt.width;
			
			if (!!$modal.data('orgw') || !!$modal.data('orgh') && !$.browser.mobile) {
				h = Number($modal.data('orgh'));
				w = Number($modal.data('orgw'));
			}

			overH = winH <= h;
			overW = winW <= w;

			if (!$.browser.mobile) {
				if (overW) {
					full = true;
					$modal.addClass('modal-full');
				} else {
					full = false;
					$modal.removeClass('modal-full');
				}
			}
			
			is_full_h = overH || full;
			is_full_w = overW || full;
			is_iframe = !!$modal.find('.ui-modal-iframe').lenght;

			if (is_full_h) {
				$modal.css('height', winH - 20);
				$modalCont.css('height', Math.ceil(winH - (mh_h + mf_h) - (s * 2)) + 'px');
			} else {
				$modal.css('height', h);
				words ? 
					$modalCont.css('height', 'auto'): 
					$modalCont.css('height', Math.ceil(h - (mh_h + mf_h)) + 'px');
			}
			
			if (is_iframe) {
				//iframe 오리지널 크기값
				iw = $modal.find('.ui-modal-iframe').data('orgw');
				ih = $modal.find('.ui-modal-iframe').data('orgh');
				$modal.find('.ui-modal-iframe iframe').attr('height', ih);
			}
			
			if (!!v.timer) {
				switch (p){
				case 'top': 
					$modal.css({ 
						opacity: v.resize ? 1 : 0,
						left : is_full_w ? s : '50%',
						width : is_full_w ? is_m ? '100%' : winW - (s * 2) : is_iframe ? iw : $modal.outerWidth(),
						height : is_full_h ? winH - (s * 2) : h,
						marginTop : 0 ,
						marginLeft : is_full_w ? 0 : ($modal.outerWidth() / 2) * -1
					});
					break;

				case 'center':
					if (is_m && full) {
						//mobile full modal
						$modal.css({ 
							opacity: v.resize ? 1 : 0,
							left : is_full_w ? 0 : '50%',
							width : is_full_w ? '100%' : w,
							height : is_full_h ? '100%' : h,
							marginTop : is_full_h ? 0 : (h / 2) * -1,
							marginLeft : is_full_w ? 0 : is_iframe ? (iw / 2) * -1: (w / 2) * -1
						});
					} else {
						//pc, modal alert
						$modal.css({ 
							opacity: v.resize ? 1 : 0,
							top : is_full_h ? s : '50%',
							left : is_full_w ? s : '50%',
							width : is_full_w ? is_m ? '100%': winW - (s * 2): is_iframe ? iw: w,
							height : is_full_h ? winH - (s * 2) : h,
							marginTop : is_full_h ? 0 : (h / 2) * -1,
							marginLeft : is_full_w ? 0 : is_iframe ? (iw / 2) * -1: (w / 2) * -1
						});
					}
					break;

				case 'bottom':
					$modal.css({ 
						opacity: v.resize ? 1 : 0,
						left : is_full_w ? s : '50%',
						width : is_full_w ? is_m ? '100%' : winW - (s * 2): is_iframe ? iw: $modal.outerWidth(),
						height : is_full_h ? is_iframe ? winH : winH - (s * 2): h,
						marginTop : 0,
						marginLeft : is_full_w ? 0 : ($modal.outerWidth() / 2) * -1
					});
					break;
				}

				if (!v.resize) {
					!!iname ? 
						$modal.data('iframeload') === undefined ?
							reExe('b'): exe():
						$modalCont.outerHeight() < 10 ?
							reExe('a'): exe();
				}
			}

			function reExe(q){
				$modal.css('opacity', 0);
				if (re_num === 0) {
					win[global].uiLoading({ visible:true });
					re_num = re_num + 1;
				}
				re_timer = setTimeout(function(){
					reModal({ timer:true })
				},100);
			}
			function exe(){
				clearTimeout(re_timer);
				win[global].uiLoading({ visible:false });
				if (!words){
					if (!is_m && !iname) {
						//pc, no iframe
						//$modalCont.mCustomScrollbar({ scrollButtons:{enable:true} });
					}
				}

				if (is_m && full) {
					$modal.stop().animate({
						opacity: 1,
						top: 0
					}, 400, 'easeInQuart', function(){
						$('body').addClass('modal-full');
						showEnd();
					});
				} else {
					switch (p){
						case 'top': 
							$modal.stop().animate({ 
								opacity: 1,
								top: is_full_h ? 0 : s 
							},300, 'easeInQuart', function(){
								is_m && full ? $body.addClass('modal-full'): '';
								showEnd();
							});
							break;
	
						case 'center':
							$modal.stop().animate({ 
								opacity: 1
							},300, 'easeInQuart', function(){
								showEnd();
							});
							break;
							
						case 'bottom':
							$modal.stop().animate({ 
								opacity: 1,
								bottom: is_full_h ? 0 : s
							},300, 'easeInQuart', function(){
								is_m && full ? $body.addClass('modal-full'): '';
								showEnd();
							});
							break;
					}
				}
			}

			function showEnd(){
				!!callback ? callback('callback'): '';
				win[global].callback.modal(opt.id);  //ui.common.js 

				if (is_iframe){
					frames[opt.iname].$('.wrap-iframe').mCustomScrollbar({ scrollButton:{ enable:true} })
					frames[opt.iname].callback.modal(opt.id);
				}

				reModal({ timer:false, resize:true });
				win[global].uiFocusTab({ selector:'#' + opt.id });
				$modal.data('orgw', w).data('orgh', h);
			}
		}

		clearTimeout(timer);
		timer = setTimeout(function(){
			reModal({ timer: true });
		},50 );
		
		if (!$.browser.mobile){
			$(win).resize(function(){
				if (!!$baseLayer.find('.ui-modal[aria-hidden="false"]').length){
					reModal({ timer: true, resize: true });
				}
			})
		}
		// //esc key close
		// $(doc).off('keyup.uimodal').on('keyup.uimodal', function(e){
		// 	e.preventDefault();
		// 	var keyCode = e.keyCode || e.which;
		// 	if(keyCode == 27) {
		// 		win[global].uiModalClose({ id:$('#baseLayer .ui-modal[n="'+ $('.modal-backdrop').attr('n') + '"]').attr('id') });
		// 	}
		// });
		
		//event close
		$modal.find('.ui-modal-close').off('click.uimodal').on('click.uimodal', function(e){
			e.preventDefault();
			win[global].uiModalClose(opt);
		});

		$modal.find('.ui-modal-close-iframe').off('click.uimodal').on('click.uimodal', function(e){
			e.preventDefault();
			parent.win[global].uiModalClose(opt);
		});
	}
	function createUiModalResize(opt){
		//진행중	
	}
	function createUiModalClose(opt){
		if (opt === undefined) {
			return false;
		}

		var $body = $('body'),
			$modal = $('#' + opt.id),
			$modalshow = $('#baseLayer .ui-modal[opened="true"]'),

			opt = $.extend(true, {}, $modal.data('opt'), opt),

			modal_n = $modalshow.length,

			autofocus = opt.autofocus,
			endfocus = opt.endfocus,
			layRemove = opt.remove,
			ps = opt.ps,
			callback = opt.callback_close,
			icallback_close = opt.icallback_close,

			sct = $modal.data('scrolltop'),
			wst = $(win).scrollTop(),

			h = Math.ceil($modal.outerHeight()),
			winH = $(win).outerHeight(),
			fst,
			z;
		
		opt.endfocus !== undefined ? sct = $(endfocus).offset().top : '';
		
		if (modal_n < 2 ) {
			//single	
			switch (ps){
			case 'top': 
				$modal.attr('aria-hidden', true).stop().animate({
					opacity:0,
					top: h * -1 
				},300, 'easeOutQuart', closed);
				break;

			case 'center':
				if ($.browser.mobile) {
					$('body').removeClass('modal-full');
					$modal.attr('aria-hidden', true).stop().animate({
						opacity:0,
						top: '50%'
					},300, 'easeOutQuart', closed);
				} else {
					$modal.attr('aria-hidden', true).stop().animate({
						opacity:0
					},200, 'easeOutQuart', closed);
				}
				break;

			case 'bottom':
				$modal.attr('aria-hidden', true).stop().animate({
					opacity:0,
					bottom: h * -1
				},300, 'easeOutQuart', closed);
				break;
			}
			modalBackdrop('close');
		} else {
			//multi
			z = modal_n - 1;

			$modal.attr('aria-hidden', true).stop().animate({
				opacity: 0
			},200, function(){

				layRemove === true ? 
					$modal.remove():
					$modal.removeAttr('style').removeClass('scrollpop').removeAttr('opened');

				autofocus ? $(endfocus).attr('tabindex', 0).focus(): '';
				$('.ui-modal[n="'+ z +'"]').attr('aria-hidden', false);

				!!callback ? callback(opt): '';
				!!icallback_close ? icallback_close(opt): '';
			});
			$('.modal-backdrop').css('z-index', z - 1).attr('n', $('.modal-backdrop').attr('n') - 1);
		}
		function closed(){
			layRemove === true ? $modal.remove() : $lay.removeAttr('style').removeAttr('opened');
			!$(endfocus).length ? endfocus = 'body' : '';

			$modal.removeClass('modal-full');
			$body.removeClass('modal-open mdoal-full');
			$(doc).off('keyup.uilayerpop'); //esc키 이벤트 취소
			$('body').data('scrolling') === 'no' ? win[global].uiScrolling(): '';
			
			if (opt.id !== '__modalAlert' && opt.id !== '__modalConfirm' && opt.id) {
				if ((wst < sct && wst + winH > sct)) {
					autofocus ? $(endfocus).attr('tabindex', 0).focus(): '';
				} else {
					$('html, body').stop().animate({
						 scrollTop : sct
					}, 200, function(){
						 $(endfocus).attr('tabindex', 0).focus();
					});
				}
			}

			!!callback ? callback(opt): '';
			!!icallback_close ? icallback_close(opt): '';
		}
	}
	function modalBackdrop(value){
		var $body = $('body'),
			$baseLayer = $('#baseLayer'),
			$backdrop, 
			timer;
		
		if (value === 'open' && !$baseLayer.data('bgmodal')) {
			$baseLayer.data('bgmodal', true);
			$baseLayer.append('<div class="modal-backdrop"></div>');
			$backdrop = $('.modal-backdrop');
			$backdrop.css('display','block');
			
			clearTimeout(timer);
			timer = setTimeout(function(){
				$backdrop.stop().animate({
					opacity: 1,
					width: '101%',
					height: '101%'
				}, 200).addClass('on');
			},0);
		} else {
			$baseLayer.data('bgmodal', false);
			$('.modal-backdrop').stop().animate({
				//width: '100%',
				opacity: 0
			},200, function(){
				$(this).remove();
			}).removeClass('on');
		}
	}
	function creaeteUiCookieModal(opt){
		win[global].uiCookieGet({ name:opt.cookiename }) ? '' : open();
		function open(){
			win[global].uiModal({ id:opt.id, full:opt.full === undefined ? false : opt.full, link: opt.link === undefined ? false : opt.link });
		}
	}
	function creaeteUiCookieModalClose(opt){
		$('#' + opt.cookiename).prop('checked') ?
			win[global].uiCookieSet({ name:opt.cookiename, value:true, term:365 }) : '';
		win[global].uiModalClose({ id:opt.modalid });
	}

	/* ------------------------------------------------------------------------
	 * selection(radio & checkbox) v2.0 
	 * $plugins.uiSelection
	 * date : 2018-09-16
	 * exe : $plugins.uiSelection({ id:'name', all:false, callback:function(v){...} });
	 * option
	 * - id: 'name' [string] 
	 * - all: true/false [boolean] 이면 전체체크 사용
	 * - callback: function명 [function] / 콜백함수 실행 (!선택)
	 * 	 
	 * $plugins.uiSelectionChange
	 * date : 2018-09-16
	 * exe : $plugins.uiSelectionChange({ id:'name', checked:true/false, disabled:true/false, callback::function(v){...} });
	 * option
	 * - id: 'name' [string] 
	 * - checked: true/false [boolean] checked 설정
	 * - disabled: true/false [boolean] disabled 설정
	 * - callback: function명 [function] / 콜백함수 실행 (!선택)
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {	
		uiSelection: function (opt) {
			return createUiSelection(opt);
		},
		uiSelectionChange: function (opt) {
			return createUiSelectionChange(opt);
		}
	});
	win[global].uiSelection.option = {
		id: false,
		all: false,
		callback: false
	};
	function createUiSelection(opt){
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiSelection.option, opt),
			id = opt.id,
			is_id = id === false ? false : true,
			$inp = id === false ? $('input[type="checkbox"], input[type="radio"]') : typeof id === 'string' ? $('#' + id) : id,
			len = $inp.length,
			i = 0, 
			$inp_current,
			inp_current_id;
		
		//set
		for (i = 0, len; i < len; i++) {
			$inp_current = $inp.eq(i);
			opt.id = $inp_current;
			inp_current_id = $inp_current.attr('id');
			is_id ? $inp_current.data('exe', false) : '';

			if(!$inp_current.data('exe')) {
				$inp_current.data('exe', true);
				
				if (inp_current_id !== undefined) {
					$inp_current.data('opt', opt);
					$inp_current.attr('type') === 'checkbox' ?
						selectionCheck({ id:inp_current_id })://checkbox
						selectionApp({ id:inp_current_id });//radio
				} 
			}			
		}
		$('body').data('selection', true);

		//event
		$inp
		.off('click.ui focus.ui blur.ui')
		.on({
			'click.ui': evtFocus,
			'focus.ui': evtAdd,
			'blur.ui': evtRemove
		});
		function evtFocus(){
			labelState($(this).attr('id'), 'focus', $(this).attr('type'));
		}
		function evtAdd(){
			labelState($(this).attr('id'), 'add', $(this).attr('type'));
		}
		function evtRemove(){
			labelState($(this).attr('id'), 'remove', $(this).attr('type'));
		}

		function labelState(id, state, type){
			var $lable = $('label[for="'+ id +'"]');

			switch (state){
			case 'focus' : 
				type === 'checkbox' ?
					selectionCheck({ id:id, evt:true })://checkbox
					selectionApp({ id:id });//radio
				$lable.focus();
				break;

			case 'add' : 
				$lable.addClass('activated');
				break;

			case 'remove' : 
				$lable.removeClass('activated');
				break;
			}
		}
	}
	function selectionCheck(opt){ 
		//opt: id, evt 
		//only checkbox. 전체체크관련 체크단계
		var id = opt.id,
			evt = opt.evt === undefined ? false : opt.evt,
			$inp = $('#'+ id),
			checkgroup = $inp.attr('type') === 'radio' ? 
				$inp.attr('name') : //radio
				$inp.attr('checkgroup'), //checkbox
			$inps = $inp.attr('type') === 'radio' ? 
				$('input[name="' + checkgroup + '"]') : //radio
				$('input[checkgroup="' + checkgroup + '"]'), //checkbox, checkgroup으로 갈지 class 명으로 갈지 선택해야함. ie8에서 사용자속성을 인식못하는경우가 있음.
			$all = $('#'+ checkgroup), //전체체크 input
			i = 0, 
			n = 0, 
			m = 0, 
			len = $inps.length;
		
		//checkgroup이 있다면 실행하여 현재 그룹의 체크된 갯수 파악 
		if (checkgroup !== undefined) {
			
			for (i = 0; i < len; i++) {
				n = ($inps.eq(i).prop('checked')) ?  1 : 0;
				m = m + n;
			}

			m === len ? 
				act(true) : 
				m === len - 1 && $all.data('checked') === true ? act(false) : '';
		} 
		
		selectionApp({ id:id, evt:evt });
	
		//그룹의 체크된 갯수에 따라 전체체크 checked 선택
		function act(v){
			$all.data('checked', v ? true : false);
			$all.prop('checked') === false ? 
				$all.prop('checked', true) : 
				$all.prop('checked', false);
			selectionApp({ id:checkgroup, act:v ? false : true, evt:evt });
		}
	}
	function selectionApp(opt){
		//opt: id, act, evt
		//checkbox,radio check action
		var $inp = $('#' + opt.id),
			id = $inp.attr('id'),
			$label = $('label[for="'+ id +'"]'),
			inp_opt = $inp.data('opt'),
			allcheck = inp_opt.all,
			callback = inp_opt.callback,
			_opt,
			act = opt.act === undefined ? false : opt.act,
			evt = opt.evt === undefined ? false : opt.evt,
			$allItemNot,
			dataChecked,
			checkClass;
		
		//전체체크 
		if (!!allcheck === true && evt){
			//전체체크에 포함되어 있으면서 disabled가 아닌 input
			$allItemNot = $('input[checkgroup="' + id + '"]:not(:disabled)');
			//class로 처리 시
			//$allItemNot = $('input.' + id + ':not(:disabled)');
			
			//전체체크
			if ($inp.prop('checked') === true) {
				dataChecked = true;
				$allItemNot.prop('checked', true).each(function(i){
					_opt = $allItemNot.eq(i).data('opt');
					$('label[for=' + $allItemNot.eq(i).attr('id') + ']:not(.disabled)').addClass('checked');
					//전체체크시 이벤트 콜백 등 확인필요

					!!_opt.callback ? _opt.callback({ id: $allItemNot.eq(i).attr('id'), value: dataChecked }) : '';
				});
			}
			//전체미체크
			else if($inp.prop('checked') === false) {				
				dataChecked = false;
				if (act === false) {
					$allItemNot.prop('checked', false).each(function(i){
						_opt = $allItemNot.eq(i).data('opt');
						$('label[for=' + $allItemNot.eq(i).attr('id') + ']:not(.disabled)').removeClass('checked');

						!!_opt.callback ? _opt.callback({ id:$allItemNot.eq(i).attr('id'), value: dataChecked }) : '';
					});
				}
			}
		}
		//개별체크
		else {
			if ($inp.prop('checked') === true) {
				if ($inp.attr('type') === 'radio') {
					//radio button
					$('input[name="' + $inp.attr('name') + '"]').each(function(){
						$('label[for="'+ $(this).attr('id') +'"]').removeClass('checked');
					});
				} else {
					//checkbox button
					$label.addClass('checked');
				}
				dataChecked = true;
			} 
			else if ($inp.prop('checked') === false) {
				dataChecked = false;
			}
		}

		checkClass = (dataChecked === true) ? 'addClass' : 'removeClass';
		$inp.prop('disabled') === true ? $label.addClass('disabled') : $label.removeClass('disabled');
		$inp.data('checked', dataChecked);
		$label[checkClass]('checked');
		!!callback ? callback({ id: opt.id, value: dataChecked }) : '';
	}
	function createUiSelectionChange(opt){
		if (opt === undefined || opt.id === undefined) {
			return false;
		}

		var id = opt.id,
			$id = typeof id === 'string' ? $('#'+ id) : id,
			callback = opt.callback === undefined ? false : opt.callback;

		opt.checked !== undefined ? 
			$id.prop('checked', opt.checked) : 
			$id.prop('checked') ? 
				$id.prop('checked', true) : 
				$id.prop('checked', false);

		opt.disabled !== undefined ? 
			$id.prop('disabled', opt.disabled) : 
			$id.prop('disabled') ? 
				$id.prop('disabled', true) : 
				$id.prop('disabled', false);

		!!($id.attr('type') === 'radio' || $id.attr('type') === 'checkbox') ? 
			selectionCheck({ id:id, evt:false }) : '';

		!!callback ? callback() : '';
	}

	/* ------------------------------------------------------------------------
	 * select v1.0 
	 * date : 2018-04-21
	 * modify : 2018-04-29 이벤트 및 선택됨 텍스트 추가
	 * option
	 * - opt.selector : 'id' or $(...) / [string] or [object]
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiSelect: function (opt) {
			return createUiSelect(opt);
		},
		uiSelectAct: function (opt) {
			return createUiSelectAct(opt);
		}
	});
	win[global].uiSelect.option = {
		id: false, //select id
		current: null
	};
	function createUiSelect(opt){
		console.log($.browser.mobile)
		if ($.browser.mobile) {
			return false;
		}
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiSelect.option, opt),
			current = opt.current, 
			id = opt.id,
			is_id = id === false ? false : true,
			$ui_select = is_id ? typeof id === 'string' ? $('#' + opt.id).closest('.ui-select') : id.closest('.ui-select') : $('.ui-select'), 
			
			keys = win[global].option.keys,
			len = $ui_select.length, 
			i = 0,
			j = 0,

			_disabled = false,
			_selected = false,
			_val = '',
			_txt = '',
			
			$sel, 
			$sel_current, 
			$opt, 
			$opt_current, 

			sel_id,
			list_id,
			opt_id,
			opt_id_selected,
			sel_n,
			sel_tit, 
			sel_dis, 
			opt_len, 

			id_opt,
			id_optname,
			idx, 
			timer_opt,
			timer, 
			_option_wrap = '';
		
		//init
		$ui_select.find('.ui-select-btn').remove();
		$ui_select.find('.ui-select-wrap').remove();
		$ui_select.find('.dim').remove();
		
		//set
		for (i = 0; i < len; i++) {
			$sel_current = $ui_select.eq(i);
			$sel = $sel_current.find('select');
			$opt = $sel.find('option');
			
			sel_id = $sel.attr('id');
			list_id = sel_id +'_list';
			opt_id = sel_id +'_opt';
			sel_dis = $sel.prop('disabled');
			sel_tit = $sel.attr('title');
			opt_len = $opt.length;

			_option_wrap += '<div class="ui-select-wrap" style="min-width:'+ $sel_current.outerWidth() +'px">';
			_option_wrap += '<div class="ui-select-opts" role="listbox" id="'+ list_id +'" aria-hidden="true" tabindex="-1">';

			for (j = 0; j < opt_len; j++) {
				$opt_current = $opt.eq(j);

				if (current !== null) {
					_selected = current === j ?
						$opt_current.prop('selected', true):
						$opt_current.prop('selected', false);
				} else {
					_selected = $opt_current.prop('selected');
				}
				
				_disabled = $opt_current.prop('disabled');
				_selected ? _val = $opt_current.val() : '';
				_selected ? _txt = $opt_current.text() : '';
				_selected ? opt_id_selected = opt_id + '_' + j : '';
				_selected ? sel_n = j : '';

				id_optname = $sel.attr('id') + '_opt';
				id_opt = id_optname + '_' + j;

				_disabled ?
					_selected?
					_option_wrap += '<button type="button" role="option" id="'+ opt_id + '_' + j +'" class="ui-select-opt disabled selected" value="'+ $opt_current.val() +'" disabled tabindex="-1">':
					_option_wrap += '<button type="button" role="option" id="'+ opt_id + '_' + j +'" class="ui-select-opt disabled" value="'+ $opt_current.val() +'" disabled tabindex="-1">':
					_selected?
					_option_wrap += '<button type="button" role="option" id="'+ opt_id + '_' + j +'" class="ui-select-opt selected" value="'+ $opt_current.val() +'" tabindex="-1">':
					_option_wrap += '<button type="button" role="option" id="'+ opt_id + '_' + j +'" class="ui-select-opt" value="'+ $opt_current.val() +'" tabindex="-1">';

				_option_wrap += '<span class="ui-select-txt">' + $opt_current.text() + '</span>';
				_option_wrap += '</button>'; 
			}

			_option_wrap += '</div>'; 
			
			$.browser.mobile ? _option_wrap += '<button type="button" class="btn-close"><span>닫기</span></button>': '';
			$.browser.mobile ? _option_wrap += '<div class="dim"></div>': '';
			_option_wrap += '</div>'; 

			$sel_current.append('<input type="text" class="ui-select-btn" id="'+ sel_id +'_inp" role="combobox" aria-autocomplete="list" aria-owns="'+ list_id +'" aria-haspopup="true" aria-expanded="false" aria-activedescendant="'+ opt_id_selected +'" readonly value="'+ _txt +'" data-n="'+ sel_n +'" data-id="'+ sel_id +'">');

			$sel.addClass('off').attr('aria-hidden',true).attr('tabindex', -1);
			$sel_current.append(_option_wrap);
			sel_dis ? $sel_current.find('.ui-select-btn').prop('disabled', true).addClass('disabled') : '';
			_option_wrap = '';
		}
		
		//event
		$('.ui-select-btn')
			.off('click.ui keydown.ui mouseover.ui focus.ui blur.ui')
			.on({
				'click.ui': selectClick,
				'keydown.ui': selectKey,
				'mouseover.ui': selectOver,
				'focus.ui': selectOver,
				'blur.ui': optBlur
			});
		$('.ui-select-opt')
			.off('click.ui mouseover.ui')
			.on({
				'click.ui':optClick,
				'mouseover.ui':selectOver
			});
		$('.ui-select select')
			.off('change.ui')
			.on({
				'change.ui':selectChange,
			});
		
		function selectChange(){
			win[global].uiSelectAct({ id:$(this).attr('id'), current:$(this).find('option:selected').index(), original:true });
		}
		function optBlur() {
			clearTimeout(timer_opt);
			timer_opt = setTimeout(function(){
				optClose();
			},200)
		}
		function selectClick(){
			var $btn = $(this);

			clearTimeout(timer_opt);
			$btn.data('sct', $(doc).scrollTop());
			optExpanded(this);
		}
		function optClick() {
			var t = this,
				sct = $(t).closest('.ui-select').find('.ui-select-btn').data('sct');

			clearTimeout(timer_opt);
			win[global].uiSelectAct({ id:$(t).closest('.ui-select').find('.ui-select-btn').data('id'), current:$(t).index() })
			$(t).closest('.ui-select').find('.ui-select-btn').focus();
			optClose();
			console.log('sct', sct);
			win[global].uiScroll({ value:sct, speed:200 });
			
		}
		function selectOver(){
			clearTimeout(timer);
			$(this).closest('.ui-select').find('.ui-select-wrap.on').length > 0 ? clearTimeout(timer) : '';
		}
		function selectKey(e){
			var t = this,
				$btn = $(this),
				id = $btn.data('id'),
				$opt = $('#' + id + '_list').find('.ui-select-opt'),
				$wrap = $('#' + id + '_list').closest('.ui-select-wrap'),
				n = Number($('#' + id + '_list').find('.selected').index()),
				nn,
				wrap_h = $wrap.outerHeight(),
				len = $opt.length,
				n_top = 0;
			
			if (e.altKey) {  
				if (e.keyCode === keys.up) {      
					optOpen(t);      
				}    
				e.keyCode === keys.down && optClose();   
				return;
			} 
			
			switch(e.keyCode){
				case keys.up:
				nn = n - 1 < 0 ? len - 1 : n - 1;
				n_top = $opt.eq(nn).position().top;
				optScroll($wrap, n_top, wrap_h, 'up');
				optPrev(e, id, n, len);
				break;

				case keys.left:
				nn = n - 1 < 0 ? len - 1 : n - 1;
				n_top = $opt.eq(nn).position().top;
				optScroll($wrap, n_top, wrap_h, 'up');
				optPrev(e, id, n, len);
				break;

				case keys.down:
				nn = n + 1 > len - 1 ? 0 : n + 1;
				n_top = $opt.eq(nn).position().top;
				optScroll($wrap, n_top, wrap_h, 'down');
				optNext(e, id, n, len);
				break;

				case keys.right:
				nn = n + 1 > len - 1 ? 0 : n + 1;
				n_top = $opt.eq(nn).position().top;
				optScroll($wrap, n_top, wrap_h, 'down');
				optNext(e, id, n, len);
				break;
			}

			if (e.keyCode === keys.enter || e.keyCode === keys.space) {   
				e.preventDefault();

				$btn.data('sct', $(doc).scrollTop());
				optExpanded(this);
			}    
		}
		function optExpanded(t){
			if ($.browser.mobile) {
				optOpen(t)
			} else {
				if ($(t).attr('aria-expanded') === 'false') {
					optClose();
					optOpen(t);
				} else {
					optClose();	
				}	
			} 
		}
		function optScroll($wrap, n_top, wrap_h, key){
			if (key === 'up') {
				n_top < 0 ? $wrap.stop().animate({ 'scrollTop': $wrap.scrollTop() - wrap_h }) : n_top > wrap_h ? $wrap.stop().animate({ 'scrollTop': n_top }) : '';
			} else {
				n_top >= wrap_h ? $wrap.stop().animate({ 'scrollTop': $wrap.scrollTop() + wrap_h }) : n_top < 0 ? $wrap.stop().animate({ 'scrollTop': 0 }): '';
			}
		}
		function optPrev(e, id, n, len){
			e.preventDefault();
			n === 0 ? n = len - 1 : n = n - 1;
			win[global].uiSelectAct({ id:id, current:n });
		}
		function optNext(e, id, n, len){
			e.preventDefault();
			n === len - 1 ? n = 0 : n = n + 1;
			win[global].uiSelectAct({ id:id, current:n });
		}

		function optOpen(t){
			var _$sel = $(t),
				_$uisel = _$sel.closest('.ui-select'),
				_$wrap = _$uisel.find('.ui-select-wrap'),
				_$opts = _$wrap.find('.ui-select-opts'),
				_$opt = _$opts.find('.ui-select-opt'),

				offtop = _$uisel.offset().top,
				scrtop = $(doc).scrollTop(),
				wraph = _$wrap.outerHeight(),
				btnh = _$sel.outerHeight(),
				opth = _$opt.outerHeight(),
				winh = $(win).outerHeight(),
				clsname = 'bottom';

			clsname = winh - ((offtop - scrtop) + btnh) > wraph ? 'bottom' : 'top' ;			


			_$sel.closest('.ui-select-zindex').addClass('on');
			$('body').addClass('dim-dropdown');
			$('body').data('scrolling') === 'yes' ? win[global].uiScrollingCancel(): '';

			if(!_$sel.data('expanded')){
				_$sel.data('expanded', true).attr('aria-expanded', true);
				_$uisel.addClass('on');
				_$wrap.addClass('on ' + clsname).attr('aria-hidden', false);
				_$opts.find('.ui-select-opt').eq(_$uisel.find(':checked').index());

				win[global].uiScroll({ target:_$wrap, value:Number(opth * _$uisel.find(':checked').index()), speed:0 });
			}
		}
		function optClose(){
			var $select = $('.ui-select'),
				$btn = $('.ui-select-btn'),
				$wrap = $('.ui-select-wrap');
			
			$select.closest('.ui-select-zindex').removeClass('on');
			$('body').data('scrolling') === 'no' ? win[global].uiScrolling(): '';
			$('body').removeClass('dim-dropdown');
			$btn.data('expanded', false).attr('aria-expanded', false);
			$select.removeClass('on');
			$wrap.removeClass('on top bottom').attr('aria-hidden', true);
		}
	}
	function createUiSelectAct(opt){
		var id = typeof opt.id === 'string' ? opt.id : opt.id.attr('id'),
			$uisel = typeof opt.id === 'string' ? $('#' + opt.id).closest('.ui-select') : opt.id.closest('.ui-select'),
			$sel = $('#' + id),
			$opt = $sel.find('option'),
			$opt_ = $uisel.find('.ui-select-opt'),
			callback = opt.callback === undefined ? false : opt.callback,
			current= opt.current,
			org= opt.original === undefined ? false : opt.original;

		!org ?
			$uisel.find('option').prop('selected', false).eq(current).prop('selected', true).change() : '';
		$uisel.find('.ui-select-btn').val($opt.eq(current).text());
		$opt_.removeClass('selected').eq(current).addClass('selected');
		
		callback ? callback({ id:id, current:current, val:$opt.eq(current).val() }) : '';
	}

	/* ------------------------------------------------------------------------
	 * tab v2.0 
	 * $plugins.uiTab
	 * date : 2018-09-14
	 * exe : $plugins.uiTab({ id:'name', current:0, unres:false, callback:function(v){...} });
	 * option
	 * - id: 'name' [string] 
	 * - current: 0 [number] / 처음 열린패널 선택 (!선택, 기본 0)
	 * - unres: false [boolean] / true 일 경우 변경무 (!선택, -기본 false)
	 * - callback: function명 [function] / 콜백함수 실행 (!선택)
	 * 
	 * $plugins.uiTabAct
	 * date : 2018-09-14
	 * exe : $plugins.uiTabAct({ id:'name', current:0, callback:function(v){...} });
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiTab: function (opt) {
			return createUiTab(opt);
		},
		uiTabAct: function (opt) {
			return createUiTabAct(opt);
		}
	});
	win[global].uiTab.option = {
		current: 0,
		unres: false,
		callback: false
	};
	function createUiTab(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiTab.option, opt),
			id = opt.id,
			current = isNaN(opt.current) ? 0 : opt.current,
			unres = opt.unres,
			callback = opt.callback,
			keys = win[global].option.keys,
			$tab = $('#' + id),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			para = win[global].uiPara('tab'), // tab=idname-1
			len = $btn.length,
			ps_l = [],
			i, _class, _attr, is_current, id_pnl, id_btn, _$btn, _$pnl;

		//set up
		if (para !== undefined) {
			para = para.split('-');
			para[0] === id ? current = Number(para[1]) : '';
		}

		$tab.data('opt', opt);
		$btns.attr('role','tablist');
		$btn.attr('role','tab');
		$pnl.attr('role','tabpanel');
		
		for (i = 0; i < len; i++) {
			is_current = current === i;
			_class = is_current ? 'addClass' : 'removeClass';
			_attr = is_current ? 'removeAttr' : 'attr';
			_$btn = $btn.eq(i);
			_$pnl = $pnl.eq(i);

			//id make
			_$btn.attr('id') === undefined ? _$btn.attr('id', id + 'Btn' + i) : '';
			_$pnl.attr('id') === undefined ? _$pnl.attr('id', id + 'Pnl' + i) : '';
			
			id_btn = _$btn.attr('id');
			id_pnl = _$pnl.attr('id');

			_$btn.attr('aria-controls', id_pnl)[_attr]('tabindex', -1)[_class]('selected');

			if (unres === false) {
				_$pnl.attr('aria-labelledby', id_btn)[_class]('selected');
			} else {
				is_current ? $pnl.attr('aria-labelledby', id_btn).addClass('selected') : '';
			}

			is_current ? 
				_$btn.attr('aria-selected', true).addClass('selected'):
				_$btn.attr('aria-selected', false).removeClass('selected');
			
			ps_l.push(Math.ceil(_$btn.position().left));

			i === 0 ? _$btn.attr('tab-first', true) : '';
			i === len - 1 ? _$btn.attr('tab-last', true) : ''
		}

		callback ? callback(opt) : '';

		$btn.data('psl', ps_l).data('len', len);
		win[global].uiScroll({ 
			value: ps_l[current], 
			target: $btn.parent(), 
			speed: 0, 
			ps: 'left' 
		});

		//event
		$btn
			.off('click.uitab keydown.uitab')
			.on({
				'click.uitab': evtClick,
				'keydown.uitab': evtKeys
			});

		function evtClick() {
			win[global].uiTabAct({ id: id, current: $(this).index() }); 
		}
		function evtKeys(e) {
			var $this = $(this),
				n = $this.index(),
				m = Number($this.data('len'));

			switch(e.keyCode){
				case keys.up: upLeftKey(e);
				break;

				case keys.left: upLeftKey(e);
				break;

				case keys.down: downRightKey(e);
				break;

				case keys.right: downRightKey(e);
				break;

				case keys.end: endKey(e);
				break;

				case keys.home: homeKey(e);
				break;
			}

			function upLeftKey(e) {
				e.preventDefault();
				!$this.attr('tab-first') ? 
				win[global].uiTabAct({ id: id, current: n - 1 }): 
				win[global].uiTabAct({ id: id, current: m - 1 });
			}
			function downRightKey(e) {
				e.preventDefault();
				!$this.attr('tab-last') ? 
				win[global].uiTabAct({ id: id, current: n + 1 }): 
				win[global].uiTabAct({ id: id, current: 0 });
			}
			function endKey(e) {
				e.preventDefault();
				win[global].uiTabAct({ id: id, current: m - 1 });
			}
			function homeKey(e) {
				e.preventDefault();
				win[global].uiTabAct({ id: id, current: 0 });
			}
		}
	}
	function createUiTabAct(opt) {
		var id = opt.id,
			$tab = $('#' + id),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			ps_l = $btn.data('psl'),
			opt = $.extend(true, {}, $tab.data('opt'), opt),
			current = isNaN(opt.current) ? 0 : opt.current,
			unres = opt.unres,
			callback = opt.callback;

		$btn
			.attr('aria-selected', false).attr('tabindex', -1).removeClass('selected')
			.eq(current).attr('aria-selected', true).removeAttr('tabindex').addClass('selected').focus();
		
		win[global].uiScroll({ 
			value: ps_l[current], 
			target: $btns, 
			speed: 200, 
			ps: 'left' 
		});
		if (unres === false) {
			$pnl.removeClass('selected').eq(current).addClass('selected');
		}

		!!callback ? callback(opt) : '';
	}

	/* ------------------------------------------------------------------------
	 * tooltip v2.0 
	 * date : 2018-10-06
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiTooltip: function (opt) {
			return createUiTooltip(opt);
		}
	});
	win[global].uiTooltip.option = {
		visible: null,
		id: false,
		ps: false
	};
	function createUiTooltip(opt){
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiTblScroll.option, opt),
			$btn = $('.ui-tooltip-btn'),
			$tip = opt.id ? typeof opt.id === 'string' ? $('#' + opt.id) : opt.id : false,
			visible = opt.visible,
			id = opt.id ? $tip.attr('id') : '',
			
			sp = 10,
			ps = opt.ps,
			off_t, off_l, w, h, bw, bh, st, sl, timer,
			class_ps = 'ps-ct ps-cb ps-lt ps-lb ps-rt ps-rb';

		if (visible !== null) {
			visible ? tooltipSet(id) : tooltipHide();
		}

		$btn
			.on('click', function(e){
				e.preventDefault();
				tooltipSet($(this).attr('aria-describedby'));
			})
			.off('mouseover.ui touchstart.ui focus.ui').on('mouseover.ui touchstart.ui focus.ui', function(e){
				tooltipSet($(this).attr('aria-describedby'));
			})
			
			.off('mouseleave.ui ').on('mouseleave.ui', function(){
				tooltipHideDelay();

				$('.ui-tooltip')
					.on('mouseover.ui', function(){
						clearTimeout(timer);
					})
					.on('mouseleave.ui', function(e){
						tooltipHideDelay();
					});
			})
			.off('touchcancel.ui touchend.ui blur.ui').on('touchcancel.ui touchend.ui blur.ui', function(e){
				tooltipHide();
			});
		
		function tooltipSet(v) {
			var $t = $('[aria-describedby="'+ v +'"]');

			$('#' + v).removeClass(class_ps);

			id = v;
			off_t = $t.offset().top;
			off_l =$t.offset().left;
			w = $t.outerWidth();
			h = $t.outerHeight();
			bw = $(win).innerWidth();
			bh = $(win).innerHeight();
			st = $(doc).scrollTop();
			sl = $(doc).scrollLeft();
			
			tooltipShow(off_t, off_l, w, h, bw, bh, st, sl, id, false);
		}
		function tooltipHide() {
			$('.ui-tooltip').removeAttr('style').attr('aria-hidden', true).removeClass(class_ps);
		}
		function tooltipHideDelay(){
			timer = setTimeout(tooltipHide, 100);
		}

		function tooltipShow(off_t, off_l, w, h, bw, bh, st, sl, id) {
			var $id = $('#' + id),
				pst = (bh / 2 > (off_t - st) + (h / 2)) ? true : false,
				psl = (bw / 2 > (off_l - sl) + (w / 2)) ? true : false,
				tw = $id.outerWidth(),
				th = $id.outerHeight(),
				ps_l, ps_r, cursorCls = 'ps-';
				
			if (psl) {
				if (off_l - sl > tw / 2) {
					cursorCls += 'c';
					ps_l = off_l - (tw / 2) + (w / 2);
				} else {
					cursorCls += 'l';
					ps_l = off_l;
				}
			} else {
				if (bw - (off_l - sl + w) > tw / 2) {
					cursorCls += 'c';
					ps_r = Math.ceil(off_l) - (tw / 2) + (w / 2);
				} else {
					cursorCls += 'r';
					ps_r = off_l - tw + w;
				}
			}

			ps ? cursorCls = 'ps-l' : '';
			ps ? ps_l = off_l : '';
			ps ? psl = true : '';

			pst ? cursorCls += 'b' : cursorCls += 't';

			if (!!$id.attr('modal')) {
				if (!$.browser.oldie) {
					ps_l = ps_l;
					ps_r = ps_r;
				}

				$.browser.ie ? '' : off_t = off_t;
			}

			if (!!$id.closest('.type-fixed-bottom').length) {
				off_t = off_t - $('ui-modal-tit').outerHeight();
			}

			$id.addClass(cursorCls).attr('aria-hidden', false).css({ 
				display:'block'
			}).css({
				top : pst ? off_t + h + sp : off_t - th - sp,
				left : psl ? ps_l : ps_r
			});
		}
	}

	/* ------------------------------------------------------------------------
	 * table 
	 * - table scroll v2.0
	 * - table caption v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiTblScroll: function () {
			return createUiTblScroll();
		},
		uiCaption: function () {
			return createUiCaption();
		}
	});
	win[global].uiTblScroll.option = {
		selector: '.ui-tblscroll',
		coln: 5
	}
	function createUiTblScroll(opt){
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiTblScroll.option, opt),
			$tbl = $(opt.selector),
			coln = opt.coln,
			len = $tbl.length,
			$thead = '',
			$tbody = '',
			h = 0,
			i = 0,
			clone_colgroup,
			clone_thead,
			clone_tbl = '';

		for (i = 0; i < len; i++) {
			coln = !!$tbl.eq(i).data('col') ? $tbl.eq(i).data('col') : coln,
			$tbody = $tbl.eq(i).find('.tbl-scroll-tbody');
			clone_colgroup = $tbody.find('colgroup').clone();
			clone_thead = $tbody.find('thead tr').clone();
			h = 0;

			clone_tbl += '<table class="tbl-scroll-thead txt-c" aria-hidden="true" tabindex="-1">';
			clone_tbl += '</table>';

			$tbl.prepend(clone_tbl);
			$tbl.find('.tbl-scroll-thead').append(clone_colgroup);
			$tbl.find('.tbl-scroll-thead').append(clone_thead);
			$thead = $tbl.eq(i).find('.tbl-scroll-thead');

			$thead.find('th').each(function(){
				$(this).replaceWith('<td>'+ $(this).text() +'</td>');
			});


			if ($tbody.find('tbody tr').length > coln) {
				for (var j = 0; j < coln; j++) {
					h = h + $tbody.find('tbody tr').eq(j).outerHeight();
				}
				$tbl.eq(i).addClass('is-scr');
				$tbody.css('max-height', h + 'px');
				$thead.find('col').eq(-1).removeClass().addClass($tbody.find('col').eq(-1).attr('class') + '-scr');
			}
		}
	}
	function createUiCaption(){
		var $cp = $('.ui-caption');

		$cp.text('');
		$cp.each(function(){
			var $table = $(this).closest('table'),
				isthead = !!$table.find('> thead').length,
				$th = $(this).closest('table').find('> tbody th'),
				th_len = $th.length,
				i = 0,
				cp_txt = '';
			if (isthead) {
				$th = $(this).closest('table').find('> thead th');
				th_len = $th.length
			}

			for (i = 0; i < th_len; i++) {
				if ($th.eq(i).text() !== '') {
					cp_txt += $th.eq(i).text();
				}
				if (i < th_len - 1) {
					cp_txt += ', ';
				}
			}
			$(this).text(cp_txt + ' 정보입니다.');
		})
	}

	/* ------------------------------------------------------------------------
	 * object floating v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiFloating: function (opt) {
			return createUiFloating(opt);
		}
	});
	win[global].uiFloating.option = {
		ps: 'bottom',
		add: false,
		fix: true,
		callback: false
	};
	function createUiFloating(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiFloating.option, opt),
			id = opt.id,
			ps = opt.ps,
			add = opt.add,
			fix = opt.fix,
			callback = opt.callback,
			$id = $('#' + id),
			$idwrap = $id.find('.ui-floating-wrap'),
			$add = $('#' + add),
			$addwrap = $add.find('.ui-floating-wrap').length ? $add.find('.ui-floating-wrap') : $add,
			c = 'ui-fixed-' + ps,
			timer;
		
		!!fix ? $id.addClass(c) : '';
		
		if ($id.length) {
			clearTimeout(timer);
			timer = setTimeout(act, 300);
		}
		
		$(win).off('scroll.'+ id ).on('scroll.'+ id, function(){
			if ($id.length) {
				act();
				clearTimeout(timer);
				timer = setTimeout(act, 500);
			}
		});
		
		function act(){
			var tt = Math.ceil($id.offset().top),
				th = Math.ceil($idwrap.outerHeight()),
				st = $(win).scrollTop(),
				wh = Math.ceil( $.browser.mobile ? window.screen.height : $(win).outerHeight() ),
				dh = Math.ceil($(doc).outerHeight()),
				lh = (!!add) ? $add.outerHeight() : 0 ,
				lt = (!!add) ? dh - ($add.offset().top).toFixed(0) : 0,
				lb = 0, 
				_lb;
			
			$id.data('fixbottom', th);
			if ($add.data('fixbottom') === undefined) {
				$add.data('fixbottom', th + $addwrap.outerHeight());
			} 
			!!add ? lh = lh + Number($add.data('fixtop') === undefined ? 0 : $add.data('fixtop')) : '';
			!!callback ? callback({ id:id, scrolltop:st, boundaryline: tt - lh }) : '';
			$id.css('height', th);

			// 상단으로 고정
			if (ps === 'top') {
				// 고정 > 흐름
				if (fix === true) {
					if (tt - lh <= st) { 
						$id.removeClass(c).data('fixtop', false);
						$idwrap.removeAttr('style');
					} else { 
						$id.addClass(c).data('fixtop', lh);
						$idwrap.css('top', lh);
					}
				} 
				// 흐름 > 고정	
				else {
					if (tt - lh <= st) { 
						$id.addClass(c).data('fixtop', lh);
						$idwrap.css('top', lh);
					} else { 
						$id.removeClass(c).data('fixtop', false);
						$idwrap.removeAttr('style');
					}
				}
			} 
			// 하단으로 고정
			else if (ps === 'bottom') {
				if (!!add) { 
					lb = th + Number($add.data('fixbottom'));
					$id.data('fixbottom', lb);
				}
				_lb = (lb - th < 0) ? 0 : lb - th;
				// 고정 > 흐름
				if (fix === true) {
					if (tt + th + _lb - wh <= st) { 
						$id.removeClass(c);
						$idwrap.removeAttr('style');
					} else {
						$id.addClass(c)
						$idwrap.css('bottom', _lb);
					}
						
				// 흐름 > 고정		
				} else {
					if (tt + th + _lb - wh <= st) {
						$id.addClass(c);
						$idwrap.css('bottom', _lb);
						// if (lt !== 0) {
						// 	if (dh - (lt + wh) < st) {
						// 		$idwrap.css({ position: 'fixed', bottom:'auto' , top: (wh - th) - Math.abs((wh + lt) - (dh - st)) , zIndex: 9999 });
						// 	} else{
						// 		$idwrap.removeAttr('style');
						// 	}
						// }
					} else {
						$id.removeClass(c);
						$idwrap.removeAttr('style');
					}
				}
			}
		}
	}

	/* ------------------------------------------------------------------------
	 * Brick list v1.0 
	 * $plugins.uibricklist
	 * date : 2018-04-21
	 * option
	 * - id: 'name' [string] 
	 * - margin: 0 [number] / 아이템간의 간격 마진값
	 * - response: true or false [boolean] / resize 시 재구성여부 
	 * 
	 * Brick list v1.0 
	 * $plugins.uibricklistAdd
	 * date : 2018-04-21
	 * option
	 * - id: 'name' [string] 
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiBrickList: function (opt) {
			return createUiBrickList(opt);
		},
		uiBrickListAdd: function (opt) {
			return createUiBrickListAdd(opt);
		}
	});
	win[global].uiBrickList.option = {
		margin: 0,
		response: true
	}
	function createUiBrickList(opt){
		if (opt === undefined) { return false; }
		
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiBrickList.option, opt),
			$base = $('#' + opt.id), 
			$item = $base.find('.ui-bricklist-item'),
			mg = opt.margin,
			re = opt.response,
			wrap_w  = $base.outerWidth(),
			item_w  = $item.outerWidth(),
			item_sum = $item.length,
			item_col = Math.floor(wrap_w / (item_w + mg)),
			item_row = (item_sum / item_col) + (item_sum % item_col) ? 1 : 0,
			item_top = [],
			i = 0,
			timer;

		for (i = 0; i < item_col; i++) {
			$item.eq(i).attr('role','listitem').css({
				position: 'absolute',
				left : (item_w + mg) * i,
				top : 0,
				opacity: 1
			});
			item_top[i] = $item.eq(i).outerHeight() + mg;
		}
		
		$base.data('opt', { 'wrap':wrap_w, 'width':item_w, 'top':item_top, 'row':item_row, 'col':item_col, 'mg':mg });
		win[global].uiBrickListAdd({ id: opt.id });
		
		if (re) {
			$(win).resize(function(){
				clearTimeout(timer);
				timer = setTimeout(function(){
					win[global].uiBrickList({ id : opt.id, margin: opt.margin });
				},500);
				$base.find('.ui-bricklist-wrap').css('height', Math.max.apply(null, item_top));
			});
		}	
	}
	function createUiBrickListAdd(opt){
		if (opt === undefined) { return false; }
		
		var $base = $('#' + opt.id), 
			$item = $base.find('.ui-bricklist-item'),
			dataOpt = $base.data('opt'),
			wrap_w = dataOpt.wrap,
			item_w = dataOpt.width,
			item_sum = $item.length,
			item_col = dataOpt.col,
			item_row = dataOpt.row,
			item_top = dataOpt.top,
			mg = dataOpt.mg,
			i = item_col,
			minH, nextN, item_h,timer;

		clearTimeout(timer);
		timer = setTimeout(function(){
			for (i; i < item_sum; i++) {
				minH = Math.min.apply(null, item_top)
				nextN = item_top.indexOf(minH);
				item_h = Number($item.eq(i).outerHeight() + mg);
				
				$item.eq(i).css({
					position: 'absolute',
					left : (item_w * nextN) + (mg * nextN),
					top : item_top[nextN],
					opacity: 1
				});
				item_top[nextN] = Number(minH + item_h);
			}
			$base.data('opt', { 'wrap':wrap_w, 'width':item_w, 'top':item_top, 'row':item_row, 'col':i, 'mg':mg })
			.find('.ui-bricklist-wrap').css('height', Math.max.apply(null, item_top));
		},300);
	}

	/* ------------------------------------------------------------------------
	 * print v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiPrint: function (opt) {
			return createUiPrint(opt);
		}
	});
	function createUiPrint(opt) {
		var $print = $('#' + opt.id),
			clone = $print.clone(),
			html = '<div class="base-print"></div>';

		$('body').append(html);
		$('.base-print').append(clone);

		win.print();
		setTimeout(function(){
			$('.base-print').remove();
		},0);
	}

	/* ------------------------------------------------------------------------
	 * slot machine v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiSlot: function (opt) {
			return createUiSlot(opt);
		},
		uiSlotStart: function (opt) {
			return createUiSlotStart(opt);
		},
		uiSlotStop: function (opt) {
			return createUiSlotStop(opt);
		}
	});
	win[global].uiSlot.play = {}
	function createUiSlot(opt){
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiSlot({ id:'아이디명', auto:true/false, single:true/false });",
				"- id: #을 제외한 아이디명만 입력(!필수)",
				"- auto: true일 경우 자동실행, (!선택 - 기본값 false)",
				"- single: true일 경우 하나만 노출, false일 경우 걸쳐보이는...(!선택 - 기본값 true)",
				"※  슬롯머신효과"
			]);
			return false;
		}
		
		var $slot = $('#' + opt.id),
			current = opt.current === undefined ? 0 : opt.current,
			auto = opt.auto === undefined ? false : opt.auto,
			single = opt.single === undefined ? true : opt.single,
			$wrap = $slot.find('.ui-slot-wrap'),
			$item = $wrap.find('.ui-slot-item'),
			item_h = $item.outerHeight(),
			len = $item.length,
			cut, clone;
		
		//common set up
		$slot.data('n', len).data('single', single);
		$item.each(function(i){
			$(this).attr('n', i + 1).data('n', i + 1);
		});
		
		//single or multi set up
		if (single) {
			$wrap.css({ 
				marginTop: 0, 
				top: (current - 1) * item_h * -1
			});
			itemClone({ n: 0, append: true });
		} else {
			$wrap.css({ 
				marginTop: ((item_h/2) + item_h) * -1, 
				top: 0
			});
			if (current - 1 > 0) {
				for(var i = 0; i < current - 1; i++){
					// 2일경우
					if (current - 2 === i) {
						itemClone({ n: i - 1, append: false });
						itemClone({ n: i, append: true });
						itemClone({ n: i + 1, append: true });
						itemClone({ n: i + 2, append: true });
					} else {
						cut = $item.eq(i).detach();
						$wrap.append(cut);
					}
				}
			} else {
				itemClone({ n: - 1, append: false });
				itemClone({ n: - 2, append: false });
				itemClone({ n: current - 1, append: true });
				itemClone({ n: current, append: true });
			}
		}

		function itemClone(opt) {
			//var stickitem = opt.append ? 'append' : 'prepend';
			clone = $item.eq(opt.n).clone().addClass('clone').removeAttr('n');
			$wrap[opt.append ? 'append' : 'prepend'](clone);
		}
		auto ? win[global].uiSlotStart(opt) : '';
	}
	function createUiSlotStart(opt){
		//option guide
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiSlotStart({ id:'아이디명' });",
				"- id: #을 제외한 아이디명만 입력(!필수)",
				"※  슬롯머신 시작"
			]);
			return false;
		}
		
		var $slot = $('#' + opt.id),
			$wrap = $slot.find('.ui-slot-wrap'),
			$item = $wrap.find('.ui-slot-item'),
			single = $slot.data('single'),
			item_h = $item.outerHeight(),
			len = $item.length,
			wrap_h = len * item_h,
			h = 0;
		
		var s = 500;
		if (!$slot.data('ing')) {
			$slot.data('ing', true);
			win[global].uiSlot.play[opt.id] = win.setInterval(steplot, s);
		}
		
		function steplot(){
			$wrap.css('top', 0).stop().animate({
				top: single ? item_h * (len - 1) * -1 : Math.ceil(item_h * (len - 3) * -1)
			},s , 'linear') ;
			win.clearInterval(win[global].uiSlot.play[opt.id]);
			win[global].uiSlot.play[opt.id] = win.setInterval(steplot, s);
		}
	}
	function createUiSlotStop(opt){
		//option guide
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiSlotStop({ id:'아이디명', callback:function(result){...} });",
				"- id: #을 제외한 아이디명만 입력(!필수)",
				"- callback: 콜백함수 선택값 전달 (!선택)",
				"※  슬롯머신 정지"
			]);
			return false;
		}
		
		var $slot = $('#' + opt.id),
			$wrap = $slot.find('.ui-slot-wrap'),
			$item = $wrap.find('.ui-slot-item'),
			item_h = $item.outerHeight(),
			len = $item.length,
			
			callback = opt.callback,
			single = $slot.data('single'),
			n = $slot.data('n'),
			result = Math.floor(Math.random() * n) + 1,
			index =  $wrap.find('.ui-slot-item[n="' + result + '"]').index(),
			x = single ? index : index - 2,
			timer, t, s = 500;
		
		$slot.data('ing', false);
		$item.removeClass('selected');
		single ? $wrap.css('margin-top', 0): '';

		clearTimeout(timer);
		timer = setTimeout(function(){
			win.clearInterval(win[global].uiSlot.play[opt.id]);
			t = item_h * x * -1 > 0 ? item_h * x : item_h * x * -1;
			$wrap.stop().animate({
				top: t
			},1000, 'easeOutQuad', function(){
				$wrap.find('.ui-slot-item').eq(index).addClass('selected');
				callback(result);
			});
		},10);
	}

	/* ------------------------------------------------------------------------
	 * slider v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiSlider: function (opt) {
			return createUiSlider(opt);
		}
	});
	function createUiSlider(opt) {
		var $slider = $('#' + opt.id),
			$wrap = $slider.find('.ui-slider-wrap'),
			$divwrap = $slider.find('.ui-slider-divwrap'),
			$bg = $wrap.find('.ui-slider-bg'),
			$btn = $wrap.find('button'),
			$btn_s = $wrap.find('.ui-slider-btn-s'),
			$btn_e = $wrap.find('.ui-slider-btn-e'),
			$bar = $bg.find('.ui-slider-bar'),
			vertical = (opt.vertical === undefined) ? false : opt.vertical,//가로세로 type
			range = (opt.range === undefined) ? false : opt.range,//range type
			rev = (opt.reverse === undefined) ? false : opt.reverse,//역순
			stepname = (opt.stepname === undefined) ? false : opt.stepname,
			acc = (opt.acc === undefined) ? false : opt.acc;//select 연결

		rev ? $slider.addClass('type-reverse') : $slider.removeClass('type-reverse');
		vertical ? $slider.addClass('type-vertical') : $slider.removeClass('type-vertical');

		var	step = opt.step,
			id = opt.id,
			min = opt.min,
			max = opt.max,
			tooltip = (opt.txt_e === undefined) ? false : opt.tooltip,
			callback = (opt.callback === undefined) ? false : opt.callback,
			unit = (opt.unit === undefined) ? '' : opt.unit,
			txt_e = (opt.txt_e === undefined) ? '' : opt.txt_e,
			txt_s = (opt.txt_s === undefined) ? '' : opt.txt_s,
			slider_w = !vertical ? $bg.outerWidth() : $bg.outerHeight(),
			step_w = 100 / step,
			unit_sum = (max - min) / step,
			now_s = opt.now[0] < min ? min : opt.now[0],
			now_e = opt.now[1] > max ? max : opt.now[1],
			per_min = ((now_s - min) / (max - min)) * 100,
			per_max = ((now_e - min) / (max - min)) * 100,
			div_w = Math.ceil(slider_w / step),
			maxlimit = 100,
			minlimit = 0,
			lmt_max,
			lmt_min,
			now_sum = [],
			sliderstep = [],
			p, keyCode, $sel_s, $sel_e, txt_val,
			dir = !vertical ? rev ? 'right' : 'left' : rev ? 'bottom' : 'top',
			siz = !vertical ? 'width' : 'height';

		//percent change
		per_min = perStep(per_min);
		range ? per_max = perStep(per_max) : '';

		//web accessibility : select 
		if (acc) {
			$sel_s = $('[data-sliderselect="' + opt.id + '"]').find('.ui-slider-min');
			range ? $sel_e = $('[data-sliderselect="' + opt.id + '"]').find('.ui-slider-max') : '';
		}
		
		//reset
		$wrap.find('.ui-slider-tooltip').remove();
		$divwrap.find('span').remove();
		
		//tooltip setting
		if (!!tooltip) {
			$wrap.append('<div class="ui-slider-tooltip"></div>');
			sliderTooltip({ unit:unit, now_1:opt.now[0], now_2:opt.now[1], per_min:per_min, per_max:per_max });
			sliderCallback({ callback:callback, now_1:opt.now[0], now_2:opt.now[1] });
		} 
		
		//button setting
		$btn_s.css(dir, per_min + '%').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
		range ? $btn_e.css(dir, per_max + '%').find('.ui-slider-txt').text(((per_max / step_w) * unit_sum) + min) : '';
		//range 타입 : 버튼이 겹치는 경우 우선 클릭될 버튼 설정
		if (per_min === per_max && per_min >= 50 && range) {
			$btn_s.addClass('on');
			$btn_e.removeClass('on');
		} else if (per_min === per_max && per_max < 50 && range){
			$btn_s.removeClass('on');
			$btn_e.addClass('on');
		}
		
		//graph bar setting
		!range ? $bar.css(siz,per_min + '%').css(dir,0) : $bar.css(siz,per_max - per_min + '%').css(dir,per_min + '%' );

		//graph step & select option setting
		for (var i = 0; i < step + 1; i++) {
			txt_e = (i === step) ? opt.txt_e : '';
			txt_s = (i === 0) ? opt.txt_s : '';
			txt_val = parseInt(min + (unit_sum * i));
			now_sum.push(txt_val);
			if (stepname) {
				$divwrap.append('<span class="ui-slider-div n'+ i +'" style="'+ dir +':' + step_w * i + '%; '+ siz +':' + div_w + 'px; margin-'+ dir +':' + (div_w / 2) * -1 + 'px"><em>' + stepname[i] + '</em></div>');
			} else {
				$divwrap.append('<span class="ui-slider-div n'+ i +'" style="'+ dir +':' + step_w * i + '%; '+ siz +':' + div_w + 'px; margin-'+ dir +':' + (div_w / 2) * -1 + 'px"><em>' + txt_val + ' ' + txt_e + '' + txt_s + '</em></div>');
			}
			
			sliderstep.push(parseInt(min + (unit_sum * i)));
			if (stepname) {
				if (acc) {
					if (now_s === txt_val) {
						$sel_s.append('<option value="' + txt_val + '" selected>' + stepname[i] + '</option>');
					} else if (now_e < txt_val) {
						$sel_s.append('<option value="' + txt_val + '" disabled>' + stepname[i] + '</option>');
					} else {
						$sel_s.append('<option value="' + txt_val + '">' + stepname[i] + '</option>');
					}
					
					if (now_e === txt_val && range) {
						$sel_e.append('<option value="' + txt_val + '" selected>' + stepname[i] + '</option>');
					} else if (now_s > txt_val && range) {
						$sel_e.append('<option value="' + txt_val + '" disabled>' + stepname[i] + '</option>');
					} else if (range){
						$sel_e.append('<option value="' + txt_val + '">' + stepname[i] + '</option>');
					}
				}
			} else {
				if (acc) {
					if (now_s === txt_val) {
						$sel_s.append('<option value="' + txt_val + '" selected>' + txt_val + '' + opt.unit + ' ' + txt_e +'' + txt_s + '</option>');
					} else if (now_e < txt_val) {
						$sel_s.append('<option value="' + txt_val + '" disabled>' + txt_val + '' + opt.unit + ' ' + txt_e +'' + txt_s + '</option>');
					} else {
						$sel_s.append('<option value="' + txt_val + '">' + txt_val + '' + opt.unit + ' ' + txt_e +'' + txt_s + '</option>');
					}
					
					if (now_e === txt_val && range) {
						$sel_e.append('<option value="' + txt_val + '" selected>' + txt_val + '' + opt.unit + ' ' + txt_e +'' + txt_s + '</option>');
					} else if (now_s > txt_val && range) {
						$sel_e.append('<option value="' + txt_val + '" disabled>' + txt_val + '' + opt.unit + ' ' + txt_e +'' + txt_s + '</option>');
					} else if (range){
						$sel_e.append('<option value="' + txt_val + '">' + txt_val + '' + opt.unit + ' ' + txt_e +'' + txt_s + '</option>');
					}
				}
			}
			
		}
		
		if (acc) {
			$('[data-sliderselect="' + opt.id + '"]').find('.ui-slider-min').on('change', function(){
				per_min = (($(this).val() - min) / (max - min)) * 100;
				per_min = perStep(per_min);
				actSel($(this).find('option:selected').index(), 'min');
				act($btn_s, 'min');
			});
			$('[data-sliderselect="' + opt.id + '"]').find('.ui-slider-max').on('change', function(){
				per_max = (($(this).val() - min) / (max - min)) * 100,
				per_max = perStep(per_max);
				actSel($(this).find('option:selected').index(), 'max');
				act($btn_e, 'max');
			});
		}

		$('body	.ui-slider-wrap button').on('touchmove.uislider', function(e){
			e.preventDefault()}
		);

		$btn.off('mousedown.sliderstart touchstart.sliderstart').on('mousedown.sliderstart touchstart.sliderstart', function(e){
			e.preventDefault();
			var $this = $(this),
				minmax = $this.data('btn'),
				moving = false;
	
			$(doc).off('mousemove.slidermove touchmove.slidermove').on('mousemove.slidermove touchmove.slidermove', function(e){
				moving = true;
				($('html').is('.mb')) ? per($this, event, minmax) : per($this, e, minmax);
				sliderTooltip({ now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min, per_min:perStep(per_min), per_max:perStep(per_max) });
				
			}).off('mouseup.sliderend touchcancel.slidermove touchend.slidermove').on('mouseup.sliderend touchcancel.slidermove touchend.slidermove', function(e){
				$this.closest('.ui-slider').find('.ui-slider-wrap button').removeClass('on');
				moving ? act($this, minmax) : '';
				$(doc).off('mousemove.slidermove mouseup.sliderend touchmove.slidermove');
			});
		});
		
		/* 접근성 이슈 : 키보드와 스크리리더기의 키 중복 */
		$btn_s.off('keyup.' + opt.id).on('keyup.' + opt.id, function(e){
			e.preventDefault();
			keyCode = e.keyCode || e.which;
			p = per_min;
			
			var $btnthis = $(this),
				$barthis = $btnthis.closest('.ui-slider').find('.ui-slider-bar');

			if(keyCode == 39 || keyCode == 40) {
				per_min = per_min + step_w;
				if (per_min > per_max) {
					per_min = per_max;
					alert('최대값을 수정하세요');
				} else {
					$btnthis.css(dir, per_min + '%').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
					$barthis.css(dir,per_min + '%').css(siz,(per_max - per_min) + '%');
				}
			}
			
			if(keyCode == 37 || keyCode ==  38) {
				per_min = per_min - step_w;
				if (per_min < 0) {
					per_min = 0;
					alert('최소값입니다.');
				} else {
					$btnthis.css(dir, per_min + '%').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
					$barthis.css(dir,per_min + '%').css(siz,(per_max - per_min) + '%');
				}
			}
			
			sliderTooltip({ now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min, per_min:per_min, per_max:per_max });
			sliderCallback({ callback:callback, now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min });
		});
		
		$btn_e.off('keyup.' + opt.id).on('keyup.' + opt.id, function(e){
			e.preventDefault();
			keyCode = e.keyCode || e.which;
			p = per_max;
			
			var $btnthis = $(this),
				$barthis = $btnthis.closest('.ui-slider').find('.ui-slider-bar');
			
			if(keyCode == 39 || keyCode == 40) {
				per_max = per_max + step_w;
				if (per_max > 100) {
					per_max = 100;
					alert('최대값입니다');
				} else {
					$btnthis.css(dir, per_max + '%').find('.ui-slider-txt').text(((per_max / step_w) * unit_sum) + min);
					$barthis.css(dir,per_min + '%').css(siz, (per_max - per_min) + '%');
				}
			}
			
			if(keyCode == 37 || keyCode ==  38) {
				per_max = per_max - step_w;
				if (per_max < per_min) {
					per_max = per_min;
					alert('최소값을 수정하세요.');
				} else {
					$btnthis.css(dir, per_max + '%').find('.ui-slider-txt').text(((per_max / step_w) * unit_sum) + min);
					$barthis.css(dir,per_min + '%').css(siz, (per_max - per_min) + '%');
				}
			}
			
			sliderTooltip({ now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min, per_min:per_min, per_max:per_max });
			sliderCallback({ callback:callback, now_1:((per_min / step_w) * unit_sum) + min, now_2:((per_max / step_w) * unit_sum) + min });
		});
		
		function act($this, minmax){
			if (minmax === 'min') {
				per_min = perStep(per_min);
				!range ? $bar.css(siz, per_min + '%').css(dir, 0) : $bar.css(siz, per_max - per_min + '%').css(dir, per_min + '%');
				lmt_min = per_min;
				if (acc) {
					now_sum.forEach(function(v, i){
						(v === ((per_min / step_w) * unit_sum) + min) ? actSel(i, minmax) : '';
					});
				}

				$this.css(dir, per_min + '%').addClass('on').find('.ui-slider-txt').text(((per_min / step_w) * unit_sum) + min);
			} else {
				per_max = perStep(per_max);
				$bar.css(siz, (per_max - per_min) + '%').css(dir,per_min + '%');

				lmt_max = per_max;
				if (acc) {
					now_sum.forEach(function(v, i){
						(v === ((per_max / step_w) * unit_sum) + min) ? actSel(i, minmax): '';
					});
				}
				$this.css(dir, per_max + '%').addClass('on').find('.ui-slider-txt').text(((per_max / step_w) * unit_sum) + min);
			}

			sliderTooltip({ now_1: ((per_min / step_w) * unit_sum) + min, now_2: ((per_max / step_w) * unit_sum) + min, per_min: per_min, per_max: per_max });
			sliderCallback({ callback:callback, now_1:Number(((per_min / step_w) * unit_sum) + min), now_2:Number(((per_max / step_w) * unit_sum) + min) });
		}
		function actSel(n, minmax){
			if (minmax === 'min') {
				range ? $sel_e.find('option').removeAttr('disabled') : '';
				$sel_s.find('option').eq(n).prop('selected', 'selected');
				range ? $sel_e.find('option:lt('+ n +')').prop('disabled', 'disabled') : '';
			} else {
				$sel_s.find('option').removeAttr('disabled');
				$sel_e.find('option').eq(n).prop('selected', 'selected');
				$sel_s.find('option:gt('+ n +')').prop('disabled', 'disabled');
			}
		}
		function perStep(v){
			var n = ((v % step_w) >= step_w / 2) ? 1 : 0;
			return (Math.floor(v / step_w) + n) * step_w;
		}
		function per($this, e, minmax){
			var value_l;
			slider_w = !vertical ? $bg.outerWidth() : $bg.outerHeight();
			if (!vertical) {
				if (e.touches !== undefined) {
					value_l = e.touches[0].pageX - $bg.offset().left - 0;
				}
				if (e.touches === undefined) {
					if (e.pageX !== undefined) {
						value_l = e.pageX - $bg.offset().left - 0;
					}
					//ie
					if (e.pageX === undefined) {
						value_l = e.clientX - $bg.offset().left - 0;
					}
				}
			} else {
				if (e.touches !== undefined) {
					value_l = e.touches[0].pageY - $bg.offset().top - 0;
				}
				if (e.touches === undefined) {
					if (e.pageX !== undefined) {
						value_l = e.pageY - $bg.offset().top - 0;
					}
					//ie
					if (e.pageX === undefined) {
						value_l = e.clientY - $bg.offset().top - 0;
					}
				}
			}

			p = (value_l <= 0) ? 0 : (value_l >= slider_w) ? slider_w - 0 : value_l;
			p = (p / slider_w) * 100;
			rev ? p = 100 - p : ''; 
			p > 50 ? Math.floor(p/10) * 10 : Math.ceil(p/10) * 10;
			p = p.toFixed(0);
			p = p < 0 ? 0 : p > 100 ? 100 : p;


			if (minmax === 'min') {
				lmt_min = 0;
				isNaN(lmt_max) ? lmt_max = per_max : '';
				p * 1 >= lmt_max * 1 ? p = lmt_max: '';
				per_min = p; 
				!range ? $bar.css(siz, per_min + '%').css(dir, 0) : $bar.css(siz, lmt_max - per_min + '%').css(dir, per_min + '%');
			}  
			 
			if (minmax === 'max') {
				lmt_max = 100;
				isNaN(lmt_min) ? lmt_min = per_min : '';
				p * 1 <= lmt_min * 1 ? p = lmt_min: '';
				per_max = p;
				$bar.css(siz, per_max - per_min + '%');
			}
			$this.css(dir, p + '%');
		}

		function sliderCallback(opt){
			$(doc).off('mouseup.sliderend touchcancel.slidermove touchend.slidermove');
			opt.callback ? opt.callback({ id:id, per_min:per_min, per_max:per_max, min: opt.now_1, max: opt.now_2 }) : '';
		}

		function sliderTooltip(opt){
			var $tooltip = $('#' + id).find('.ui-slider-tooltip'),
				tooltip_w, 
				bar_w,
				timer, 
				per_min = opt.per_min,
				per_max = opt.per_max,
				n_min = opt.now_1,
				n_max = opt.now_2,
				in_s = (per_min === 0) ? txt_s : '',
				in_e = (per_max === 100) ? txt_e : '',
				in_se = (per_max === 0) ? txt_s : (per_min === 100) ? txt_e : '';

			!range ? in_e = (per_min === 100) ? txt_e : '' : '';

			if (per_min === 0 && per_max === 100) {
				$tooltip.text('전체');
			} else if (n_min === n_max) {
				$tooltip.text(n_min.toFixed(0) + '' + unit + ' ' + in_se);
			} else {
				if (!range) {
					$tooltip.text(n_min.toFixed(0) + '' + unit + '' + in_s + '' + in_e);
				} else {
					$tooltip.text(n_min.toFixed(0) + '' + unit + '' + in_s + ' ~ '+ n_max.toFixed(0) + '' + unit + '' + in_e);
				}
			}

			clearTimeout(timer);
			timer = setTimeout(function(){
				var tt_l, tt_ml;

				if (!vertical) {
					tooltip_w = $tooltip.outerWidth();
					bar_w = $('#' + id).find('.ui-slider-bar').outerWidth();
				} else {
					tooltip_w = $tooltip.outerHeight();
					bar_w = $('#' + id).find('.ui-slider-bar').outerHeight();
				}

				if (!range) {
					tt_l = per_min + '%';
					tt_ml = (per_min === 0) ? 0 : (per_min === 100) ? tooltip_w * -1 : (tooltip_w / 2) * -1;
				} else {
					if (per_min === 0 && tooltip_w > bar_w) {
						tt_l = '0%';
						tt_ml = 0;
					} else if (per_max === 100 && tooltip_w > bar_w) {
						tt_l = '100%';
						tt_ml = tooltip_w * -1;
					} else {
						tt_l = per_min + ((per_max - per_min)/ 2) + '%';
						tt_ml = (tooltip_w / 2) * -1;
					}
				}

				$tooltip.css(dir, tt_l).css('margin-' + dir, tt_ml);
			},0);
		}
	}
	
	/* ------------------------------------------------------------------------
	 * slide(carousel) v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiSlide: function (opt) {
			return createUiSlide(opt);
		},
		uiSlideFnEvt: function (opt) {
			return createUiSlideFnEvt(opt);
		},
		uiSlideFnAuto: function (opt) {
			return createUiSlideFnAuto(opt);
		}
	});
	win[global].uiSlide.options = {
		current:0,
		multi:false,
		loop:true,
		items:1,
		eff:'slide',
		dot:true,
		nav:true,
		auto:true,
		play:false,
		gauge:true,
		speed:300,
		autoTime:3000,
		callback: false,
		/* multi use */
		margin:0,
		mouseDrag:true,
		touchDrag:true
	};
	function createUiSlide(opt) {
		//option guide
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiSlide({ id:'name', current:0, multi:false, loop:true, items:1, eff:'slide', dot:true, nav:true, auto:true, play:false, gauge:true, speed:300, autTime:3000, margin:0, mouseDrag:true, touchDrag:true });",
				"- id [String]: #을 제외한 아이디명만 입력 (!필수)",
				"※ 슬라이드"
			]);
			return false;
		}
		
		win[global].uiSlide[opt.id] = {};
		var base = win[global].uiSlide[opt.id];

		//루트설정
		base.root = $('#' + opt.id);
		base.tit = base.root.find('.ui-slide-tit');
		base.wrap = base.root.find('.ui-slide-wrap');
		base.itemwrap = base.root.find('.ui-slide-itemwrap');
		base.item = base.root.find('.ui-slide-item');
		base.itemtit = base.root.find('.ui-slide-itemtit');

		//옵션저장
		base.opt = $.extend({}, win[global].uiSlide.options, opt);
		
		//중복실행 방지
		if (!base.root.is('.load')) {
			base.root.addClass('load');
			uiSlideSet(base);
		}
	}
	function uiSlideSet(base){
		var base = base;

		//기본필요값 설정
		base.opt.len = base.item.length;
		base.opt.w = base.item.eq(base.opt.current).outerWidth();
		base.opt.h = base.item.eq(base.opt.current).outerHeight();
		base.opt.winw = $(win).outerWidth();
		base.opt.docw = $(doc).outerHeight();
		
		//multi
		base.multi = {};
		base.multi.is = base.opt.multi;
		if (base.multi.is) {
			base.multi.w = [0]; //items width array
			base.multi.h = [];
			base.multi.ww = 0; //itemwrap width
			base.multi.rw = base.root.outerWidth(); //slide width
			base.root.addClass('ui-slide-multi n' + base.opt.items);
			base.itemwrap.addClass('ui-slide-multiitem');
			
			for (var i = 0; i < base.opt.len; i++) {
				base.item.eq(i).css('margin-right', (i !== base.opt.len - 1) ? base.opt.margin: 0 );
				base.multi.h.push(base.item.eq(i).outerHeight());
				base.multi.ww = base.multi.ww + base.item.eq(i).outerWidth() + Number((i !== base.opt.len - 1) ? base.opt.margin : 0);
				base.multi.w.push(base.multi.ww);
			}
			base.itemwrap.css('width', base.multi.ww);
			base.itemwrap.data('left', 0) ;
		}
		
		//current item 설정
		//base.opt.eff !== 'slide' ? base.item.addClass('animated') : '';
		if (!base.multi.is) {
			base.item.attr('aria-hidden', true).css('left', base.opt.w).eq(base.opt.current).attr('aria-hidden', false).css('left',0);
		}
		
		//heigth 설정
		base.wrap.css('height', base.opt.h);
		base.itemwrap.css('height', base.opt.h);
		base.item.eq(base.opt.current).css('height', base.opt.h);

		//이벤트 관련 설정
		base.evt = {};
		base.evt.offsetX = 0;
		base.evt.offsetY = 0;
		base.evt.activate = false; //현재 모션 여부
		base.evt.swap = 'off'; //dragmove,cancel 이벤트 실행여부
		base.evt.cancel = false;
		base.evt.xaxis = false;
		base.evt.movX = 0;
		base.evt.movY = 0;

		//자동진행
		base.auto = {};
		base.timer = {};
		base.timers = {};
		
		//fade effect value
		base.fade = {};
		base.fade.opacity = 0;
		
		//control 
		(base.opt.dot) ? uiSlideDot(base) : ''; 
		(base.opt.nav) ? uiSlideNav(base) : '';
		(base.opt.auto) ? uiSlideAuto(base) : '';
		(base.opt.gauge) ? uiSlideGauge(base) : ''; 
		
		uiSlideReset(base);
		uiSlideEvtType(base);
		uiSlideEvt(base);

		base.root.data('base', base);
	}
	function uiSlideDot(base) {
		var base = base,
			i, dotwrap, dotdiv, selected;
		
		dotwrap = doc.createElement("div");
		dotdiv = doc.createElement("div");
		$(dotwrap).addClass('ui-slide-dotwrap');
		$(dotdiv).addClass('ui-slide-dotdiv').attr('role', 'tablist');

		for (i = 0; i < base.opt.len; i++) {
			selected = (base.opt.current === i) ? 'true' : 'false'; 
			$(dotdiv).append('<button class="ui-slide-dot" type="button" role="tab" aria-selected="' + selected + '">' + base.item.eq(i).find(".ui-slide-itemtit").text() + '</button>');
		}
		base.root.prepend(dotwrap);
		base.dotwrap = base.root.find('.ui-slide-dotwrap');
		base.dotwrap.append(dotdiv);
		base.dotdiv = base.dotwrap.find('.ui-slide-dotdiv');
		base.dotbtn = base.dotdiv.find('.ui-slide-dot');
	}
	function uiSlideNav(base) {
		var base = base,
			navwrap, $navwrap, eqNext, eqPrev;
		
		eqNext = base.opt.current + 1 >= base.opt.len ? 0 : base.opt.current + 1;
		eqPrev = base.opt.current - 1 < 0 ? base.opt.len - 1 : base.opt.current - 1;
		
		navwrap = doc.createElement("div");
		$navwrap = $(navwrap);
		
		$navwrap.addClass('ui-slide-navwrap');
		$navwrap.append('<button type="button" class="ui-slide-prev">이전 : <span>' + base.item.eq(eqPrev).find(".ui-slide-itemtit").text() + '</span></button>');
		$navwrap.append('<button type="button" class="ui-slide-next">다음 : <span>' + base.item.eq(eqNext).find(".ui-slide-itemtit").text() + '</span></button>');
		base.root.append(navwrap);
		
		base.nav = base.root.find('.ui-slide-navwrap');
		base.nav.prev = base.nav.find('.ui-slide-prev');
		base.nav.next = base.nav.find('.ui-slide-next');
	}
	function uiSlideAuto(base) {
		var base = base,
				dotwrap, autobtn;

			if (!base.root.find('.ui-slide-dotwrap').length) {
				dotwrap = doc.createElement("div");
				$(dotwrap).addClass('ui-slide-dotwrap');
				base.root.prepend(dotwrap);
				base.dotwrap = base.root.find('.ui-slide-dotwrap');
			}
			if (!!base.opt.play) {
				autobtn = '<button type="button" class="ui-slide-auto" state="play"><span>정지</span></button>';
			} else {
				autobtn = '<button type="button" class="ui-slide-auto" state="stop"><span>자동 진행</span></button>';
			}
			base.dotwrap.prepend(autobtn);
			base.autobtn = base.dotwrap.find('.ui-slide-auto');
			(base.opt.play && base.opt.auto) ? uiSlideAutoEvt(base, true) : '';
	}
	function uiSlideGauge(base) {
		var base = base,
			gaugewrap = doc.createElement("div"),
			$gaugewrap = $(gaugewrap);
		
		$gaugewrap.addClass('ui-slide-gauge');
		$gaugewrap.append('<div class="ui-slide-gaugebar"></div>');
		base.root.append(gaugewrap);
		
		base.gauge =  base.root.find('.ui-slide-gauge');
		base.gauge.bar = base.gauge.find('.ui-slide-gaugebar');
	}
	function uiSlideReset(base) {
		var base = base;

		$(win).resize(function(){
			clearTimeout(base.timers);
			base.timers = setTimeout(function(){
				if (base.opt.winw !== $(win).outerWidth()) {
					base.opt.len = base.item.length;
					base.opt.w = base.item.eq(base.opt.current).outerWidth();
					base.opt.h = base.item.eq(base.opt.current).outerHeight();
					base.opt.winw = $(win).outerHeight();
					base.opt.docw = $(doc).outerHeight();
					base.evt.activate = false; //현재 모션 여부
					
					if (base.multi.is) {
						base.multi.w = [0]; //items width array
						base.multi.h = [];
						base.multi.ww = 0; //itemwrap width
						base.multi.rw = base.root.outerWidth(); //slide width
						base.root.addClass('ui-slide-multi n' + base.opt.items);
						base.itemwrap.addClass('ui-slide-multiitem');
						
						for (var i = 0; i < base.opt.len; i++) {
							base.item.eq(i).css('margin-right', (i !== base.opt.len - 1) ? base.opt.margin: 0 );
							base.multi.h.push(base.item.eq(i).outerHeight());
							base.multi.ww = base.multi.ww + base.item.eq(i).outerWidth() + Number((i !== base.opt.len - 1) ? base.opt.margin : 0);
							base.multi.w.push(base.multi.ww);
						}
						base.itemwrap.css({ width: base.multi.ww, left: 0 });
						base.itemwrap.data('left', 0) ;
					}
				}
			}, 200);
		});	
	}
	function uiSlideEvtType(base) {
		var base = base,
			types = ['as', 'ever', 'j', 'o'];

		if (base.opt.mouseDrag === true && base.opt.touchDrag === true) {
			types = ['touchstart.uiSlide mousedown.uiSlide', 'touchmove.uiSlide mousemove.uiSlide', 'touchend.uiSlide touchcancel.uiSlide mouseup.uiSlide', 'click.uiSlide'];
		}
		else if (base.opt.mouseDrag === false && base.opt.touchDrag === true) {
			types = ['touchstart.uiSlide', 'touchmove.uiSlide', 'touchend.uiSlide touchcancel.uiSlide', 'click.uiSlide'];
		}
		else if (base.opt.mouseDrag === true && base.opt.touchDrag === false) {
			types = ['mousedown.uiSlide', 'mousemove.uiSlide', 'mouseup.uiSlide', 'click.uiSlide'];
		}
		
		base.evt.start = types[0];
		base.evt.move = types[1];
		base.evt.end = types[2]; 
		base.evt.click = types[3]; 
	}
	function uiSlideEvtCurrent(base){
		var base = base;
		
		//이전 다음 번호생성
		base.evt.next = (base.opt.current + 1 >= base.opt.len) ? 0 : base.opt.current + 1;
		base.evt.prev = (base.opt.current - 1 < 0) ? base.opt.len - 1 : base.opt.current - 1;
	}
	function uiSlideEvt(base) {
		var base = base;

		base.opt.past = base.opt.current;
		
		//click event
		base.root.off(base.evt.click).on(base.evt.click, 'button', function(){
			var $this = $(this);
			
			if (!base.evt.activate) {
				uiSlideEvtCurrent(base);

				if ($this.hasClass('ui-slide-next')) {
					actfn(base.evt.next, 'next');
				} else if ($this.hasClass('ui-slide-prev')) {
					actfn(base.evt.prev, 'prev');
				} else if ($this.hasClass('ui-slide-dot')) {
					actfn($this.index(), base.opt.past < base.opt.current ? 'next' : 'prev');
				} else if ($this.hasClass('ui-slide-auto')) {
					$this.attr('state') === 'play' ? uiSlideAutoEvt(base, false) : uiSlideAutoEvt(base, true);
				}
			}
		});
		function actfn(c, d){
			base.opt.current = c;
			base.dir = d;
			uiSlideAct(base);
			base.opt.auto ? uiSlideAutoEvt(base, false) : '';
		}
		
		if (!base.multi.is) {
			base.item.off(base.evt.start).on(base.evt.start, function(event){
				if (!base.evt.activate) {
					uiSlideDragStart(base, event);
				}
			});
		} else {
			base.itemwrap.off(base.evt.start).on(base.evt.start, function(event){
				if (!base.evt.activate) {
					uiSlideDragStart(base, event);
				}
			});
		}
	}
	function uiSlideAutoEvt(base, v) {
		//자동실행 v값이 true이면 실행, false이면 정지
		var base = base;

		if (v === true) {
			base.opt.play = false;
			base.autobtn.attr('state', 'play').find('span').text('정지');
			base.timer = win.requestAFrame(autoRAF);
			//base.timer = window.requestAFrame(autoRAF);
		} else {
			base.opt.play = true;
			base.autobtn.attr('state', 'stop').find('span').text('자동 진행');
			win.cancelAFrame(base.timer);
			//window.cancelAFrame(base.timer);
		}

		function autoRAF(timestamp){
			var tstamp = !timestamp ? base.timer : timestamp.toFixed(0),
				limit = !timestamp ? base.opt.autoTime / 10 : base.opt.autoTime,
				progress;

			(!base.startA) ? base.startA = tstamp : '';
			progress = tstamp - base.startA;
			
			if (progress < limit) {
				base.gauge.bar.css('width', (progress / limit * 100).toFixed(0) + '%');
				base.timer = win.requestAFrame(autoRAF);
				/*base.timer = window.requestAFrame(autoRAF);*/
			} else {
				base.opt.current = (base.opt.current + 1 >= base.opt.len) ? 0 : base.opt.current + 1;
				base.dir = 'next';
				base.startA = null;
				base.gauge.bar.css('width', '100%');
				
				uiSlideAct(base, callbackAuto);
				
			}
		}
		function callbackAuto(){
			base.timer = win.requestAFrame(autoRAF);
			/*base.timer = window.requestAFrame(autoRAF);*/
		}
	}
	function uiSlideGetTouches(event) {
		//터치 이벤트가 undefined 가 아니라면
		if (event.touches !== undefined) {
			return { x : event.touches[0].pageX, y : event.touches[0].pageY };
		}
		if (event.touches === undefined) {
			if (event.pageX !== undefined) {
				return { x : event.pageX, y : event.pageY };
			}
			//ie
			if (event.pageX === undefined) {
				return { x : event.clientX, y : event.clientY };
			}
		}
	}
	function uiSlideEvtDrag(base) {
		var base = base;

		if (base.evt.swap === 'on') {
			$(doc).off(base.evt.move).on(base.evt.move, function(event){
				base.root.data('touch', 'move');
				uiSlideDragMove(base, event);
			});
			$(doc).off(base.evt.end).on(base.evt.end, function(event){
				base.root.data('touch', 'end');
				uiSlideDragEnd(base, event);
			});
		} else if (base.evt.swap === 'off') {
			$(doc).off(base.evt.move);
			$(doc).off(base.evt.end);
		}
	}
	function uiSlideDragStart(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;
		
		base.evt.offsetX = uiSlideGetTouches(ev).x;
		base.evt.offsetY = uiSlideGetTouches(ev).y;
		base.evt.swap = 'on';
		base.evt.yaxis = false;

		uiSlideEvtCurrent(base);
		if (!base.multi.is) {
			switch(base.opt.eff){
			case 'slide': 
				startLeft(base.opt.w, base.opt.w * -1);
				break;
			case 'fade': 
				startLeft(0, 0);
				break;
			//The default value is 'slide'. So no default value is required.
			}
		}
		function startLeft(n,p){
			base.item.eq(base.evt.next).css('left', n);
			base.item.eq(base.evt.prev).css('left', p);
		}
		
		uiSlideEvtDrag(base);
		//$('body').on('touchstart.bodyscroll', uiSlideLockTouch);
		// /
	}
	function uiSlideDragEnd(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;

		base.evt.swap = 'off';
		base.evt.xaxis = false;
		uiSlideEvtDrag(base);
		//$('body').off('touchstart.bodyscroll', NETIVE.uiSlide.lockTouch);
		if (!base.multi.is) {
			if (Math.abs(base.evt.movX) > base.opt.w / 5) {
				if (base.evt.movX < 0) {
					base.opt.current = base.evt.next;
					base.dir = 'next';
				} else if (base.evt.movX > 0) {
					base.opt.current = base.evt.prev;
					base.dir = 'prev';
				}
				base.evt.cancel = false;
				uiSlideAct(base);
			} else if(base.evt.movX !== 0) {
				base.evt.cancel = true;
				uiSlideAct(base);
			}
		} else {
			var n = 0;
			for (var i = 0; i < base.multi.w.length; i++) {
				//console.log('end: ', Number(base.multi.w[i]),  Number(base.itemwrap.css('left').replace(/[^0-9]/g, "")));
				if (Number(base.multi.w[i]) > Number(base.itemwrap.css('left').replace(/[^0-9]/g, ""))) {
					n = i;
					break;
				}
			}
			if (base.multi.p === 'prev') {
				n = n - 1 < 0 ? 0 : n - 1;
			}
			
			base.itemwrap.stop().animate({
				left:(base.multi.ww - base.multi.rw) < base.multi.w[n] ? (base.multi.ww - base.multi.rw) * -1 : base.multi.w[n] * -1
			},200 , function(){
				base.itemwrap.data('left', base.multi.w[n] * -1);
			});
		}
	}
	function uiSlideDragMove(base, event) {
		var ev = event.originalEvent || event || win.event,
			base = base;
		
		base.evt.movX = parseInt(base.evt.offsetX - uiSlideGetTouches(ev).x, 10) * -1;
		base.evt.movY = parseInt(base.evt.offsetY - uiSlideGetTouches(ev).y, 10) * -1;
		
		uiSlideAutoEvt(base, false);

		//single drag scope
		if (Math.abs(base.evt.movX) > base.opt.w && !base.multi.is) {
			base.evt.movX = (base.evt.movX < 0) ? base.opt.w * -1 : base.opt.w;
		} 
		if (base.multi.is) {
			base.multi.p = (base.evt.movX < 0) ? 'next' : 'prev';
		}

		//y축이 x축보다 이동이 크고 X축 이동이 5보다 작을때
		if (Math.abs(base.evt.movY) > 2 && Math.abs(base.evt.movX) < 2 && base.evt.xaxis === false) {
			base.evt.swap = 'off';
			base.evt.yaxis = true;
			uiSlideEvtDrag(base);
			//$('body').off('touchstart.bodyscroll', NETIVE.uiSlide.lockTouch);
			//$('html, body').off('touchstart.bodyscroll', NETIVE.uiSlide.lockTouch);
		}
		//X축이 y축보다 이동이 클때	
		else if(base.evt.yaxis === false){
			base.evt.xaxis = true;
			//멀티일때 좌우 끝에서 복원되는 모션 일때 중복실행 방지
			//base.multi.restore : 멀티일때 좌우 끝에서 복원되는 모션
			//if (!base.multi.restore) {
				
				//slide mode
				if (base.opt.eff === 'slide') {
					//single slide mode
					if (!base.multi.is) {
						base.item.eq(base.opt.current).css('left', base.evt.movX);
						base.item.eq(base.evt.next).css('left', base.opt.w + base.evt.movX);
						base.item.eq(base.evt.prev).css('left', (base.opt.w * -1) + base.evt.movX);
					} 
					//multi slide mode
					else if (base.multi.is) {
						// data left 값이 없다면 0으로 설정.
						//base.itemwrap.data('left') ? base.itemwrap.data('left', 0) : '';

						/*clearTimeout(base.multi.timer);
						if (base.evt.movX + Number(base.itemwrap.data('left')) > 0) {
							base.multi.timer = setTimeout(function(){
								NETIVE.uiSlide.restore(base, 0);
							},200);
							base.itemwrap.data('left', 0);
							base.evt.movX = 0;
						} 
						*/

						//multi drag scope 
						if (base.evt.movX + Number(base.itemwrap.data('left')) > 0) {
							//앞부분
							base.itemwrap.css('left', 0).data('left', 0);
						} else if(base.evt.movX + Number(base.itemwrap.data('left')) <  (base.multi.ww - base.multi.rw) * -1){
							//뒷부분
							base.itemwrap.css('left', (base.multi.ww - base.multi.rw) * -1).data('left', (base.multi.ww - base.multi.rw) * -1);
						} else {
							base.itemwrap.css('left', base.evt.movX + Number(base.itemwrap.data('left'))).data('movx', base.evt.movX + Number(base.itemwrap.data('left')));
						}
					}
				}
				
				//fade mode
				else if (base.opt.eff === 'fade') {
					base.fade.opacity = ((base.opt.w - Math.abs(base.evt.movX)) / base.opt.w).toFixed(2);
					base.item.css({ opacity: 0, zIndex: 0 }).eq(base.opt.current).css({ opacity: base.fade.opacity, zIndex: 1 });
					(base.evt.movX < 0) ?
						base.item.eq(base.evt.next).css({ opacity: 1 - base.fade.opacity, zIndex: 0 }) :
						base.item.eq(base.evt.prev).css({ opacity: 1 - base.fade.opacity, zIndex: 0 });
				}
			//}
		}
	}
	function uiSlideAct(base, callbackAuto) {
		var base = base,
			$current = base.item.eq(base.opt.current),
			$past = base.item.eq(base.opt.past),
			w = base.opt.w,
			h = base.opt.h;

		if (base.opt.past !== base.opt.current || base.evt.cancel) {
			if (base.dir === 'next' && base.evt.movX === 0) {
				$current.css('left', w);
			} else if(base.dir === 'prev' && base.evt.movX === 0) {
				$current.css('left', w * -1);
			} else {
				if (base.evt.cancel) {
					$current.css('left', base.evt.movX);
				} else {
					base.evt.movX < 0 ? $current.css('left', w + base.evt.movX) : $current.css('left', (w * -1) + base.evt.movX);
				}
			}
			
			base.item.removeClass('on').attr('aria-hidden', true);
			$current.addClass('on').attr('aria-hidden', false);
			base.start = null;
			uiSlideStep(base, callbackAuto);
		}
	}
	function uiSlideStep(base, callbackAuto) {
		//eff분기
		switch(base.opt.eff){
		case'slide':
			(!base.multi.is) ? uiSlideSteplide(base, callbackAuto) : uiSlideStepMulti(base, callbackAuto);
			break;
		case'fade':
			uiSlideStepFade(base, callbackAuto);
			break;
		}
		
		//heigth 재설정
		base.opt.w = base.item.eq(base.opt.current).outerWidth();
		base.opt.h = base.item.eq(base.opt.current).outerHeight();
		base.wrap.css('height', base.opt.h);
		base.itemwrap.css('height', base.opt.h);
		base.item.eq(base.opt.current).css('height', base.opt.h);
	}
	function uiSlideStepMulti(base, callbackAuto) {
		base.itemwrap.data('left', base.itemwrap.data('movx'));
	}
	function uiSlideStepFade(base, callbackAuto) {
		var base = base,
			step = (base.opt.speed / 16).toFixed(0),
			per = Math.ceil(100 / step),
			n = 0,
			opa = 0,
			tstamp, 
			progress;

			win.requestAFrame(stepRAF);
		base.evt.activate = true;

		function stepRAF(timestamp){
			if (!!timestamp) {
				tstamp = timestamp.toFixed(0);
				(!base.start) ? base.start = tstamp : '';
				progress = tstamp - base.start;
				opa = Number((per * n) / 100);

				base.fade.opacity !== 0 ? opa = opa + (1 - Number(base.fade.opacity)) : '';
				opa = opa.toFixed(2);
				n = n + 1;
				
				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).css({ 
						left: 0,
						opacity: 1 - opa < 0 ? 0 : 1 - opa,
						zIndex: 0
					});
					base.item.eq(base.opt.current).css({
						left: 0,
						opacity: opa > 1 ? 1 : opa,
						zIndex: 1
					});
				} 
				//cancle step
				else {
					//next cancel
					if (base.evt.movX < 0) {
						base.item.eq(base.opt.current).css({ 
							left: 0,
							opacity: 1,
							zIndex: 1
						});
						base.item.eq(base.evt.next).css({ 
							left: 0,
							opacity: 0,
							zIndex: 0
						});
					} 
					//prev cancel
					else {
						base.item.eq(base.opt.current).css({ 
							left: 0,
							opacity: 1,
							zIndex: 1
						});
						base.item.eq(base.evt.prev).css({ 
							left: 0,
							opacity: 0,
							zIndex: 0
						});
					}
				}
				//ing or end
				(progress < base.opt.speed) ? win.requestAFrame(stepRAF) : uiSlideEnd(base, callbackAuto);
			}
			//animated
			else {
				base.item.eq(base.opt.current).stop().animate({
					left: 0,
					opacity: 1,
					zIndex: 1
				},300, function(){
					uiSlideEnd(base, callbackAuto)
				});

				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).stop().animate({
						left: 0,
						opacity: 0,
						zIndex: 0
					}, 300);
				}
			}
		}
	}
	function uiSlideSteplide(base, callbackAuto){
		var base = base,
			tstamp, progress, m, n, 
			j = (base.dir === 'next') ? [-1, 1] : [1, -1],
			nn = 0,
			px_add = (base.opt.w / (base.opt.speed / 16)) - 16,
			px;

			win.requestAFrame(stepRAF);
		base.evt.activate = true;
		
		function stepRAF(timestamp){
			//requestAnimationFrame
			if (!!timestamp) {
				tstamp = timestamp.toFixed(0);
				(!base.start) ? base.start = tstamp : '';
				progress = tstamp - base.start;
				
				m = base.evt.movX < 0 ? base.evt.movX : base.evt.movX * -1; //X축으로 이동값 정수로 변경
				px = progress + (px_add * nn);
				n = Math.ceil(px - m); 
				nn = nn + 1;
				//console.log(tstamp, progress)
				//next & prev step
				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).css({ 
						left: Math.min(n , base.opt.w) * j[0] + 'px',
						zIndex: 1
					});
					base.item.eq(base.opt.current).css({
						left: Math.max(base.opt.w - n, 0) * j[1] + 'px',
						zIndex: 1
					});
				} 
				//cancle step
				else {
					//next cancel
					if (base.evt.movX < 0) {
						base.item.eq(base.opt.current).css({ 
							left: Math.min(base.evt.movX + px, 0),
							zIndex: 1
						});
						base.item.eq(base.evt.next).css({ 
							left: Math.min((base.opt.w + base.evt.movX) + px, base.opt.w),
							zIndex: 1
						});
					} 
					//prev cancel
					else {
						base.item.eq(base.opt.current).css({ 
							left: Math.max(base.evt.movX - px, 0),
							zIndex: 1
						});
						base.item.eq(base.evt.prev).css({ 
							left: Math.max( ((base.opt.w * -1) + base.evt.movX) - px, base.opt.w * -1 ),
							zIndex: 1
						});
					}
				}
				//ing or end
				(px < base.opt.w) ? win.requestAFrame(stepRAF) : uiSlideEnd(base, callbackAuto);
			}
			//animated
			else {
				base.item.eq(base.opt.current).stop().animate({
					left: 0,
					zIndex: 1
				},300, function(){
					uiSlideEnd(base, callbackAuto)
				});

				if (!base.evt.cancel) {
					base.item.eq(base.opt.past).stop().animate({
						left: base.opt.w * j[0] + 'px',
						zIndex: 1
					}, 300);
				}
			}
		}
	}
	function uiSlideEnd(base, callbackAuto) {
		var base = base;

		base.item.css('z-index', 0);
		base.item.eq(base.opt.current).css('z-index', 1);
		
		(!base.evt.cancel) ? base.opt.past = base.opt.current : '';
		//console.log('end: ' + base.opt.current);
		
		//base.opt.eff !== 'slide' ? base.item.eq(base.opt.current).addClass(base.opt.eff) : '';
		base.evt.activate = false;
		base.evt.cancel = false;
		base.evt.movX = 0;
		base.evt.movY = 0;
		base.root.data('base', base);
		base.fade.opacity = 0;
		base.gauge.bar.css('width', 0);
		
		(base.opt.nav) ? uiSlideNavTxt(base) : '';
		(base.opt.dot) ? uiSlideDotChg(base) : ''; 
		!!callbackAuto ? callbackAuto() : '';
		!!base.opt.callback ?  uiSlideCallback(base) : '';
	}
	function uiSlideNavTxt(base){
		//이전다음 버튼 명 설정
		var base = base;
		
		base.nav.prev.find('span').text(base.item.eq(base.opt.current - 1 < 0 ? base.opt.len - 1 : base.opt.current - 1).find('.ui-slide-itemtit').text());
		base.nav.next.find('span').text(base.item.eq(base.opt.current + 1 >= base.opt.len ? 0 : base.opt.current + 1).find('.ui-slide-itemtit').text());
	}
	function uiSlideDotChg(base){
		//이전다음 버튼 명 설정
		var base = base;
		
		base.dotbtn.attr('aria-selected', false).eq(base.opt.current).attr('aria-selected', true)
	}
	function uiSlideCallback(base) {
		//callback
		var base = base,
			v = { 'id':base.opt.id, 'current':base.opt.current};
		base.opt.callback(v);		
	}
	function createUiSlideFnEvt(opt) {
		//함수실행
		var base = $('#' + opt.id).data('base');
			
		base.opt.current = opt.current;
		base.dir = base.opt.past < base.opt.current ? 'next' : 'prev';
		
		uiSlideAct(base);
	}
	function createUiSlideFnAuto(opt) {
		//함수실행
		var base = $('#' + opt.id).data('base');

		uiSlideAutoEvt(base, opt.play)

	}

	/* ------------------------------------------------------------------------
	 * count number v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {	
		uiCountStep: function (opt) {
			return createUiCountStep(opt);
		},
		uiCountSlide: function (opt) {
			return createUiCountSlide(opt);
		}
	});
	function createUiCountSlide(opt){
		var $base = $('#' + opt.id),
			countNum = !!opt.value === true ? opt.value : $base.text(),
			base_h = $base.outerHeight(),
			textNum = 0,
			len = countNum.toString().length,
			speed = !!opt.speed === true ? opt.speed + 's' : '1.0s',
			eff  = !!opt.eff === true ? opt.eff : 'easeOutQuart',
			transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend',
			i = 0,
			nn = 1,
			step, re, timer, r;
			
		if ($base.data('ing') !== true) {
			textNum = uiComma(countNum);
			base_h === 0 ? base_h = $base.text('0').outerHeight() : '';
			$base.data('ing',true).empty().css('height', base_h);
			len = textNum.length;
			step = len;
			re = Math.ceil(len / 9); 
			(step < 9) ? step = 9 - len : step = 1;	

			// 숫자 단위만큼 
			for (i; i < len; i++) {
				var n = Number(textNum.substr(i, 1)),
					$thisNum, $base_div;
				
				if (isNaN(n)) {
					// 숫자가 아닐때 ', . ' 
					$base.append('<div class="n' + i + '"><div class="ui-count-og" style="top:' + base_h + 'px">' + textNum.substr(i, 1) + '</div></div>');
					$base.find('.n' + i).append('<span>' + textNum.substr(i, 1) + '</span>');
				}
				else {
					// 숫자일때
					$base.append('<div class="n' + i + '"><div class="ui-count-og" style="top:' + base_h + 'px">' + n + '</div></div>');
					$base.find('.n' + i).append('<span>9<br>8<br>7<br>6<br>5<br>4<br>3<br>2<br>1<br>0<br>' + n + '</span>');
					step = step + 1;
				}
				
				$base_div = $base.children('.n' + i);
				$base_div.find('span').wrapAll('<div class="ui-count-num" style="top:' + base_h + 'px; transition:top '+ speed +' cubic-bezier(' + win[global].cubicbeziers[eff] + ');"></div>');
				$thisNum = $base_div.find('.ui-count-num');
				$thisNum.data('height', $thisNum.height()); 
			}

			r = len;
			timer = setInterval(function() {
				count(r)
				r = r - 1; 
				(r < 0) ? clearInterval(timer) : '';
			},150);
			
			
		}
		function count(r){
			var $current_num = $base.children('.n' + r).find('.ui-count-num'),
				num_h = Number($current_num.data('height'));
			$current_num.css('top', (num_h - base_h) * -1); 
			
			if (r === 0) {
				$current_num.one(transitionEnd, function(){
					$base.text(textNum).data('ing', false);
				});
			}
		}
	}
	function createUiCountStep(opt) {
		var $base = $('#' + opt.id),
			countNum = !!opt.value === true ? opt.value : $base.text(),
			count = 0,
			timer, diff, counter;
		
		if ($base.data('ing') !== true) {
			counter = function(){
				diff = countNum - count;
				(diff > 0) ? count += Math.ceil(diff / 20, -2) : '';
				var n = uiComma(count);
				$base.text(n);
				if(count < countNum) {
					timer = setTimeout(function() { 
						counter(); 
					}, 1);
				} else {
					clearTimeout(timer);
				}
			}
			counter();
		}
	}

	/* ------------------------------------------------------------------------
	 * json menu v1.0 
	 * date : 2018-04-21
	 * 수정작업중
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiMenu: function (opt) {
			return createUiMenu(opt);
		},
		uiMenuSelected: function (opt) {
			return createUiMenuSelected(opt);
		}
	});
	win[global].uiMenu.map = {};
	win[global].uiMenu.json = {};
	function createUiMenu(opt){
		var dataExecel,
			menu_callback = opt.callback;

		win[global].uiAjax({ url:opt.url, page:false, callback:callback });

		function callback(v){
			dataExecel = v;
			win[global].uiMenu.json = dataExecel;
			var len = dataExecel.menu.length,
				i = 0,
				ctg_sel = opt.ctg === undefined ? '전체' : opt.ctg,
				current = opt.selected,
				use, ctg, tit, link, blank, pop, code, selected, order, current_split, code_split, navig = [],
				code0, code1, code2, code3, code4,
				aria_sel_1, aria_sel_2, aria_sel_3, aria_sel_4, 
				cls_sel_1, cls_sel_2, cls_sel_3,
				first_d2 = true, first_d3 = true,
				d1, d2, d3, d4,
				current_num = [],
				n_d1 = 0, _n_d1 = null,
				n_d2 = 0, _n_d2 = null,
				n_d3 = 0, _n_d3 = null,
				html_d1 = '<ul class="dep-1-wrap hide">',
				html_d2 = '',
				html_d3 = '';

			for (i = 0; i < len; i++) {
				d1 = dataExecel.menu[i].d1;
				d2 = dataExecel.menu[i].d2;
				d3 = dataExecel.menu[i].d3;
				d4 = dataExecel.menu[i].d4;
				order = dataExecel.menu[i].order;
				code = dataExecel.menu[i].code;
				link = dataExecel.menu[i].link;
				blank = dataExecel.menu[i].blank;
				tit = dataExecel.menu[i].tit
				pop = dataExecel.menu[i].pop;
				use = dataExecel.menu[i].use;
				ctg = dataExecel.menu[i].ctg;
				selected = current === code;

				current_split = current.split('_');
				code_split = code.split('_');

				code0 = current_split[0] === code_split[0];
				code1 = current_split[1] === code_split[1];
				code2 = current_split[2] === code_split[2];
				code3 = current_split[3] === code_split[3];
				code4 = current_split[4] === code_split[4];

				aria_sel_1 = code0 && code1 ? 'true' : 'false';
				aria_sel_2 = code0 && code1 && code2 ? 'true' : 'false';
				aria_sel_3 = code0 && code1 && code2 && code3 ? 'true' : 'false';
				aria_sel_4 = code0 && code1 && code2 && code3 && code4 ? 'true' : 'false';

				cls_sel_1 = code0 && code1 ? 'selected' : '';
				cls_sel_2 = code0 && code1 && code2 ? 'selected' : '';
				cls_sel_3 = code0 && code1 && code2 && code3 ? 'selected' : '';

				if (use === 'Y' && (ctg === ctg_sel || ctg_sel === '전체')) {
					//메뉴 1depth 
					if (d1 !== '') {
						n_d1 = n_d1 + 1;
						aria_sel_1 === 'true' ? current_num.push(n_d1 - 1) : '';
						aria_sel_1 === 'true' ? navig.push(tit) : '';

						html_d1 += '<li class="dep-1 '+ cls_sel_1 +'" data-n="'+ n_d1 +'">';
						if (!!pop) {
							html_d1 += '<button type="button" class="dep-1-btn '+ cls_sel_1 +'" onclick="$plugins.uiModal({ id:\''+ pop +'\', link:\''+ link +'\' })" aria-selected="' + aria_sel_1 + '"><span>' + tit + '</span></button>';
						} else {
							html_d1 += link === '' ? 
							'<button type="button" class="dep-1-btn '+ cls_sel_1 +'" aria-selected="' + aria_sel_1 + '"><span>' + tit + '</span></button>':
							'<a href="'+ link +'" class="dep-1-btn '+ cls_sel_1 +'" aria-selected="' + aria_sel_1 + '"><span>' + tit + '</span></a>';
						}
						
						html_d1 += '</li>';	
					} 

					//메뉴 2depth 
					if (d2 !== '') {
						_n_d1 === null ? _n_d1 = n_d1 : '';
						
						// 두번째 부터 depth1이 달라질떄 ul그룹 새로 생성
						if (_n_d1 !== n_d1) {
							n_d2 = 0;
							html_d2 += '</ul>';
							html_d2 += '<ul class="dep-2-wrap '+ cls_sel_2 +'" data-dep1="'+ n_d1 +'">';
						}
						n_d2 = n_d2 + 1;
						aria_sel_2 === 'true' ? current_num.push(n_d2 - 1) : '';
						aria_sel_2 === 'true' ? navig.push(tit) : '';

						// 처음 시작 한번만
						if (first_d2) {
							html_d2 += '<ul class="dep-2-wrap '+ cls_sel_2 +'" data-dep1="'+ n_d1 +'">';
							first_d2 = false;
						}
						order ?
						html_d2 += '<li class="dep-2 '+ cls_sel_2 +'" data-n="'+ n_d2 +'" data-order="'+ order +'">' :
						html_d2 += '<li class="dep-2 '+ cls_sel_2 +'" data-n="'+ n_d2 +'">';
						html_d2 += '<div>';
						if (!!pop) {
							html_d2 += '<button type="button" class="dep-2-btn '+ cls_sel_2 +'" onclick="$plugins.uiModal({ id:\''+ pop +'\', link:\''+ link +'\' })" aria-selected="' + aria_sel_2 + '"><span>' + tit + '</span></button>';
						} else {
							html_d2 += link === '' ? 
							'<button type="button" class="dep-2-btn '+ cls_sel_2 +'" aria-selected="' + aria_sel_2 + '"><span>' + tit + '</span></button>':
							'<a href="'+ link +'" class="dep-2-btn '+ cls_sel_2 +'" aria-selected="' + aria_sel_2 + '"><span>' + tit + '</span></a>';
						}
						html_d2 += '</div>';
						html_d2 += '</li>';

						_n_d1 = n_d1;
					}

					//메뉴 3depth 
					if (d3 !== '') {
						_n_d2 === null ? _n_d2 = n_d2 : '';
						
						if (_n_d2 !== n_d2) {
							n_d3 = 0;
							html_d3 += '</ul>';
							html_d3 += '<ul class="dep-3-wrap '+ cls_sel_3 +'" data-dep1="'+ n_d1 +'" data-dep2="'+ n_d2 +'">';
						}
						n_d3 = n_d3 + 1;
						aria_sel_3 === 'true' ? current_num.push(n_d3 - 1) : '';
						aria_sel_3 === 'true' ? navig.push(tit) : '';

						if (first_d3) {
							html_d3 += '<ul class="dep-3-wrap '+ cls_sel_3 +'" data-dep1="'+ n_d1 +'"data-dep2="'+ n_d2 +'">';
							first_d3 = false;
						}

						html_d3 += '<li class="dep-3 '+ cls_sel_3 +'" data-n="'+ n_d3 +'">';
						if (!!pop) {
							html_d3 += '<button type="button" code="'+ code +'" class="dep-3-btn '+ cls_sel_3 +'" onclick="$plugins.uiModal({ id:\''+ pop +'\', link:\''+ link +'\' })" aria-selected="' + aria_sel_3 + '"><span>' + tit + '</span></button>';
						} else {
							html_d3 += link === '' ? 
							'<button type="button" code="'+ code +'" class="dep-3-btn '+ cls_sel_3 +'" aria-selected="' + aria_sel_3 + '"><span>' + tit + '</span></button>':
							'<a href="'+ link +'" code="'+ code +'" class="dep-3-btn '+ cls_sel_3 +'" aria-selected="' + aria_sel_3 + '"><span>' + tit + '</span></a>';
						}
						html_d3 += '</li>';

						_n_d2 = n_d2;
						
					}
					if (d4 !== '') {
						aria_sel_4  === 'true' ? navig.push(tit) : '';
					}
				}
			}
			html_d1 += '</ul>';
			html_d2 += '</ul>';
			html_d3 += '</ul>';
			menu_callback({ d1:html_d1, d2:html_d2, d3:html_d3, current:current_num, navi:navig });
		}
	}
	function createUiMenuSelected(opt){
		var $menu = $('#' + opt.id),
			code = opt.code.split('_'),
			d2 = Number(code[2]),
			d3 = Number(code[3]);

		$menu.find('*').removeClass('selected');
		$menu.find('.dep-2-btn').attr('aria-selected', false).attr('aria-expanded',false);
		$menu.find('.dep-3-btn').attr('aria-selected', false);
		$menu.find('.dep-3-wrap').attr('aria-hidden', true).css('display', 'none');
		
		for (var i = 0, len = win[global].uiMenu.json.menu.length; i < len; i++) {
			if (win[global].uiMenu.json.menu[i].code === opt.code) {
				opt.callback(win[global].uiMenu.json.menu[i].tit);
			}
		}

		$menu
		.find('.dep-2').eq(d2 - 1).addClass('selected')
		.find('.dep-2-btn').addClass('selected').attr('aria-selected', true).attr('aria-expanded',true);
		$menu
		.find('.dep-2').eq(d2 - 1)
		.find('.dep-3-wrap').addClass('selected').attr('aria-hidden', false).css('display', 'block')
		.find('.dep-3').eq(d3 - 1).addClass('selected')
		.find('.dep-3-btn').addClass('selected').attr('aria-selected', true);
	}

	/* ------------------------------------------------------------------------
	 * json coding list v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiCodinglist: function (opt) {
			return createUiCodinglist(opt);
		}
	});
	function createUiCodinglist(opt){
		var dataExecel;
		
		win[global].uiAjax({ url: opt.url, page:false, callback: callback });
		function callback(v){
			dataExecel = v;
			
			var len = dataExecel.list.length,
				i = 0,
				state, date, end, pub, id, idm, pop, modal, tab, memo, overl, dev,
				d1, d2, d3, d4, d5, d6, d7, d8, 
				r1, r2, r3, r4,
				d1_, d2_, d3_, d4_, d5_, d6_, d7_, d8_,
				c1, c2, c3, c4, c5, c6, c7, c8, 
				endsum = 0, delsum = 0, tstsum = 0, ingsum = 0, watsum = 0, chksum = 0, num = -1,
				ctg_state = [],
				ctg_pub = [],
				ctg_dev = [],
				ctg_date = [],
				ctg_end = [],
				ctg_mdate = [],
				ctg_menu = [],
				ctg_dev = [],
				cls2 = '',
				cls = '',
				root = '',
				depth = '',
				table = '';

			for (i = 0; i < len; i++) {
				state = dataExecel.list[i].state || ''; 		//진행상태
				date = dataExecel.list[i].date || '';			//예정일
				end = dataExecel.list[i].end || '';				//종료일
				pub = dataExecel.list[i].pub || '';				//퍼블리셔 담당자
				dev = dataExecel.list[i].dev || '';				//개발 담당자
				id = dataExecel.list[i].id || '';				//화면아이디
				idm = dataExecel.list[i].idm || '';				//화면아이디 (모바일)
				pop = dataExecel.list[i].pop || '';				//새창
				modal = dataExecel.list[i].modal || '';			//레이어팝업
				tab = dataExecel.list[i].tab || ''				//tab
				memo = dataExecel.list[i].memo || '';			//전달내용
				overl = dataExecel.list[i].overlab || '';		//중복페이지
				root = dataExecel.list[i].root || '';			//root		
				d1 = dataExecel.list[i].d1 || '';				//depth1
				d2 = dataExecel.list[i].d2 || '';				//depth2
				d3 = dataExecel.list[i].d3 || '';				//depth3
				d4 = dataExecel.list[i].d4 || '';				//depth4
				d5 = dataExecel.list[i].d5 || '';				//depth5
				d6 = dataExecel.list[i].d6 || '';				//depth6
				d7 = dataExecel.list[i].d7 || '';				//depth7
				d8 = dataExecel.list[i].d8 || '';				//depth8
				r1 = dataExecel.list[i].r1 || '';				//경로1
				r2 = dataExecel.list[i].r2 || '';				//경로2
				r3 = dataExecel.list[i].r3 || '';				//경로3
				r4 = dataExecel.list[i].r4 || '';				//경로4
				
				//roots = dataExecel.list[i].root || '';			//경로4

				//경로 합치기
				// root += '/' + r1;
				// (dataExecel.list[i].r2 !== undefined && dataExecel.list[i].r2 !== '') ? root += '/' + r2 : '';
				// (dataExecel.list[i].r3 !== undefined && dataExecel.list[i].r3 !== '') ? root += '/' + r3 : '';
				// (dataExecel.list[i].r4 !== undefined && dataExecel.list[i].r4 !== '') ? root += '/' + r4 : '';
				
				//빈값에 해당 경로 depth 넣기
				(d1 !== '') ? d1_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d1 : d1 = d1_;
				
				(dataExecel.list[i].d1 === '') ? 
				(d2 !== '') ? d2_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d2 : d2 = d2_ :
				(!!dataExecel.list[i - 1 < 0 ? 0 : i ].d2) ? d2_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d2 : d2_ = '';

				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '') ? 
				(d3 !== '') ? d3_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d3 : d3 = d3_ :
				(!!dataExecel.list[i - 1 < 0 ? 0 : i ].d3) ? d3_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d3 : d3_ = '';
				
				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '') ? 
				(d4 !== '') ? d4_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d4 : d4 = d4_ :
				(!!dataExecel.list[i - 1 < 0 ? 0 : i ].d4) ? d4_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d4 : d4_ = '';
						
				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '') ? 
				(d4 !== '') ? d5_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d5 : d5 = d5_ :
				(!!dataExecel.list[i - 1 < 0 ? 0 : i ].d5) ? d5_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d5 : d5_ = '';
				
				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' && dataExecel.list[i].d5 === '') ? 
				(d4 !== '') ? d6_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d6 : d6 = d6_ :
				(!!dataExecel.list[i - 1 < 0 ? 0 : i ].d6) ? d6_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d6 : d6_ = '';
				
				(dataExecel.list[i].d1 === '' && dataExecel.list[i].d2 === '' && dataExecel.list[i].d3 === '' && dataExecel.list[i].d4 === '' && dataExecel.list[i].d5 === '' && dataExecel.list[i].d6 === '') ? 
				(d4 !== '') ? d7_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d7 : d7 = d7_ :
				(!!dataExecel.list[i - 1 < 0 ? 0 : i ].d7) ? d7_ = dataExecel.list[i - 1 < 0 ? 0 : i ].d7 : d7_ = '';
				
				!!dataExecel.list[i].d1 ? d1 = dataExecel.list[i].d1 : '';
				!!dataExecel.list[i].d2 ? d2 = dataExecel.list[i].d2 : '';
				!!dataExecel.list[i].d3 ? d3 = dataExecel.list[i].d3 : '';
				!!dataExecel.list[i].d4 ? d4 = dataExecel.list[i].d4 : '';
				!!dataExecel.list[i].d5 ? d5 = dataExecel.list[i].d5 : '';
				!!dataExecel.list[i].d6 ? d6 = dataExecel.list[i].d6 : '';
				!!dataExecel.list[i].d7 ? d7 = dataExecel.list[i].d7 : '';
				!!dataExecel.list[i].d8 ? d8 = dataExecel.list[i].d8 : '';
				
				delsum = (state === "제외") ? delsum + 1 : delsum ; //제외 및 삭제됨
				watsum = (state === "대기") ? watsum + 1 : watsum ; //작업전
				ingsum = (state === "진행") ? ingsum + 1 : ingsum ; //작업중
				chksum = (state === "체크") ? chksum + 1 : chksum ; //기획검수(내부)
				tstsum = (state === "검수") ? tstsum + 1 : tstsum ;	//현업검수(외부)
				endsum = (state === "완료") ? endsum + 1 : endsum ;	//개발전달
				
				var x = (i === 0) ? 0 : i -1,
					z1 = dataExecel.list[i].d1 !== dataExecel.list[x].d1;

				//클래스 생성
				//c1 = (dataExecel.list[i].d1 !== '') ? ' c1' : '';
				c1 = (dataExecel.list[i].d1 !== '') ? ' c1' : '';
				c2 = (dataExecel.list[i].d2 !== '') ? ' c2' : '';
				c3 = (dataExecel.list[i].d3 !== '') ? ' c3' : '';
				c4 = (dataExecel.list[i].d4 !== '') ? ' c4' : '';
				c5 = (dataExecel.list[i].d5 !== '') ? ' c5' : '';
				c6 = (dataExecel.list[i].d6 !== '') ? ' c6' : '';
				c7 = (dataExecel.list[i].d7 !== '') ? ' c7' : '';
				c8 = (dataExecel.list[i].d8 !== '') ? ' c8' : '';
				
				cls2 = state === '체크' ? 'chk' : state === '진행' ? 'ing' : state === '완료' ? 'end' : state === '검수' ? 'tst' : state === '제외' ? 'del' : state === '약관' ? 'trm' : '';
				cls = cls2 + c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8;
				
				//배열생성
				ctg_state.push(dataExecel.list[i].state); 
				ctg_pub.push(dataExecel.list[i].pub); 
				ctg_dev.push(dataExecel.list[i].dev);
				state !== '제외' ? ctg_date.push(dataExecel.list[i].date) : '';
				ctg_end.push(dataExecel.list[i].end); 
				ctg_menu.push(dataExecel.list[i].d1);
				
				var imgroot = $.browser.mobile ? "m" : "d";

				if (state !== '제외' && i=== 0) {
					table += '<table>';
					table += '<caption>코딩리스트</caption>';
					table += '<colgroup>';
					table += '<col class="col1">';
					table += '<col class="col2">';
					table += '<col class="col3">';
					table += '<col class="col4">';
					table += '<col class="col4">';
					//table += '<col class="col6">';
					//table += '<col class="col7">';
					table += '<col class="col6">';
					table += '<col class="col6">';
					table += '<col class="col6">';
					table += '<col class="col4">';
					table += '</colgroup>';
					table += '<colgroup>';
					(dataExecel.list[i].d1 !== undefined) ? table += '<col class="col8 n1">' : '';
					(dataExecel.list[i].d2 !== undefined) ? table += '<col class="col8 n2">' : '';
					(dataExecel.list[i].d3 !== undefined) ? table += '<col class="col8 n3">' : '';
					(dataExecel.list[i].d4 !== undefined) ? table += '<col class="col8 n4">' : '';
					(dataExecel.list[i].d5 !== undefined) ? table += '<col class="col8 n5">' : '';
					(dataExecel.list[i].d6 !== undefined) ? table += '<col class="col8 n6">' : '';
					(dataExecel.list[i].d7 !== undefined) ? table += '<col class="col8 n7">' : '';
					(dataExecel.list[i].d8 !== undefined) ? table += '<col class="col8 n8">' : '';
					table += '</colgroup>';
					table += '<col class="col9">';
					table += '<thead>';
					table += '<th scope="col">'+ state +'</th>';
					table += '<th scope="col">'+ date +'</th>';
					table += '<th scope="col">'+ end +'</th>';
					table += '<th scope="col">'+ pub +'</th>';
					table += '<th scope="col">'+ dev +'</th>';
					//table += '<th scope="col">IMG</th>';
					table += '<th scope="col" class="txt-c">'+ pop +'</th>';
					table += '<th scope="col" class="txt-c">'+ modal +'</th>';
					table += '<th scope="col" class="txt-c">'+ tab +'</th>';
					table += '<th scope="col">'+ id +'</th>';
					//table += '<th scope="col">'+ root +'</th>';
					(dataExecel.list[i].d1 !== undefined) ? table += '<th scope="col">'+ d1 +'</th>' : '';
					(dataExecel.list[i].d2 !== undefined) ? table += '<th scope="col">'+ d2 +'</th>' : '';
					(dataExecel.list[i].d3 !== undefined) ? table += '<th scope="col">'+ d3 +'</th>' : '';
					(dataExecel.list[i].d4 !== undefined) ? table += '<th scope="col">'+ d4 +'</th>' : '';
					(dataExecel.list[i].d5 !== undefined) ? table += '<th scope="col">'+ d5 +'</th>' : '';
					(dataExecel.list[i].d6 !== undefined) ? table += '<th scope="col">'+ d6 +'</th>' : '';
					(dataExecel.list[i].d7 !== undefined) ? table += '<th scope="col">'+ d7 +'</th>' : '';
					(dataExecel.list[i].d8 !== undefined) ? table += '<th scope="col">'+ d8 +'</th>' : '';
					table += '<th scope="col">'+ memo +'</th>';
					table += '</thead>';
					table += '</tbody>';
				}
				else if (state !== '제외') {
					table += '<tr class="'+ cls +'">';
					table += '<td class="state"><span>' + state + '</span></td>';
					table += '<td class="date"><span>' + date + '</span></td>';
					table += '<td class="endd"><span>' + end + '</span></td>';
					table += '<td class="name pub"><span>' + pub + '</span></td>';
					table += '<td class="name pub"><span>' + dev + '</span></td>';
					/*
					if (!!id) {
						table += '<td class="img"><span><a href="/resources/data/design/'+ imgroot + '/'+ id +'.png" target="design"><img src="/resources/data/design/img.png" alt=""></a></span></td>';
					} else {
						table += '<td class="img"><td>';
					}
					*/

					var popIs = !!pop ? 'P' : '',
						modalIs = !!modal ? 'M' : '',
						tabIs = !!tab ? 'T' : '',
						target = popIs === 'P' ? '_blank': 'coding',
						popcls = popIs === 'P' ? 'ui-winpop': '';
					
					table += '<td class="txt-c"><span>' + popIs + '</span></td>';
					table += '<td class="txt-c"><span>' + modalIs + '</span></td>';
					table += '<td class="txt-c"><span>' + tabIs + '</span></td>';

					if (!modalIs) {
						table += (id !== '') ? 
						(overl !== '') ?
							'<td class="id ico_pg"><span><a href="'+ root +''+ overl +'.html" target="'+ target +'" class="'+ popcls +'">' + overl + '</a></span><span class="overl">'+ id + '</span></td>' :
							'<td class="id ico_pg"><span><a href="'+ root +''+ id +'.html" target="'+ target +'" class="'+ popcls +'">' + id + '</a></span></td>' :
							'<td class="id "><span></span></td>';
					} else {
						table += (id !== '') ? 
						(overl !== '') ?
							'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'modal_'+ overl + '\', link:\'' + root +''+ overl + '.html\'});">' + overl + '</button></span><span class="overl">'+ id + '</span></td>' :
							'<td class="id ico_pg"><span><button type="button" onclick="$plugins.uiModal({ id:\'modal_'+ id + '\', link:\'' + root +''+ id + '.html\'});">' + id + '</button></span></td>' :
							'<td class="id "><span></span></td>';
					}

					(dataExecel.list[i].d1 !== undefined) ? table += '<td class="d d1"><span>' + d1 + '</span></td>' : '';
					(dataExecel.list[i].d2 !== undefined) ? table += '<td class="d d2"><span>' + d2 + '</span></td>' : '';
					(dataExecel.list[i].d3 !== undefined) ? table += '<td class="d d3"><span>' + d3 + '</span></td>' : '';
					(dataExecel.list[i].d4 !== undefined) ? table += '<td class="d d4"><span>' + d4 + '</span></td>' : '';
					(dataExecel.list[i].d5 !== undefined) ? table += '<td class="d d5"><span>' + d5 + '</span></td>' : '';
					(dataExecel.list[i].d6 !== undefined) ? table += '<td class="d d6"><span>' + d6 + '</span></td>' : '';
					(dataExecel.list[i].d7 !== undefined) ? table += '<td class="d d7"><span>' + d7 + '</span></td>' : '';
					(dataExecel.list[i].d8 !== undefined) ? table += '<td class="d d8"><span>' + d8 + '</span></td>' : '';
					
					(dataExecel.list[i].memo === '') ? table += '<td class="memo none"><span>' + memo + '</span></td>' : table += '<td class="memo"><span>' + memo + '</span></td>';
					table += '</tr>';
					(i === len - 1) ? table += '</tbody>' : '';
					(i === len - 1) ? table += '</table>' : '';
				}
				root = '';
			}
			$('#' + opt.id).html(table);
			table = '';

			// 통계
			var info = ''
			info += '<ul class="ui-codinglist-info">';
			info += '<li>진행율(완료+검수) : <span class="n_all">0</span> / <span class="total">0</span> (<span class="per0">0</span>%)</li>';
			info += '<li>완료 : <span class="n_end">0</span> (<span class="per1">0</span>%)</li>';
			info += '<li>검수 : <span class="n_tst">0</span> (<span class="per2">0</span>%)</li>';
			info += '<li>체크 : <span class="n_chk">0</span> (<span class="per2">0</span>%)</li>';
			info += '<li>진행 : <span class="n_ing">0</span> (<span class="per3">0</span>%)</li>';
			info += '<li>대기 : <span class="n_wat">0</span> (<span class="per4">0</span>%)</li>';
			info += '</ul>';
			$('#' + opt.id).prepend(info);

			if (!$('.ui-codinglist-info .total').data('data')) {
				$('.ui-codinglist-info .total').data('data', true).text(len - delsum - 1);
				$('.ui-codinglist-info .n_all').text(endsum + tstsum + chksum);
				$('.ui-codinglist-info .per0').text(((endsum + tstsum + chksum) / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_end').text(endsum);
				$('.ui-codinglist-info .per1').text((endsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_tst').text(tstsum);
				$('.ui-codinglist-info .per2').text((tstsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_ing').text(ingsum);
				$('.ui-codinglist-info .per3').text((ingsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_wat').text(watsum);
				$('.ui-codinglist-info .per4').text((watsum / (len - delsum - 1) * 100).toFixed(0));
				$('.ui-codinglist-info .n_chk').text(chksum);
				$('.ui-codinglist-info .per5').text((chksum / (len - delsum - 1) * 100).toFixed(0));
			}
			
			var sel = '';
			sel += '<div class="ui-codinglist-sel">';
			sel += '<button type="button" class="btn-base"><span>전체</span></button>';
			sel += '<select id="uiCLstate" data-ctg="state">';
			sel += '<option value="0">상태선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLpub" data-ctg="pub">';
			sel += '<option value="0">퍼블선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLdev" data-ctg="dev">';
			sel += '<option value="0">개발선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLDate" data-ctg="date">';
			sel += '<option value="0">일정선택</option>';
			sel += '</select>';
			sel += '<select id="uiCLdepth" data-ctg="d1">';
			sel += '<option value="0">메뉴선택</option>';
			sel += '</select>';
			sel += '<a href="/resources/data/codinglist.xlsx" class="btn-base"><span>Excel Download</span></a>';
			sel += '</div>';
			$('#' + opt.id).prepend(sel);

			selectoption('uiCLstate', ctg_state);
			selectoption('uiCLpub', ctg_pub);
			selectoption('uiCLDate', ctg_date, true);
			selectoption('uiCLdepth', ctg_menu);
			selectoption('uiCLdev', ctg_dev);
			selectAct();
			
			function selectoption(id, optarray, v) {
				var $sel = $('#' + id),
					nn = 1,
					nnn = 1;
				
				if(!$sel.data('data')) {
					var optionArray = [], 
						optionSum = [],
						j = 0, 
						optionHtml = '';
					v ? optarray.push('일정') : '';
					optarray.splice(0,1);

					// 숫자 .sort(function(a,b){return a-b}) , 문자 sort()
					optionArray = optarray.slice().sort().reduce(function(a,b){
						if (a.slice(-1)[0] !== b && b !== '') {
							a.push(b);
							v ? optionSum.push(nn) : '';
							nn = 1;
						}  else {
							nn = nn + 1;
						}
						return a;
					},[]);
					
					var alen = optionArray.length;
					for (j; j < alen; j++) {
						if (v) {
							if (j < alen - 1) {
								optionHtml += '<option value="'+ optionArray[j] +'">'+ optionArray[j] +' [' + optionSum[j + 1] + ']</option>';
							}
						} else {
							optionHtml += '<option value="'+ optionArray[j] +'">'+ optionArray[j] +'</option>';
						}
					}
					$sel.data('data',true).append(optionHtml);
				}
			}
			
			function selectAct(){
				$('.ui-codinglist-sel select').off('change.cdlist').on('change.cdlist', function(){
					var $this = $(this),
						v = $this.val(),
						c = $this.data('ctg'),
						$sel = $('#' + opt.id + ' .' + c);

					if (v === '0') {
						$sel.closest('tr').removeClass('hidden');
					} else {
						$this.siblings().find('option:eq(0)').prop('selected', true);
						$sel.each(function(i){
							v === 'all' ? $sel.closest('tr').removeClass('hidden') :
							v !== $sel.find('span').eq(i).text() ? 
								$(this).closest('tr').addClass('hidden') : $(this).closest('tr').removeClass('hidden');
						});
					}
				});
			}

			$('.ui-codinglist-sel button').off('click.cdlist').on('click.cdlist', function(e){
				$('#' + opt.id + ' tr').removeClass('hidden');
				$('.ui-codinglist-sel select').find('option:eq(0)').prop('selected', true);
			});
		}
	}

	/* ------------------------------------------------------------------------
	 * screen capture v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiCapture: function (opt) {
			return createUiCapture(opt);
		}
	});
	function createUiCapture(opt){
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiCapture({ id:'name' });",
				"- id [String]: #을 제외한 아이디명만 입력 (!필수)",
				"- 필수 라이브러리 : canvas-toBlob.js, FileSaver.js, html2canvas.js",
				"※ 선택 영역 캡쳐하기"
			]);
			return false;
		}

		var canvas = "";

		html2canvas(document.getElementById(opt.id), { 
			onrendered : function(canvas) { 
				document.body.appendChild(canvas); 
				canvas.id ="uiCanvas"
				canvas.toBlob(function(blob){ saveAs(blob,"do.png"); }, "image/png");
				$('#uiCanvas').remove();
			}
		});
	}

	/* ------------------------------------------------------------------------
	 * input form
	 * input value clear button v1.0 
	 * $plugins.uiInputClear
	 * date : 2018-05-18
	 * input value 값 입력 시 clear버튼 생성
	 * 
	 * input placeholder v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiInputCancel: function () {
			return createUiInputCancel();
		},
		uiPlaceholder: function () {
			return createUiPlaceholder();
		}
	});
	function createUiInputCancel(){
		var $inp = $('.ui-inpcancel');

		$inp.each(function(i){
			var $this = $(this);

			$this.val() === '' ?
				$this.next('.ui-btn-cancel').remove():
				$this.next('.ui-btn-cancel').length === 0 ?
				$this.after('<button type="button" class="ui-btn-cancel" data-id="'+ $this.attr('id') +'"><span>입력내용 지우기</span></button>') : '';

			//이벤트 부분 each함수 밖으로 거내보자.
			$inp.eq(i).off('keyup.inpcancel').on('keyup.inpcancel', function(){
				var _$this = $(this);

				if (_$this.val() === '') {
					_$this.next('.ui-btn-cancel').remove();
				} else {
					!!$('.ui-btn-cancel[data-id="'+ _$this.attr('id') +'"]').length ? '' :
					_$this.after('<button type="button" class="ui-btn-cancel" data-id="'+ _$this.attr('id') +'"><span>입력내용 지우기</span></button>');
				}
			});
		});

		//event
		$(doc).off('click.inpcancel').on('click.inpcancel', '.ui-btn-cancel', function(){
			$('#' + $(this).data('id')).val('').focus();
			$(this).remove();
		});
	}
	function createUiPlaceholder(){
		var $ph = $('[placeholder]'),
			phname = '';

		$('.ui-placeholder').remove();
		$ph.each(function(){
			phname = $(this).attr('placeholder');
			$(this).before('<span class="hide ui-placeholder">' + phname + '</span>')
		})
	}

	/* ------------------------------------------------------------------------
	 * file upload v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiFileUpload: function (opt) {
			return createUiFileUpload(opt);
		}
	});
	function createUiFileUpload(opt){
		if (opt === undefined) {
			win[global].uiConsoleGuide([
				global + ".uiFileUpload({ id:'name', multi:false, accept:'image/*' });",
				"- id [String]: #을 제외한 아이디명만 입력 (!필수)",
				"- multi [Boolean]: true 일 경우 다중업로드 (!선택, -기본 false)",
				"- accept [String]: 업로드 파일 종류 선택 (!선택 - 기본 '')",
				"※ 파일업로드"
			]);
			return false;
		}
		
		var base = {};

		base.id = $('#' + opt.id);
		base.multi = opt.multi === undefined ? false : opt.multi;
		base.accept = opt.accept === undefined ? '' : 'accept="' + opt.accept + '"' ;
		base.callback = opt.callback === undefined ? false : opt.callback;
		base.n = 0;
		base.txthtml = '<input type="text" class="ui-file-txt inp-base" readonly="readonly" title="첨부파일명">';
		base.delhtml = '<button type="button" class="ui-file-del btn-del">첨부파일 삭제</button>';
		base.filehtml = '<input type="file" value="" ' + base.accept + '" class="ui-file-inp" aria-hidden="true" tabindex="-1" title="첨부파일 불러오기">';
		base.id.data('files', opt.multi);
		base.wraphtml = '<div class="ui-file-wrap"></div>';
		base.btn = base.id.find('.ui-file-btn');
		base.id.append(base.wraphtml);
		base.wrap = base.id.find('.ui-file-wrap');
		base.wrap.append(base.filehtml);
		base.file = base.wrap.find('.ui-file-inp');
		base.timer;
		
		//event
		$(doc).off('change.'+ opt.id).on('change.' + opt.id, '#' + opt.id + ' .ui-file-inp', function(){
			fileChange(base);
		});
		$(doc).off('click.fileuploadDel').on('click.fileuploadDel', '.ui-file-del', function(){
			fileDel(this);
		});
		base.btn.off('click.'+ opt.id).on('click.'+ opt.id, function(){
			upload(base);
		}); 
		
		//fn
		function upload(base){
			if (!base.multi) {
				base.file.trigger('click');
			} else {
				base.wrap = base.id.find('.ui-file-wrap').eq(-1);
				base.file = base.wrap.find('.ui-file-inp');
				base.file.trigger('click');
			}
		}
		function fileDel(v){
			var $del = $(v),
				$file = $del.closest('.ui-file'),
				len = $file.find('.ui-file-wrap').length,
				idx = $del.closest('.ui-file-wrap').index() - 1,
				$txt = $file.find('.ui-file-txt'),
				$wrap = $del.closest('.ui-file-wrap'),
				file = $txt.val();
	
			if (!$file.data('files')) {
				if($wrap.length > 0) {
					$wrap.find('.ui-file-inp').val('');
					$txt.remove();
					$del.remove();
				} 
				$file.data('single', false);
			} else {
				(len > 1) ? $file.find('.ui-file-wrap').eq(idx).remove() : '';
			}
			//base.callback({ id:$file.attr('id'), upload:false, file:file });
		}
		function fileChange(base){
			base.v = base.file.val();
			base.v =  base.v.split("\\");
			base.n =  base.v.length;
			base.n = ( base.n === 0) ? 0 :  base.n - 1; 

			(!base.multi && !base.id.data('single')) ? act('single') : '';
			if (!!base.multi){
				!base.id.data('multi') ? act('multi') : act('add');
				
				clearTimeout(base.timer);
				base.timer = setTimeout(function(){
					base.wraphtml = '<div class="ui-file-wrap"></div>';
					base.id.append(base.wraphtml);
					base.wrap = base.id.find('.ui-file-wrap').eq(-1);
					base.wrap.append(base.filehtml);
					base.file = base.wrap.find('.ui-file-inp');
				},35);
			} 
			if (!!base.v && !base.file.val()) {
				base.txt.remove();
				base.del.remove();
				base.id.data('single', false);
			} 
			function act(v){
				v === 'single' ? base.id.data('single', true) : '';
				v === 'multi' ? base.id.data('multi', true) : '';
				v === 'add' ? base.wrap = base.id.find('.ui-file-wrap').eq(-1) : '';

				base.wrap.append(base.txthtml);
				base.wrap.append(base.delhtml);
				base.txt = base.wrap.find('.ui-file-txt');
				base.del = base.wrap.find('.ui-file-del');

				//base.callback({ id:$file.attr('id'), upload:false, file:file });
			}
			base.txt.val(base.v[base.n]);
		}
	}

	/* ------------------------------------------------------------------------
	 * textarea auto height v1.0 
	 * date : 2018-04-21
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiTextareaAutoHeight: function () {
			return createUiTextareaAutoHeight();
		}
	});
	function createUiTextareaAutoHeight() {
		$('.ui-autoheight').each(function(){
			var n = 1;

			$(this).off('keyup').on('keyup', function(){
				if (!!$plugins.uiHasScrollBar({ selector:$(this) })) {
					n = n + 1;
					$(this).addClass('n' + n);
				}
			});
		});
	}

	/* ------------------------------------------------------------------------
	 * loading v1.0 
	 * date : 2018-06-02
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiLoading: function (opt) {
			return createUiLoading(opt);
		}
	});
	function createUiLoading(opt) {
		var loading = '',
			$selector = opt.id === undefined ? $('body') : opt.id === '' ? $('body') : typeof opt.id === 'string' ? $('#' + opt.id) : opt.id,
			txt = opt.txt === undefined ? '서비스 처리중입니다.' : opt.txt;

		opt.id === undefined ?
			loading += '<div class="ui-loading">':
			loading += '<div class="ui-loading" style="position:absolute">';
		loading += '<div class="ui-loading-wrap">';
		loading += '<strong class="ui-loading-txt"><span>'+ txt +'</span></strong>';
		loading += '</div>';
		loading += '<button type="button" class="btn-base" style="position:fixed; bottom:10%; right:10%; z-index:100;" onclick="$plugins.uiLoading({ visible:false });"><span>$plugins.uiLoading({ visible:false })</span></button>';
		loading += '</div>';

		opt.visible === true ? showLoading() : hideLoading();
		
		function showLoading(){
			$selector.prepend(loading)
		}
		function hideLoading(){
			$('.ui-loading').remove();
		}
	}	

	/* ------------------------------------------------------------------------
	 * time check
	 * date : 2018-07-28
	 * 출력부분 시간,분,초 세분화 전달필요.
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiTimer: function (opt) {
			return createUiTimer(opt)
		}
	});
	win[global].uiTimer.timerID = '';
	function createUiTimer(opt){
		var timer = '',
			$timer = $('#' + opt.id),
			time = opt.time,
			callback = opt.callback;

		clearInterval(win[global].uiTimer.timeID);
		win[global].uiTimer.timeID = setInterval(decrementTime, 1000);

		function decrementTime(){
			$timer.text(toMinSec(time));

			if (time > 0) {
				time--;
			} else {
				clearInterval(win[global.uiTimer.TimerID]);
				callback();
			}
		}
		function toMinSec(t) {
			var hour, min, sec;

			hour = Math.floor(t / 3600);
			min = Math.floor((t - (hour * 3600)) / 60);
			sec = t - (hour * 3600) - (min * 60);
			min < 10 ? min = '0' + min : '';
			sec < 10 ? sec = '0' + sec : '';

			return(min + ':' + sec);
		}
	}

	/* ------------------------------------------------------------------------
	 * error message v1.0 
	 * $plugins.uiError
	 * date : 2018-05-18
	 * 에러 시 메시지 생성 및 스타일 변경
	 * option
	 * - opt.message : 'message text' / [string]
	 * - opt.error : true or false / [string]
	 * - opt.selector : 'id' or $(...) / [strong] or [object]
	 * - opt.wrapper : '...' / [strong]
	------------------------------------------------------------------------ */
	win[global] = uiNameSpace(namespace, {
		uiError: function (opt) {
			return createUiError(opt);
		}
	});
	function createUiError(opt){
		var msg = opt.message, 
			err = opt.error, 
			$this = typeof opt.selector === 'string' ? $('#' + opt.selector) : opt.selector,
			$wrap = opt.wrapper === undefined ? $this.closest('.form-item') : $this.closest(opt.wrapper),
			id = $this.attr('id'),
			err_html = '<em class="ui-error-msg" aria-hidden="true" id="'+ id +'-error">'+ msg +'</em>';

		//generate error message
		$this.attr('aria-labelledby', id + '-error');
		!$('#'+ id +'-error').length ? $wrap.append(err_html) : $wrap.find('ui-error-msg').text('msg') ;
		
		//error 여부에 따른 설정
		if (err) {
			$('#'+ id +'-error').attr('aria-hidden', false);
			$wrap.addClass('ui-error-true');
			$this.addClass('ui-error-item');
			$this.closest('.ui-select').addClass('ui-error-select');
		} else {
			$('#'+ id +'-error').attr('aria-hidden', true).remove();
			$wrap.find('.ui-error-item').length === 1 ? $wrap.removeClass('ui-error-true') : '';
			$this.removeClass('ui-error-item');
			$this.closest('.ui-select').removeClass('ui-error-select');
		}
	}

	/*
	* scrolling .........
	*/
	win[global] = uiNameSpace(namespace, {
		uiScrolling: function (opt) {
			return createUiScrolling(opt);
		},
		uiScrollingCancel: function () {
			return createUiScrollingCancel();
		},
		uiScrollingSwitch: function () {
			return createUiScrollingSwitch();
		}
	});
	win[global].uiScrolling.option = {
		scrllpow: 300
	};
	function createUiScrolling(opt) {
		var opt = $.extend(true, {}, win[global].uiScrolling.option, opt),
			_scrollPow = opt.scrllpow;

		$(document).on("mousewheel.uiscrolling", _onMouseWheel);

		$('body').data('scrolling', 'yes');
		
		function _onMouseWheel (e){
			e.preventDefault();
			_smoothScroll(e);
		}
		function _smoothScroll (e) {
			var time = 400,
				delta = -Math.max(-1, Math.min(1, e.originalEvent.wheelDelta)),
				_tgScroll = $(window).scrollTop() + (delta * _scrollPow);

			$("html, body").stop().animate({
				scrollTop: _tgScroll
			}, time, 'easeOutQuad');
		}
	}
	function createUiScrollingCancel() {		
		$(document).off("mousewheel.uiscrolling");
		$('body').data('scrolling', 'no');
	}
	function createUiScrollingSwitch(){
		$('body').data('scrolling') === 'yes' ? win[global].uiScrollingCancel(): '';
		$('body').data('scrolling') === 'no' ? win[global].uiScrolling(): '';
	}
	
	win[global] = uiNameSpace(namespace, {
		uiRollTxt: function (opt) {
			return createUiRollTxt(opt);
		},
		uiRollTxtAct: function (opt) {
			return createUiRollTxtAct(opt);
		}
	});
	win[global].uiRollTxt.option = {
		autoplay: true,
		speed: 2000
	}
	win[global].uiRollTxt.timer = '';
	function createUiRollTxt(opt){
		var opt = $.extend(true, {}, win[global].uiRollTxt.option, opt),
			autoplay = opt.autoplay,
			speed = opt.speed,
			$roll = $('#' + opt.id),
			$roll_wrap = $roll.find('.ui-rolltxt-wrap'),
			$roll_item = $roll_wrap.find('.ui-rolltxt-item'),
			len = $roll_item.length,
			play_txt = autoplay ? '정지' : '진행',
			play_class = autoplay ? 'stop' : 'play',
			html_btn = '';

		if (len > 1) {
			var item_clone = $roll_item.eq(0).clone();
			$roll_wrap.append(item_clone);
			html_btn += '<button type="button" class="ui-rolltxt-btn '+ play_class +'" role-label="'+ play_txt +'" data-play="'+ autoplay +'">';
			html_btn += '</button">';

			$roll.append(html_btn);
			html_btn = '';

			win[global].uiRollTxtAct({ id:opt.id, play: true, speed: speed });
		}
	}
	function createUiRollTxtAct(opt){
		var $roll = $('#' + opt.id),
			$roll_wrap = $roll.find('.ui-rolltxt-wrap'),
			$roll_item = $roll_wrap.find('.ui-rolltxt-item'),
			$roll_btn = $roll.find('.ui-rolltxt-btn'),
			len = $roll_item.length,
			h = $roll_item.outerHeight(),
			play = opt.play,
			speed = opt.speed,
			n = 0,
			timer;

		if (play) {
			clearTimeout(timer);
			rollPlay();
		} else {
			clearTimeout(timer);
		}

		function rollPlay(){
			timer = setTimeout(function(){
				n = n + 1;
				if (n >= len) {
					n = 1;
					rollMove(n, true);
				} else {
					rollMove(n);
				}
			},speed);
		}
		function rollMove(m, v){
			v ? $roll_wrap.css('top', 0) : '';
			$roll_wrap.stop().animate({
				top: '-' + h * m + 'px'
			}, 300, function(){
				rollPlay();
			});
		}

		$roll_item.on('mouseover', function(){
			clearTimeout(timer);
		}).on('mouseleave', function(){
			clearTimeout(timer);
			!!$(this).closest('.ui-rolltxt.pause').length ? '' :
			rollPlay();
		});
		$roll_btn.on('click',function(){
			console.log($(this).data('play'))
			if ($(this).data('play')) {
				$(this).data('play',false).removeClass('stop').addClass('play').closest('.ui-rolltxt').addClass('pause');
				clearTimeout(timer);
			} else {
				$(this).data('play',true).removeClass('play').addClass('stop').closest('.ui-rolltxt').removeClass('pause');;
				clearTimeout(timer);
				rollPlay();
			}
		});
	}


	/* 참고용
	* - 태그명 구하기
	* $(this)[0].nodeName.toLowerCase();
	*
	* - string을 function으로 변경하는 방법
	* fn = new Function($sel.data('change'));
	* fn();
	*
	*/

})(jQuery, window, document);	