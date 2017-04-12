/**
 * Created by xuhw on 2017/3/14.
 */

function tab1Init(page) {
    loadMessageBoxList();
    //loadImMessageList();
    messageBoxRefresh(page);

}

function loadMessageBoxList(type) {
    // var messageBoxList = [
    //     {
    //         'appName': '通知公告',
    //         'date': '03-07',
    //         'content': '为了庆祝“三八国际妇女节”，3月8日星期三下午，公司全体女员工放假半天',
    //         'icon':'img/article.png'
    //     },
    //     {
    //         'appName': '日常考勤',
    //         'date': '03-07',
    //         'content': '李雷同学今天上午迟到，下午早退',
    //         'icon':'img/photo.png'
    //     },
    //     {
    //         'appName': '每日作业',
    //         'date': '03-07',
    //         'content': '语文：背诵课文《让我们荡起双桨》',
    //         'icon':'img/cunchu.png'
    //     },
    //     {
    //         'appName': '家校互动',
    //         'date': '03-06',
    //         'content': '您反馈的校门保卫处执勤不严格的情况，我们已收到，会尽快处理',
    //         'icon':'img/news.png'
    //     },
    //     {
    //         'appName': '在线家访',
    //         'date': '03-06',
    //         'content': '英语老师韩梅梅会在今晚7点对您进行在线家访，请留意查看消息',
    //         'icon':'img/downloadIcon.png'
    //     },
    //     {
    //         'appName': '课程安排',
    //         'date': '03-05',
    //         'content': '本月3月8日第二节语文课与3月9日下午数学课互换，请知晓',
    //         'icon':'img/ellipse.png'
    //     },
    //     {
    //         'appName': '课堂答题',
    //         'date': '03-03',
    //         'content': '您的孩子今天课上供答题10道，其中答对8道。',
    //         'icon':'img/article.png'
    //     }
    // ];

    var userId = localStorage.userId;
    if(!userId) return false;
    var messageCenterBaseUrl = localStorage.messageBaseUrl;
    var url = messageCenterBaseUrl + 'api/user/' + userId + '/Messages/LatestTopOne/GroupByApp/v2';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            if (data.length > 0) {
                mergeMessageArray(data,'message');
            } else {
                //myApp.alert('暂无数据');
                //$$("#tab1ContentBlock").append(noData());
            }
        },
        error: function (a, b, c) {
            myApp.alert('loadMessageBoxList:'+JSON.stringify(b))
        },
        complete: function () {

        }
    })
}

function loadMessageBox(item) {
    var html = '<li class="messageWrapper" appId="' + item.ApplicationId + '" messagetype="'+item.MessageType+'">';
    html += '<div href="#" class=" item-content">';
    html += '<div class="item-media"><img style="border-radius: 22px;border: 1px solid #edebeb;" src="' + item.PortraitUri + '" width="44"></div>';
    html += '<div class="item-inner">';
    html += '<div class="item-title-row">';
    html += '<div class="item-title fontC applicationName">' + item.ApplicationName + '</div>';
    html += '<div class="item-after">' + item.MessageTime + '</div>';
    html += '</div>';
    html += '<div class="item-subtitle">' + item.Title + '</div>';
    html += '</div>';
    html += '</div>';
    html += '</li>';
    $$('#messageBoxUl').append(html);
    // formatDate(item.MessageTime)
}

function appIcon(appName) {
    var icon = 'img/appIcon/';
    switch (appName) {
        case '行政办公':
            icon += 'xzbg.png';
            break;
        case '加班':
            icon += 'article.png';
            break;
        case '印章':
            icon += 'email.png';
            break;
        case '车辆':
            icon += 'news.png';
            break;
        case '申购':
            icon += 'photo.png';
            break;
        case '请假':
            icon += 'score.png';
            break;
        case '通知公告':
            icon += 'tzgg.png';
            break;
        default:
            icon += 'xzbg.png';
            break;
    }
    return icon;
}

function messageBoxRefresh(page) {
    var ptrContent = $$(page.container).find('.pull-to-refresh-content');

    // Add 'refresh' listener on it
    ptrContent.on('refresh', function (e) {
        messageArray = [];
        loadMessageBoxList();
        loadImMessageList();
        setTimeout(function () {
            // When loading done, we need to "close" it
            myApp.pullToRefreshDone();
        }, 700);
    });

    setInterval('loadMsgInterval()',5000)
}

function loadMsgInterval(){
    messageArray = [];
    loadMessageBoxList();
    loadImMessageList();
}


// var a = {
//     "name": "rongcloud",
//     "action": "getConversationList",
//     "data": [{
//         "title": "会话标题",
//         "targetId": "会话编号",
//         "unreadCount": "会话未读消息数",
//         "conversationType": "会话类型",
//         "lastMsgType": "最新消息类型",
//         "lastMsgContent": "最新消息内容",
//         "senderName": "发送人名字",
//         "senderPortraitUri": "img/appIcon/email.png",
//         "sentTime": "2017-03-24T16:03:42.113",
//         "receiveTime": "消息接收时间"
//     }]
// };
//
// var b = [
//     {
//         "UnReadCount": 0,
//         "MessageId": "351eb8e5-b77d-4188-8136-fd259a707b10",
//         "EnvelopId": "06b37b04-3205-42c8-a36f-a6fb8475ef97",
//         "Title": "车辆审核不通过",
//         "Content": "<p>徐娟老师于2017/3/23 16:03:42给你发送车辆审核不通过的内容详情。</p>",
//         "MessageTime": "2017-03-23T16:03:42.113",
//         "Sender": {
//             "Id": "b74a4154-3cce-425b-80c4-54454390f027",
//             "Name": "徐娟"
//         },
//         "Application": {
//             "Id": "b769b863-f4b0-43e5-9318-a37ea529fad6",
//             "Name": "车辆"
//         },
//         "ReadStatus": "Normal",
//         "MessageTimeDisplay": null
//     }
// ];

var messageArray = [];

function mergeMessageArray(arr,msgType) {
    if(msgType=='im'){
        arr.forEach(function(item){
            var messageTime = formatDate2(parseInt(item.sentTime))||'-';
            var displayObj = getMessageDisplayName(item.targetId);
            var portraitUri = displayObj.portraitUri || 'img/contactIcon/2.jpg';
            var msgObj = {
                'MessageId':item.targetId,
                'ApplicationId':item.targetId,
                'ApplicationName':displayObj.userName,
                'Title':item.lastMsgContent,
                'Content':item.lastMsgContent,
                'UnReadCount':item.unreadCount,
                'MessageTime':messageTime,
                'PortraitUri':portraitUri,
                'MessageType':'im'
            };
            messageArray.push(msgObj);
        })
    }else{
        arr.forEach(function(item){
            var icon = appIcon(item.Application.Name);
            var messageTime = formatDate(item.MessageTime)||'-';
            var msgObj = {
                'MessageId':item.MessageId,
                'ApplicationId':item.Application.Id,
                'ApplicationName':item.Application.Name,
                'Title':item.Title,
                'Content':item.Content,
                'UnReadCount':item.UnReadCount,
                'MessageTime':messageTime,
                'PortraitUri':icon,
                'MessageType':'message'
            };
            messageArray.push(msgObj);
        })
    }
    //console.log(messageArray);
    $$('#messageBoxUl').html('');
    var messageArray2 = $.Enumerable.From(messageArray)
        .OrderByDescending('$.MessageTime')
        .ToArray();
    //console.log(messageArray2)
    messageArray2.forEach(function(item){
        //console.log(item)
        loadMessageBox(item);
    });
}

function loadImMessageList(){
    MSEOP.RongCloud.getConversationList(function (returnData) {
        mergeMessageArray(returnData.data,'im')
    })
}
//localStorage.removeItem('messageContactArray')
function getMessageDisplayName(targetId){
    var returnObj;
    var messageContactArray = MSEOP.localStorage.getItem('messageContactArray');
    if(messageContactArray){
        //returnObj = $.Enumerable.From(messageContactArray)
        //    .Where(function (x) { return x.userId == targetId });
        messageContactArray.forEach(function(item){
            if(item.userId==targetId){
                returnObj = item;
            }
        });
        if(!returnObj){
            var contactInfo = getMessageContactInfo(targetId);
            if(contactInfo){
                returnObj = {
                    'userId':contactInfo.UserId,
                    'userName':contactInfo.DisplayName,
                    'portraitUri':contactInfo.PortraitUri
                };
                messageContactArray.push(returnObj);
                MSEOP.localStorage.setItem('messageContactArray',messageContactArray);
            }else{
                returnObj = {
                    'userId':targetId,
                    'userName':'陌生人',
                    'portraitUri':'img/contactIcon/2.jpg'
                };
            }
        }
    }else{
        messageContactArray = [];
        var contactInfo = getMessageContactInfo(targetId);
        if(contactInfo){
            returnObj = {
                'userId':contactInfo.UserId,
                'userName':contactInfo.DisplayName,
                'portraitUri':contactInfo.PortraitUri
            };
            messageContactArray.push(returnObj);
            MSEOP.localStorage.setItem('messageContactArray',messageContactArray);
        }else{
            returnObj = {
                'userId':targetId,
                'userName':'陌生人',
                'portraitUri':'img/contactIcon/2.jpg'
            };
        }

    }

    return returnObj;
}

function getMessageContactInfo(userId){
    var baseUrl = localStorage.baseUrl;
    //var url = baseUrl+'api/user/userinfo?userId='+userId;
    var url = baseUrl+'api/User/GetUserInfo?userId='+userId+'&userType=1';
    var userInfo;
    $.ajax({
        url: url,
        type:'GET',
        dataType:'json',
        async:false,
        success:function(data){
            userInfo = data.Result;
        },
        error:function(a,b,c){
            //alert('getTokenErr:'+JSON.stringify(JSON.stringify(a)+' '+b+' '+c))
        },
        complete:function(){

        }
    });

    return userInfo;
}

