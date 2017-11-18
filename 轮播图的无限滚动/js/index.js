    $(function() {
        animate($('#circle_company'),15,25000,10);
        animate($('#circle_employee'),15,25000,10);
    });


    // 无限滚动
    function animate(obj,margin,time,interval){

        var screenWidth = $('body').width();
        var items = obj.find('li');
        var singleWidth = $(items.get(0)).width() + margin;
        var time = time  //位移总时间
        var interval = interval;//位移间隔时间
        var actualWidth = items.length * singleWidth; //位移总距离
        var speed = actualWidth / (time/interval);//位移速度

        var add = Math.ceil(screenWidth / singleWidth);

        if( add > items.length) return false;

        for( var i = 0; i < add; i++){
            $(obj).append(items.get(i).outerHTML);
        }

        var left = parseInt($(obj).css('left'));

        setInterval(go,interval);

        function go(){
            if( left + actualWidth > 0){
                left = left - speed;
                $(obj).css('left', left + 'px');
            }else{
                left = 0;
                $(obj).css('left', left + 'px');
            }
            
        }
    }