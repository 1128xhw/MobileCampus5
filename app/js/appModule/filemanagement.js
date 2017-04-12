/**
 * Created by xuhw on 2017/3/5.
 */
myApp.onPageInit('fileManagement', function (page) {

    MSEOP.File.openFileList(function (returnData) {
        //alert(JSON.stringify(returnData))
        returnData.data.forEach(function (e) {
            var html = '';
            var filePathArray = e.split('/');
            var fileName = filePathArray[filePathArray.length-1];
            html += htmlLink(fileName, e);
            $$('#fileList').append(html);
        })
    });
    // loadList()
    // $$('.demo-remove-callback').on('deleted', function () {
    //     //myApp.alert('删除成功!');
    //     MSEOP.Toast.open('删除成功！', '800');
    // });

    jQuery(document).on('click','.swipeout',function(){
        var filePath = $$(this).attr('filePath');
        var fileName = $$(this).find('.item-title').text();
        //filePath = localStorage.filePath;
        openFileDemo(fileName,filePath);
    });
    jQuery(document).on('click','.openFile',function(event){
        var filePath = $$(this).parent().parent().attr('filePath');
        var fileName = $$(this).parent().parent().find('.item-title').text();
        //filePath = localStorage.filePath;
        openFileDemo(fileName,filePath);
        event.stopPropagation();
    });
    jQuery(document).on('click','.deleteFile',function(event){
        var filePath = $$(this).parent().parent().attr('filePath');
        //filePath = localStorage.filePath;
        deleteFileDemo(filePath);
        event.stopPropagation();
    })
});

function openFileDemo(fileName,filePath) {
    MSEOP.File.openFile(fileName,filePath);
}

function deleteFileDemo(filePath) {
    MSEOP.File.deleteFile(filePath,function(returnData){
        //alert(JSON.stringify(returnData));
        if(returnData.data=='success'){
            MSEOP.Toast.open('删除成功！', '800');
        }
    });
}

function loadList() {
    var html = '';
    for (var i = 0; i < 10; i++) {
        html += htmlLink(i, i + 1);
    }
    $$('#fileList').append(html);

}

function htmlLink(title, filePath) {
    var html = '<li class="swipeout demo-remove-callback" filePath="' + filePath + '">';
    html += '<div class="item-content swipeout-content">';
    html += '<div class="item-media"><i class="f7-icons">document_text</i></div>';
    html += '<div class="item-inner">';
    html += '<div class="item-title">' + title + '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="swipeout-actions-right">';
    html += '<a href="#" class="demo-actions bg-green openFile">打开</a>';
    html += '<a href="#" class="swipeout-delete deleteFile">删除</a>';
    html += '</div>';
    html += '</li>';

    return html;
}
