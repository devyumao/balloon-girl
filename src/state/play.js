var DevilPace = DevilPace || {};

(function () {

    var cloud1;
    var cloud2;
    var cloud3;
    var cloud4;
    var cloud5;
    var bigCloud;
    var fontFamily = '"Helvetica Neue", Helvetica, STHeiTi, sans-serif';

    DevilPace.play = {
        preload: function () {
        },

        create: function () {
            var game = this.game;

            game.world.setBounds(0, -800, 480, 1600);

            cloud1 = game.add.image(150, -650, 'cloud');
            cloud2 = game.add.image(-150, -180, 'sym-cloud');
            cloud3 = game.add.image(180, 60, 'cloud');
            cloud3.scale.set(0.6);
            cloud4 = game.add.image(340, 160, 'sym-cloud');
            cloud4.scale.set(0.65);
            cloud5 = game.add.image(-20, 330, 'cloud');
            cloud5.scale.set(0.7);

            var view = game.add.image(0, 580, 'view');
            var shortTree = game.add.image(300, 560, 'short-tree');
            var tree = game.add.image(414, 495, 'tree');

            var dude = game.add.image(330, 530, 'dude');
            game.camera.follow(dude);
            // for debug
            var upDuration = 8000;
            var upDelay = 1000;
            // var upDuration = 1;
            // var upDelay = 1;
            var tweenDudeUp = game.add.tween(dude).to({y: -500}, upDuration, Phaser.Easing.Quadratic.InOut, false, upDelay);
            var tweenDude = game.add.tween(dude).to({y: '30'}, 1500, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);

            var balloon = game.add.image(-60, -960, 'balloon');
            var tweenBalloon = game.add.tween(balloon).to({y: '20'}, 1800, Phaser.Easing.Sinusoidal.InOut, false, 0, -1, true);

            bigCloud = game.add.image(0, -850, 'big-cloud');

            // dialogs
            var dialog1 = game.add.image(345, -313, 'dialog-1');
            dialog1.scale.set(0);
            dialog1.alpha = 0.6;
            dialog1.anchor.set(1, 0.3);
            var tweenDialog1 = game.add.tween(dialog1.scale).to({x: 1, y: 1}, 600, Phaser.Easing.Back.Out, false, 500);

            var dlg1Style = {font: '14pt ' + fontFamily, fill: '#333'};
            var dlg1Content = 'I’ve been wanting to meet you.\nWould you be my friend?';
            var dlg1Text = game.add.text(55, -320, '', dlg1Style);
            dlg1Text.lineSpacing = 15;
            dlg1Text.alpha = 0.6;

            var dialog2 = game.add.image(160, -490, 'dialog-2');
            dialog2.scale.set(0);
            dialog2.alpha = 0.6;
            dialog2.anchor.set(0, 1);
            var tweenDialog2 = game.add.tween(dialog2.scale).to({x: 1, y: 1}, 600, Phaser.Easing.Back.Out, false, 1000);

            var addition = game.add.image(205, -255, 'addition');
            addition.scale.set(0);
            addition.anchor.set(0.5, 0);
            var showAddition = game.add.tween(addition.scale)
                .to({x: 0.35, y: 0.35}, 500, Phaser.Easing.Back.Out, false, 1000);

            // buttons
            var onClick = function () {
                tweenMask.start();
                mask.inputEnabled = true;
            };
            var button1 = game.add.button(265, -623, 'button-1', onClick, this, 1, 0, 1);
            var button2 = game.add.button(265, -553, 'button-2', onClick, this, 1, 0, 1);
            [button1, button2].forEach(function (button) {
                button.alpha = 0.8;
                button.anchor.set(0.5);
                button.scale.set(0);
            });
            var tweenButton1 = game.add.tween(button1.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Back.Out, false);
            var tweenButton2 = game.add.tween(button2.scale).to({x: 1, y: 1}, 500, Phaser.Easing.Back.Out, false);

            // mask
            var mask = game.add.image(0, -800, 'mask');
            mask.scale.set(game.world.width, game.world.height);
            mask.alpha = 0;
            var tweenMask = game.add.tween(mask).to({alpha: 0.6}, 500, Phaser.Easing.Quadratic.InOut, false);

            // var card = game.add.image(game.world.width/2, -500, 'card');
            // card.anchor.set(0.5);
            // card.alpha = 0;
            // var tweenCard = game.add.tween(card).to({alpha: 0.8}, 500, Phaser.Easing.Quadratic.InOut, false);

            // popup
            var popup = game.add.image(40, -675, 'popup');
            popup.anchor.set(0, 0);
            popup.alpha = 0;
            var showPopup = game.add.tween(popup)
                .to({alpha: 1}, 500, Phaser.Easing.Quadratic.Out);
            var popupConfig = [
                {
                    text: '我',
                    fill: '#aaa'
                },
                {
                    text: '愿意',
                    fill: '#aaa'
                },
                {
                    text: '陪伴你',
                    fill: '#aaa'
                },
                {
                    text: '哭得像个孩子',
                    fill: '#ff9494'
                }
            ];
            var popupTexts = [];
            var popupTextCount = popupConfig.length;

            showPopup.onComplete.add(function () {
                popupConfig.forEach(function (config, index) {
                    var text = game.add.text(
                        40, 80 + 100 * index,
                        config.text,
                        {
                            font: 'bold 50px ' + fontFamily,
                            fill: config.fill
                        }
                    );
                    text.alpha = 0;
                    popupTexts.push(text);
                    popup.addChild(text);
                    var show = game.add.tween(text)
                        .to({alpha: 1}, 1000, Phaser.Easing.Quadratic.Out, false, 300 + index * 2000);
                    if (index === popupTextCount - 1) {
                        show.onComplete.add(function () {
                            popupTexts.forEach(hideTexts);
                        });
                    }
                    show.start();
                });
            });

            function hideTexts() {
                popupTexts.forEach(function (text, index) {
                    var hide = game.add.tween(text)
                        .to({alpha: 0}, 1000, Phaser.Easing.Quadratic.In, false, 1000);
                    if (index === popupTextCount - 1) {
                        hide.chain(showPortrait);
                    }
                    hide.start();
                });
            }

            var portrait = game.add.image(popup.width / 2, 65, 'portrait');
            portrait.anchor.set(0.5, 0);
            portrait.scale.set(0.7);
            portrait.alpha = 0;
            popup.addChild(portrait);
            var showPortrait = game.add.tween(portrait)
                .to({alpha: 1}, 1000, Phaser.Easing.Quadratic.Out, false);
            showPortrait.onComplete.add(function () {
                showColor.start();
            });

            var colorful = game.add.image(popup.width / 2, 65, 'portrait-colorful');
            colorful.anchor.set(0.5, 0);
            colorful.scale.set(0.7);
            colorful.alpha = 0;
            popup.addChild(colorful);
            var showColor = game.add.tween(colorful)
                .to({alpha: 1}, 2500, Phaser.Easing.Quadratic.Out, false, 1000);
            showColor.onComplete.add(function () {
                showSlogan.start();
            });

            var slogan = game.add.image(popup.width / 2, 430, 'slogan');
            slogan.anchor.set(0.5, 0);
            slogan.scale.set(0.7);
            slogan.alpha = 0;
            popup.addChild(slogan);
            var showSlogan = game.add.tween(slogan)
                .to({alpha: 1}, 1000, Phaser.Easing.Quadratic.Out, false, 200);


            // function 

            // tweens
            tweenDudeUp.chain(tweenDude);
            tweenDudeUp.onComplete.add(function () {
                tweenDialog1.start();
            });
            (function () {
                var index = 0;
                var length = dlg1Content.length;
                tweenDialog1.onComplete.add(function () {
                    game.time.events.repeat(80, length, function () {
                        dlg1Text.setText(dlg1Content.substr(0, ++index));
                        if (index === length) {
                            showAddition.start();
                        }
                    });
                });
            })();
            showAddition.chain(tweenDialog2);
            tweenDialog2.chain(tweenButton1);
            tweenButton1.chain(tweenButton2);
            tweenMask.chain(showPopup);
            tweenDudeUp.start();
            tweenBalloon.start();
        },

        update: function () {
            this.moveCloud(cloud1, 0.1, 10);
            this.moveCloud(cloud2, 0.2, 10);

            this.moveCloud(cloud3, 0.1);
            this.moveCloud(cloud4, 0.15);
            this.moveCloud(cloud5, 0.18);

            this.moveCloud(bigCloud, 0.6);
        },
        
        render: function () {

        },

        moveCloud: function (cloud, pace, interval) {
            interval = interval ? interval : 0;
            cloud.x += pace;
            if (cloud.x >= this.game.width + interval) {
                cloud.x = -cloud.width;
            }
        }
    };

})();
