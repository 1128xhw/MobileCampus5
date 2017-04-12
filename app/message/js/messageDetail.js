/**
 * Created by xuhw on 2017/3/24.
 */
myApp.onPageInit('messageDetail',function (page) {
    var messageId = localStorage.messageCenterMessageId;
    var messageList = MSEOP.localStorage.getItem('mCMessageList');
    messageList.forEach(function (item) {
        if(item.MessageId == messageId){
            $$("#msgDetalTitle").html(item.Title);
            var content = deleteHtml(item.Content);
            $$("#msgDetailContent").html(content);
            $$("#senderName").html(item.Sender.Name);
            $$("#msgTime").html(item.MessageTimeDisplay);
        }
    })
});