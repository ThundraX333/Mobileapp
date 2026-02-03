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

let winningLine = null;

// メッセージ (Message စာသားများ သတ်မှတ်ခြင်း)
const msgtxt1 = '<p class="image"><img src="img/penguins.jpg" width="61px" height="61px"></p><p class="text">Penguins Attack! (your turn)</p>';
const msgtxt2 = '<p class="image"><img src="img/whitebear.jpg" width="61px" height="61px"></p><p class="text">WhiteBear Attack! (computer turn)</p>';
const msgtxt3 = '<p class="image"><img src="img/penguins.jpg" width="61px" height="61px"></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src="img/whitebear.jpg" width="61px" height="61px"></p><p class="text animate__animated animate__lightSpeedInRight">WhiteBear Win!!</p>';
const msgtxt5 = '<p class="image"><img src="img/penguins.jpg" width="61px" height="61px"><img src ="img/whitebear.jpg" width=61px height=61px></p><p class ="text animate_bounceIn">Draw!!</p>';

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
  }, false
);

// ************************************************************
// square ကို click လုပ်တဲ့အခါ event trigger လုပ်ခြင်း (E-① မှ E-⑧)
// ************************************************************

// E-①... a_1 ကို click လုပ်တဲ့အခါ isSelect function ကို ခေါ်ခြင်း
a_1.addEventListener("click", () => {
  isSelect(a_1);
});

//Win or Lose judement Line を配列化
//
//javaScript でfilterを使う方法 :https://techacademy.jp/magazine/15575  

function JudgLine(targetArray, idArray) {
  return targetArray.filter(function (e) {
    return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
  })
}
/*
// E-②③④⑤⑥⑦⑧... ကျန်ရှိသော အကွက်များကို shorthand code ဖြင့် ရေးသားခြင်း
a_2.addEventListener("click", () => { isSelect(a_2); });
a_3.addEventListener("click", () => { isSelect(a_3); });
b_1.addEventListener("click", () => { isSelect(b_1); });
b_2.addEventListener("click", () => { isSelect(b_2); });
b_3.addEventListener("click", () => { isSelect(b_3); });
c_1.addEventListener("click", () => { isSelect(c_1); });
c_2.addEventListener("click", () => { isSelect(c_2); });
c_3.addEventListener("click", () => { isSelect(c_3); });

// ************************************************************
// click ထားတဲ့ square မှာ penguins သို့မဟုတ် bear ပြသခြင်း
// ************************************************************
*/

squaresArray.forEach(function (square) {
  square.addEventListener('click', () => {
    let gameOverFlg = isSelect(square);

    //GameOverではない場合、クマのターン(auto)
    if (gameOverFlg === "0") {
      const squaresBox = document.getElementById("squaresBox");
      squaresBox.classList.add("js-unclickable");//squares-boxをクリックできないようにする。
      setTimeout(
        function () {
          bearTurn();
        },
        "2000"
      );

    }
  });
});

function isSelect(selectSquare) {
  let gameOverFlg = "0";
  //クリックサウンド
  if (selectSquare.classList.contains("js-unclickable"))
    return;

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
      return gameOverFlg = "1";
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
      return gameOverFlg = "1";
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
    return gameOverFlg = "1";
  }

  return gameOverFlg = "0";
}

// ************************************************************
// J... メッセージ切り替え (Message ပြောင်းလဲပေးသည့် function)
// ************************************************************
function setMessage(id) {
  const msgtext = document.getElementById("msgtext");

  switch (id) {
    case "pen-turn":
      msgtext.innerHTML = msgtxt1;
      break;
    case "bear-turn":
      msgtext.innerHTML = msgtxt2;
      break;
    case "pen-Win":
      msgtext.innerHTML = msgtxt3;
      break;
    case "bear-Win":
      msgtext.innerHTML = msgtxt4;
      break;
    case "draw":
      msgtext.innerHTML = msgtxt5;
      break;
    default:
      msgtext.innerHTML = msgtxt1;
  }
}

// ************************************************************
// 勝敗判定（しょうはい　はんてい）
// ************************************************************
//classlistの使い方まとめ:https://giita.com/tomokichi ruby/items/2460c5902d19b81cace5

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
  //gameover sound
  let w_sound
  switch (status) {
    case "penguins":
      w_sound = gameSound[2];
      break;
    case "bear":
      w_sound = gameSound[3];
      break;
    case "draw":
      w_sound = gameSound[4];
      break;
  }

  let music = new Audio(w_sound);
  music.currentTime = 0;
  music.play();//再生

  // all square unclickable
  //squaresArray.forEach(function (square) {
  // square.classList.add("js-unclickable");
  // });
  const squaresBox = document.getElementById("squaresBox");
  squaresBox.classList.add("js-clickable");//square-boxをクリックできないようにする
  //display New Game button :display
  newgamebtn_display.classList.remove("js-hidden");

  //winEffect
  if (status === "penguins") {
    //winner-line penguins high-light
    if (winningLine) {
      winningLine.forEach(function (square) {
        square.classList.add("js-pen_highLight");
      });
    }
    //penguins win!! ==> snow color is pink
    $(document).snowfall({
      flakeColor: "rgb(255,240,245)",
      maxSpeed: 3,
      minSpeed: 1,
      maxSize: 20,
      minSize: 10,
      round: true
    });

  } else if (status === "bear") {
    //winner-line bear high-light
    if (winningLine) {
      winningLine.forEach(function (square) {
        square.classList.add("js-bear_highLight");
      });

    }
    //whitebear win!! ===> snow color is blue
    $(document).snowfall({
      flakeColor: "rgb(175,238,238)",
      maxSpeed: 3,
      minSpeed: 1,
      maxSize: 20,
      minSize: 10,
      round: true
    });
  }
}

newgamebtn.addEventListener("click", function () {
  //penguins turns
  flag = "pen-flag";
  //turn count
  counter = 9;
  winningLine = null;
  squaresArray.forEach(function (square) {
    square.classList.remove("js-pen-checked");
    square.classList.remove("js-bear-checked");
    square.classList.remove("js-unclickable");
    square.classList.remove("js-pen_highLight");
    square.classList.remove("js-bear_highLight");
    square.classList.add("js-clickable");

  });
  const squaresBox = document.getElementById("squaresBox");
  squaresBox.classList.remove("js-unclickable");//squares-boxをクリックできないようにする
  setMessage("pen-turn");
  newgamebtn_display.classList.add("js-hidden");

  //snowfall stop
  $(document).snowfall("clear");
});

function bearTurn() {
  let gameOverFlg = "0";

  const bearSquare = squaresArray.filter(function (square) {
    return square.classList.contains("js-clickable");
  });

  let n = Math.floor(Math.random() * bearSquare.length);
  gameOverFlg = isSelect(bearSquare[n]);

  //GameOverではない場合
  if (gameOverFlg === "0") {
    const squaresBox = document.getElementById("squaresBox");
    squaresBox.classList.remove("js-unclickable");
  }
}