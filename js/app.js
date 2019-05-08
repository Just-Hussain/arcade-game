// Enemies our player must avoid
class Enemy {
    constructor(row = 3, speed = 75) {

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
        this.col = -1;
        this.row = row;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        
        enemyRandomizer();
        
        if (this.x > -70 && this.x < 10) {
            this.col = 1;
        }
        else if (this.x > 10 && this.x < 120) {
            this.col = 2;
        }
        else if (this.x > 120 && this.x < 220) {
            this.col = 3;
        }
        else if (this.x > 220 && this.x < 320) {
            this.col = 4;
        }
        else if (this.x > 320 && this.x < 500) {
            this.col = 5;
        }
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

class Player {   
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 300;
        this.row = 0;
        this.col = 3;
    }

    update(dt) {
        //All movement handled in handleInput(), does not depend on dt.
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
    
        if (key === 'left' && this.x > 0) {
            this.x -= 100;
            this.col--;
        }
        else if (key === 'right' && this.x < 400) {
            this.x += 100;
            this.col++;
        }
        else if (key === 'down' && this.y < 350) {
            this.y += 90;
            this.row--;
        }
        else if (key === 'up' && this.y > 0) {
            this.y -= 90;
            this.row++;
        }
        
        // Top row, water.
        if (this.y === -60) {
            if (confirm("YOU WON! restart by clicking ok!")) {
                this.reset();
            }
        }
    }

    // Resets by positioning the player back to start.
    reset() {
        this.x = 200;
        this.y = 300;
        this.row = 0;
        this.col = 3;
    }
}

/* Top row before water is 3, then 2, then 1 */
var allEnemies = [
    new Enemy(3, 200), 
    new Enemy(2, 150), 
    new Enemy(1, 75)
];

/* Random generatinig by filtering enimes outside of screen and adding a new one
 * With random attributes.
 */
function enemyRandomizer() {
    let oldSize = allEnemies.length;
    
    allEnemies = allEnemies.filter(function(enemy) {
        return enemy.x < 530;
    });
    
    if (oldSize != allEnemies.length) {
        let randPos = Math.floor(Math.random()*3)+1;
        let randSpeed = Math.floor((Math.random() * 150) + 151);
        
        allEnemies.push(new Enemy(randPos, randSpeed));
    }
}

var player = new Player();

function checkCollisions() {
    for (let i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].row === player.row && allEnemies[i].col === player.col) {
            player.reset();
        }
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


