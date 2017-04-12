// Initialize your app
var myApp = new Framework7({
    cache: false,
    cacheDuration: 0,
    modalTitle: 'MSEOP',
    animateNavBackIcon: true,
    pushState: true,
    // init:false
});

var baseUrl = 'http://hsefzcz.istudy.sh.cn/SchoolMobileApi/';
var baseUrl2 = 'http://hsefzcz.istudy.sh.cn/Mobile5.0.Api/';
localStorage.baseUrl = baseUrl;
localStorage.baseUrl2 = baseUrl2;

var messageBaseUrl = 'http://hsefzcz.istudy.sh.cn/MessageCenter.WebApiService/';
localStorage.messageBaseUrl = messageBaseUrl;

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache:true
});

// Add another view, which is in right panel
// var rightView = myApp.addView('.view-right', {
//     // Enable Dynamic Navbar for this view
//     dynamicNavbar: true
// });

// myApp.init();

var token = localStorage.userId;
if(!token){
    myApp.loginScreen();
}else{
    //mainView.loadPage('mainTab/mainTab.html');
    mainView.router.reloadPage('mainTab/mainTab.html');
}

//MSEOP.Device.deleteCache(function(){})

MSEOP.Upgrade.checkVersion('ydxy5');




