function decreaseTimer(){
    timerId = setTimeout((decreaseTimer), 1000)
     if(timer > 0){
         timer--;
         document.querySelector("#timer").innerHTML = timer;
     }
     if(timer == 0){
         winner({player, enemy, timerId})
     }
}

function winner({player, enemy, timerId}){
    clearTimeout(timerId)
    if(player.health == enemy.health){
        document.querySelector("#displayWinner").innerHTML = "Tie"
    }else if(player.health > enemy.health){
        document.querySelector("#displayWinner").innerHTML = "Player 1 wins!"
    }else{
        document.querySelector("#displayWinner").innerHTML = "Player 2 wins!"
    }
    document.querySelector("#displayWinner").style.display = "flex"
}

function collisionDetector({
    rectangle1,rectangle2
}){
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}
