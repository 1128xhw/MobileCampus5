/**
 * Created by xuhw on 2017/3/28.
 */
function getDepartment() {
    var baseUrl = localStorage.baseUrl;
    var schoolId = MSEOP.localStorage.getItem('userInfo').SchoolId;
    var getDepartmentUrl = baseUrl + 'api/Mail/GetDepartmentTeacherNumList?';
    var getDepartmentData = {
        'schoolId': schoolId,
        'departmentName': ''
    };
    myApp.showIndicator();
    $.ajax({
        url: getDepartmentUrl,
        data: getDepartmentData,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //alert(1)
            //console.log(data);
            MSEOP.localStorage.setItem('contactGroupList',data.Result);
            if (data.res_code == 0) {
                var html= '';
                var contactGroupList = $.Enumerable.From(data.Result)
                    .OrderBy('$.DepartmentCode')
                    .ToArray();
                contactGroupList.forEach(function(item){
                    html += loadDepartment(item);
                });
                $$("#departmentUl").append(html);
            } else {
                myApp.alert(data.res_msg);
            }

        },
        error: function (a, b, c) {
            myApp.alert(JSON.stringify(b))
        },
        complete: function () {
            myApp.hideIndicator();
            $$(".departmentGroup").on('click',function(){
                localStorage.contactGroupId = $$(this).attr('id');
                mainView.router.loadPage('contactContent/contactList.html');
            });
        }
    })
}

function loadDepartment(item){
    var html = '<li>' +
        '<a href="#" id="'+item.DepartmentId+'" class="item-link item-content departmentGroup">' +
        '<div class="item-media"><img src="img/i-f7-ios.png" width="44">' +
        '</div>' +
        '<div class="item-inner">' +
        '<div class="item-title-row" style="margin-top: 10px;margin-bottom: 10px;">' +
        '<div class="item-title">'+item.DepartmentName+'</div>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</li>';
    return html;
}