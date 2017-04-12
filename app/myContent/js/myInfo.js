/**
 * Created by xuhw on 2017/3/22.
 */

myApp.onPageInit('myInfo',function(page){
    loadUserDetail();
});

function loadUserDetail() {
    var userInfo = MSEOP.localStorage.getItem('userInfo');

    var displayName = userInfo.DisplayName || '-';
    $$("#displayName1").html(displayName);

    var userName = userInfo.UserName || '-';
    $$("#userName1").html(userName);

    var department = userInfo.DepartmentName || '-';
    $$("#department").html(department);

    var schoolName = userInfo.SchoolName || '-';
    $$("#schoolName").html(schoolName);

    var email = userInfo.Email || '-';
    $$("#email").html(email);

    var phoneNum = userInfo.Tel || '-';
    $$("#phoneNum").html(phoneNum);

    var sex = userInfo.Sex || '-';
    $$("#sex").html(sex);
}