var rocket;
var chosenPlanet;
var scoreText;
var score = 0;

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: "TitleScene" });
  }

  //   init() {
  //     Phaser.scene.call(this, { key: "TitleScene " });
  //   }

  preload() {
    this.load.image("background", "images/spaceBG.png");
    this.input.on("gameobjectdown", function (pointer, gameObject) {});

    this.load.image("beginButton", "images/Buttons/BeginB.png");

    this.load.spritesheet("TitleLogo", "images/MMC_Title.png", {
      frameWidth: 320,
      frameHeight: 320,
    });
  }

  create() {
    let bg = this.add.image(0, 0, "background");
    bg.setScale(1.6);

    let BB = this.add
      .image(700, 500, "beginButton")
      .setInteractive()
      .on(
        "pointerdown",
        function () {
          // RocketScenethi.start("RocketScene");
          document.getElementById("gameDiv").style.display = "none";
          document.getElementById("inputForm").style.display = "block";
          this.scene.stop();

          // this.scene.start("RocketScene");
        },
        this
      )
      .on("pointerover", function () {
        BB.tint = 0xbcbcbc;
      })
      .on("pointerout", function () {
        BB.clearTint();
      })
      .setScale(0.3);

    this.anims.create({
      key: "titleLogo",
      frames: this.anims.generateFrameNumbers("TitleLogo", {
        start: 2,
        end: 142,
      }),
      frameRate: 30,
      repeat: -1,
    });

    var logo = this.add.sprite(700, 300, "titleLogo");
    logo.setScale(1.4);
    logo.play("titleLogo");
  }

  update() {}
}
