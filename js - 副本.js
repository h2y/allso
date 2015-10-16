
if ($(window).width() < 770) {
	alert("ALLSO 是一个聚合性搜索引擎，可以同时对 2 个搜索引擎展开搜索，页面一分为二，充分利用屏幕资源。\n\n然而。。。\n\n你的屏幕实在是太小了，请在电脑或平板上使用 ALLSO，相信会带给你一份相当棒的体验！\n\nhttp://hzy.pw/allso/");
	if (location.href.indexOf("so=") > -1) {
		var tmp = location.href.split('so=', 2), tmp2 = tmp[1]; tmp = tmp2.split('&', 2);
		window.location.href = "http://m.search.aol.co.uk/search?q=" + tmp[0];
	}
}

/* 设置搜索引擎 */
var set_url = new Array(), set_top = new Array(), set_left = new Array(), set_foot = new Array();
var need_respond = true;
set_top[0] = 0; set_left[0] = 0; set_foot[0] = 0;
set_top[1] = 0; set_left[1] = 0; set_foot[1] = 0;

if (localStorage["allso_0"] == undefined) {
	set(0, 3);
	$("td.set-list-1 button:eq(3)").removeClass("btn-info").addClass("btn-danger");
}
else {
	set(0, localStorage["allso_0"]);
	$("td.set-list-1 button:eq(" + localStorage["allso_0"] + ")").removeClass("btn-info").addClass("btn-danger");
}
if (localStorage["allso_1"] == undefined) {
	set(1, 2);
	$("td.set-list-2 button:eq(1)").removeClass("btn-warning").addClass("btn-success");
}
else {
	set(1, localStorage["allso_1"]);
	$("td.set-list-2 button:eq(" + localStorage["allso_1"] + ")").removeClass("btn-warning").addClass("btn-success");
}

function set(a0b1, set_so) {
	localStorage["allso_" + a0b1] = set_so;
	if (set_so == 0) {
		set_url[a0b1] = "http://www.baidu.com/s?wd=";
		set_top[a0b1] = -45; set_left[a0b1] = -100; set_foot[a0b1] = 80;
	}
	else if (set_so == 1) {
		set_url[a0b1] = "http://www.haosou.com/s?q=";
		set_top[a0b1] = 0; set_left[a0b1] = 0; set_foot[a0b1] = 160;
	}
	else if (set_so == 2) {
		set_url[a0b1] = "http://cn.bing.com/search?setmkt=zh-cn&setlang=zh-cn&q=";
		set_top[a0b1] = -72; set_left[a0b1] = -80; set_foot[a0b1] = 125;
	}
	else if (set_so == 3) {
		set_url[a0b1] = "http://search.aol.co.uk/aol/search?q=";
		set_top[a0b1] = -70; set_left[a0b1] = -120; set_foot[a0b1] = 140;
	}
	else if (set_so == 4) {
		set_url[a0b1] = "http://www.search.ask.com/web?q=";
		set_top[a0b1] = -90; set_left[a0b1] = -140; set_foot[a0b1] = 128;
	}
	need_respond = true;
}

$("td.set-list-1 button").click(function () {
	$('td.set-list-1 button').removeClass("btn-danger").addClass("btn-info");
	$(this).removeClass("btn-info").addClass("btn-danger");
	//set(0, $(this).index());
});
$("td.set-list-2 button").click(function () {
	$('td.set-list-2 button').removeClass("btn-success").addClass("btn-warning");
	$(this).removeClass("btn-warning").addClass("btn-success");
	//set(1, $(this).index());
});

/* 响应get */
if (location.href.indexOf("so=") > -1) {
	var tmp = location.href.split('so=', 2), tmp2 = tmp[1];
	tmp = tmp2.split('&', 2); tmp2 = decodeURIComponent(tmp[0]).replace(/\+/g, ' ');
	$('#soinput')[0].value = tmp2;
	so();
}

/* 窗口状态加载 -1:左边 1:右边 0:中间 */
if(localStorage["allso_state"]==undefined)
	localStorage["allso_state"]=0;
respond(); //启动后的第一次响应式
/*状态点击改变*/
function change_state(is_zuo){
	if(localStorage["allso_state"]==0)
		localStorage["allso_state"]=is_zuo?-1:1;
	else
		localStorage["allso_state"]=0;
	respond();
	
	if(localStorage["allso_state"]==0)
		so();
}

/* 响应式 */
$(window).resize(function () { respond(); });
function respond() {
	var winw=$(window).width(), winh = $(window).height(), navh = $("nav.navbar").height(), abx =winw / 2;
	
	var objProgress = $('div.progress>div');
	if(localStorage["allso_state"]==0) {
		$('#a').fadeIn('fast').animate({ "margin-left": set_left[0], width: abx - set_left[0] }, 'fast');
		$('#b').fadeIn('fast').animate({ "margin-left": abx + set_left[1], width: abx - set_left[1] }, 'fast');
		objProgress[0].style.width = '50%';
		objProgress[1].style.width = '50%';
	}
	else if(localStorage["allso_state"]<0) {
		$('#a').fadeIn('fast').animate({ "margin-left": set_left[0], width: winw - set_left[0] }, 'fast');
		$('#b').fadeOut('fast');
		objProgress[0].style.width = '75%';
		objProgress[1].style.width = '25%';
	}
	else {
		$('#a').fadeOut('fast');
		$('#b').fadeIn('fast').animate({ "margin-left": set_left[1], width: winw - set_left[0] }, 'fast');
		objProgress[0].style.width = '25%';
		objProgress[1].style.width = '75%';
	}

	$('#a').animate({ "margin-top": set_top[0] + navh, height: winh - set_top[0] - navh + set_foot[0] }, 'fast');
	$('#b').animate({ "margin-top": set_top[1] + navh, height: winh - set_top[1] - navh + set_foot[1] }, 'fast');

	need_respond = false;
}

/* 搜索按钮事件 */
if (window.navigator.userAgent.indexOf("Chrome") > 0)
	$('#soinput').attr('oninput', 'so();');
function so() {
	if ($.trim($('#soinput')[0].value) != '') {
		$('#a')[0].src = ''; $('#b')[0].src = '';
		var sowhat_str = $('#soinput')[0].value, sowhat = encodeURIComponent(sowhat_str);
		if(localStorage["allso_state"]==0){
			$('#a')[0].src = set_url[0] + sowhat;
			$('#b')[0].src = set_url[1] + sowhat;
		}
		else if(localStorage["allso_state"]<0)
			$('#a')[0].src = set_url[0] + sowhat;
		else
			$('#b')[0].src = set_url[1] + sowhat;
		
		window.document.title = sowhat_str + ' - ALLSO';
	}
	else
		window.document.title = 'ALLSO - 聚合搜索引擎';

	if (need_respond)
		respond();

	var objProgress = $('div.progress>div');
	objProgress.addClass('progress-bar-striped active');
	window.setTimeout(function () {
		objProgress.removeClass('progress-bar-striped active');
	}, 2000);
}

$('div.loading').fadeOut('fast');
