/**
 * Created by xuhw on 2017/2/8.
 */
function getLocationInfo(){
    MSEOP.Device.getLocation(function(returnData){
        var locationInfo = JSON.stringify(returnData,null,4);
        $$('pre').html(locationInfo);
    });
}