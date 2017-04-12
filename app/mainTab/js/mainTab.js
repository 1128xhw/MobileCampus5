/**
 * Created by xuhw on 2017/3/23.
 */
myApp.onPageInit('mainTab', function (page) {
    //alert('mainTab Init')
    mainTabInit(page);

    // var ptrContent = $$(page.container).find('.pull-to-refresh-content');
    //
    // // Add 'refresh' listener on it
    // ptrContent.on('refresh', function (e) {
    //     setTimeout(function () {
    //         loadMessageBoxList('refresh');
    //         // When loading done, we need to "close" it
    //         myApp.pullToRefreshDone();
    //     }, 700);
    // });

});

function mainTabInit(page) {
    initRongCloud();
    tab1Init(page);
    loadUserInfo();
    getDepartment();
    tab4Init();

    $$(document).on("click", ".messageWrapper", function () {
        var appId = $$(this).attr('appId');
        var messageType = $$(this).attr('messagetype');
        if (messageType == 'im') {
            appId = appId.toUpperCase();
            var displayName = $$(this).find(".applicationName").html();
            MSEOP.RongCloud.startChat(appId, displayName, '0');
        } else {
            localStorage.messageBoxAppId = appId;
            mainView.router.loadPage('message/messageList.html');
        }
    });

    $$(".appWrapper").on("click", function () {
        var clickEle = $$(this);
        var id = clickEle.attr("Id");
        var appName = clickEle.find('.appName').html();
        clickEle.addClass("flip");
        setTimeout("$$('#" + id + "').removeClass('flip')", 1000);
        var url = clickEle.attr('moduleUrl');
        if (url) {
            setTimeout(function () {
                //mainView.router.loadPage(url);
                //mainView.router.loadPage('login/login.html');
                var userInfo = MSEOP.localStorage.getItem('userInfo');
                var userId = userInfo.UserId;
                var userName = userInfo.UserName;
                var schoolId = userInfo.SchoolId;
                var schoolName = userInfo.SchoolName;
                MSEOP.Webview.remoteWeb(url,appName,userId,userName,schoolId,schoolName);
            }, 900);
        }
    });
}

function loadUserInfo() {
    var userInfo = MSEOP.localStorage.getItem('userInfo');
    $$("#displayName").html(userInfo.DisplayName);
    $$("#userName").html(userInfo.UserName);
}

var reloadMainTab = false;
function exit() {
    var userId = localStorage.userId;
    MSEOP.XinGe.unRegister(userId, function () {
    });
    MSEOP.RongCloud.userLogout(function () {
    });
    localStorage.removeItem('userId');
    reloadMainTab = true;
    myApp.loginScreen();
}

function clear() {
    MSEOP.Device.deleteCache(function () {
    })
}

function initXG() {
    var userId = localStorage.userId;
    MSEOP.XinGe.register(userId, function () {
    })
}

function initRongCloud() {
    var token = localStorage.token;
    var userId = localStorage.userId;
    MSEOP.RongCloud.userLogin(token, function (returnData) {
        //if(returnData.data.result=='success'){
        MSEOP.RongCloud.setCurrentUserInfo(userId, function (returnData) {
            //if(returnData.data.result=='success'||returnData.data=='success'){
            initXG();
            //}
        });
        MSEOP.RongCloud.getConversationList(function (returnData) {
            mergeMessageArray(returnData.data, 'im')
        });
        //}
    })
}

function tab4Init() {
    $$(".myInfo_s").on("click", function () {
        mainView.router.loadPage('myContent/myInfo.html');
    });

    var userInfo = MSEOP.localStorage.getItem('userInfo');
    var userId = userInfo.UserId;
    var userName = userInfo.UserName;
    var schoolId = userInfo.SchoolId;
    var schoolName = userInfo.SchoolName;

    $$(".MyStatistics").on('click', function () {
        var url = 'http://hsefzcz.istudy.sh.cn/SchoolMobile/Home/MyStatistics';
        MSEOP.Webview.remoteWeb(url, '我的统计',userId,userName,schoolId,schoolName);
    });

    $$(".ArticleList").on('click', function () {
        var url = 'ttp://education.istudy.sh.cn/empty/ArticleList.html';
        MSEOP.Webview.remoteWeb(url, '文章日志',userId,userName,schoolId,schoolName);
    });

    $$(".ServiceCenter").on('click', function () {
        var url = 'http://education.istudy.sh.cn/MobileApp/ServiceCenter.html';
        MSEOP.Webview.remoteWeb(url, '服务中心',userId,userName,schoolId,schoolName);
    });
}

function setUrlParameter(){
    var userInfo = MSEOP.localStorage.getItem('userInfo');
    var userId = userInfo.UserId;
    var userName = userInfo.UserName;
    var schoolId = userInfo.SchoolId;
    var schoolName = userInfo.SchoolName;
    var str = 'userId='+userId+'&userName='+userName+'&schoolId='+schoolId+'&schoolName='+schoolName;
    return str
}