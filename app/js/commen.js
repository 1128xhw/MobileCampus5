/**
 * Created by xuhw on 2017/3/24.
 */

function deleteHtml(text) {
    var returnText = '暂无简介';
    var reg = new RegExp("<[^<]*>", "gi");    // 标签的正则表达式
    if (text) {
        text = text.toString();
        returnText = text.replace(reg, "");
    }
    return returnText;
}

function formatDate(time){
    //var time = "2015-03-24T13:50:52.5";
    var date = new  Date();
    var dateString1 = '';
    var y = parseInt(time.substring(0,4));
    var yNow = date.getFullYear();
    if(y==yNow){
        var m = parseInt(time.substring(5,7));
        var mNow = date.getMonth();
        if(m-1==mNow){
            var d = parseInt(time.substring(8,10));
            var dNow = date.getDate();
            if(d == dNow){
                dateString1 = '今天';
            }else if(d == dNow-1){
                dateString1 = '昨天';
            }else if(d == dNow-2){
                dateString1 = '前天';
            }else{
                dateString1 = time.substring(0,10)
            }
        }else{
            dateString1 = time.substring(5,10)
        }

    }else{
        dateString1 = time.substring(0,10)
    }
    var dateString2 = time.substring(11,16);
    var dateString = dateString1+' '+dateString2;
    return dateString;

}

// var a = formatDate2(1491239200000);
// console.log(a);
function formatDate2(t){
    //var time = "2015-03-24T13:50:52.5";
    var date = new Date();
    var time = new Date(t);
    var dateString1 = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
    var y = time.getFullYear(t);
    var yNow = date.getFullYear();
    if(y==yNow){
        var m = time.getMonth();
        var mNow = date.getMonth();
        if(m==mNow){
            var d = time.getDate();
            var dNow = date.getDate();
            if(d == dNow){
                dateString1 = '今天';
            }else if(d == dNow-1){
                dateString1 = '昨天';
            }else if(d == dNow-2){
                dateString1 = '前天';
            }
        }

    }
    var dateString2 = time.getHours()+":"+time.getMinutes();
    var dateString = dateString1+' '+dateString2;
    return dateString;
}

function noData(){
    var html = '<div style="text-align: center;padding-top: 40px;padding-bottom: 40px;">' +
        '<img style="width: 150px;height: 150px;" src="img/noData.png" alt="">' +
        '<br>' +
        '<span>暂无数据</span>' +
        '</div>';
    return html;
}