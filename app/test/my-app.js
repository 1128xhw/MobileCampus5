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
// var baseUrl = 'http://hsefzcz.istudy.sh.cn/Mobile5.0.Api/';
localStorage.baseUrl = baseUrl;

var messageBaseUrl = 'http://hsefzcz.istudy.sh.cn/MessageCenter.WebApiService/';
localStorage.messageBaseUrl = messageBaseUrl;

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView1 = myApp.addView('#tab1', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache:true
});

var mainView2 = myApp.addView('#tab2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache:true
});

var mainView3 = myApp.addView('#tab3', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache:true
});

$$(".contactGroup").on('click',function(){
    mainView3.router.loadPage('../contactContent/contactList.html');

});

myApp.onPageBack("home-3",function(page){
    myApp.showToolbar('#aa');
})

myApp.onPageInit('contactList',function(page){
    myApp.hideToolbar('#aa');
})

// Add another view, which is in right panel
// var rightView = myApp.addView('.view-right', {
//     // Enable Dynamic Navbar for this view
//     dynamicNavbar: true
// });

// myApp.init();

//mainView.loadPage('tab.html');
// var token = localStorage.userId;
// if(!token){
//     myApp.loginScreen();
// }else{
//     mainView.loadPage('mainTab/mainTab.html');
// }






