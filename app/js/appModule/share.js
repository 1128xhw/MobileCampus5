/**
 * Created by xuhw on 2017/3/6.
 */

function shareDemo(platform) {
    closePop();
    switch (localStorage.shareType) {
        case 'text':
            shareText(platform);
            break;
        case 'image':
            shareImg(platform);
            break;
        case 'url':
            shareUrl(platform);
            break;
        case 'audio':
            shareAudio(platform);
            break;
        case 'video':
            shareVideo(platform);
            break;
        default:
            break;
    }
}
//openOption()
function openOption(type) {
    localStorage.shareType = type;
    var html = '<div class="modal-overlay modal-overlay-visible chosePlatformPop"></div>';
    html += '<div class="actions-modal modal-in chosePlatformPop">';
    html += '<div class="actions-modal-group">';
    html += '<div class="actions-modal-label" style="display: flex;flex-direction: column;">';
    html += '<div style="text-align: left;width: 100%;padding-left: 5px;font-size: 16px;margin: 5px auto;">分享到</div>';
    html += '<div style="display: flex;flex-direction: row;text-align: center;">';
    html += '<div onclick="shareDemo(0)" style="display: flex;flex-direction: column;text-align: center;">';
    html += '<img style="width: 50%;margin: 5px auto;" src="img/more_weixin.png">';
    html += '<span>微信</span>';
    html += '</div>';
    html += '<div onclick="shareDemo(1)" style="display: flex;flex-direction: column;text-align: center;">';
    html += '<img style="width: 50%;margin: 5px auto;" src="img/more_circlefriends.png">';
    html += '<span>朋友圈</span>';
    html += '</div>';
    html += '<div onclick="shareDemo(2)" style="display: flex;flex-direction: column;text-align: center;">';
    html += '<img style="width: 50%;margin: 5px auto;" src="img/more_icon_qq.png">';
    html += '<span>QQ</span>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="actions-modal-group">';
    html += '<div class="actions-modal-button" onclick="closePop()">取消</div>';
    html += '</div>';
    html += '</div>';
    $$('#indexView').append(html);
}

function closePop() {
    var f7 = new Framework7();
    f7.closeModal()
}

function shareText(platform) {
    var text = $$('#shareText').val() || 'M-SEOP有大量可以直接使用的UI组件和工具，大部分的组件你都完全不需要写任何JS代码。具备iOS 和 Google Material两种风格的主题，可以方便快捷的开发出具有iOS&Android风格的APP。';
    var option = {
        'text': text,
        'platformType': platform
    };
    MSEOP.Share.shareText(option, function () {
        MSEOP.Toast.open('分享文字成功', 800);
    });
}

function shareImg(platform) {
    var thumbImage = 'https://app.izhihuidao.com/mseopShareImg/image_small.png';
    var imgUrl = 'https://app.izhihuidao.com/mseopShareImg/image.png';
    var option = {
        "thumbImage": thumbImage,
        "shareImage": imgUrl,
        "platformType": platform
    };
    MSEOP.Share.shareImage(option, function(){
        MSEOP.Toast.open('分享图片成功', 800);
    });
}

function shareUrl(platform) {
    var thumbImage = 'http://139.196.38.33:2222/document/shareFile/image_small.png';
    var description = 'M-SEOP有大量可以直接使用的UI组件和工具，大部分的组件你都完全不需要写任何JS代码。具备iOS 和 Google Material两种风格的主题，可以方便快捷的开发出具有iOS&Android风格的APP。'
    var webPageUrl = 'http://app.izhihuidao.com/mseop';
    var title = 'M-SEOP下载地址';
    var option = {
        'title':title,
        'thumbImage':thumbImage,
        'description':description,
        'webPageUrl':webPageUrl,
        'platformType':platform
    };
    MSEOP.Share.shareWeb(option, function () {
        MSEOP.Toast.open('分享网页成功', 800);
    });
}

function shareAudio(platform) {
    var thumbImage = 'http://139.196.38.33:2222/document/shareFile/image_small.png';
    var description = 'M-SEOP有大量可以直接使用的UI组件和工具，大部分的组件你都完全不需要写任何JS代码。具备iOS 和 Google Material两种风格的主题，可以方便快捷的开发出具有iOS&Android风格的APP。'
    var audioUrl = 'http://139.196.38.33:2222/document/shareFile/audio.mp3';
    var title = 'M-SEOP分享音频';
    var option = {
        'title':title,
        'thumbImage':thumbImage,
        'description':description,
        'musicUrl':audioUrl,
        'platformType':platform
    };
    MSEOP.Share.shareAudio(option,function () {
        MSEOP.Toast.open('分享音频成功', 800);
    });
}

function shareVideo(platform) {
    var thumbImage = 'http://139.196.38.33:2222/document/shareFile/image_small.png';
    var description = 'M-SEOP有大量可以直接使用的UI组件和工具，大部分的组件你都完全不需要写任何JS代码。具备iOS 和 Google Material两种风格的主题，可以方便快捷的开发出具有iOS&Android风格的APP。'
    var videoUrl = 'http://139.196.38.33:2222/document/shareFile/video.mp4';
    var title = 'M-SEOP分享视频';
    var option = {
        'title':title,
        'thumbImage':thumbImage,
        'description':description,
        'videoUrl':videoUrl,
        'platformType':platform
    };
    MSEOP.Share.shareVideo(option, function () {
        MSEOP.Toast.open('分享视频成功', 800);
    });
}