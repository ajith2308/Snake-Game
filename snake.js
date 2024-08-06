let inputdirect={x:0,y:0};
const foodAudio=new Audio('food.mp3');
const gameoverAudio=new Audio("gameover.mp3");
const moveSound=new Audio("move.mp3");
const musicSound=new Audio("music.mp3");
let lasttime=0;
let speed= 5;
let snakearr=[
    {x:14,y:16}
];
let score=0;
let food ={x:12,y:4};







function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lasttime)/1000<1/speed){
        return;
    }
    lasttime=ctime;
    game();
    
}
//error wala game end kab hoga
function iscollide(snake){
    for(let i=1;i<snake.length ;i++){
        if(snake[0].x===snake[i].x &&snake[0].y===snake[i].y){
            return true;
        }
    }
    if(snake[0].x>=20 || snake[0].x<=0 || snake[0].y <=0 ||snake[0].y >=20 ){
        return true;
    }
}
function game(){
   // musicSound.play();
//part1 update food and head ->
if(iscollide(snakearr)){
    scorebox.innerHTML="Score:"+0;
    gameoverAudio.play();
    musicSound.pause();
    inputdirect={x:0,y:0};
    alert("game end you lose PRESS any key to restart");
    
    let a=2;
    let b=16;
    snakearr=[
        {x:1+Math.round(a+(b-a)*Math.random()),y: 1+Math.round(a+(b-a)*Math.random())}
    ];
    //musicSound.play();
    
}

//food khaa liya then

if(snakearr[0].x===food.x && snakearr[0].y===food.y){
    score+=1;
    scorebox=document.querySelector("#scorebox");
    scorebox.innerHTML= "Score:"+score;
    foodAudio.play();
    snakearr.unshift({x:snakearr[0].x+inputdirect.x,y:snakearr[0].y + inputdirect.y});
    let a=2;
    let b=15;
    food={x:2+Math.round(a+(b-a)*Math.random()),y: 2+Math.round(a+(b-a)*Math.random())};

}
//moving
for(let i=snakearr.length-2;i>=0;i--){
    snakearr[i+1]={...snakearr[i]};
} 

//last me head konsi jagha jayega jaha dir move karnge
snakearr[0].x +=inputdirect.x;
snakearr[0].y +=inputdirect.y;


//part2 head->
let board=document.querySelector("#board");
board.innerHTML="";
snakearr.forEach((e,index)=>{
     let snakee=document.createElement('div');
    snakee.style.gridRowStart=e.y;
    snakee.style.gridColumnStart=e.x;
   
    if(index===0){
        snakee.classList.add("head");
    }
    else{
        snakee.classList.add("bodyyy");
    }
    board.appendChild(snakee);
})


//part  food-> 
    let food1=document.createElement('div');
    food1.style.gridRowStart=food.y;
    food1.style.gridColumnStart=food.x;
    food1.classList.add("food");
    board.appendChild(food1);



}

window.requestAnimationFrame(main);

window.addEventListener('keydown',(e=>{
    inputdirect={x:0,y:0};
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputdirect.x=0;
            inputdirect.y=-1 ;
            break;
        case "ArrowDown":
            inputdirect.x= 0;
            inputdirect.y=1 ;
            break;
        case "ArrowLeft":
            inputdirect.x= -1;
            inputdirect.y= 0;
            break;
        case "ArrowRight":
            inputdirect.x= 1;
            inputdirect.y= 0;
            break;

        default:
            break;

    }
}))
