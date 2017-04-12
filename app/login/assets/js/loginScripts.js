
$$(".login-screen").on("opened",function(){
    loginInit();
});

$$(".login-screen").on("closed",function(){
    $$("#supersized-loader").remove();
    $$("#supersized").remove();
});

function loginInit(){
    $("#loginPageContent").append('<div id="supersized-loader"></div><ul id="supersized"></ul>');

    $.supersized({

        // Functionality
        slide_interval: 4000,    // Length between transitions
        transition: 1,    // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
        transition_speed: 1000,    // Speed of transition
        performance: 1,    // 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)

        // Size & Position
        min_width: 0,    // Min width allowed (in pixels)
        min_height: 1920,    // Min height allowed (in pixels)
        vertical_center: 1,    // Vertically center background
        horizontal_center: 1,    // Horizontally center background
        fit_always: 0,    // Image will never exceed browser width or height (Ignores min. dimensions)
        fit_portrait: 1,    // Portrait images will not exceed browser height
        fit_landscape: 0,    // Landscape images will not exceed browser width

        // Components
        slide_links: 'blank',    // Individual links for each slide (Options: false, 'num', 'name', 'blank')
        slides: [    // Slideshow Images
            {image: 'login/assets/img/backgrounds/login-bg1.png'},
            {image: 'login/assets/img/backgrounds/login-bg2.png'},
            {image: 'login/assets/img/backgrounds/login-bg3.png'}
        ]

    });

    $('#loginButton').on('click', function () {
        var loginPageContent = $("#loginPageContent");
        var userName = loginPageContent.find('.username').val();
        var password = loginPageContent.find('.password').val();
        if (!userName) {
            loginPageContent.find('.error').fadeOut('fast', function () {
                $(this).css('top', '3px');
            });
            loginPageContent.find('.error').fadeIn('fast', function () {
                $(this).parent().find('.username').focus();
            });
            MSEOP.Toast.open('请输入用户名！', 1000);
            return false;
        } else if (!password) {
            loginPageContent.find('.error').fadeOut('fast', function () {
                $(this).css('top', '73px');
            });
            loginPageContent.find('.error').fadeIn('fast', function () {
                $(this).parent().find('.password').focus();
            });
            MSEOP.Toast.open('请输入密码！', 1000);
            return false;
        } else {
            login(userName, password)

        }
    });

    $('.page-container form .username, .page-container form .password').keyup(function () {
        $(this).parent().find('.error').fadeOut('fast');
    });
}


function login(userName,password){
    //myApp.closeModal()
    var baseUrl = localStorage.baseUrl;
    var loginUrl = baseUrl+'api/User/CheckUserLogin';
    var public_key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+I8EoM0ti9Fv1dj514WkbdTsm3VCMWd76Kc5ag1t1DX0MuMAIYdlX0J0NXAk+B8HlScr3bL1QfNOP5ad4pEWLwB7lst1mUgjQvH4UZ6zzSdPaOAB3kfFs9OsjaTIPgW4qyVZ+0aMRUobTFbOlrVOSobno37T5mcd5Yop47oPqfQIDAQAB';
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(public_key);
    password = encrypt.encrypt(password);
    var loginData = {
        "Id": "",
        "ApplicantID": "",
        "LogiName": "",
        "UserId": "",
        "UserName": userName,
        "UserType": "",
        "UploadType": "",
        "DisplayName": "",
        "IDNumber": "",
        "ImageBase64string": "",
        "SchoolId": "3",
        "AreaCode": "",
        "Remark": "",
        "PortraitUrl": "",
        "PassWord": password,
        "NewPassWord": "",
        "UserRoles": "",
        "SchoolName": "",
        "Tel": "",
        "Email": "",
        "Sex": "",
        "DepartmentName": "",
        "FriendUserId": "",
        "Content": "",
        "PersonalizedSignature": ""
    };
    $.ajax({
        url: loginUrl,
        data:loginData,
        type:'POST',
        dataType:'json',
        success:function(data){
            if(data.res_code==0){
                MSEOP.localStorage.setItem('userInfo',data.Result);
                MSEOP.localStorage.setItem('userId',data.Result.UserId);
                MSEOP.localStorage.setItem('userName',data.Result.UserName);
                getToken();
                myApp.closeModal();
            }else{
                myApp.alert('login:'+data.res_msg);
            }

        },
        error:function(a,b,c){
            alert(JSON.stringify(b))
        },
        complete:function(){

        }
    })
}

function loginSuccess(){
    if(reloadMainTab){
        mainView.router.refreshPage('mainTab/mainTab.html');
    }else{
        mainView.loadPage('mainTab/mainTab.html');
    }

}

function getToken(){
    var baseUrl = localStorage.baseUrl2;
    var userId = localStorage.userId;
    var url = baseUrl+'api/user/userinfo?userId='+userId;
    $.ajax({
        url: url,
        type:'GET',
        dataType:'json',
        success:function(data){
            var token = data.Result.Token;
            localStorage.token = token;
            loginSuccess();

        },
        error:function(a,b,c){
            //alert('getTokenErr:'+JSON.stringify(JSON.stringify(a)+' '+b+' '+c))
        },
        complete:function(){

        }
    });
    //localStorage.token ='29r0JINy2hJ1TVmy8FvFeeIA8ab3P70dfEfnk6j69uGpLtJNAYsIwuLjPfbrH+WnsGQugrQzpFZcY5H8vrqq52mfgpYRb8pIXcgO+8vGMbGP0pNgVPPICUqP0yAynx1DQiCmNu84x3c='
    //loginSuccess();
}


