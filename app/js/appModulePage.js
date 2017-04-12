/**
 * Created by xuhw on 2017/1/23.
 */
// myApp.onPageInit('appModule',function(page){
//
// });
// MSEOP.Events.onPageInit(function(){
//     alert('onPageInit success');
// });
// MSEOP.Events.appOnBackstage(function(){
//     alert('appOnBackstage success')
// });
// MSEOP.Events.pageOnBackstage(function(){
//     alert('pageOnBackstage success')
// });
// MSEOP.Events.appOnReception(function(){
//     alert('appOnReception success')
// });
// MSEOP.Events.pageOnReception(function(){
//     alert('pageOnReception success')
// });


function camera(editable){
    MSEOP.Device.camera(editable,function(returnData){
        alert(JSON.stringify(returnData))
    });
}

function geolocation(){
    MSEOP.Device.geolocation(function(returnData){
        alert(JSON.stringify(returnData))
    });
}

function systemInfo(){
    MSEOP.Device.systemInfo(function(returnData){
        alert(JSON.stringify(returnData));
    })
}

function networkInfo(){
    MSEOP.Device.networkInfo(function(returnData){
        alert(JSON.stringify(returnData));
    })
}

function barcodeScanner(){
    MSEOP.Module.barcodeScanner(function(returnData){
        alert(JSON.stringify(returnData));
    });
}