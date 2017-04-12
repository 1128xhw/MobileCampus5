/**
 * Created by xuhw on 2017/2/8.
 */
function getBarcodeInfo(){
    MSEOP.Module.barcodeScanner(function(returnData){
        var barcodeInfo = JSON.stringify(returnData,null,4);
        $$('pre').html(barcodeInfo);
    });
}