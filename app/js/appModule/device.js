/**
 * Created by xuhw on 2017/2/8.
 */
function dial(){
    var phoneNum = $$('#phoneNum').val();
    if(!phoneNum){
        alert('请输入电话号码');
    }else{
        MSEOP.Device.dial(phoneNum);
    }
}

function setWakelock(){
    var type = 0;
    if($$("#setWakelock")[0].checked==false){
        type = 1;
    }
    MSEOP.Device.setWakelock(type,function(returnData){
        if(returnData.data=='success'){
            if(type==1){
                MSEOP.Toast.open('已开启屏幕常量！', 1000);
            }else{
                MSEOP.Toast.open('已关闭屏幕常量！', 1000);
            }
        }
    });
}

function vibrate(){
    MSEOP.Device.vibrate();
}

function beep(){
    MSEOP.Device.beep();
}

function deleteCache(){
    MSEOP.Device.deleteCache(function(returnData){
        if(returnData.data=='success'){
            MSEOP.Toast.open('清除缓存成功！', 1000);
        }
    });
    MSEOP.localStorage.clear();
}
