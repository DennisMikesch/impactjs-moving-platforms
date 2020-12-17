/*
	Example for Moving Platforms used in Super Jump Girl
*/

ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'game.levels.Stage01',
    'game.entities.platform-move',
    'game.entities.platform-target',
    'game.entities.player'
)
.defines(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////

InGame = ig.Game.extend({

    gravity: 600,
    player: null,

    init: function() {

        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.SPACE, 'jump');

        this.loadLevel(ig.global['LevelStage01']);
    },

    loadLevel: function(data) {
        this.currentLevel = data;
        this.parent(data);

        this.player = ig.game.getEntitiesByType(EntityPlayer)[0];
    },

    update: function() {

        //////////////////////////////////////////////////
        if (this.player) {
            if (this.player.pos.y > ig.system.height) {
                ig.game.loadLevelDeferred(ig.game.currentLevel);
            }
        }

        //////////////////////////////////////////////////
        this.parent();
    }

});

////////////////////////////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById('canvas');
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';

window.addEventListener('resize', function() {
    if (!ig.system) { return; }

    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
}, false);

//////////////////////////////////////////////////

ig.main('#canvas', InGame, 30, 256, 224, 2);

////////////////////////////////////////////////////////////////////////////////////////////////////

});
