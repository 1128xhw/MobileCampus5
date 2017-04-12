/**
 * Created by xuhw on 2017/3/28.
 */
myApp.onPageInit('contactList', function (page) {
    getContactList()

});

function getContactList() {
    var baseUrl = localStorage.baseUrl;
    var getContactListUrl = baseUrl + 'api/Mail/GetDepartmentUserList';
    var schoolId = MSEOP.localStorage.getItem('userInfo').SchoolId;
    var contactGroupId = localStorage.contactGroupId;
    var contactGroup = MSEOP.localStorage.getItem('contactGroupList');
    var department;
    contactGroup.forEach(function(item){
        if(item.DepartmentId==contactGroupId){
            department = item;
        }
    });

    var getContactListData = {
            'schoolId': schoolId,
            'departmentCode': department.DepartmentCode,
            'departmentType': department.DepartmentType,
            'userName': '',
            'topNum': department.UserNum,
            'departmentId': department.DepartmentId,
            'classId': ''
        };
    myApp.showIndicator();
    $.ajax({
        url: getContactListUrl,
        data: getContactListData,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //alert(1)
            //console.log(data);
            if (data.res_code == 0) {
                var html = '';
                if(data.Result!=null) {
                    MSEOP.localStorage.setItem('contactList',data.Result);
                    // var contactList = $.Enumerable.From(data.Result)
                    //     .OrderByDescending('$.DisplayName')
                    //     .ToArray();
                    data.Result.forEach(function (item) {
                        html += loadContactList(item);
                    });
                }else{
                    $$("#contactListUl").append(noData());
                }
                $$("#contactListUl").append(html);
            } else {
                myApp.alert(data.res_msg);
            }

        },
        error: function (a, b, c) {
            myApp.alert(JSON.stringify(b))
        },
        complete: function () {
            myApp.hideIndicator();
            $$(".contactBox").on('click', function () {
                localStorage.contactId = $$(this).attr('id');
                localStorage.contactUserType = $$(this).attr('usertype');
                mainView.router.loadPage('contactContent/contactDetail.html');
            });
        }
    })
}

function loadContactList(item) {
    var iconPath = item.PortraitUrl || 'img/contactIcon/1.jpg';
    var html = '<li>' +
        '<a href="#" id="'+item.UserId+'" usertype="'+item.UserType+'" class="item-link item-content contactBox">' +
        '<div class="item-media">' +
        '<img src="'+iconPath+'" class="contactIcon">' +
        '</div>' +
        '<div class="item-inner">' +
        '<div class="item-title">'+item.DisplayName+'</div>' +
        '</div>' +
        '</a>' +
        '</li>';
    return html;
}
