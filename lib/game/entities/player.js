// EntityPlayer

ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function() {

////////////////////////////////////////////////////////////////////////////////////////////////////
EntityPlayer = ig.Entity.extend({

    size: { x: 8, y: 14 },
    offset: { x: 4, y: 2 },
    maxVel: { x: 80, y: 400 },
    friction: { x: 250, y: 0 },
    speed: 200,

    flip: false,
    jump: 300,
    platform: false,

    type: ig.Entity.TYPE.A, // Player friendly group
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,

    animSheet: new ig.AnimationSheet('media/imgPlayer.png', 16, 16),

    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim('idle', 1, [0]);
        this.addAnim('run', 0.07, [6, 7, 8, 9, 10, 11]);
        this.addAnim('jump', 1, [1]);
        this.addAnim('fall', 1, [2]);
    },

    update: function() {
        ////////////////////////////////////////////////// dir
        if (ig.input.state('left')) {
            this.accel.x = -this.speed;
            if (this.standing) {
                this.flip = true;
            }
        } else if (ig.input.state('right')) {
            this.accel.x = this.speed;
            if (this.standing) {
                this.flip = false;
            }
        } else { this.accel.x = 0; }

        ////////////////////////////////////////////////// jump

        if ((this.standing) && ig.input.pressed('jump')) {
            this.vel.y = -this.jump;
            this.falling = false;
        }

        if (!this.standing && !this.falling && !ig.input.state('jump')) {
            this.vel.y = Math.floor(this.vel.y / 2);
            this.falling = true;
        }

        ////////////////////////////////////////////////// animation
        if (this.vel.y < 0 && !this.platform) {
            this.currentAnim = this.anims.jump;
        } else if (this.vel.y > 0 && !this.platform) {
            this.currentAnim = this.anims.fall;
        } else if (this.vel.x != 0) {
            this.currentAnim = this.anims.run;
        } else {
            this.currentAnim = this.anims.idle;
        }
        this.currentAnim.flip.x = this.flip;

        ////////////////////////////////////////////////// move
        this.parent();
        this.platform = false;

        //////////////////////////////////////////////////

        // limit
        this.pos.x = this.pos.x.limit(0, ig.game.collisionMap.pxWidth - this.size.x);
        
        // view
        ig.game.screen.x = (this.pos.x + this.size.x - (ig.system.width / 2))
        .limit(0, ig.game.collisionMap.pxWidth - ig.system.width);

    }

});

////////////////////////////////////////////////////////////////////////////////////////////////////

});
