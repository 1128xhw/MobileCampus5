/**
 * Created by xuhw on 2017/2/8.
 */
function xgRegister(){
    var userId = GUID();
    userId = 'mseoptest1';
    localStorage.xgUserId = userId;
    MSEOP.XinGe.register(userId,function(returnData){
        var data = JSON.stringify(returnData,null,4);
        $$('#register').html(data);
    })
}

function xgUnRegister(){
    var userId = localStorage.xgUserId;
    MSEOP.XinGe.unRegister(userId,function(returnData){
        var data = JSON.stringify(returnData,null,4);
        $$('#unRegister').html(data);
    })
}

function xgSetTag(){
    MSEOP.XinGe.setTag('test',function(returnData){
        var data = JSON.stringify(returnData,null,4);
        $$('#setTag').html(data);
    })
}

function xgDeleteTag(){
    MSEOP.XinGe.deleteTag('test',function(returnData){
        var data = JSON.stringify(returnData,null,4);
        $$('#deleteTag').html(data);
    })
}

function GUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}