var url = 'http://hsefzcz.istudy.sh.cn/Mobile5.0.Api/api/user/userinfo?userId=ac8999d9-66df-4167-8ef4-84aea23d0f38';
$.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data);

    },
    error: function (a, b, c) {
        alert('getToken:'+JSON.stringify(b))
    },
    complete: function () {

    }
})