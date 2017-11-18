    var me = true;
    var over = false;//此棋局是否结束
    var chessBoard = [];//棋盘的坐标数组，统计每个位置是否落子，并且落得是白子还是黑子
    var chess = document.getElementById('chess');
    var context = chess.getContext('2d');

    for(var i = 0; i< 15; i++){
        chessBoard[i] = [];
        for(var j = 0; j < 15; j++){
            chessBoard[i][j] = 0;
        }
    }

    //赢法数组
    var wins = [];
    for(var i = 0; i< 15; i++){
        wins[i] = [];
        for(var j = 0; j < 15; j++){
            wins[i][j] = [];
        }
    }
    var count = 0;//赢法数量

    //横行的赢法
    for(var i = 0; i< 15; i++){
        for(var j = 0; j < 11; j++){
            for(var k = 0; k < 5; k++){
                wins[i][j+k][count] = true;
            }
            count++;
        }
    }
    //竖行的赢法
    for(var i = 0; i< 15; i++){
        for(var j = 0; j < 11; j++){
            for(var k = 0; k < 5; k++){
                wins[j+k][i][count] = true;
            }
            count++;
        }
    }
    //正斜线的赢法
    for(var i = 0; i< 11; i++){
        for(var j = 0; j < 11; j++){
            for(var k = 0; k < 5; k++){
                wins[i+k][j+k][count] = true;
            }
            count++;
        }
    }
    //反斜线的赢法
    for(var i = 0; i< 11; i++){
        for(var j = 14; j > 3; j--){
            for(var k = 0; k < 5; k++){
                wins[i+k][j-k][count] = true;
            }
            count++;
        }
    }

    //赢法统计数组
    var myWin = [];//我方
    var computerWin = [];//计算机

    for(var i = 0; i < count; i++){
        myWin[i] = 0;
        computerWin[i] = 0;
    }

    context.strokeStyle = '#BFBFBF';

    var logo = new Image();
    logo.src = 'images/bg-qi.png';
    logo.onload = function(){
        context.drawImage(logo,0,0,450,450);
        drawChessBoard();
    }
    

    //画棋盘
    var drawChessBoard = function(){
        for(var i=0; i< 15; i++){
            context.moveTo(15,15+i*30);
            context.lineTo(435,15+i*30);
            context.stroke();

            context.moveTo(15+i*30,15);
            context.lineTo(15+i*30,435);
            context.stroke();
        }
    }

    //下一步棋，落子
    var oneStepChess = function(i, j, me){
        context.beginPath();
        context.arc(15 + i*30, 15 + j*30, 13, 0, 2 * Math.PI);
        context.closePath();


        var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 -2, 13, 15 + i*30 + 2, 15 + j*30 -2, 0);

        if(me){
            gradient.addColorStop(0,'#0A0A0A');
            gradient.addColorStop(1,'#636766');
        }else{
            gradient.addColorStop(0,'#D1D1D1');
            gradient.addColorStop(1,'#F9F9F9');
        }
        
        context.fillStyle = gradient;
        context.fill();

    }

    //落子触发事件
    chess.onclick = function(e){
        if(over) return;
        if(!me) return;
        var x = e.offsetX;
        var y = e.offsetY;

        var i = Math.floor(x/30);
        var j = Math.floor(y/30);

        if(chessBoard[i][j] === 0){
            oneStepChess(i,j,me);
            chessBoard[i][j] = 1;

            for(var k = 0; k < count; k++){
                if(wins[i][j][k]){
                    myWin[k]++;
                    computerWin[k] = 6;
                    if(myWin[k] == 5){
                        alert('帅哥，你赢了！');
                        over = true;
                    }
                }
            }

            if(!over){
                me = !me;
                computerAI();
            }
        }
        
    }


    //计算机分析计算最佳的落子位置
    var computerAI = function(){
        var myScore = [];
        var computerScore = [];
        var max = 0;
        var u = 0 ; v = 0;

        for(var i = 0; i< 15; i++){
            myScore[i] = [];
            computerScore[i] = [];
            for(var j = 0; j < 15; j++){
                myScore[i][j] = 0;
                computerScore[i] = [];
            }
        }

        for(var i=0; i<15; i++){
            for(var j=0;j<15;j++){
                if(chessBoard[i][j] == 0){
                    for(var k=0;k<count;k++){
                        if(wins[i][j][k]){
                            switch(myWin[k]){
                                case 1:
                                myScore[i][j] += 200;
                                break;
                                case 2:
                                myScore[i][j] += 400;
                                break;
                                case 3:
                                myScore[i][j] += 2000;
                                break;
                                case 4:
                                myScore[i][j] += 10000;
                                break;
                            }
                            switch(computerWin[k]){
                                case 1:
                                computerScore[i][j] += 220;
                                break;
                                case 2:
                                myScore[i][j] += 430;
                                break;
                                case 3:
                                myScore[i][j] += 2100;
                                break;
                                case 4:
                                myScore[i][j] += 20000;
                                break;
                            }
                        }
                    }

                    if(myScore[i][j] > max){
                        max = myScore[i][j];
                        u = i;
                        v = j;
                    }else if(myScore[i][j] == max){
                        if(computerScore[i][j] > computerScore[u][v]){
                            u = i;
                            v= j;
                        }
                    }

                    if(computerScore[i][j] > max){
                        max = myScore[i][j];
                        u = i;
                        v = j;
                    }else if(computerScore[i][j] == max){
                        if(myScore[i][j] > myScore[u][v]){
                            u = i;
                            v= j;
                        }
                    }
                }
            }
        }

        oneStepChess(u,v,false);
        chessBoard[u][v] = 2;

        for(var k = 0; k < count; k++){
            if(wins[u][v][k]){
                myWin[k] = 6;
                computerWin[k]++;
                if(computerWin[k] == 5){
                    alert('计算机赢了！');
                    over = true;
                }
            }
        }

        if(!over){
            me = !me;
        }

    }