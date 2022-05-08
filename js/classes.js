class Sprite {
    constructor({position , imageSrc, scale = 1, framesMax = 1,  offset = {x : 0, y : 0}}){
        this.position = position;
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.currentFrame = 0
        this.framesElapsed = 0
        this.framesHold = 10 
        this.offset = offset
    }
    draw(){
        c.drawImage(
            this.image,
            this.currentFrame * (this.image.width/this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
            )
    }
    animateFrames(){
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold == 0){
        if(this.currentFrame < this.framesMax -1)
        this.currentFrame++
        else
        this.currentFrame = 0
     }
    }
    update(){
        this.draw();
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold == 0){
        if(this.currentFrame < this.framesMax -1)
        this.currentFrame++
        else
        this.currentFrame = 0
      }
    }

}



class Fighter extends Sprite{
    constructor({ position, velocity, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}, sprites, attackBox = {offset : {}, width: undefined, height:undefined}}){
        super({
            imageSrc,
            scale,
            framesMax,
            position,
            offset,
        })
        this.velocity = velocity;
        this.height = 150
        this.width = 50
        this.isAttacking = false
        this.health = 100;
        this.currentFrame = 0
        this.framesElapsed = 0
        this.framesHold = 5 
        this.sprites = sprites
        this.color = "red"
        this.attackBox = {
            position:{
                x: this.position.x,
                y: this.position.y
            },
            width: attackBox.width,
            height: attackBox.height,
            offset : attackBox.offset,
        }
        for(let sprite in this.sprites){
           this.sprites[sprite].image = new Image()
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc
        }
    }
    

    update(){
        
        this.draw();
        this.animateFrames()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        //gravity
        if(this.position.y + this.health + this.velocity.y >= canvas.height - 96){
            this.velocity.y = 0
            this.position.y = 380
        }else{
            this.velocity.y += gravity
        }


    }
    attack(){
        this.switchSprite('attack1')
        this.isAttacking = true
        setTimeout(()=>{
            this.isAttacking = false
        }, 100)
    }
    switchSprite(sprite){
        if(this.image === this.sprites.attack1.image && this.currentFrame < this.sprites.attack1.framesMax - 1)
        return;
        switch(sprite){
            case 'idle': 
                if(this.image != this.sprites.idle.image){
                    this.framesMax = this.sprites.idle.framesMax
                    this.image = this.sprites.idle.image;
                    this.currentFrame = 0
                }
                    break;
            case 'run' : 
                if(this.image!= this.sprites.run.image){
                    this.framesMax = this.sprites.run.framesMax
                    this.image = this.sprites.run.image
                    this.currentFrame = 0
                }
                break;
            case 'jump': 
            if(this.image!= this.sprites.jump.image){
                this.framesMax = this.sprites.jump.framesMax
                this.image = this.sprites.jump.image
                this.currentFrame = 0
            }
                break;
            case 'fall':
                if(this.image != this.sprites.fall.image){
                    this.framesMax = this.sprites.fall.framesMax
                    this.image = this.sprites.fall.image
                    this.currentFrame = 0
                }
                break;

            case 'attack1':
                if(this.image != this.sprites.attack1.image){
                    this.framesMax = this.sprites.attack1.framesMax
                    this.image = this.sprites.attack1.image
                    this.currentFrame = 0
                }
                 break;
        }
    }
}

