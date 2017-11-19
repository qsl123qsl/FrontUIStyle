/**
 * 自定义弹出框
 * 第一个参数，消息  
 * 第二个参数，关闭
 */
var t;
function show_error_tips(msg,close_time,callback){
    clearTimeout(t);
    hide_error_tips();
    
    if(!close_time){close_time=3;}
    var windowHeight = document.documentElement.clientHeight;
    var warpTop = windowHeight/2+jQuery(document).scrollTop();
    var error_dialog = '<div class="simple-dialog-shilin" style="position: absolute;top:'+warpTop+'px;width: 100%;text-align: center;z-index: 99999;opacity:0.6;">';
    error_dialog += '<div style="width: 90%;background-color: black;min-height: 40px;line-height: 40px;margin-left: auto;margin-right: auto;border-radius: 10px;">';
    error_dialog += '<label style="color: white;font-size: 12px;">'+msg+'</label>';
    error_dialog += '</div>';
    error_dialog += '</div>';
    $("body").append(error_dialog);
    t = setTimeout("hide_error_tips("+callback+")",close_time*1000);
}

function hide_error_tips(callback){
    $('.simple-dialog-shilin').remove();
    if(callback&&jQuery.isFunction(callback)){
        callback();
    }
}
