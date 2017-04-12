/**
 * Created by xuhw on 2017/2/8.
 */
function takePhoto(){
    var editable;
    myApp.confirm('照片是否需要裁剪？', '',
        function () {
            editable = 1;
            openCamera(editable);
        },
        function () {
            editable = 0;
            openCamera(editable);
        }
    );
}

function openCamera(editable){
    MSEOP.Device.camera(editable,function(returnData){
        var photoInfo = JSON.stringify(returnData,null,4);
        $$('pre').html(photoInfo);
    });
}