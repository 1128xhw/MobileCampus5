/**
 * Created by xuhw on 2017/2/8.
 */

function accountSignIn(){
    MSEOP.Umeng.accountSignIn('absdsafc');
}

function accountSignOut(){
    MSEOP.Umeng.accountSignOut('absdsafc');
}

function beginLogPageView(){
    MSEOP.Umeng.beginLogPageView('umeng');
}

function endLogPageView(){
    MSEOP.Umeng.endLogPageView('umeng');
}

function umengEvent(){
    MSEOP.Umeng.event('test',{'a':1});
}

function countEvent(){
    MSEOP.Umeng.countEvent('test',{'a':1},1);
}



