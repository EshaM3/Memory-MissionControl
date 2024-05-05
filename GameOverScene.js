class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  preload() {
    this.load.image("background", "images/spaceBG.png");
    this.input.on("gameobjectdown", function (pointer, gameObject) {});

    this.load.image("nextArrow", "images/nextArrow.png");

    this.load.spritesheet("GameOverScreen", "images/GameOver.png", {
      frameWidth: 320,
      frameHeight: 320,
    });

    this.load.image("newGameB", "images/Buttons/NewGameB.png");
    this.load.image("playAgainB", "images/Buttons/PlayAgainB.png");
    this.load.image("quitB", "images/Buttons/QuitB.png");
  }

  create() {
    let bg = this.add.image(0, 0, "background");
    bg.setScale(1.6);

    this.anims.create({
      key: "GameOverAnim",
      frames: this.anims.generateFrameNumbers("GameOverScreen", { start: 5 }),
      frameRate: 25,
      repeat: 0,
    });

    let gameOver = this.add.sprite(700, 150);
    gameOver.setScale(1.1);
    gameOver.play("GameOverAnim");

    this.add
      .text(
        700,
        350,
        "Percentage Correct: " + (score / totalScore) * 100 + "%",
        {
          // backgroundColor: "#FFFFFF",
          color: "#FFFFFF",
          fontFamily: "Courier",
          fontSize: "30px",
          padding: 2,
        }
      )
      .setOrigin(0.5, 0.5);

    let PAB = this.add
      .image(700, 500, "playAgainB")
      .setInteractive()
      .on(
        "pointerdown",
        function () {
          currentIndex = 0;
          score = 0;
          totalScore = 0;
          this.scene.start("RocketScene");
        },
        this
      )
      .on("pointerover", function () {
        PAB.tint = 0xbcbcbc;
      })
      .on("pointerout", function () {
        PAB.clearTint();
      })
      .setScale(0.3);
    let NGB = this.add
      .image(700, 575, "newGameB")
      .setInteractive()
      .on(
        "pointerdown",
        function () {
          this.scene.stop();
          document.getElementById("gameDiv").style.display = "none";
          document.getElementById("inputForm").style.display = "block";
        },
        this
      )
      .on("pointerover", function () {
        NGB.tint = 0xbcbcbc;
      })
      .on("pointerout", function () {
        NGB.clearTint();
      })
      .setScale(0.3);
    let QB = this.add
      .image(700, 650, "quitB")
      .setInteractive()
      .on(
        "pointerdown",
        function () {
          this.scene.start("TitleScene");
        },
        this
      )
      .on("pointerover", function () {
        QB.tint = 0xbcbcbc;
      })
      .on("pointerout", function () {
        QB.clearTint();
      })
      .setScale(0.3);
  }
}

// update() {

// }
