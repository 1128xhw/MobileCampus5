/**
 * Created by xuhw on 2017/1/24.
 */
var MSEOP = {
    Platform: function () {
        var userAgent = navigator.userAgent;
        var isAndroid = /(Android)/i.test(userAgent); //android终端
        var isiOS = /(iPhone|iPad|iPod|iOS)/i.test(userAgent); //ios终端
        var returnText = 'unknow';
        if (isAndroid) {
            returnText = 'Android';
        } else if (isiOS) {
            returnText = 'iOS';
        }
        return returnText;
    }
};

var componentCallBack = function (returnData) {
    //alert(JSON.stringify(returnData))
    if (typeof (returnData) != 'object') {
        returnData = JSON.parse(returnData);
    }

    var moduleName = returnData.name;
    switch (moduleName) {
        case 'downloader':
            MSEOP.Download().Callback(returnData);
            break;
        case 'quicklook':
            MSEOP.File.callback(returnData);
            break;
        case 'upgrade':
            MSEOP.Upgrade.callback(returnData);
            break;
        case 'device':
            if (returnData.action == 'networkInfo') {
                MSEOP.Device.networkInfoCallback(returnData);
            } else {
                componentCallBack.prototype.callback(returnData);
            }
            break;
        case 'share':
            MSEOP.Share.callback(returnData);
            break;
        case 'rsa':
            MSEOP.Rsa.callback(returnData);
            break;
        case 'rongcloud':
            MSEOP.RongCloud.callback(returnData);
            break;
        default:
            try {
                componentCallBack.prototype.callback(returnData);
            } catch (err) {
            }
            break;
    }
};

var platform = MSEOP.Platform();
MSEOP.Device = {
    camera: function (editable, object) {
        //"editable":"是否需要编辑照片0：不需要  1：需要"
        //var returnText = ''
        editable = editable.toString();
        if (editable != '0' && editable != '1') {
            editable = '0';
        }
        var plugIn = {
            isAndroid: function (editable) {
                var postData = {"action": "open", "data": {"editable": editable}};
                postData = JSON.stringify(postData);
                window.postMessage.camera(postData);
            },
            isiOS: function (editable) {
                var postData = {"action": "open", "data": {"editable": editable}};
                window.webkit.messageHandlers.camera.postMessage(postData);
            }
        };

        componentCallBack.prototype.callback = object;

        (platform == 'iOS') ? plugIn.isiOS(editable) : plugIn.isAndroid(editable);

    },
    getLocation: function (object) {
        //位置信息
        var plugIn = {
            isAndroid: function () {
                var postData = {"action": "getLocation", "data": ""};
                postData = JSON.stringify(postData);
                window.postMessage.location(postData);
            },
            isiOS: function () {
                var postData = {"action": "getLocation", "data": ""};
                window.webkit.messageHandlers.location.postMessage(postData);
            }
        };
        componentCallBack.prototype.callback = object;
        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    },
    systemInfo: function (object) {
        //系统信息
        var plugIn = {
            isAndroid: function () {
                var postData = {"action": "systemInfo", "data": ""};
                postData = JSON.stringify(postData);
                window.postMessage.device(postData);
            },
            isiOS: function () {
                var postData = {"action": "systemInfo", "data": ""};
                window.webkit.messageHandlers.device.postMessage(postData);
            }
        };

        componentCallBack.prototype.callback = object;

        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    },
    networkInfo: function (object) {
        //网络信息
        var plugIn = {
            isAndroid: function () {
                var postData = {"action": "networkInfo", "data": ""};
                postData = JSON.stringify(postData);
                window.postMessage.device(postData);
            },
            isiOS: function () {
                var postData = {"action": "networkInfo", "data": ""};
                window.webkit.messageHandlers.device.postMessage(postData);
            }
        };

        this.networkInfoCallback.prototype.callback = object;

        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    },
    networkInfoCallback: function (returnData) {
        this.networkInfoCallback.prototype.callback(returnData);
    },
    dial: function (phoneNum) {
        //打电话
        var plugIn = {
            isAndroid: function (phoneNum) {
                var postData = {"action": "dial", "data": {"phoneNumber": phoneNum}};
                postData = JSON.stringify(postData);
                window.postMessage.device(postData);
            },
            isiOS: function (phoneNum) {
                var postData = {"action": "dial", "data": {"phoneNumber": phoneNum}};
                window.webkit.messageHandlers.device.postMessage(postData);
            }
        };

        (platform == 'iOS') ? plugIn.isiOS(phoneNum) : plugIn.isAndroid(phoneNum);
    },
    vibrate: function () {
        //震动手机
        var plugIn = {
            isAndroid: function () {
                var postData = {"action": "vibrate", "data": ""};
                postData = JSON.stringify(postData);
                window.postMessage.device(postData);
            },
            isiOS: function () {
                var postData = {"action": "vibrate", "data": ""};
                window.webkit.messageHandlers.device.postMessage(postData);
            }
        };

        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    },
    beep: function () {
        //声音提醒
        var plugIn = {
            isAndroid: function () {
                var postData = {"action": "beep", "data": ""};
                postData = JSON.stringify(postData);
                window.postMessage.device(postData);
            },
            isiOS: function () {
                var postData = {"action": "beep", "data": ""};
                window.webkit.messageHandlers.device.postMessage(postData);
            }
        };

        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    },
    setWakelock: function (value, func) {
        //设置屏幕常亮  "value":"0:取消常亮，1：设置常亮"
        value = value.toString();
        var plugIn = {
            isAndroid: function () {
                var postData = {"action": "setWakelock", "data": {"value": value}};
                postData = JSON.stringify(postData);
                window.postMessage.device(postData);
            },
            isiOS: function () {
                var postData = {"action": "setWakelock", "data": {"value": value}};
                window.webkit.messageHandlers.device.postMessage(postData);
            }
        };

        componentCallBack.prototype.callback = func;

        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    },
    deleteCache: function (func) {
        //清除缓存
        var plugIn = {
            isAndroid: function () {
                var postData = {"action": "deleteCache", "data": ""};
                postData = JSON.stringify(postData);
                window.postMessage.device(postData);
            },
            isiOS: function () {
                var postData = {"action": "deleteCache", "data": ""};
                window.webkit.messageHandlers.device.postMessage(postData);
            }
        };

        componentCallBack.prototype.callback = func;

        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    }
};

MSEOP.Module = {
    barcodeScanner: function (object) {
        //扫码二维码
        var plugIn = {
            isAndroid: function () {
                var postData = {"action": "openScanner", "data": ""};
                postData = JSON.stringify(postData);
                window.postMessage.barcode(postData)
            },
            isiOS: function () {
                var postData = {"action": "openScanner", "data": ""};
                window.webkit.messageHandlers.barcode.postMessage(postData);
            }
        };
        componentCallBack.prototype.callback = object;
        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    }
};

MSEOP.Events = {
    pageOnBackstage: function (object) {
        //alert('pageOnBackstage');
        this.pageOnBackstageCallback.prototype.callback = object;

    },
    pageOnBackstageCallback: function () {
        //alert('pageOnBackstageCallback');
        var callback = this.pageOnBackstageCallback.prototype.callback;
        try{
            callback();
        }catch(err){}
    },
    pageOnReception: function (object) {
        //alert('pageOnReception');
        this.pageOnReceptionCallback.prototype.callback = object;
    },
    pageOnReceptionCallback: function () {
        //alert('pageOnReceptionCallback');
        var callback = this.pageOnReceptionCallback.prototype.callback;
        try{
            callback();
        }catch(err){}
    },
    appOnBackstage: function (object) {
        //alert('appOnBackstage');
        this.appOnBackstageCallback.prototype.callback = object;
    },
    appOnBackstageCallback: function () {
        //alert('appOnBackstage');
        var callback = this.appOnBackstageCallback.prototype.callback;
        try{
            callback();
        }catch(err){}
    },
    appOnReception: function (object) {
        //alert('appOnReception');
        this.appOnReceptionCallback.prototype.callback = object;
    },
    appOnReceptionCallback: function () {
        //alert('appOnReception');
        var callback = this.appOnReceptionCallback.prototype.callback;
        try{
            callback();
        }catch(err){}
    },
    onPageInit: function (object) {
        //alert('onPageInit');
        this.onPageInitCallback.prototype.callback = object;
    },
    onPageInitCallback: function () {
        //alert('onPageInit');
        //var pageInitcallback = this.onPageInitCallback.prototype.callback;
        //pageInitcallback();
        //this.onPageInitCallback.prototype.callback();
    },
    noticeClick: function (returnData) {
        //cosole.log(returnData);
        //alert(JSON.stringify(returnData));
    }
};

MSEOP.Webview = {
    open: function (url) {
        var plugIn = {
            isAndroid: function () {
                var postData = {"action": "open", "data": {"url": url}};
                postData = JSON.stringify(postData);
                window.postMessage.webview(postData)
            },
            isiOS: function () {
                var postData = {"action": "open", "data": {"url": url}};
                window.webkit.messageHandlers.webview.postMessage(postData);
            }
        };

        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    },
    close: function () {
        var plugIn = {
            isAndroid: function () {
                var postData = {"action": "close", "data": ''};
                postData = JSON.stringify(postData);
                window.postMessage.webview(postData);
            },
            isiOS: function () {
                var postData = {"action": "close", "data": ''};
                window.webkit.messageHandlers.webview.postMessage(postData);
            }
        };

        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    },
    remoteWeb: function (url,title,userId,userName,schoolId,schoolName) {
        var plugIn = {
            isAndroid: function () {
                var postData = {"action":"remoteWeb","data":{"url":url,"title":title,"userId":userId,"userName":userName,"schoolId":schoolId,'schoolName':schoolName}};
                postData = JSON.stringify(postData);
                window.postMessage.webview(postData)
            },
            isiOS: function () {
                var postData = {"action":"remoteWeb","data":{"url":url,"title":title,"userId":userId,"userName":userName,"schoolId":schoolId,'schoolName':schoolName}};
                window.webkit.messageHandlers.webview.postMessage(postData);
            }
        };

        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    }
};

MSEOP.Toast = {
    open: function (str, delay) {
        var toast = document.createElement('div');
        toast.className = 'toast';
        var toastId = Math.random();
        toast.id = toastId;
        var toastInner = document.createElement('div');
        toastInner.className = 'toastInner';
        toastInner.innerText = str;
        toast.appendChild(toastInner);
        document.body.appendChild(toast);
        if (delay) {
            setTimeout('MSEOP.Toast.close(' + toastId + ')', delay);
        }
    },
    close: function (toastId) {
        var toast;
        if (toastId) {
            toast = document.getElementById(toastId);
        } else {
            toast = document.getElementsByClassName('toast')[0];
        }

        toast.parentNode.removeChild(toast);
    }
};

MSEOP.XinGe = {
    register: function (id, func) {
        //注册账号
        var postData = {"action": "register", "data": {"account": id}};
        this.sendReq(postData, func);
    },
    unRegister: function (id, func) {
        //注销账号
        var postData = {"action": "unRegister", "data": ""};
        this.sendReq(postData, func);
    },
    setTag: function (tag, func) {
        //设置标签
        var postData = {"action": "setTag", "data": {"tag": tag}};
        this.sendReq(postData, func);
    },
    deleteTag: function (tag, func) {
        //删除标签
        var postData = {"action": "deleteTag", "data": {"tag": tag}};
        this.sendReq(postData, func);
    },
    sendReq: function (postData, func) {
        var plugIn = {
            isAndroid: function (postData) {
                postData = JSON.stringify(postData);
                window.postMessage.push(postData)
            },
            isiOS: function (postData) {
                window.webkit.messageHandlers.push.postMessage(postData)
            }
        };

        componentCallBack.prototype.callback = func;

        (platform == 'iOS') ? plugIn.isiOS(postData) : plugIn.isAndroid(postData);
    }
};

MSEOP.Umeng = {
    accountSignIn: function (id) {
        //绑定账号
        var postData = {"action": "accountSignIn", "data": {"account": id}};
        this.sendReq(postData);
    },
    accountSignOut: function (id) {
        //解绑账号
        var postData = {"action": "accountSignOut", "data": {"account": id}};
        this.sendReq(postData);
    },
    beginLogPageView: function (pageName) {
        //访问某页面
        var postData = {"action": "beginLogPageView", "data": {"pageName": pageName}};
        this.sendReq(postData);
    },
    endLogPageView: function (pageName) {
        //离开某页面
        var postData = {"action": "endLogPageView", "data": {" pageName ": pageName}};
        this.sendReq(postData);
    },
    event: function (eventName, attributes) {
        //计数事件统计  "eventName":"事件名称","attributes":友盟系统中定义的事件属性传JSON对象
        var postData = {"action": "event", "data": {"eventName": eventName, "attributes": attributes}};
        this.sendReq(postData);
    },
    countEvent: function (eventName, attributes, count) {
        //计算事件统计  "eventName":"事件名称","attributes":友盟系统中定义的事件属性传JSON对象, "count":事件的计算值
        var postData = {
            "action": "countEvent",
            "data": {"eventName": eventName, "attributes": attributes, "count": count}
        };
        this.sendReq(postData);
    },
    sendReq: function (postData) {
        var plugIn = {
            isAndroid: function () {
                postData = JSON.stringify(postData);
                window.postMessage.statistic(postData)
            },
            isiOS: function () {
                window.webkit.messageHandlers.statistic.postMessage(postData)
            }
        };

        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    }
};

MSEOP.Storage = {
    setItem: function (key, value, func) {
        var postData = {"action": "setItem", "data": {"key": key, "value": value}};
        this.sendReq(postData, func);
    },
    getItem: function (key, func) {
        var postData = {"action": "getItem", "data": {"key": key}};
        this.sendReq(postData, func);
    },
    removeItem: function (key, func) {
        var postData = {"action": "removeItem", "data": {"key": key}};
        this.sendReq(postData, func);
    },
    clear: function (func) {
        var postData = {"action": "clear", "data": ""};
        this.sendReq(postData, func);
    },
    sendReq: function (postData, func) {
        var plugIn = {
            isAndroid: function (postData) {
                postData = JSON.stringify(postData);
                window.postMessage.statistic(postData)
            },
            isiOS: function (postData) {
                window.webkit.messageHandlers.statistic.postMessage(postData)
            }
        };

        componentCallBack.prototype.callback = func;

        (platform == 'iOS') ? plugIn.isiOS(postData) : plugIn.isAndroid(postData);
    }
};

MSEOP.localStorage = {
    setItem: function (key, value) {
        if (typeof (value) == "object") {
            value = JSON.stringify(value);
        }
        localStorage[key] = value;
    },
    getItem: function (key, type) {
        if (!type || type != 'string') {
            var val = localStorage[key];
            try {
                val = JSON.parse(val);
            } catch (err) {
            }
        }
        return val;
    },
    removeItem: function (key) {
        localStorage.removeItem(key);
    },
    clear: function () {
        localStorage.clear();
    }
};

MSEOP.sessionStorage = {
    setItem: function (key, value) {
        if (typeof (value) == "object") {
            value = JSON.stringify(value);
        }
        localStorage[key] = value;
    },
    getItem: function (key, type) {
        if (!type || type != 'string') {
            var val = localStorage[key];
            try {
                val = JSON.parse(val);
            } catch (err) {
            }
        }
        return val;
    },
    removeItem: function (key) {
        localStorage.removeItem(key);
    },
    clear: function () {
        localStorage.clear();
    }
};

var mseopDownObj = {};
var mseopDownFilePath = '';
var mseopDowmFileId = '';
MSEOP.Download = function (obj) {
    this.addTask = function (fileId, fileName, fileUrl) {
        var postData = {"action": "addTask", "data": {"fileId": fileId, "fileName": fileName, "fileUrl": fileUrl}};
        this.sendRep(postData);
    };
    this.addTaskCallback = function (returnData) {
        if (returnData.data != 'faild') {
            mseopDownFilePath = returnData.data;
            this.startTask();
        } else {
            try {
                var f7 = new Framework7({});
                f7.alert('创建任务失败');
            } catch (err) {
                alert('创建任务失败');
            }
        }
    };
    this.startTask = function () {
        var postData = {"action": "startTask", "data": {"fileId": mseopDowmFileId}};
        this.sendRep(postData);
    };
    this.startTaskCallback = function (returnData) {
        if (returnData.data != 'success') {
            try {
                var f7 = new Framework7({});
                f7.alert('开启任务失败');
            } catch (err) {
                alert('开启任务失败');
            }
        }
    };
    // this.progress=function(returnData){
    //
    // };
    this.progressCallback = function (returnData) {
        var total = returnData.data.total;
        var complete = '';
        if (returnData.data.completed) {
            complete = returnData.data.completed;
        } else {
            complete = returnData.data.complete;
        }
        var percent = complete / total;
        mseopDownObj.progress(total, complete, percent);
    };
    // this.complete=function(returnData){
    //
    // };
    this.completeCallback = function (returnData) {
        mseopDownObj.complete(returnData.data, mseopDownFilePath);
    };
    this.sendRep = function (postData) {
        var plugIn = {
            isAndroid: function (postData) {
                postData = JSON.stringify(postData);
                window.postMessage.downloader(postData);
            },
            isiOS: function (postData) {
                window.webkit.messageHandlers.downloader.postMessage(postData);
            }
        };

        (platform == 'iOS') ? plugIn.isiOS(postData) : plugIn.isAndroid(postData);
    };
    this.Callback = function (returnData) {
        switch (returnData.action) {
            case 'addTask':
                this.addTaskCallback(returnData);
                break;
            case 'startTask':
                this.startTaskCallback(returnData);
                break;
            case 'progress':
                this.progressCallback(returnData);
                break;
            case 'complete':
                this.completeCallback(returnData);
                break;
            default:
                break;
        }
    };

    if (obj) {
        var fileId = obj.fileId;
        var fileName = obj.fileName;
        var fileUrl = obj.fileUrl;
        mseopDowmFileId = obj.fileId;
        mseopDownObj = obj;
        this.addTask(fileId, fileName, fileUrl);
    }
    return this;
};

MSEOP.File = {
    openFileList: function (func) {
        var plugIn = {
            isAndroid: function () {
                var postData = {"action": "fileList", "data": ""};
                postData = JSON.stringify(postData);
                window.postMessage.file(postData);
            },
            isiOS: function () {
                var postData = {"action": "fileList", "data": ""};
                window.webkit.messageHandlers.file.postMessage(postData);
            }
        };

        componentCallBack.prototype.callback = func;

        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    },
    deleteFile: function (filePath, func) {
        var plugIn = {
            isAndroid: function (filePath) {
                var postData = {"action": "deleteFile", "data": {"filePath": filePath}};
                postData = JSON.stringify(postData);
                window.postMessage.file(postData);
            },
            isiOS: function (filePath) {
                var postData = {"action": "deleteFile", "data": {"filePath": filePath}};
                window.webkit.messageHandlers.file.postMessage(postData);
            }
        };

        componentCallBack.prototype.callback = func;

        (platform == 'iOS') ? plugIn.isiOS(filePath) : plugIn.isAndroid(filePath);
    },
    openFile: function (title, filePath) {
        var plugIn = {
            isAndroid: function (filePath) {
                var postData = {"action": "openFile", "data": {"fileUrl": filePath}};
                postData = JSON.stringify(postData);
                window.postMessage.quicklook(postData)
            },
            isiOS: function (title, filePath) {
                var postData = {"action": "openFile", "data": {"fileUrl": filePath, "title": title}};
                window.webkit.messageHandlers.quicklook.postMessage(postData);
            }
        };

        (platform == 'iOS') ? plugIn.isiOS(title, filePath) : plugIn.isAndroid(filePath);
    },
    callback: function (returnData) {
        if (returnData.action == 'openFile') {
            var f7 = new Framework7({});
            f7.alert('暂不支持该打开类型文件');
        }
    }
};

MSEOP.Upgrade = {
    appInfo: {
        'appVersion': '',
        'appNewestVersion': '',
        'appDownUrl': '',
        'upgradeType': '',
        'upgradeContent': ''
    },
    appVersion: function () {
        var postData = {"action": "appVersion", "data": ""};
        //this.appInfo.appVersion = '0.9';
        this.sendReq(postData);
    },
    getNewestVersion: function (appKey) {
        ajax({
            url: "http://api.izhihuidao.com/AppApi/api/appversion/getAppDetails/" + appKey,              //请求地址
            type: "GET",                       //请求方式
            data: "",
            dataType: "json",
            success: function (response, xml) {
                // 此处放成功后执行的代码
                console.log(JSON.parse(response));
                var appDetails = JSON.parse(response);
                var appArray = appDetails.Result.AppVersions;
                var newestApp;
                if(MSEOP.Platform().toUpperCase()=='IOS'){
                    if (appArray[0].Platform.toUpperCase() == MSEOP.Platform().toUpperCase()) {
                        newestApp = appArray[0];
                    } else {
                        newestApp = appArray[1];
                    }
                }else{
                    if (appArray[0].Platform.toUpperCase() == '安卓') {
                        newestApp = appArray[0];
                    } else {
                        newestApp = appArray[1];
                    }
                }

                MSEOP.Upgrade.appInfo.appNewestVersion = newestApp.VersionNumber;
                MSEOP.Upgrade.appInfo.appDownUrl = newestApp.DownloadUrl;
                MSEOP.Upgrade.appInfo.upgradeType = newestApp.UpgradeType;
                MSEOP.Upgrade.appInfo.upgradeContent = newestApp.UpgradeContent;
            },
            fail: function (status) {
                // 此处放失败后执行的代码
                MSEOP.Toast.open('发生未知错误，请稍后重试！', '1000');
            }
        });

        function ajax(options) {
            options = options || {};
            options.type = (options.type || "GET").toUpperCase();
            options.dataType = options.dataType || "json";
            var params = formatParams(options.data);

            //创建 - 非IE6 - 第一步
            if (window.XMLHttpRequest) {
                var xhr = new XMLHttpRequest();
            } else { //IE6及其以下版本浏览器
                var xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            //接收 - 第三步
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status >= 200 && status < 300) {
                        options.success && options.success(xhr.responseText, xhr.responseXML);
                    } else {
                        options.fail && options.fail(status);
                    }
                }
            }

            //连接 和 发送 - 第二步
            if (options.type == "GET") {
                xhr.open("GET", options.url + "?" + params, true);
                xhr.send(null);
            } else if (options.type == "POST") {
                xhr.open("POST", options.url, true);
                //设置表单提交时的内容类型
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(params);
            }
        }

        //格式化参数
        function formatParams(data) {
            var arr = [];
            for (var name in data) {
                arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
            }
            arr.push(("v=" + Math.random()).replace(".", ""));
            return arr.join("&");
        }
    },
    upgrade: function (url) {
        var postData = {"action": "upgrade", "data": {"url": url}};
        this.sendReq(postData);
    },
    sendReq: function (postData) {
        var plugIn = {
            isAndroid: function (postData) {
                postData = JSON.stringify(postData);
                window.postMessage.upgrade(postData);
            },
            isiOS: function (postData) {
                window.webkit.messageHandlers.upgrade.postMessage(postData);
            }
        };

        (platform == 'iOS') ? plugIn.isiOS(postData) : plugIn.isAndroid(postData);
    },
    checkVersion: function (appKey) {
        var self = this;
        self.appVersion();
        self.getNewestVersion(appKey);
        var sI = window.setInterval(checkVer, 300);

        function checkVer() {
            var appVersion = self.appInfo.appVersion;
            var appNewestVersion = self.appInfo.appNewestVersion;
            if (appVersion != '' && appNewestVersion != '') {
                var f7 = new Framework7({});
                // alert('appVersion:' + appVersion);
                // alert("appNewestVersion:" + appNewestVersion);
                var appVersionArray = appVersion.split('.');
                var appNewestVersionArray = appNewestVersion.split('.');
                var a1 = appNewestVersionArray[0] > appVersionArray[0];
                var a11 = appNewestVersionArray[0] == appVersionArray[0];
                var a2 = appNewestVersionArray[1] > appVersionArray[1];
                var a22 = appNewestVersionArray[1] == appVersionArray[1];
                var a3 = appNewestVersionArray[2] > appVersionArray[2];
                // alert("a1" + a1);
                // alert("a11" + a11);
                // alert("a2" + a2);
                // alert("a22" + a22);
                // alert("a3" + a3);
                if (a1 || (a11 && a2) || (a11 && a22 && a3)) {
                    if (self.appInfo.upgradeType == 1) {
                        f7.modal({
                            title: '版本检测',
                            text: self.appInfo.upgradeContent || '有新的版本发布是否需要升级？',
                            buttons: [
                                {
                                    text: '升级',
                                    onClick: function () {
                                        self.upgrade(self.appInfo.appDownUrl);
                                    }
                                },
                                {
                                    text: '取消',
                                    onClick: function () {
                                        //myApp.alert('You clicked second button!')
                                    }
                                }
                            ]
                        })
                    } else {
                        f7.modal({
                            title: '版本检测',
                            text: self.appInfo.upgradeContent || '有新的版本发布请升级！',
                            buttons: [
                                {
                                    text: '升级',
                                    onClick: function () {
                                        self.upgrade(self.appInfo.appDownUrl);
                                    }
                                }
                                // ,{
                                //     text: '取消',
                                //     onClick: function() {
                                //         MSEOP.Webview.close();
                                //     }
                                // }
                            ]
                        })
                    }
                } else {
                    //f7.alert('您已经是最新版本！')
                }

                //不考虑版本高低，直接覆盖安装
                // if(self.appInfo.appVersion != self.appInfo.appNewestVersion){
                //     //升级逻辑
                // }else{
                //     f7.alert('您已经是最新版本！')
                // }
                clearInterval(sI);
            }
        }
    },
    callback: function (returnData) {
        this.appInfo.appVersion = returnData.data;
    }
};

MSEOP.Share = {
    //platformType 0.微信 1.朋友圈 2.QQ
    shareText: function (option, func) {
        //"platformType":"平台类型","text":"分享文字"
        var postData = {
            "action": "shareText",
            "data": {"platformType": option.platformType.toString(), "text": option.text}
        };
        this.shareTextCallback.prototype.callback = func;
        this.sendRep(postData);
    },
    shareTextCallback: function (returnData) {
        this.shareTextCallback.prototype.callback(returnData);
    },
    shareImage: function (option, func) {
        var postData = {
            "action": "shareImage",
            "data": {
                "platformType": option.platformType.toString(),
                "thumbImage": option.thumbImage,
                "shareImage": option.shareImage
            }
        };
        this.shareImageCallback.prototype.callback = func;
        this.sendRep(postData);
    },
    shareImageCallback: function (returnData) {
        this.shareImageCallback.prototype.callback(returnData);
    },
    shareWeb: function (option, func) {
        var postData = {
            "action": "shareWeb",
            "data": {
                "platformType": option.platformType.toString(),
                "thumbImage": option.thumbImage,
                "description": option.description,
                "webPageUrl": option.webPageUrl,
                "title": option.title
            }
        };
        this.shareWebCallback.prototype.callback = func;
        this.sendRep(postData);
    },
    shareWebCallback: function (returnData) {
        this.shareWebCallback.prototype.callback(returnData);
    },
    shareAudio: function (option, func) {
        var postData = {
            "action": "shareMusic",
            "data": {
                "platformType": option.platformType.toString(),
                "thumbImage": option.thumbImage,
                "description": option.description,
                "musicUrl": option.musicUrl,
                "title": option.title
            }
        };
        this.shareAudioCallback.prototype.callback = func;
        this.sendRep(postData);
    },
    shareAudioCallback: function (returnData) {
        this.shareAudioCallback.prototype.callback(returnData);
    },
    shareVideo: function (option, func) {
        var postData = {
            "action": "shareVideo",
            "data": {
                "platformType": option.platformType.toString(),
                "thumbImage": option.thumbImage,
                "description": option.description,
                "videoUrl": option.videoUrl,
                "title": option.title
            }
        };
        this.shareVideoCallback.prototype.callback = func;
        this.sendRep(postData);
    },
    shareVideoCallback: function (returnData) {
        this.shareVideoCallback.prototype.callback(returnData);
    },
    sendRep: function (postData) {
        var plugIn = {
            isAndroid: function (postData) {
                postData = JSON.stringify(postData);
                window.postMessage.share(postData);
            },
            isiOS: function (postData) {
                console.log(JSON.stringify(postData));
                window.webkit.messageHandlers.share.postMessage(postData);
            }
        };

        (platform == 'iOS') ? plugIn.isiOS(postData) : plugIn.isAndroid(postData);
    },
    callback: function (returnData) {
        switch (returnData.action) {
            case 'shareText':
                this.shareTextCallback(returnData);
                break;
            case 'shareImage':
                this.shareImageCallback(returnData);
                break;
            case 'shareWeb':
                this.shareAudioCallback(returnData);
                break;
            case 'shareMusic':
                this.shareAudioCallback(returnData);
                break;
            case 'shareVideo':
                this.shareVideoCallback(returnData);
                break;
            default:
                break;
        }
    }
};

//rsa加密接口尚有bug,未调试完成,移动校园中已改为通过js加密
MSEOP.Rsa = {
    encryptPublic:function (content,func) {
        var plugIn = {
            isAndroid: function () {
                var postData = {"action": "fileList", "data": ""};
                postData = JSON.stringify(postData);
                window.postMessage.file(postData);
            },
            isiOS: function () {
                var postData = {"action":"encryptPublic","data":{"content":content}};
                window.webkit.messageHandlers.file.postMessage(postData);
            }
        };

        this.encryptPublicCallback.prototype.callback = func;

        (platform == 'iOS') ? plugIn.isiOS() : plugIn.isAndroid();
    },
    encryptPublicCallback:function (returnData) {
        this.encryptPublicCallback.prototype.callback(returnData);
    },
    callback:function(returnData){
        switch (returnData.action) {
            case 'encryptPublic':
                this.encryptPublicCallback(returnData);
                break;
            default:
                break;
        }
    }
};

MSEOP.RongCloud = {
    userLogin:function (token,func) {
        var postData = {"action":"userLogin","data":{"token":token}};
        this.userLoginCallback.prototype.callback = func;
        this.sendReq(postData);
    },
    userLoginCallback:function (returnData) {
        this.userLoginCallback.prototype.callback(returnData);
    },
    userLogout:function (func) {
        var postData = {"action":"userLogout","data":""};
        this.userLogoutCallback.prototype.callback = func;
        this.sendReq(postData);
    },
    userLogoutCallback:function (returnData) {
        this.userLogoutCallback.prototype.callback(returnData);
    },
    setCurrentUserInfo:function (userId,func) {
        var postData = {"action":"setCurrentUserInfo","data":{"userId":userId}};
        this.setCurrentUserInfoCallback.prototype.callback = func;
        this.sendReq(postData);
    },
    setCurrentUserInfoCallback:function (returnData) {
        this.setCurrentUserInfoCallback.prototype.callback(returnData);
    },
    getConversationList:function (func) {
        var postData = {"action":"getConversationList","data":""};
        this.getConversationListCallback.prototype.callback = func;
        this.sendReq(postData);
    },
    getConversationListCallback:function (returnData) {
        this.getConversationListCallback.prototype.callback(returnData);
    },
    removeConversation:function (targetId,type,func) {
        //"会话类型 0：单聊 1:群聊"
        var postData = {"action":"removeConversation","data":{"targetId":targetId,"type":type}};
        this.removeConversationCallback.prototype.callback = func;
        this.sendReq(postData);
    },
    removeConversationCallback:function (returnData) {
        this.removeConversationCallback.prototype.callback(returnData);
    },
    startChat:function (targetId,title,type) {
        //"targetId": "会话ID 传用户ID或者群ID", "title": "会话名称", "type": "会话类型 0：单聊 1:群聊"
        var postData = {"action": "startChat","data": { "targetId": targetId, "title": title, "type": type }};
        //this.startChatCallback.prototype.callback = func;
        this.sendReq(postData);
    },
    startChatCallback:function (returnData) {
        this.startChatCallback.prototype.callback(returnData);
    },
    unreadCount:function (func) {
        var postData = {"action":"unreadCount","data":""};
        this.unreadCountCallback.prototype.callback = func;
        this.sendReq(postData);
    },
    unreadCountCallback:function (returnData) {
        this.unreadCountCallback.prototype.callback(returnData);
    },
    sendReq:function (postData) {
        var plugIn = {
            isAndroid: function (postData) {
                postData = JSON.stringify(postData);
                window.rongcloud.postMessage(postData)
            },
            isiOS: function (postData) {
                window.webkit.messageHandlers.rongcloud.postMessage(postData);
            }
        };

        (platform == 'iOS') ? plugIn.isiOS(postData) : plugIn.isAndroid(postData);
    },
    callback:function (returnData) {
        //alert(JSON.stringify(returnData))
        switch (returnData.action) {
            case 'userLogin':
                this.userLoginCallback(returnData);
                break;
            case 'userLogout':
                this.userLogoutCallback(returnData);
                break;
            case 'setCurrentUserInfo':
                this.setCurrentUserInfoCallback(returnData);
                break;
            case 'getConversationList':
                this.getConversationListCallback(returnData);
                break;
            case 'removeConversation':
                this.removeConversationCallback(returnData);
                break;
            case 'startChat':
                this.startChatCallback(returnData);
                break;
            case 'unreadCount':
                this.unreadCountCallback(returnData);
                break;
            default:
                break;
        }
    }
}