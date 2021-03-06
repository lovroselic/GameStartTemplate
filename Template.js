/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

/////////////////////////////////////////////////
/*
      
TODO:
    --expand m/m collision resolution

known bugs: 

 */
////////////////////////////////////////////////////

var DEBUG = {
    FPS: false,
    BUTTONS: false,
    SETTING: false,
    VERBOSE: false,
    PAINT_TRAIL: false,
    invincible: false,
    INF_LIVES: false,

};
var INI = {

};
var PRG = {
    VERSION: "0.00",
    NAME: "template",
    YEAR: "2022",
    CSS: "color: #239AFF;",
    INIT() {
        console.log("%c****************************", PRG.CSS);
        console.log(`${PRG.NAME} ${PRG.VERSION} by Lovro Selic, (c) C00lSch00l ${PRG.YEAR} on ${navigator.userAgent}`);
        $("#title").html(PRG.NAME);
        $("#version").html(`${PRG.NAME} V${PRG.VERSION} <span style='font-size:14px'>&copy</span> C00lSch00l ${PRG.YEAR}`);
        $("input#toggleAbout").val("About " + PRG.NAME);
        $("#about fieldset legend").append(" " + PRG.NAME + " ");

        ENGINE.autostart = true;
        ENGINE.start = PRG.start;
        ENGINE.readyCall = GAME.setup;
        ENGINE.setSpriteSheetSize(48);
        ENGINE.init();
    },
    setup() {
        console.log("PRG.setup");
        if (DEBUG.SETTING) {
            $('#debug').show();
        } else $('#debug').hide();
        //$("#gridsize").val(INI.GRIDSIZE);
        //$("#gridsize").change(GAME.resizeGrid);
        $("#engine_version").html(ENGINE.VERSION);
        //$("#grid_version").html(GRID.VERSION);
        //$("#maze_version").html(DUNGEON.VERSION);
        //$("#ai_version").html(AI.VERSION);
        $("#lib_version").html(LIB.VERSION);

        /*
        $("#walltexture").change(function () {
            ENGINE.fill(LAYER.wallcanvas, TEXTURE[$("#walltexture")[0].value]);
        });
        $("#floortexture").change(function () {
            ENGINE.fill(LAYER.floorcanvas, TEXTURE[$("#floortexture")[0].value]);
        });
        $("#ceilingtexture").change(function () {
            ENGINE.fill(LAYER.ceilingcanvas, TEXTURE[$("#ceilingtexture")[0].value]);
        });
        */


        $("#toggleHelp").click(function () {
            $("#help").toggle(400);
        });
        $("#toggleAbout").click(function () {
            $("#about").toggle(400);
        });

        //boxes
        ENGINE.gameWIDTH = 768;
        ENGINE.sideWIDTH = 960 - ENGINE.gameWIDTH;
        ENGINE.gameHEIGHT = 768;
        ENGINE.titleHEIGHT = 80;
        ENGINE.titleWIDTH = 960;
        ENGINE.bottomHEIGHT = 40;
        ENGINE.bottomWIDTH = 960;
        ENGINE.checkProximity = false;
        ENGINE.checkIntersection = false;
        ENGINE.setCollisionsafe(49);
        $("#bottom").css(
            "margin-top",
            ENGINE.gameHEIGHT + ENGINE.titleHEIGHT + ENGINE.bottomHEIGHT
        );
        $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + ENGINE.sideWIDTH + 4);
        ENGINE.addBOX("TITLE", ENGINE.titleWIDTH, ENGINE.titleHEIGHT, ["title"], null);
        ENGINE.addBOX("ROOM", ENGINE.gameWIDTH, ENGINE.gameHEIGHT,
            ["background", "splash", "actors", "explosion", "text", "animation", "FPS", "button", "click"],
            "side");
        ENGINE.addBOX("SIDE", ENGINE.sideWIDTH, ENGINE.gameHEIGHT,
            ["sideback", "score", "energy", "lives", "stage", "radar"],
            "fside");
        ENGINE.addBOX("DOWN", ENGINE.bottomWIDTH, ENGINE.bottomHEIGHT, ["bottom", "bottomText"], null);

        ENGINE.addBOX("LEVEL", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["floor", "wall", "gold", "grid", "coord", "player", "debug",], null);

        if (!DEBUG.PAINT_TRAIL) $("#LEVEL").addClass("hidden");
    },
    start() {
        console.log(PRG.NAME + " started.");
        $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
        $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
        $(ENGINE.topCanvas).css("cursor", "");

        $("#startGame").addClass("hidden");
        $(document).keypress(function (event) {
            if (event.which === 32 || event.which === 13) {
                event.preventDefault();
            }
        });
        TITLE.startTitle();
    }
};

var GAME = {
    start() {
        console.log("GAME started");
        if (AUDIO.Title) {
            AUDIO.Title.pause();
            AUDIO.Title.currentTime = 0;
        }
        $(ENGINE.topCanvas).off("mousemove", ENGINE.mouseOver);
        $(ENGINE.topCanvas).off("click", ENGINE.mouseClick);
        $(ENGINE.topCanvas).css("cursor", "");
        ENGINE.hideMouse();
        GAME.extraLife = SCORE.extraLife.clone();

        $("#pause").prop("disabled", false);
        $("#pause").off();
        GAME.paused = false;

        let GameRD = new RenderData("Arcade", 60, "#DDD", "text", "#FFF", 2, 2, 2);
        ENGINE.TEXT.setRD(GameRD);
        ENGINE.watchVisibility(GAME.lostFocus);
        ENGINE.GAME.start(16);
        GAME.prepareForRestart();
        GAME.completed = false;
        GAME.won = false;
        GAME.level = 1;
        GAME.score = 0;
        GAME.lives = 3;
        //HERO.startInit();
        //AI.initialize(HERO);
        GAME.fps = new FPS_measurement();
        //ENGINE.GAME.ANIMATION.waitThen(GAME.levelStart, 2);
    },
    levelStart() {
        //MAP.createNewLevel(GAME.level);
        //HERO.energy = MAP[GAME.level].energy;
        GAME.initLevel(GAME.level);
        GAME.continueLevel(GAME.level);
    },
    initLevel(level) {
        //let randomDungeon = RAT_ARENA.create(MAP[level].width, MAP[level].height);
        //MAP[level].DUNGEON = randomDungeon;
        //GRID_SOLO_FLOOR_OBJECT.init(MAP[level].DUNGEON);
        //DESTRUCTION_ANIMATION.init(MAP[level].DUNGEON);
        //SPAWN.gold(level);
        //MAP[level].pw = MAP[level].width * ENGINE.INI.GRIDPIX;
        //MAP[level].ph = MAP[level].height * ENGINE.INI.GRIDPIX;
        //ENGINE.VIEWPORT.setMax({ x: MAP[level].pw, y: MAP[level].ph });
    },
    continueLevel(level) {
        //ENEMY_TG.init(MAP[level].DUNGEON);
        //VANISHING.init(MAP[level].DUNGEON);
        //SPAWN.monsters(level);
        //HERO.init();
        //HERO.energy = Math.max(Math.round(GRID_SOLO_FLOOR_OBJECT.size / INI.GOLD * MAP[GAME.level].energy), HERO.energy);
        GAME.levelExecute();
    },
    levelExecute() {
        //GAME.CI.reset();
        //ENGINE.VIEWPORT.reset();
        //ENGINE.VIEWPORT.check(HERO.actor);
        //ENGINE.VIEWPORT.alignTo(HERO.actor);
        GAME.drawFirstFrame(GAME.level);
        //GAME.ENEMY.started = false;
        ENGINE.GAME.ANIMATION.next(GAME.countIn);
    },
    levelEnd() {
        //SPEECH.speak("Good job!");
        //GAME.levelCompleted = true;
        //ENGINE.TEXT.centeredText("LEVEL COMPLETED", ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 4);
        //TITLE.endLevel();
        //ENGINE.GAME.ANIMATION.next(ENGINE.KEY.waitFor.bind(null, GAME.nextLevel, "enter"));
    },
    nextLevel() {
        GAME.level++;
        GAME.levelCompleted = false;
        ENGINE.GAME.ANIMATION.waitThen(GAME.levelStart, 2);
    },

    run(lapsedTime) {
        if (ENGINE.GAME.stopAnimation) return;
        GAME.respond();

        GAME.frameDraw(lapsedTime);
    },
    updateVieport() {
        if (!ENGINE.VIEWPORT.changed) return;
        ENGINE.VIEWPORT.change("floor", "background");
        ENGINE.VIEWPORT.change("gold", "background");
        ENGINE.VIEWPORT.changed = false;
    },
    deadRun(lapsedTime) {
        DESTRUCTION_ANIMATION.manage(lapsedTime);
        GAME.deadFrameDraw(lapsedTime);
    },
    deadFrameDraw(lapsedTime) {
        ENGINE.clearLayerStack();

    },
    frameDraw(lapsedTime) {
        ENGINE.clearLayerStack();


        if (DEBUG.FPS) {
            GAME.FPS(lapsedTime);
        }
    },
    drawFirstFrame(level) {

    },
    blockGrid(level) {
        GRID.grid();
        GRID.paintCoord("coord", MAP[level].DUNGEON);
    },
    prepareForRestart() {
        ENGINE.TIMERS.clear();
    },
    setup() {
        console.log("GAME SETUP started");

        /*
        for (var prop in TEXTURE) {
            $("#walltexture").append(
                "<option value='" + prop + "'>" + prop + "</option>"
            );
            $("#floortexture").append(
                "<option value='" + prop + "'>" + prop + "</option>"
            );
            $("#ceilingtexture").append(
                "<option value='" + prop + "'>" + prop + "</option>"
            );
        }
        $("#walltexture").val("CastleWall");
        $("#floortexture").val("RockFloor");
        $("#ceilingtexture").val("MorgueFloor");
        LAYER.wallcanvas = $("#wallcanvas")[0].getContext("2d");
        LAYER.floorcanvas = $("#floorcanvas")[0].getContext("2d");
        ENGINE.fill(LAYER.wallcanvas, TEXTURE[$("#walltexture")[0].value]);
        ENGINE.fill(LAYER.floorcanvas, TEXTURE[$("#floortexture")[0].value]);

        

        MAZE.bias = 2;
        MAZE.useBias = true;
        */
        $("#buttons").prepend("<input type='button' id='startGame' value='Start Game'>");
        $("#startGame").prop("disabled", true);
    },
    setTitle() {
        const text = GAME.generateTitleText();
        const RD = new RenderData("Adore", 16, "#0E0", "bottomText");
        const SQ = new Square(0, 0, LAYER.bottomText.canvas.width, LAYER.bottomText.canvas.height);
        GAME.movingText = new MovingText(text, 4, RD, SQ);
    },
    generateTitleText() {
        let text = `${PRG.NAME} ${PRG.VERSION
            }, a game by Lovro Selic, ${"\u00A9"} C00LSch00L ${PRG.YEAR
            }. Title screen graphics by Trina Selic. Music: 'Determination' written and performed by LaughingSkull, ${"\u00A9"
            } 2007 Lovro Selic. `;
        text += "     ENGINE, SPEECH, GRID, MAZE, AI and GAME code by Lovro Selic using JavaScript. ";
        text = text.split("").join(String.fromCharCode(8202));
        return text;
    },
    runTitle() {
        if (ENGINE.GAME.stopAnimation) return;
        GAME.movingText.process();
        GAME.titleFrameDraw();
    },
    titleFrameDraw() {
        GAME.movingText.draw();
    },
    lostFocus() {
        if (GAME.paused || false) return;
        GAME.clickPause();
    },
    clickPause() {
        if (false || GAME.levelCompleted) return;
        $("#pause").trigger("click");
        ENGINE.GAME.keymap[ENGINE.KEY.map.F4] = false;
    },
    pause() {
        if (GAME.paused) return;
        if (false || GAME.levelCompleted) return;
        console.log("%cGAME paused.", PRG.CSS);
        $("#pause").prop("value", "Resume Game [F4]");
        $("#pause").off("click", GAME.pause);
        $("#pause").on("click", GAME.resume);
        ENGINE.GAME.ANIMATION.next(ENGINE.KEY.waitFor.bind(null, GAME.clickPause, "F4"));
        ENGINE.TEXT.centeredText("Game Paused", ENGINE.gameWIDTH, ENGINE.gameHEIGHT / 2);
        GAME.paused = true;
        ENGINE.TIMERS.stop();
    },
    resume() {
        console.log("%cGAME resumed.", PRG.CSS);
        $("#pause").prop("value", "Pause Game [F4]");
        $("#pause").off("click", GAME.resume);
        $("#pause").on("click", GAME.pause);
        ENGINE.clearLayer("text");
        ENGINE.TIMERS.start();
        ENGINE.GAME.ANIMATION.resetTimer();
        ENGINE.GAME.ANIMATION.next(GAME.run);
        GAME.paused = false;
    },
    respond() {
        if (false) return;
        var map = ENGINE.GAME.keymap;

        if (map[ENGINE.KEY.map.F4]) {
            $("#pause").trigger("click");
            ENGINE.TIMERS.display();
            ENGINE.GAME.keymap[ENGINE.KEY.map.F4] = false;
        }
        if (map[ENGINE.KEY.map.F9]) {
            if (DEBUG.BUTTONS) DEBUG.finishLevel();
        }
        if (map[ENGINE.KEY.map.ctrl]) {

            ENGINE.GAME.keymap[ENGINE.KEY.map.ctrl] = false;
        }
        if (map[ENGINE.KEY.map.left]) {

            return;
        }
        if (map[ENGINE.KEY.map.right]) {

            return;
        }
        if (map[ENGINE.KEY.map.up]) {

            return;
        }
        if (map[ENGINE.KEY.map.down]) {
 
            return;
        }
        return;
    },
    FPS(lapsedTime) {
        let CTX = LAYER.FPS;
        CTX.fillStyle = "white";
        ENGINE.clearLayer("FPS");
        let fps = 1000 / lapsedTime || 0;
        GAME.fps.update(fps);
        CTX.fillText(GAME.fps.getFps(), 5, 10);
    },
    endLaugh() {
        ENGINE.GAME.ANIMATION.stop();
        GAME.lives--;
        if (GAME.lives < 0 && !DEBUG.INF_LIVES) {
            console.log("GAME OVER");
            TITLE.gameOver();
            GAME.end();
        } else {
            GAME.continueLevel(GAME.level);
        }
    },
    end() {
        ENGINE.showMouse();
        AUDIO.Death.onended = GAME.checkScore;
        AUDIO.Death.play();
    },
    checkScore() {
        SCORE.checkScore(GAME.score);
        SCORE.hiScore();
        TITLE.startTitle();
    },
    PAINT: {
        gold() {
            ENGINE.clearLayer("gold");
            GRID_SOLO_FLOOR_OBJECT.draw();
        },
        splash() {
            ENGINE.clearLayer("splash");
            VANISHING.draw();
        }
    },
    CI: {
        text: ["READY", "SET?", "GO!"],
        reset() {
            GAME.CI.start = null;
            GAME.CI.now = null;
        }
    },
    ENEMY: {
        started: false,
        move(lapsedTime) {
  
        },
        draw() {

        },
        
    },
    EXP: {
        draw(lapsedTime) {
            ENGINE.clearLayer("explosion");
            DESTRUCTION_ANIMATION.draw(lapsedTime);
        }
    }
};
var TITLE = {
    firstFrame() {
        TITLE.clearAllLayers();
        TITLE.sideBackground();
        TITLE.topBackground();
        TITLE.titlePlot();
        TITLE.bottom();
        TITLE.hiScore();
        TITLE.score();
        TITLE.energy();
        TITLE.lives();
        TITLE.stage();
        TITLE.radar();
    },
    startTitle() {
        /*
        $("#pause").prop("disabled", true);
        if (AUDIO.Title) AUDIO.Title.play();
        TITLE.clearAllLayers();
        TITLE.blackBackgrounds();
        TITLE.titlePlot();
        ENGINE.draw("background", 0, 0, TEXTURE.GhostRun2_cover);
        $("#DOWN")[0].scrollIntoView();

        ENGINE.topCanvas = ENGINE.getCanvasName("ROOM");
        TITLE.drawButtons();
        GAME.setTitle();
        ENGINE.GAME.start(16);
        ENGINE.GAME.ANIMATION.next(GAME.runTitle);
        */
       GAME.start();
    },
    clearAllLayers() {
        ENGINE.layersToClear = new Set(["text", "animation", "actors", "explosion", "sideback", "button", "score",
            "energy", "lives", "stage", "radar", "title", "splash"]);
        ENGINE.clearLayerStack();
    },
    blackBackgrounds() {
        this.topBackground();
        this.bottomBackground();
        this.sideBackground();
        ENGINE.fillLayer("background", "#000");
    },
    topBackground() {
        var CTX = LAYER.title;
        CTX.fillStyle = "#000";
        CTX.roundRect(0, 0, ENGINE.titleWIDTH, ENGINE.titleHEIGHT,
            { upperLeft: 20, upperRight: 20, lowerLeft: 0, lowerRight: 0 },
            true, true);
    },
    bottomBackground() {
        var CTX = LAYER.bottom;
        CTX.fillStyle = "#000";
        CTX.roundRect(0, 0, ENGINE.bottomWIDTH, ENGINE.bottomHEIGHT,
            { upperLeft: 0, upperRight: 0, lowerLeft: 20, lowerRight: 20 },
            true, true);
    },
    sideBackground() {
        ENGINE.fillLayer("sideback", "#000");
    },
    bottom() {
        this.bottomVersion();
    },
    bottomVersion() {
        ENGINE.clearLayer("bottomText");
        let CTX = LAYER.bottomText;
        CTX.textAlign = "center";
        var x = ENGINE.bottomWIDTH / 2;
        var y = ENGINE.bottomHEIGHT / 2;
        CTX.font = "13px Consolas";
        CTX.fillStyle = "#888";
        CTX.shadowOffsetX = 0;
        CTX.shadowOffsetY = 0;
        CTX.shadowBlur = 0;
        CTX.shadowColor = "#cec967";
        CTX.fillText("Version " + PRG.VERSION + " by Lovro Seli??", x, y);
    },
    titlePlot() {
        let CTX = LAYER.title;
        var fs = 42;
        CTX.font = fs + "px Arcade";
        CTX.textAlign = "center";
        let txt = CTX.measureText(PRG.NAME);
        let x = ENGINE.titleWIDTH / 2;
        let y = fs + 10;
        let gx = x - txt.width / 2;
        let gy = y - fs;
        let grad = CTX.createLinearGradient(gx, gy + 10, gx, gy + fs);
        grad.addColorStop("0", "#DDD");
        grad.addColorStop("0.1", "#EEE");
        grad.addColorStop("0.2", "#DDD");
        grad.addColorStop("0.3", "#AAA");
        grad.addColorStop("0.4", "#999");
        grad.addColorStop("0.5", "#666");
        grad.addColorStop("0.6", "#555");
        grad.addColorStop("0.7", "#777");
        grad.addColorStop("0.8", "#AAA");
        grad.addColorStop("0.9", "#CCC");
        grad.addColorStop("1", "#EEE");
        CTX.fillStyle = grad;
        GAME.grad = grad;
        CTX.shadowColor = "#cec967";
        CTX.shadowOffsetX = 2;
        CTX.shadowOffsetY = 2;
        CTX.shadowBlur = 3;
        CTX.fillText(PRG.NAME, x, y);
    },
    drawButtons() {
        ENGINE.clearLayer("button");
        FORM.BUTTON.POOL.clear();
        let x = 36;
        let y = 720;
        let w = 166;
        let h = 24;
        let startBA = new Area(x, y, w, h);
        let buttonColors = new ColorInfo("#F00", "#A00", "#222", "#666", 13);
        let musicColors = new ColorInfo("#0E0", "#090", "#222", "#666", 13);
        FORM.BUTTON.POOL.push(new Button("Start game", startBA, buttonColors, GAME.start));
        x += 1.2 * w;
        let music = new Area(x, y, w, h);
        FORM.BUTTON.POOL.push(new Button("Play title music", music, musicColors, TITLE.music));
        FORM.BUTTON.draw();
        $(ENGINE.topCanvas).on("mousemove", { layer: ENGINE.topCanvas }, ENGINE.mouseOver);
        $(ENGINE.topCanvas).on("click", { layer: ENGINE.topCanvas }, ENGINE.mouseClick);
    },
    music() {
        AUDIO.Title.play();
    },
    hiScore() {
        var CTX = LAYER.title;
        var fs = 16;
        CTX.font = fs + "px Garamond";
        CTX.fillStyle = GAME.grad;
        CTX.shadowColor = "#cec967";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        CTX.textAlign = "left";
        var x = 700;
        var y = 32 + fs;
        var index = SCORE.SCORE.name[0].indexOf("&nbsp");
        var HS;
        if (index > 0) {
            HS = SCORE.SCORE.name[0].substring(0, SCORE.SCORE.name[0].indexOf("&nbsp"));
        } else {
            HS = SCORE.SCORE.name[0];
        }
        var text = "HISCORE: " + SCORE.SCORE.value[0].toString().padStart(6, "0") + " by " + HS;
        CTX.fillText(text, x, y);
    },
    score() {
        ENGINE.clearLayer("score");
        var CTX = LAYER.score;
        var fs = 16;
        CTX.font = fs + "px Emulogic";
        CTX.fillStyle = GAME.grad;
        CTX.shadowColor = "#cec967";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 2;
        CTX.textAlign = "center";
        var x = ENGINE.sideWIDTH / 2;
        var y = 48;
        CTX.fillText("SCORE", x, y);
        CTX.fillStyle = "#FFF";
        CTX.shadowColor = "#DDD";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        y += fs + 4;
        CTX.fillText(GAME.score.toString().padStart(6, "0"), x, y);
        if (GAME.score >= GAME.extraLife[0]) {
            GAME.lives++;
            GAME.extraLife.shift();
            TITLE.lives();
        }
    },
 
    lives() {
        ENGINE.clearLayer("lives");
        var CTX = LAYER.lives;
        var fs = 16;
        CTX.font = fs + "px Emulogic";
        CTX.fillStyle = GAME.grad;
        CTX.shadowColor = "#cec967";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 2;
        CTX.textAlign = "center";
        var x = ENGINE.sideWIDTH / 2;
        var y = 220;
        CTX.fillText("LIVES", x, y);
        y += fs + 32;
        CTX.shadowColor = "transparent";
        CTX.shadowOffsetX = 0;
        CTX.shadowOffsetY = 0;
        CTX.shadowBlur = 0;
        var spread = ENGINE.spreadAroundCenter(GAME.lives, x, 32);
        for (let q = 0; q < GAME.lives; q++) {
            ENGINE.spriteDraw("lives", spread[q], y, SPRITE.Wizard_front_0);
        }
    },
    stage() {
        ENGINE.clearLayer("stage");
        var CTX = LAYER.stage;
        var fs = 16;
        CTX.font = fs + "px Emulogic";
        CTX.fillStyle = GAME.grad;
        CTX.shadowColor = "#cec967";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 2;
        CTX.textAlign = "center";
        var x = ENGINE.sideWIDTH / 2;
        var y = 344;
        CTX.fillText("STAGE", x, y);
        CTX.fillStyle = "#FFF";
        CTX.shadowColor = "#DDD";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 1;
        y += fs + 4;
        CTX.fillText(GAME.level.toString().padStart(2, "0"), x, y);
    },
 
    gameOver() {
        ENGINE.clearLayer("text");
        var CTX = LAYER.text;
        CTX.textAlign = "center";
        var x = ENGINE.gameWIDTH / 2;
        var y = ENGINE.gameHEIGHT / 2;
        var fs = 64;
        CTX.font = fs + "px Arcade";
        var txt = CTX.measureText("GAME OVER");
        var gx = x - txt.width / 2;
        var gy = y - fs;
        var grad = CTX.createLinearGradient(gx, gy + 10, gx, gy + fs);
        grad.addColorStop("0", "#DDD");
        grad.addColorStop("0.1", "#EEE");
        grad.addColorStop("0.2", "#DDD");
        grad.addColorStop("0.3", "#CCC");
        grad.addColorStop("0.4", "#BBB");
        grad.addColorStop("0.5", "#AAA");
        grad.addColorStop("0.6", "#BBB");
        grad.addColorStop("0.7", "#CCC");
        grad.addColorStop("0.8", "#DDD");
        grad.addColorStop("0.9", "#EEE");
        grad.addColorStop("1", "#DDD");
        CTX.fillStyle = grad;
        CTX.shadowColor = "#FFF";
        CTX.shadowOffsetX = 2;
        CTX.shadowOffsetY = 2;
        CTX.shadowBlur = 3;
        CTX.fillText("GAME OVER", x, y);
    },
    endLevel() {

    },
};

// -- main --
$(function () {
    PRG.INIT();
    //SPEECH.init();
    PRG.setup();
    ENGINE.LOAD.preload();
    SCORE.init("SC", "GhostRun", 10, 2500);
    SCORE.loadHS();
    SCORE.hiScore();
    SCORE.extraLife = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, Infinity];
});