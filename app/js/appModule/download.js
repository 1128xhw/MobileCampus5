/**
 * Created by xuhw on 2017/2/8.
 */
function downloadtest(){
    //myApp.showPreloader('下载中...');
    var fileId = GUID();
    var fileName = GUID()+'.docx';
    MSEOP.Download({
        fileId:fileId,
        fileName:fileName,
        fileUrl:'http://139.196.38.33:2222/document/test.docx',
        progress:function(total,complete,percent){
            //MSEOP.Toast.open(total,400)
            //MSEOP.Toast.open(complete,400)
            //MSEOP.Toast.open(percent,400)
            var progress = $$('#progressbar').attr('data-progress');
            var progressbar = $$('#progressbar');
            myApp.setProgressbar(progressbar, percent*100);
        },
        complete:function(state,path){
            $$('#filePath').html(path);
            //myApp.hidePreloader();
            localStorage.filePath = path;
        }
    });
}


function GUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}