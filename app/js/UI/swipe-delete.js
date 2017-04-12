/**
 * Created by xuhw on 2017/2/16.
 */
/* ===== Swipe to delete events callback demo ===== */
myApp.onPageInit('swipe-delete', function (page) {
    $$('.demo-remove-callback').on('deleted', function () {
        myApp.alert('该项已经删除!');
    });
});
myApp.onPageInit('swipe-delete media-lists', function (page) {
    $$('.demo-reply').on('click', function () {
        myApp.alert('回复');
    });
    $$('.demo-mark').on('click', function () {
        myApp.alert('收藏');
    });
    $$('.demo-forward').on('click', function () {
        myApp.alert('转发');
    });
});


/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('swipe-delete modals media-lists', function (page) {
    var actionSheetButtons = [
        // First buttons group
        [
            // Group Label
            {
                text: '这里是一些选项描述',
                label: true
            },
            // First button
            {
                text: '确认',
                onClick: function () {
                    myApp.alert('完成!');
                }
            },
            // Another red button
            {
                text: '警告',
                color: 'red',
                onClick: function () {
                    myApp.alert('您点击了警告按钮!');
                }
            },
        ],
        // Second group
        [
            {
                text: '取消',
                bold: true
            }
        ]
    ];
    $$('.demo-actions').on('click', function (e) {
        myApp.actions(actionSheetButtons);
    });
    $$('.demo-actions-popover').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(this, actionSheetButtons);
    });

});