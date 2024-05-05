var rocket;
var chosenPlanet;
var scoreText;
score = 0.0;
totalScore = 0.0;
var inGameSetQuestions = [];
var inGameSetAnswers = [];
currentIndex = 0;
var nextButton;
var questionBox;
var numPlanets = 5;
var answerSet = [];
var textSet = [];
var gotQuestionWrong = false;

class RocketScene extends Phaser.Scene {
  constructor() {
    super({ key: "RocketScene" });
  }

  // init() {
  //   Phaser.scene.call(this, { key: "RocketScene " });
  // }

  preload() {
    this.load.image("background", "images/spaceBG.png");
    this.input.on("gameobjectdown", function (pointer, gameObject) {});

    this.load.image("nextArrow", "images/nextArrow.png");

    //rocket anims
    this.load.spritesheet(
      "IdleRocket",
      "pixeloramaAnims/rocket_iter1_idle.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "RocketTurnto90R",
      "pixeloramaAnims/rocket_iter1_turn0_90R.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "RocketTurnto90L",
      "pixeloramaAnims/rocket_iter1_turn0_90L.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "RocketFlyR",
      "pixeloramaAnims/rocket_iter1_flyR.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "RocketFlyL",
      "pixeloramaAnims/rocket_iter1_flyL.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "RocketTurnto180R",
      "pixeloramaAnims/rocket_iter1_turn90_180R.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "RocketTurnto180L",
      "pixeloramaAnims/rocket_iter1_turn90_180L.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "RocketFlyDown",
      "pixeloramaAnims/rocket_iter1_flyDown.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "RocketLand",
      "pixeloramaAnims/rocket_iter1_landing.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "RocketFade",
      "pixeloramaAnims/rocket_iter1_disappear.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );

    // //planet fades
    this.load.spritesheet(
      "planetAlmondSundae_fade",
      "pixeloramaAnims/planetAlmondSundae_fade.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "planetCitrusPeel_fade",
      "pixeloramaAnims/planetCitrusPeel_fade.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "planetFuschiaLuster_fade",
      "pixeloramaAnims/planetFuschiaLuster_fade.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "planetMagenta_fade",
      "pixeloramaAnims/planetMagenta_fade.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "planetOrangeCoil_fade",
      "pixeloramaAnims/planetOrangeCoil_fade.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );
    this.load.spritesheet(
      "planetRainypop_fade",
      "pixeloramaAnims/planetRainypop_fade.png",
      {
        frameWidth: 128,
        frameHeight: 96,
      }
    );

    //wrong answer animation
    this.load.spritesheet("wrongAnswer", "pixeloramaAnims/wrongAnswer.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // // //images of the planets
    this.load.image(
      "planetAlmondSundae",
      "pixeloramaAnims/planetImages/planetAlmondSundae.png"
    );
    this.load.image(
      "planetCitrusPeel",
      "pixeloramaAnims/planetImages/planetCitrusPeel.png"
    );
    this.load.image(
      "planetFuschiaLuster",
      "pixeloramaAnims/planetImages/planetFuschiaLuster.png"
    );
    this.load.image(
      "planetMagenta",
      "pixeloramaAnims/planetImages/planetMagenta.png"
    );
    this.load.image(
      "planetOrangeCoil",
      "pixeloramaAnims/planetImages/planetOrangeCoil.png"
    );
    this.load.image(
      "planetRainypop",
      "pixeloramaAnims/planetImages/planetRainypop.png"
    );

    this.load.image("newGameB", "images/Buttons/NewGameB.png");
    this.load.image("restartB", "images/replay.png");
  }

  create() {
    let bg = this.add.image(0, 0, "background");
    bg.setScale(1.6);

    inGameSetQuestions = Array(questions.length).fill(0);
    inGameSetAnswers = Array(answers.length).fill(0);
    textSet = [];

    for (let el in inGameSetQuestions) {
      inGameSetQuestions[el] = questions[el].value;
    }

    for (let el in inGameSetAnswers) {
      if (el >= currentIndex) {
        inGameSetAnswers[el] = answers[el].value;
      } else {
        inGameSetAnswers[el] = null;
      }
    }

    // inGameSetQuestions = questions.values();
    // inGameSetAnswers = answers.values();

    questionBox = this.add
      .text(700, 100, inGameSetQuestions[currentIndex], {
        //21 char limit
        backgroundColor: "#FFFFFF",
        color: "#001D40",
        fontFamily: "Courier",
        fontSize: "20px",
        padding: 5,
        align: "center",
        wordWrap: { width: 500 },
        maxLines: 3,
        fixedWidth: 500,
      })
      .setOrigin(0.5, 0);
    questionBox.visible = true;

    let RB = this.add
      .image(1365, 30, "restartB")
      .setInteractive()
      .on(
        "pointerdown",
        function () {
          this.scene.stop();
          currentIndex = 0;
          score = 0;
          totalScore = 0;
          this.scene.start("RocketScene");
        },
        this
      )
      .on("pointerover", function () {
        RB.tint = 0xbcbcbc;
      })
      .on("pointerout", function () {
        RB.clearTint();
      })
      .setScale(0.5);
    let NGB = this.add
      .image(80, 30, "newGameB")
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

    nextButton = this.add
      .image(1360, 660, "nextArrow")
      .setInteractive()
      .on(
        "pointerdown",
        function () {
          if (currentIndex < inGameSetQuestions.length) {
            this.scene.restart();
          } else {
            this.scene.start("GameOverScene");
          }
        },
        this
      )
      .on("pointerover", function () {
        nextButton.tint = 0xbcbcbc;
      })
      .on("pointerout", function () {
        nextButton.clearTint();
      });

    nextButton.visible = false;

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("IdleRocket", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn90R",
      frames: this.anims.generateFrameNumbers("RocketTurnto90R", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "turn90L",
      frames: this.anims.generateFrameNumbers("RocketTurnto90L", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "flyR",
      frames: this.anims.generateFrameNumbers("RocketFlyR", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "flyL",
      frames: this.anims.generateFrameNumbers("RocketFlyL", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "turn180R",
      frames: this.anims.generateFrameNumbers("RocketTurnto180R", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "turn180L",
      frames: this.anims.generateFrameNumbers("RocketTurnto180L", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      }),
      frameRate: 15,
      repeat: 0,
    });

    this.anims.create({
      key: "flyDown",
      frames: this.anims.generateFrameNumbers("RocketFlyDown", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: "landing",
      frames: this.anims.generateFrameNumbers("RocketLand"),
      frameRate: 25,
      repeat: 0,
    });

    this.anims.create({
      key: "disappear",
      frames: this.anims.generateFrameNumbers("RocketFade"),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "planet_disappearAS",
      frames: this.anims.generateFrameNumbers("planetAlmondSundae_fade", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "planet_disappearCP",
      frames: this.anims.generateFrameNumbers("planetCitrusPeel_fade", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "planet_disappearFL",
      frames: this.anims.generateFrameNumbers("planetFuschiaLuster_fade", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "planet_disappearM",
      frames: this.anims.generateFrameNumbers("planetMagenta_fade", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "planet_disappearOC",
      frames: this.anims.generateFrameNumbers("planetOrangeCoil_fade", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "planet_disappearRP",
      frames: this.anims.generateFrameNumbers("planetRainypop_fade", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.anims.create({
      key: "wrong_answer",
      frames: this.anims.generateFrameNumbers("wrongAnswer"),
      frameRate: 10,
      repeat: 0,
    });

    scoreText = this.add.text(20, 660, `Score: ${score}`, {
      fontFamily: "Courier",
      fontSize: "23px",
    });

    rocket = this.add.sprite(700, 300);
    rocket.setScale(1.7);
    rocket.play("idle");

    var planet_AlmondSundae = this.add.sprite(-40, -40, "planetAlmondSundae");
    planet_AlmondSundae.setScale(1.2);

    var planet_CitrusPeel = this.add.sprite(-40, -40, "planetCitrusPeel");
    planet_CitrusPeel.setScale(1.2);

    var planet_FuschiaLuster = this.add.sprite(-40, -40, "planetFuschiaLuster");
    planet_FuschiaLuster.setScale(1.2);

    var planet_Magenta = this.add.sprite(-40, -40, "planetMagenta");
    planet_Magenta.setScale(1.2);

    var planet_OrangeCoil = this.add.sprite(-40, -40, "planetOrangeCoil");
    planet_CitrusPeel.setScale(1.2);

    var planet_Rainypop = this.add.sprite(-40, -40, "planetRainypop");
    planet_Rainypop.setScale(1.2);

    var wrongAnswer = this.add.sprite(-40, -40).setScale(1.1);

    //fisher-yates shuffle algorithm - will be used to randomize the set of answers that show up
    function shuffle(array, end) {
      let currentI = end; //end is not inclusive
      let newArray = Array(end);
      for (let i = 0; i < end; i++) {
        newArray[i] = array[currentIndex + i];
      }

      // While there remain elements to shuffle...
      while (currentI != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentI);
        currentI--;

        // And swap it with the current element.
        let temp = newArray[currentI];
        newArray[currentI] = newArray[randomIndex];
        newArray[randomIndex] = temp;
      }

      return newArray;
    }

    var planets = [
      planet_AlmondSundae,
      planet_CitrusPeel,
      planet_FuschiaLuster,
      planet_Magenta,
      planet_OrangeCoil,
      planet_Rainypop,
    ];

    // var planetPositions = [700, 930, 470, 1160, 240];
    numPlanets = 5;
    if (inGameSetAnswers.length - currentIndex < 5) {
      numPlanets = inGameSetAnswers.length - currentIndex;
    }
    answerSet = shuffle(inGameSetAnswers, numPlanets);
    let iterationCount = 0;

    while (
      iterationCount < 5 &&
      currentIndex + iterationCount < inGameSetAnswers.length
    ) {
      let index = 0;
      do {
        index = Math.floor(Math.random() * planets.length);
      } while (planets[index].y == 500);

      let currentPlanetIndex = iterationCount + 1;
      let planetRegions = 1200 / numPlanets;
      planets[index].x =
        planetRegions * currentPlanetIndex - planetRegions / 2 + 100;

      planets[index].y = 500;

      planets[index].givenAnswer = answerSet[iterationCount];
      planets[index].positionOnScreen = iterationCount;

      planets[index]
        .setInteractive()
        .on("pointerover", function () {
          planets[index].tint = 0xbcbcbc;
        })
        .on("pointerout", function () {
          planets[index].clearTint();
        });

      let planetLabel = this.add
        .text(planets[index].x, 555, answerSet[iterationCount], {
          //29 char limit
          backgroundColor: "#FFFFFF",
          color: "#001D40",
          fontFamily: "Courier",
          fontSize: "20px",
          padding: 2,
          align: "center",
          wordWrap: { width: 230 },
          maxLines: 3,
          fixedWidth: 230,
        })
        .setOrigin(0.5, 0);
      textSet.push(planetLabel);
      iterationCount++;
    }

    this.input.on("gameobjectdown", function (pointer, gameObject) {
      if (
        rocket.anims.getName() === "idle" &&
        planets.indexOf(gameObject) != -1
      ) {
        if (inGameSetAnswers.indexOf(gameObject.givenAnswer) == currentIndex) {
          chosenPlanet = gameObject;
          if (gameObject.x >= rocket.x) {
            rocket.play("turn90R");
            rocket.chain([
              "flyR",
              "turn180R",
              "flyDown",
              "landing",
              "disappear",
              "idle",
            ]);
          }
          if (gameObject.x < rocket.x) {
            rocket.play("turn90L");
            rocket.chain([
              "flyL",
              "turn180L",
              "flyDown",
              "landing",
              "disappear",
              "idle",
            ]);
          }
          inGameSetAnswers[currentIndex] = null;
          if (!gotQuestionWrong) {
            totalScore++;
          }
        } else {
          wrongAnswer.x = gameObject.x;
          wrongAnswer.y = gameObject.y;
          wrongAnswer.play("wrong_answer");
          if (!gotQuestionWrong) {
            totalScore++;
            gotQuestionWrong = true;
          }
          // score--;
          // scoreText.text = `Score: ${score}`;
        }
      }
    });
  }

  update() {
    if (rocket.anims.getName() === "flyR") {
      if (rocket.x >= chosenPlanet.x) {
        rocket.stop("flyR");
      } else {
        rocket.x += 10;
      }
    }
    if (rocket.anims.getName() === "flyL") {
      if (rocket.x <= chosenPlanet.x) {
        rocket.stop("flyL");
      } else {
        rocket.x -= 10;
      }
    }
    if (rocket.anims.getName() === "flyDown") {
      if (rocket.y >= chosenPlanet.y - 60) {
        rocket.stop("flyDown");
        if (!gotQuestionWrong) {
          score++;
          scoreText.text = `Score: ${score}`;
        }
        chosenPlanet.removeInteractive();
        numPlanets--;
        currentIndex++;
        gotQuestionWrong = false;
        questionBox.text = inGameSetQuestions[currentIndex];
      } else {
        rocket.y += 10;
      }
    }
    if (rocket.anims.getName() === "disappear") {
      let planetName = chosenPlanet.texture.key;
      if (planetName === "planetAlmondSundae") {
        chosenPlanet.play("planet_disappearAS");
      } else if (planetName === "planetCitrusPeel") {
        chosenPlanet.play("planet_disappearCP");
      } else if (planetName === "planetFuschiaLuster") {
        chosenPlanet.play("planet_disappearFL");
      } else if (planetName === "planetMagenta") {
        chosenPlanet.play("planet_disappearM");
      } else if (planetName === "planetOrangeCoil") {
        chosenPlanet.play("planet_disappearOC");
      } else if (planetName === "planetRainypop") {
        chosenPlanet.play("planet_disappearRP");
      }
      textSet[chosenPlanet.positionOnScreen].visible = false;
    }
    if (rocket.anims.getName() === "idle") {
      rocket.x = 700;
      rocket.y = 300;
    }
    if (numPlanets <= 0 && currentIndex < inGameSetQuestions.length) {
      questionBox.visible = false;
      nextButton.visible = true;
    } else if (currentIndex >= inGameSetQuestions.length) {
      questionBox.visible = false;
      setTimeout(() => this.scene.start("GameOverScene"), 1400);
    }
  }
}
