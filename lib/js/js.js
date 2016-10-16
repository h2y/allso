function getHash() {
    if(location.hash)
        return location.hash.substring(1);
    return '';
}


if ($(window).width() < 770) {
    var get_answer = confirm("ALLSO 是一个聚合性搜索引擎，可以同时对 2 个搜索引擎展开搜索，页面一分为二，充分利用屏幕资源。\n\n然而。。。\n\n你的屏幕实在是太小了，请在电脑或平板上使用 ALLSO，相信会带给你一份相当棒的体验！\n\nhttp://h2y.github.io/allso/\n\n----------\n点击[是]，将跳转到必应手机版：");
    if (get_answer) {
        var hash = getHash();
        if(hash)
            window.location.href = "https://cn.bing.com/search?setmkt=zh-cn&setlang=zh-cn&q=" + hash;
        else
            window.location.href = "https://cn.bing.com/" ;
    }
}


//常用变量
var soinput_obj = $('#soinput'),
    objProgress = $('div.progress>div'),
    obja = $('#a'),
    objb = $('#b'),
    obj_autoSO = $('#autoSO'),
    autoSO = true;
var need_respond = true;
var obj_list1_buttons = $("td.set-list-1 button"),
    obj_list2_buttons = $("td.set-list-2 button");


var set_url = [], set_top = [0,0], set_left = [0,0], set_foot = [0,0];
respond(); //启动后的第一次响应式


if(localStorage["allso_autoSO"]===undefined) {
    localStorage["allso_autoSO"] = true;
    obj_autoSO[0].checked = true;
    autoSO = true;
}
else {
    obj_autoSO[0].checked = localStorage["allso_autoSO"]==='true';
    autoSO = obj_autoSO[0].checked;
}


/* 设置搜索引擎 */
if (localStorage["allso_0"] == undefined) {
    set(0, 3);
    obj_list1_buttons.eq(3).removeClass("btn-info").addClass("btn-danger");
}
else {
    set(0, localStorage["allso_0"]);
    obj_list1_buttons.eq(localStorage["allso_0"]).removeClass("btn-info").addClass("btn-danger");
}
if (localStorage["allso_1"] == undefined) {
    set(1, 2);
    obj_list2_buttons.eq(1).removeClass("btn-warning").addClass("btn-success");
}
else {
    set(1, localStorage["allso_1"]);
    obj_list2_buttons.eq(localStorage["allso_1"]).removeClass("btn-warning").addClass("btn-success");
}

function set(a0b1, set_so) {
    localStorage["allso_" + a0b1] = set_so;
    if (set_so == 0) {
        set_url[a0b1] = "https://www.baidu.com/s?wd=";
        set_top[a0b1] = -45; set_left[a0b1] = -100; set_foot[a0b1] = 80;
    }
    else if (set_so == 1) {
        set_url[a0b1] = "https://www.haosou.com/s?q=";
        set_top[a0b1] = 0; set_left[a0b1] = 0; set_foot[a0b1] = 80;
    }
    else if (set_so == 2) {
        set_url[a0b1] = "https://cn.bing.com/search?setmkt=zh-cn&setlang=zh-cn&q=";
        set_top[a0b1] = -72; set_left[a0b1] = -80; set_foot[a0b1] = 60;
    }
    else if (set_so == 3) {
        set_url[a0b1] = "https://www.search.ask.com/web?q=";
        set_top[a0b1] = -88; set_left[a0b1] = -145; set_foot[a0b1] = 127;
    }
    need_respond = true;
}


//设置按钮点击后颜色变化
obj_list1_buttons.click(function () {
    obj_list1_buttons.removeClass("btn-danger").addClass("btn-info");
    $(this).removeClass("btn-info").addClass("btn-danger");
});
obj_list2_buttons.click(function () {
    obj_list2_buttons.removeClass("btn-success").addClass("btn-warning");
    $(this).removeClass("btn-warning").addClass("btn-success");
});


// 实时搜索开关
obj_autoSO.change(function(){
    localStorage['allso_autoSO'] = this.checked;
    autoSO = this.checked;
});


/* 响应 Hash */
(function () {
    if (location.hash) {
        var hash = getHash();
        hash = decodeURIComponent(hash).replace(/\+/g, ' ');
        soinput_obj[0].value = hash;
        so();
    }
})();


/* 窗口状态加载 -1:左边 1:右边 0:中间 */
if (localStorage["allso_state"] == undefined)
    localStorage["allso_state"] = 0;
/*状态点击改变*/
function change_state(is_zuo) {
    if (localStorage["allso_state"] == 0)
        localStorage["allso_state"] = is_zuo ? -1 : 1;
    else
        localStorage["allso_state"] = 0;
    respond();

    if (localStorage["allso_state"] == 0)
        so();
}


/* 响应式 */
$(window).resize(function () { respond(); });
function respond() {
    var winw = $('body').width(),
        winh = $(window).height(),
        navh = $("nav.navbar").height(),
        abx = winw / 2;

    if (localStorage["allso_state"] == 0) {
        obja.fadeIn('fast').animate({ "margin-left": set_left[0], "width": abx - set_left[0] }, 'fast');
        objb.fadeIn('fast').animate({ "margin-left": abx + set_left[1], "width": abx - set_left[1] }, 'fast');
        objProgress[0].style.width = '50%';
        objProgress[1].style.width = '50%';
    }
    else if (localStorage["allso_state"] < 0) {
        obja.fadeIn('fast').animate({ "margin-left": set_left[0], "width": winw - set_left[0] }, 'fast');
        objb.fadeOut('fast');
        objProgress[0].style.width = '75%';
        objProgress[1].style.width = '25%';
    }
    else {
        obja.fadeOut('fast');
        objb.fadeIn('fast').animate({ "margin-left": set_left[1], "width": winw - set_left[0] }, 'fast');
        objProgress[0].style.width = '25%';
        objProgress[1].style.width = '75%';
    }

    obja.animate({ "margin-top": set_top[0] + navh, "height": winh - set_top[0] - navh + set_foot[0] }, 'fast');
    objb.animate({ "margin-top": set_top[1] + navh, "height": winh - set_top[1] - navh + set_foot[1] }, 'fast');

    need_respond = false;
}


/* 搜索按钮事件 */
soinput_obj.on('input', function(){
    if(autoSO) so();
});
function so() {
    if ($.trim(soinput_obj[0].value) !== '') {
        obja[0].src = ''; objb[0].src = '';
        var sowhat_str = soinput_obj[0].value,
            sowhat = encodeURIComponent(sowhat_str);
        if (localStorage["allso_state"] == 0) {
            obja[0].src = set_url[0] + sowhat;
            objb[0].src = set_url[1] + sowhat;
        }
        else if (localStorage["allso_state"] < 0)
            obja[0].src = set_url[0] + sowhat;
        else
            objb[0].src = set_url[1] + sowhat;

        location.hash = sowhat_str;
        window.document.title = sowhat_str + ' - ALLSO';
    }
    else {
        location.hash = '';
        window.document.title = 'ALLSO - 聚合搜索引擎';
    }

    if (need_respond)
        respond();

    objProgress.addClass('progress-bar-striped active');
    window.setTimeout(function () {
        objProgress.removeClass('progress-bar-striped active');
    }, 2000);
}


$('div.loading').fadeOut('fast');
