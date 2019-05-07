// Enemies our player must avoid
class Enemy {
    constructor(row = 3, speed = 75) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = -150;
        switch(row) {
            case 1: this.y = 220; break;
            case 2: this.y = 135; break;
            case 3: this.y = 50; break;
            default: this.y = 50; break;
        }
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        enemyRandomizer();
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {   
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 300;
    }

    update(dt) {
        //All movement handled in handleInput().
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
    
        if (key === 'left' && this.x > 0) 
            this.x -= 100;
        else if (key === 'right' && this.x < 400)
            this.x += 100;
        else if (key === 'down' && this.y < 350)
            this.y += 90;
        else if (key === 'up' && this.y > 0)
            this.y -= 90;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    new Enemy(1, 200), 
    new Enemy(2, 150), 
    new Enemy(3, 75)
];

function enemyRandomizer() {
    let oldSize = allEnemies.length;
    
    allEnemies = allEnemies.filter(function(enemy) {
        return enemy.x < 530;
    });
    
    if (oldSize != allEnemies.length) {
        const allowedPos = [1, 2, 3];

        let randPos = allowedPos[Math.floor(Math.random()*3)];
        let randSpeed = Math.floor((Math.random() * 135) + 136);
        
        allEnemies.push(new Enemy(randPos, randSpeed));
    }
}

var player = new Player();

function checkCollisions() {
    for (let i = 0; i < allEnemies.length; i++) {
        if (Math.floor(allEnemies[i].x) === Math.floor(player.x)
            && Math.floor(allEnemies[i].y === Math.floor(player.y))) {
            console.log("COLLSION")
        }
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

