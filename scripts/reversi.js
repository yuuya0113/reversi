var board;
var A = "●";
var B = "○";
var p_color = "●";
var c_color = "○";
var rank = 3;
let isRun = false;
let isStart = false;

function newText(text){
	document.getElementById('text8').innerHTML = document.getElementById('text7').innerHTML;
	document.getElementById('text7').innerHTML = document.getElementById('text6').innerHTML;
	document.getElementById('text6').innerHTML = document.getElementById('text5').innerHTML;
	document.getElementById('text5').innerHTML = document.getElementById('text4').innerHTML;
	document.getElementById('text4').innerHTML = document.getElementById('text3').innerHTML;
	document.getElementById('text3').innerHTML = document.getElementById('text2').innerHTML;
	document.getElementById('text2').innerHTML = document.getElementById('text1').innerHTML;
	document.getElementById('text1').innerHTML = text;
}

function str_number(str){
	let num = ["1","2","3","4","5","6","7","8"];
	let cha = ["a","b","c","d","e","f","g","h"];
	return [num.indexOf(str.substr(1,2)),cha.indexOf(str.substr(0,1))];
}

function number_str(x,y){
	let num = ["1","2","3","4","5","6","7","8"];
	let cha = ["a","b","c","d","e","f","g","h"];
	return cha[y]+num[x];
}
function mark(e){
	if(!isRun){
		window.alert("ゲームは終了しています");
		return;
	}else {
		isStart = true;
		document.getElementById('push').value='リセット'
		let [x,y] = [-1,-1];
		if(B == p_color){
			let xy = cp();
			x = xy[0];
			y = xy[1];
		}else{ 
			[x,y] = str_number(e.target.id)
		}
		if(check(x,y,true)){
			newText(`${(A == "●" ? "黒":"白")}が${number_str(x,y)}に置きました。`);
			boardWriter();
			change_turn();
			if(check_pass()){
				change_turn();
				if(check_pass()){
					game_end();
				}else{
					newText(`${(A == "●" ? "白":"黒")}はパスです。`);
				}
			}
			if(isRun){
				if(A == p_color){
					document.getElementById('console').innerHTML = 
					`${(A == "●" ? "黒":"白")}/あなたの番です。石を置く場所をクリックしてください。`;
				}else {
									document.getElementById('console').innerHTML = 
					`${(A == "●" ? "黒":"白")}/相手の番です。盤面をクリックしてください。`;
				}
			}		
			
		}else{
			newText(`${number_str(x,y)}には置くことができません。`)
			}
	}
}

function change_turn(){
	let temp = A;
	A = B;
	B = temp;
}

function check(i,j,rev=false){
    flag = false
	if(board[i][j]=="●"||board[i][j]=="○"){
		return false
	}
	if((i < 7 && 0 < j)&&(board[i+1][j-1] == B)){
		if(reverse(i+1,j-1,1,rev)){
			flag = true;
			if(rev){
				board[i+1][j-1] = A;
			}
		}
	}
	
	if((i < 7)&&(board[i+1][j] == B)){
		if(reverse(i+1,j,2,rev)){
			flag = true;
			if(rev){
				board[i+1][j] = A;
			}
		}
	}
	
	if((i < 7 && j < 7)&&(board[i+1][j+1] == B)){
		if(reverse(i+1,j+1,3,rev)){
			flag = true;
			if(rev){
				board[i+1][j+1] = A;
			}
		}
	}

	if((0 < j)&&(board[i][j-1] == B)){
		if(reverse(i,j-1,4,rev)){
			flag = true;
			if(rev){
				board[i][j-1] = A;
			}
		}
	}

	if((j < 7)&&(board[i][j+1] == B)){
		if(reverse(i,j+1,6,rev)){
			flag = true;
			if(rev){
				board[i][j+1] = A;
			}
		}
	}

	if((0 < i && 0 < j)&&(board[i-1][j-1] == B)){
		if(reverse(i-1,j-1,7,rev)){
			flag = true;
			if(rev){
				board[i-1][j-1] = A;
			}
		}
	}
	
	if((0 < i)&&(board[i-1][j] == B)){
		if(reverse(i-1,j,8,rev)){
			flag = true;
			if(rev){
				board[i-1][j] = A;
			}
		}
	}
	
	if((0 < i && j < 7)&&(board[i-1][j+1] == B)){
		if(reverse(i-1,j+1,9,rev)){
			flag = true;
			if(rev){
				board[i-1][j+1] = A;
			}
		}
	}	
	if(flag && rev){
		board[i][j] = A
	}
	
    return flag
}


function reverse(i,j,vec,rev){
    if     (vec == 1){[i,j]=[i+1,j-1];}
    else if(vec == 2){[i,j]=[i+1,j];}
    else if(vec == 3){[i,j]=[i+1,j+1];}
    else if(vec == 4){ j = j-1;}
    else if(vec == 6){ j = j+1;}
    else if(vec == 7){[i,j]=[i-1,j-1];}
    else if(vec == 8){[i,j]=[i-1,j];}
    else if(vec == 9){[i,j]=[i-1,j+1];}
    
    if(0 <= i && i <= 7 && 0 <= j && j <= 7){
        if(board[i][j] == B){
            if(reverse(i,j,vec,rev)){
				if(rev){
               	 board[i][j] = A;
				}
                return true;
			}
		}
        if(board[i][j] == A){
            return true;
		}
	}
    return false;
}

function boardWriter(){
	for(let xxz = 0; xxz < 8;xxz++){
		for(let yxz = 0; yxz < 8;yxz++){
			ids = number_str(xxz,yxz)
			document.getElementById(ids).innerHTML = board[xxz][yxz];
		}
	}
}

function check_pass(){
	for(let xz = 0; xz < 8; xz++){
		for(let yz = 0; yz < 8; yz++){
			if(check(xz,yz,false)){
				return false;
			}
		}
	}
	return true;
}
function game_end(){
	let w = 0;
	let b = 0;
	for(let x = 0; x < 8;x++){
		for(let y = 0; y < 8;y++){
			if(board[x][y]=="●"){b++;}
			if(board[x][y]=="○"){w++;}
		}
	}
	newText(`[黒：${b}][白：${w}]`);
	if((p_color =="●" && b > w)||(p_color =="○" && w > b)){
		document.getElementById('console').innerHTML = "あなたの勝ちです。";
	}else if(b == w){
		document.getElementById('console').innerHTML = "引き分けです。";
	}else{
		document.getElementById('console').innerHTML = "あなたの負けです。";
	}
	isRun = false;
}

function cp2(ccount=0){
	let max_score = 99;
	let even_count = 1;
	let rx = -1;
	let ry = -1;
    for(let x = 0;x < 8; x++){
        for(let y = 0; y < 8; y++){
            board[x+8][y]=board[x][y]    
		}
	} 
	  
    for(let x = 0;x < 8; x++){
        for(let y = 0; y < 8; y++){
            if(check(x,y,true)){
				change_turn();
				let canput = 0;
				for(let v = 0; v < 8; v++){
					for(let w = 0; w < 8; w++){
						if(check(v,w,false)){
							canput++;
						}
					}
				}
				if(canput < max_score){
					rx = x;
					ry = y;
					max_score = canput;
					even_count = 1;
				}else if(canput == max_score){
					if(Math.random()*(++even_count+1)<1){
						rx = x;
						ry = y;
						max_score = canput;
					}	
				}
			    for(let z1 = 0;z1 < 8; z1++){
      			  for(let z2 = 0; z2 < 8; z2++){
           			 board[z1][z2]=board[z1+8][z2]    
					}
				}
				change_turn();
			}
		}    
	}
    return [rx,ry];
}

function cp(ccount=0){
	ccount++;
	let max_score = -1;
	let even_count = 1;
	let rx = -1;
	let ry = -1;
	if((rank-ccount)%2 ==0){
		max_score = 99;
	}
	let t_board = new Array(8);
		for(let y = 0; y < 8; y++) {
 			t_board[y] = new Array(8).fill("");
		}
    for(let x = 0;x < 8; x++){
        for(let y = 0; y < 8; y++){
            t_board[x][y]=board[x][y];
		}
	}
	
	for(let x = 0;x < 8; x++){
        for(let y = 0; y < 8; y++){
			if(check(x,y,true)){
				change_turn();
				if(rank-ccount==0){
					let can_put = 0;
					for(let xz = 0;xz < 8; xz++){
						for(let yz = 0; yz < 8; yz++){
							if(xz,yz,false){
								can_put++
							}
						}
					}
					
					if(can_put < max_score){
						rx = x;
						ry = y;
						max_score = can_put;
						even_count = 1;
					}else if(can_put == max_score){
						if(Math.random()*(++even_count+1)<1){
							rx = x;
							ry = y;
							max_score = can_put;
						}
					}
				} else {
					xyz = cp(ccount)
					if((rank-ccount) % 2 == 0 && xyz[2] < max_score
					 ||(rank-ccount) % 2 != 0 && xyz[2] > max_score){
						rx = x;
						ry = y;
						max_score = xyz[2];
						even_count = 1;
					}else if(xyz[2] == max_score){
						if(Math.random()*(++even_count+1)<1){
							rx = x;
							ry = y;
							max_score = xyz[2];
						}
					}
				}

				for(let xz = 0;xz < 8; xz++){
					for(let yz = 0; yz < 8; yz++){
           			 board[xz][yz]=t_board[xz][yz];
					}
				}
			change_turn();
			}
		}
	}
	return [rx,ry,max_score]
}


function push(){
	if(!isStart){
		[p_color,c_color]=[c_color,p_color];
		document.getElementById('push').value='リセット'
		isStart = true;
		document.getElementById('console').innerHTML = "黒/相手の番です。盤面をクリックしてください。";
	}else{
		newText("リセットしました。");
		board = new Array(8+(rank)*8);
		for(let y = 0; y < board.length; y++) {
 			board[y] = new Array(8).fill("");
		}
		board[3][3] = "●";
		board[4][4] = "●";
		board[3][4] = "○";
		board[4][3] = "○";
		A = "●";
		B = "○";
		p_color = "●";
		c_color = "○";
		isRun = true;
		document.getElementById('push').value='白で開始';
		document.getElementById('console').innerHTML = "黒/あなたの番です。石を置く場所をクリックしてください。";
		boardWriter();
		isStart = false;
	}
}



window.addEventListener("DOMContentLoaded", function(){
	document.getElementById('a1').addEventListener('click', mark);
	document.getElementById('b1').addEventListener('click', mark);
	document.getElementById('c1').addEventListener('click', mark);
	document.getElementById('d1').addEventListener('click', mark);
	document.getElementById('e1').addEventListener('click', mark);
	document.getElementById('f1').addEventListener('click', mark);
	document.getElementById('g1').addEventListener('click', mark);
	document.getElementById('h1').addEventListener('click', mark);
	
	document.getElementById('a2').addEventListener('click', mark);
	document.getElementById('b2').addEventListener('click', mark);
	document.getElementById('c2').addEventListener('click', mark);
	document.getElementById('d2').addEventListener('click', mark);
	document.getElementById('e2').addEventListener('click', mark);
	document.getElementById('f2').addEventListener('click', mark);
	document.getElementById('g2').addEventListener('click', mark);
	document.getElementById('h2').addEventListener('click', mark);
	
	document.getElementById('a3').addEventListener('click', mark);
	document.getElementById('b3').addEventListener('click', mark);
	document.getElementById('c3').addEventListener('click', mark);
	document.getElementById('d3').addEventListener('click', mark);
	document.getElementById('e3').addEventListener('click', mark);
	document.getElementById('f3').addEventListener('click', mark);
	document.getElementById('g3').addEventListener('click', mark);
	document.getElementById('h3').addEventListener('click', mark);
	
	document.getElementById('a4').addEventListener('click', mark);
	document.getElementById('b4').addEventListener('click', mark);
	document.getElementById('c4').addEventListener('click', mark);
	document.getElementById('d4').addEventListener('click', mark);
	document.getElementById('e4').addEventListener('click', mark);
	document.getElementById('f4').addEventListener('click', mark);
	document.getElementById('g4').addEventListener('click', mark);
	document.getElementById('h4').addEventListener('click', mark);
	
	document.getElementById('a5').addEventListener('click', mark);
	document.getElementById('b5').addEventListener('click', mark);
	document.getElementById('c5').addEventListener('click', mark);
	document.getElementById('d5').addEventListener('click', mark);
	document.getElementById('e5').addEventListener('click', mark);
	document.getElementById('f5').addEventListener('click', mark);
	document.getElementById('g5').addEventListener('click', mark);
	document.getElementById('h5').addEventListener('click', mark);
	
	document.getElementById('a6').addEventListener('click', mark);
	document.getElementById('b6').addEventListener('click', mark);
	document.getElementById('c6').addEventListener('click', mark);
	document.getElementById('d6').addEventListener('click', mark);
	document.getElementById('e6').addEventListener('click', mark);
	document.getElementById('f6').addEventListener('click', mark);
	document.getElementById('g6').addEventListener('click', mark);
	document.getElementById('h6').addEventListener('click', mark);
	
	document.getElementById('a7').addEventListener('click', mark);
	document.getElementById('b7').addEventListener('click', mark);
	document.getElementById('c7').addEventListener('click', mark);
	document.getElementById('d7').addEventListener('click', mark);
	document.getElementById('e7').addEventListener('click', mark);
	document.getElementById('f7').addEventListener('click', mark);
	document.getElementById('g7').addEventListener('click', mark);
	document.getElementById('h7').addEventListener('click', mark);
	
	document.getElementById('a8').addEventListener('click', mark);
	document.getElementById('b8').addEventListener('click', mark);
	document.getElementById('c8').addEventListener('click', mark);
	document.getElementById('d8').addEventListener('click', mark);
	document.getElementById('e8').addEventListener('click', mark);
	document.getElementById('f8').addEventListener('click', mark);
	document.getElementById('g8').addEventListener('click', mark);
	document.getElementById('h8').addEventListener('click', mark);
	
	isRun = true;
	board = new Array(8);
		for(let y = 0; y < board.length; y++) {
 			board[y] = new Array(8).fill("");
		}
	board[3][3] = "●";
	board[4][4] = "●";
	board[3][4] = "○";
	board[4][3] = "○";
})