/**
 * Created by xuhw on 2017/3/30.
 */
myApp.onPageInit('contactDetail',function(page){
    getContactDetail();
    $$("#startChat").on('click',function () {
        var contactDetail = MSEOP.localStorage.getItem('contactDetail');
        var userId = contactDetail.UserId.toUpperCase();
        var displayName = contactDetail.DisplayName;
        //alert('displayName:'+displayName+"    contactId:"+userId+'    userId'+localStorage.userId);
        MSEOP.RongCloud.startChat(userId,displayName,'0');
    })
});
function getContactDetail() {
    var baseUrl = localStorage.baseUrl;
    var getContactDetailUrl = baseUrl + 'api/User/GetUserInfo';
    var contactId = localStorage.contactId;
    var userType = localStorage.contactUserType;

    var getContactDetailData = {
        'userId': contactId,
        'userType': userType
    };
    myApp.showIndicator();
    $.ajax({
        url: getContactDetailUrl,
        data: getContactDetailData,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //alert(1)
            console.log(data);
            if (data.res_code == 0) {
                loadContactDetail(data.Result);
                MSEOP.localStorage.setItem('contactDetail',data.Result);
            } else {
                myApp.alert(data.res_msg);
            }

        },
        error: function (a, b, c) {
            myApp.alert(JSON.stringify(b))
        },
        complete: function () {
            myApp.hideIndicator();
        }
    })
}

function loadContactDetail(item){
    $$("#contactDisplayName2").html(item.DisplayName);
    $$("#contactUserName2").html(item.UserName);
    var iconPath = item.PortraitUrl || 'img/contactIcon/2.jpg';
    $$("#contactDetailIcon").attr('src',iconPath);
    var schoolName = item.SchoolName || '-';
    $$("#contactSchoolName2").html(schoolName);
    var departmentName = item.DepartmentName || '-';
    $$("#contactDepartmentName2").html(departmentName);
    var contactTel = item.Tel || '-';
    $$("#contactTel").html(contactTel);
    var contactEmail = item.Email || '-';
    $$("#contactEmail").html(contactEmail);
    var contactSex = item.Sex || '-';
    $$("#contactSex").html(contactSex);
}
