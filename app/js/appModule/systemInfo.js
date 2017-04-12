/**
 * Created by xuhw on 2017/2/8.
 */
function getSystemInfo(){
    MSEOP.Device.systemInfo(function(returnData){
        var systemInfo = JSON.stringify(returnData,null,4);
        $$('pre').html(systemInfo);
    })
}