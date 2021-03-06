var DevilPace = DevilPace || {};

DevilPace.preload = {
    preload: function () {
        var game = this.game;

        var loading = game.add.text(240, 360, 'Loading...', {font: '40pt Arial', fill: '#fff'});
        loading.anchor.set(0.5);

        game.load.image('dude', 'asset/img/dude.png');
        game.load.image('balloon', 'asset/img/balloon.png');
        game.load.image('view', 'asset/img/view.png');
        game.load.image('tree', 'asset/img/tree.png');
        game.load.image('short-tree', 'asset/img/short-tree.png');
        game.load.image('cloud', 'asset/img/cloud.png');
        game.load.image('big-cloud', 'asset/img/big-cloud.png');
        game.load.image('sym-cloud', 'asset/img/sym-cloud.png');
        game.load.image('dialog-1', 'asset/img/dialog-1.png');
        game.load.image('dialog-2', 'asset/img/dialog-2.png');
        game.load.spritesheet('button-1', 'asset/img/button-1.png', 140, 54);
        game.load.spritesheet('button-2', 'asset/img/button-2.png', 140, 54);
        game.load.image('mask', 'asset/img/mask.png');
        game.load.image('popup', 'asset/img/popup.png');
        game.load.image('portrait', 'asset/img/portrait.png');
        game.load.image('portrait-colorful', 'asset/img/portrait-colorful.png');
        game.load.image('slogan', 'asset/img/slogan.png');
        game.load.image('addition', 'asset/img/addition.png');
    },
    create: function () {
        this.state.start('play');
    }
};
