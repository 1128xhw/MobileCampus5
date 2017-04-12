/**
 * Created by xuhw on 2017/2/9.
 */

function onPageInit(){
    MSEOP.Events.onPageInit(function(){
        MSEOP.Toast.open('onPageInit callback success', 1000);
    });
}

function appOnBackstage(){
    MSEOP.Events.appOnBackstage(function () {
        MSEOP.Toast.open('appOnBackstage callback success', 1000)
    });
}

function pageOnBackstage(){
    MSEOP.Events.pageOnBackstage(function(){
        MSEOP.Toast.open('pageOnBackstage callback success', 1000)
    });
}

function appOnReception(){
    MSEOP.Events.appOnReception(function(){
        MSEOP.Toast.open('appOnReception callback success', 1000)
    });
}

function pageOnReception(){
    MSEOP.Events.pageOnReception(function(){
        MSEOP.Toast.open('pageOnReception callback success', 1000)
    });
}

