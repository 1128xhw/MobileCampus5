/**
 * Created by xuhw on 2017/3/10.
 */
var loading = false;
myApp.onPageInit('messageList', function () {
    getMessageList();

    $$(document).on("click",'.messageCard', function () {
        var messageId = $$(this).attr('messageId');
        localStorage.messageCenterMessageId = messageId;
        mainView.router.loadPage('message/messageDetail.html');
    });

    $$('.infinite-scroll').on('infinite', function () {
        if (loading) return;
        loading = true;
        mseeageListPageIndex +=1;
        getMessageList();
        // if (lastIndex >= maxItems) {
        //     // 加载完毕，则注销无限加载事件，以防不必要的加载
        //     myApp.detachInfiniteScroll($$('.infinite-scroll'));
        //     // 删除加载提示符
        //     $$('.infinite-scroll-preloader').remove();
        //     return;
        // }
    });

});

var mseeageListPageIndex = 0;
function getMessageList(){
    var pageSize = 10;
    var userId = localStorage.userId;
    var appId = localStorage.messageBoxAppId;
    var messageCenterBaseUrl = localStorage.messageBaseUrl;
    var url = messageCenterBaseUrl + 'api/user/'+userId+'/Messages/'+appId+'/'+mseeageListPageIndex+'/'+pageSize;
    $.ajax({
        url: url,
        type:'GET',
        dataType:'json',
        success:function(data){
            //alert(1)
            console.log(data);
            if(data.DataSource.length>0){
                data.DataSource.forEach(function (item) {
                    loadMessageList(item);
                });
                MSEOP.localStorage.setItem('mCMessageList',data.DataSource);
            }else{
                myApp.detachInfiniteScroll($$('.infinite-scroll'));
                $$('.infinite-scroll-preloader').remove();
                if(mseeageListPageIndex==0){
                    myApp.alert('暂无数据')
                }
            }
            if(data.DataSource.length<pageSize ){
                myApp.detachInfiniteScroll($$('.infinite-scroll'));
                $$('.infinite-scroll-preloader').remove();
            }
        },
        error:function(a,b,c){
            alert(JSON.stringify(b))
        },
        complete:function(){

        }
    })
}


function loadMessageList(item) {
    var html = '<div class="card messageCard" messageId="'+item.MessageId+'">';
    html += '<div class="card-header">'+item.Title+'</div>';
    html += '<div class="card-content">';
    html += '<div class="card-content-inner">'+item.Content+'</div>';
    html += '</div>';
    html += '<div class="card-footer">'+formatDate(item.MessageTime)+'</div>';
    html += '</div>';
    $$("#messageListWrapper").append(html);
    loading = false;
}
