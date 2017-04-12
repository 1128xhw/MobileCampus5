/**
 * Created by xuhw on 2017/2/13.
 */
/* ===== Notifications Page ===== */
myApp.onPageInit('notifications', function (page) {
    $$('.ks-notification-simple').on('click', function () {
        myApp.addNotification({
            title: 'MSEOP',
            message: '这是一个带有标题和消息的简单通知消息'
        });
    });
    $$('.ks-notification-full').on('click', function () {
        myApp.addNotification({
            title: 'MSEOP',
            subtitle: '通知标题',
            message: '这是一个简单的通知消息与自定义图标和字幕',
            media: '<i class="icon icon-f7"></i>'
        });
    });
    $$('.ks-notification-custom').on('click', function () {
        myApp.addNotification({
            title: 'MSEOP',
            subtitle: '新消息来自智慧岛小组',
            message: 'MSEOP演示DEMO已经开发完成，请您更新体验！',
            media: '<img width="44" height="44" style="border-radius:100%" src="http://lorempixel.com/100/100/people/9/">'
        });
    });
    $$('.ks-notification-callback').on('click', function () {
        myApp.addNotification({
            title: 'MSEOP',
            subtitle: '新消息来自智慧岛小组',
            message: 'MSEOP演示DEMO已经开发完成，请您更新体验！',
            media: '<img width="44" height="44" style="border-radius:100%" src="http://lorempixel.com/100/100/people/9/">',
            onClose: function () {
                myApp.alert('您关闭了消息。');
            }
        });
    });
});
