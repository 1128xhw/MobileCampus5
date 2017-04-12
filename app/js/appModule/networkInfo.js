/**
 * Created by xuhw on 2017/2/8.
 */
function getNetworkInfo(){
    MSEOP.Device.networkInfo(function(returnData){
        var networkInfo = JSON.stringify(returnData,null,4);
        $$('pre').html(networkInfo);
    })
}