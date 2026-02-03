"use strict";

// A, B... flag variable ကို သတ်မှတ်ခြင်း (penguins turn လား bear turn လား ခွဲခြားရန်)
let flag = "pen-flag";

// C... turn counter variable ကို သတ်မှတ်ခြင်း (ကစားကွက် ၉ ကွက်ရှိသဖြင့် ၉ ဟု သတ်မှတ်)
let counter = 9;

//class="square" を取得
const squares = document.getElementsByClassName("square");

//Arrayに変換
//https://developer.mozilla.org/ja/docs/Web/javaScript/Reference/Golbal_Objects/Array/from
const squaresArray = Array.from(squares);

// D... squares element (マス目) ၉ ခုကို id ဖြင့် ရယူခြင်း
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");

//class ="level" を取得
const levels = document.querySelectorAll(".level");

//Array　に変換・・・もしline28で

const level_1 = document.getElementById("level_1");
const level_2 = document.getElementById("level_2");
const level_3 = document.getElementById("level_3");

//NewGame buttons
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");

// Win or Lose Judgment Line
const line1 = JudgLine(squaresArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squaresArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squaresArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squaresArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squaresArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squaresArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squaresArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squaresArray, ["a_3", "b_2", "c_1"]);

const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];

const lineRandom = conerLine(squaresArray, ["a_1", "a_3", "c_1", "c_3"]);
let winningLine = null;

// メッセージ (Message စာသားများ သတ်မှတ်ခြင်း)
const msgtxt1 = '<p class="image"><img src="img/penguins.jpg" width="61px" height="61px"></p><p class="text">Penguins Attack! (your turn)</p>';
const msgtxt2 = '<p class="image"><img src="img/whitebear.jpg" width="61px" height="61px"></p><p class="text">WhiteBear Attack! (computer turn)</p>';
const msgtxt3 = '<p class="image"><img src="img/penguins.jpg" width="61px" height="61px"></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src="img/whitebear.jpg" width="61px" height="61px"></p><p class="text animate__animated animate__lightSpeedInRight">WhiteBear Win!!</p>';
const msgtxt5 = '<p class="image"><img src="img/penguins.jpg" width="61px" height="61px"><img src ="img/whitebear.jpg" width=61px height=61px></p><p class ="text animate__bounceIn">Draw!!</p>';

//サウンド
let gameSound = ["sound/click_sound1.mp3", "sound/click_sound2.mp3", "sound/penwin_sound.mp3", "sound/bearwin_sound.mp3", "sound/draw_sound.mp3"];

// ပထမဆုံး page load ဖြစ်ချိန်တွင် penguin အလှည့်စာသားကို ပြသရန်
window.addEventListener("DOMContentLoaded",
  function () {
    setMessage("pen-turn");

    //squareがクリック可能かを判断するクラスを追加
    squaresArray.forEach(function (square) {
      square.classList.add("js-clickable");
    });

    LevelSetting(0);//levelの要素を取得　レベル1設定
  }, false
);

//********************************************
//レベル設定
//******************************************** let index;
levels.forEach((level) => {
  level.addEventListener("click", () => {
    index = [].slice.call(levels).indexOf(level); // Fixed: indexOf
    LevelSetting(index);
  });
});

function LevelSetting(index) {
  //レベル設定ボタン　スタイルクリア
  level_1.classList.remove("level-selected", "level-non-selected");
  level_2.classList.remove("level-selected", "level-non-selected");
  level_3.classList.remove("level-selected", "level-non-selected");

  //セッションストレージにkey=tic_tac_toe_acessがある場合は初回ではない
  if (sessionStorage.getItem("tic_tac_toe_access")) {
    switch (index) {
      case 0:
        sessionStorage.setItem("tic_tac_toe_access", "1");
        level_1.classList.add("level-selected");
        level_2.classList.add("level-non-selected");
        level_3.classList.add("level-non-selected");
        break;
      case 1:
        sessionStorage.setItem("tic_tac_toe_access", "2");
        level_1.classList.add("level-non-selected");
        level_2.classList.add("level-selected");
        level_3.classList.add("level-non-selected");
        break;
      case 2:
        sessionStorage.setItem("tic_tac_toe_access", "3");
        level_1.classList.add("level-non-selected");
        level_2.classList.add("level-non-selected");
        level_3.classList.add("level-selected");
        break;
      default:
        level_1.classList.add("level-selected");
        level_2.classList.add("level-non-selected");
        level_3.classList.add("level-non-selected");
        break;
    }
  } else {
    //session-storageにkey="tic_tac_toe_access"がない場合は初回実行
    sessionStorage.setItem("tic_tac_toe_access", "1");
    level_1.classList.add("level-selected");
    level_2.classList.add("level-non-selected");
    level_3.classList.add("level-non-selected");
  }
}

// ************************************************************
// square ကို click လုပ်တဲ့အခါ event trigger လုပ်ခြင်း (E-① မှ E-⑧)
//Win or Lose Judgement Lineကို配列化
// ************************************************************
function JudgLine(targetArray, idArray) {
  return targetArray.filter(function (e) {
    return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
  });
}

//********************************************************************* //coner Lineを配列化
//****************************************************** function conerLine(targetArray, idArray) {
  return targetArray.filter(function (e) {
    return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2] || e.id === idArray[3]);
  });
}

squaresArray.forEach(function (square) {
  square.addEventListener('click', () => {
    if (counter === 9) {
      const levelBox = document.getElementById("levelBox"); // Fixed: getElementById
      levelBox.classList.add("js-unclickable");//ゲーム途中でlevelBoxをクリックできないようにする // Fixed: unclickable
    }
    let gameOverFlg = isSelect(square);

    //GameOverではない場合、クマのターン(auto)
    if (gameOverFlg === "0") {
      const squaresBox = document.getElementById("squaresBox");
      squaresBox.classList.add("js-unclickable");//squares-boxをクリックできないようにする。
      setTimeout(
        function () {
          bearTurn();
        },
        2000
      );
    }
  });
});

function isSelect(selectSquare) {
  let gameOverFlg = "0";
  //クリックサウンド
  if (selectSquare.classList.contains("js-unclickable"))
    return "0";

  if (flag === "pen-flag") {
    //click sound
    let music = new Audio(gameSound[0]);
    music.currentTime = 0;
    music.play(); //再生

    selectSquare.classList.add("js-pen-checked", "js-unclickable");
    selectSquare.classList.remove("js-clickable");//squareがクリック可能かを判断するクラスを削除

    if (isWinner("penguins")) {
      setMessage("pen-Win");
      gameOver("penguins");
      return "1";
    }

    // H-①... နောက်လူ (Bear) အလှည့်အတွက် message ပြောင်းရန်
    setMessage("bear-turn");
    flag = "bear-flag";

  } else {
    //clicksound
    let music = new Audio(gameSound[1]);
    music.currentTime = 0;
    music.play();
    // F-②... Bear ပုံပေါ်ရန် class ထည့်ခြင်း
    selectSquare.classList.add("js-bear-checked");
    // G... block လုပ်ခြင်း
    selectSquare.classList.add("js-unclickable");
    selectSquare.classList.remove("js-clickable");//squareがクリック可能かを判断するクラスを削除

    if (isWinner("bear")) {
      setMessage("bear-Win");
      gameOver("bear");
      return "1";
    }
    // H-②... နောက်လူ (Penguin) အလှည့်အတွက် message ပြောင်းရန်
    setMessage("pen-turn");
    flag = "pen-flag";
  }

  // i... နှိပ်လိုက်တိုင်း counter ကို ၁ လျှော့ချခြင်း
  counter--;

  // အကွက်အားလုံးပြည့်သွားလျှင် (counter = 0) Draw ဟု ပြခြင်း
  if (counter === 0) {
    setMessage("draw");
    gameOver("draw");
    return "1";
  }

  return "0";
}

function setMessage(id) {
  const msgtext = document.getElementById("msgtext");
  switch (id) {
    case "pen-turn": msgtext.innerHTML = msgtxt1; break;
    case "bear-turn": msgtext.innerHTML = msgtxt2; break;
    case "pen-Win": msgtext.innerHTML = msgtxt3; break;
    case "bear-Win": msgtext.innerHTML = msgtxt4; break;
    case "draw": msgtext.innerHTML = msgtxt5; break;
    default: msgtext.innerHTML = msgtxt1;
  }
}

function isWinner(symbol) {
  const result = lineArray.some(function (line) {
    const subResult = line.every(function (square) {
      if (symbol === "penguins") {
        return square.classList.contains("js-pen-checked");
      }
      if (symbol === "bear") {
        return square.classList.contains("js-bear-checked");
      }
    });
    if (subResult) { winningLine = line }
    return subResult;
  });
  return result;
}

function gameOver(status) {
  let w_sound;
  switch (status) {
    case "penguins": w_sound = gameSound[2]; break;
    case "bear": w_sound = gameSound[3]; break;
    case "draw": w_sound = gameSound[4]; break;
  }

  let music = new Audio(w_sound);
  music.currentTime = 0;
  music.play();//再生

  const squaresBox = document.getElementById("squaresBox");
  squaresBox.classList.add("js-unclickable");//square-boxをクリックできないようにする
  //display New Game button :display
  newgamebtn_display.classList.remove("js-hidden");

  //winEffect
  if (status === "penguins") {
    if (winningLine) {
      winningLine.forEach(function (square) {
        square.classList.add("js-pen_highLight");
      });
    }
    $(document).snowfall({
      flakeColor: "rgb(255,240,245)", maxSpeed: 3, minSpeed: 1, maxSize: 20, minSize: 10, round: true
    });
  } else if (status === "bear") {
    if (winningLine) {
      winningLine.forEach(function (square) {
        square.classList.add("js-bear_highLight");
      });
    }
    $(document).snowfall({
      flakeColor: "rgb(175,238,238)", maxSpeed: 3, minSpeed: 1, maxSize: 20, minSize: 10, round: true
    });
  }
}

newgamebtn.addEventListener("click", function () {
  flag = "pen-flag";
  counter = 9;
  winningLine = null;
  squaresArray.forEach(function (square) {
    square.classList.remove("js-pen-checked", "js-bear-checked", "js-unclickable", "js-pen_highLight", "js-bear_highLight");
    square.classList.add("js-clickable");
  });
  const squaresBox = document.getElementById("squaresBox");
  const levelBox = document.getElementById("levelBox");
  squaresBox.classList.remove("js-unclickable");//squares-boxをクリックできないようにする
  levelBox.classList.remove("js-unclickable");//levelBoxクリックできるようにする
  setMessage("pen-turn");
  newgamebtn_display.classList.add("js-hidden");
  $(document).snowfall("clear");
});

function bearTurn() {
  //levelを取得
  let level = sessionStorage.getItem("tic_tac_toe_access");
  let gameOverFlg = "0";
  let bearTurnEnd = "0";

  while (bearTurnEnd === "0") {
    // クマのリーチ攻め
    if (level === "1" || level === "2" || level === "3") {
      bearTurnEnd = isReach("bear");
      if (bearTurnEnd === "1") {
        gameOverFlg = "1";
        break;//whileを終了
      }
    }

    //ペンギンのリーチdefense
    if (level === "2" || level === "3") {
      bearTurnEnd = isReach("penguins");
      if (bearTurnEnd === "1") {
        break;//whileを終了
      }
    }

    // Level 3 specific strategy
    if (level === "3") {
      for (let square of lineRandom) {
        if (square.classList.contains("js-clickable")) {
          gameOverFlg = isSelect(square);
          bearTurnEnd = "1";
          break;//forのloopを終了
        }
      }
      if (bearTurnEnd === "1") break;//whileを終了
    }

    //まだマス目を選んでいない場合クリックできるマス目をランダムにえらぶ
    const bearSquare = squaresArray.filter(function (square) {
      return square.classList.contains("js-clickable");
    });

    if (bearSquare.length > 0) {
      let n = Math.floor(Math.random() * bearSquare.length);
      gameOverFlg = isSelect(bearSquare[n]);
    }
    bearTurnEnd = "1";
    break; //while を終了
  }

  //GameOverではない場合
  if (gameOverFlg === "0") {
    const squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.remove("js-unclickable");
  }
}

function isReach(status) {
  let bearTurnEnd = "0";

  // lineArray ထဲက အနိုင်လမ်းကြောင်း ၈ ခုကို စစ်မယ်
  lineArray.some(function (line) {
    let bearCheckCnt = 0;
    let penCheckCnt = 0;

    line.forEach(function (square) {
      // ကိုယ့်အကွက် (သို့) လူ့အကွက် ၂ ကွက်ရှိနေလား စစ်တယ်
      if (square.classList.contains("js-bear-checked")) {
        bearCheckCnt++;
      }
      if (square.classList.contains("js-pen-checked")) {
        penCheckCnt++;
      }
    });

    if (status === "bear" && bearCheckCnt === 2 && penCheckCnt === 0) {
      bearTurnEnd = "1";
    }
    if (status === "penguins" && bearCheckCnt === 0 && penCheckCnt === 2) {
      bearTurnEnd = "1";
    }

    if (bearTurnEnd === "1") {
      line.some(function (square) {
        if (square.classList.contains("js-clickable")) {
          isSelect(square);
          return true;
        }
      })
      return true;
    }
  });
  return bearTurnEnd;
}