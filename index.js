const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
c.fillRect(0,0, canvas.width, canvas.height);

const gravity = 0.5





const player = new Fighter({
    position: {
    x : 0,
    y : 0,
   },
   velocity : {
       x : 0,
       y : 0,
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc : './assets/samuraiMack/Idle.png',
    framesMax : 8,
    scale : 2.5,
    offset : {
        x : 215,
        y : 207
    },
    sprites:{
        idle:{
            imageSrc : './assets/samuraiMack/Idle.png',
            framesMax : 8,
        },
        run:{
            imageSrc : './assets/samuraiMack/Run.png',
            framesMax : 8,
        },
        jump:{
            imageSrc : './assets/samuraiMack/Jump.png',
            framesMax : 2,        
        },
        fall :{
            imageSrc : './assets/samuraiMack/Fall.png',
            framesMax : 2,           
        },
        attack1: {
            imageSrc : './assets/samuraiMack/Attack1.png',
            framesMax : 6,    
        }
    },
    attackBox: {
        offset:{
            x : 0,
            y : 0
        },
        width : 100,
        height : 50
    }
})
const enemy = new Fighter({
    position: {
    x : 650,
    y : 0,
   },
   velocity : {
       x : 0,
       y : 0,
    },
    offset: {
        x: -50,
        y: 0
    },
    imageSrc : './assets/kenji/Idle.png',
    framesMax : 4,
    scale : 2.5,
    offset : {
        x : 215,
        y : 220
    },
    sprites:{
        idle:{
            imageSrc : './assets/kenji/Idle.png',
            framesMax : 4,
        },
        run:{
            imageSrc : './assets/kenji/Run.png',
            framesMax : 8,
        },
        jump:{
            imageSrc : './assets/kenji/Jump.png',
            framesMax : 2,        
        },
        fall :{
            imageSrc : './assets/kenji/Fall.png',
            framesMax : 2,           
        },
        attack1: {
            imageSrc : './assets/kenji/Attack1.png',
            framesMax : 4,    
        }
    },
    attackBox: {
        offset:{
            x : 0,
            y : 0
        },
        width : 100,
        height : 50
    }
})

const background = new Sprite({
    position :{
        x : 0,
        y : 0
    },
    imageSrc : './assets/background.png'
})

const shop = new Sprite({
    position :{
        x : 600,
        y : 129
    },
    imageSrc : './assets/shop.png',
    scale : 2.75, 
    framesMax : 6
})











let timer = 60;
let timerId;


decreaseTimer()
function animate(){
    window.requestAnimationFrame(animate)

    console.log(player.position.y)
    console.log(player.velocity.y)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update();
    shop.update();
    player.update();
    enemy.update();
    //player movement
    player.velocity.x = 0
    if(keys.q.pressed){
        player.velocity.x = -5
        player.switchSprite('run')
    }else if(keys.d.pressed){
        player.velocity.x = 5
        player.switchSprite('run')
    }else{
        player.switchSprite('idle')    
    }
    if(player.velocity.y < 0){
        player.switchSprite('jump')

    }else if(player.velocity.y > 0){
        player.switchSprite('fall')
    }
    //enemy movement
    enemy.velocity.x = 0
    if(keys.ArrowLeft.pressed){
        enemy.velocity.x = -5
        enemy.switchSprite('run')

    }else if(keys.ArrowRight.pressed){
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }else{
        enemy.switchSprite('idle')    
    }

    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')

    }else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }


    //detect collision
    if(collisionDetector({
        rectangle1: player,
        rectangle2: enemy
    })&& player.isAttacking){
        console.log("Player 1 attacked")
        enemy.health -= 10;
        document.querySelector("#enemyHealth").style.width = `${enemy.health}%`
        player.isAttacking = false
        enemy.velocity.y = 0
    }
    if(collisionDetector({
        rectangle1: enemy,
        rectangle2: player
    })&& enemy.isAttacking){
        console.log("Player 2 attacked")
        enemy.isAttacking = false
        player.health -= 10;
        document.querySelector("#playerHealth").style.width = `${player.health}%`
        player.velocity.y = 0
    }

    if(player.health<=0 || enemy.health<=0){
        winner({player, enemy, timerId})
    }
    
    
    


}
const keys = {
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },

    ArrowLeft: {
        pressed : false
    },
    ArrowRight: {
        pressed : false
    }
}

animate()

window.addEventListener('keydown',(event)=>{
    switch(event.key){
        case "q" : keys.q.pressed = true; 
        break;
        case "d" : keys.d.pressed = true;
        break;
        case "z" : player.velocity.y = -15;
        break;
        case "ArrowLeft" : keys.ArrowLeft.pressed = true; 
        break;
        case "ArrowRight" : keys.ArrowRight.pressed = true;
        break;
        case "ArrowUp" : enemy.velocity.y = -15;
        break;
        case " " : player.attack();
        break;
        case "ArrowDown" : enemy.attack();

     }
})
window.addEventListener('keyup',(event)=>{
    switch(event.key){
        case "q" : keys.q.pressed = false; 
        break;
        case "d" : keys.d.pressed = false;
        break;
        case "ArrowLeft" : keys.ArrowLeft.pressed = false;
        break;
        case "ArrowRight" : keys.ArrowRight.pressed = false;
     }
})