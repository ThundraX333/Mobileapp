"use strict";

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop_button = document.getElementById("Stop");
const reset = document.getElementById("reset");

let startTime;      // Startボタンクリック時の時刻
let timeoutid;      // ID
let stopTime = 0;   // Stopまでの経過時間
let resultSound = [
  "sound/reset.mp3", // Index 0
  "sound/start.mp3", // Index 1
  "sound/stop1.mp3", // Index 2
  "sound/stop2.mp3"  // Index 3
];

// Sound Control Function - Corrected Logic
function soundControl(soundKey, soundFile) {
  if (soundFile) {
    let audio = new Audio(soundFile);
    audio.play().catch(error => {
      console.error(`Error playing sound ${soundKey} (${soundFile}):`, error);
    });
  }
}

// ボタンを"初期"状態とする
setButtonStateInitial()

// ... (Start Button Event Listener သည် မူလအတိုင်း)
////////////////////////
// Startボタンクリック
////////////////////////
start.addEventListener("click",
  function () {
    soundControl("start", resultSound[1]);
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  }, false
);

////////////////////////
// Stopボタンクリック
////////////////////////
stop_button.addEventListener("click",
  function () {
    soundControl("stop", resultSound[2]);

    // タイマーကို ရပ်တန့်ခြင်း
    setButtonStateStopped();
    clearTimeout(timeoutid);
    stopTime = Date.now() - startTime;
    
    // <span style="color:red;">✨ Fireworks Logic ထည့်သွင်းခြင်း</span>
    const body = document.body;
    
    // တွက်ချက်ရမည့် Target Time (10.000 seconds)
    const targetTime = 10000; // 10 seconds in milliseconds
    
    // အနီးဆုံးအချိန် (ဥပမာ 9.5 စက္ကန့်မှ 10.5 စက္ကန့်ကြား)
    const tolerance = 500; // +/- 0.5 seconds (500ms)
    
    // ခြားနားချက်ကို တွက်ချက်ခြင်း
    const timeDifference = Math.abs(stopTime - targetTime);

    // ခြားနားချက်က tolerance အတွင်းမှာ ရှိမရှိ စစ်ဆေးခြင်း
    if (timeDifference <= tolerance) {
      // <span style="color:red;">10 စက္ကန့်အနီးမှာ ရပ်ရင် fireworks.gif ကို ပြပါ</span>
      body.style.backgroundImage = "url('img/fireworks.gif')";
      // background-color ကို ဖျောက်ပြီး GIF ကိုသာ မြင်ရအောင်
      body.style.backgroundColor = "transparent"; 
      
      // Bonus: တွက်ချက်မှု တိကျတဲ့အခါ အသံပြောင်းဖွင့်ဖို့
      if (timeDifference <= 100) { // ဥပမာ 0.1 စက္ကန့်အတွင်းမှာ ရပ်ရင်
          soundControl("perfect_stop", resultSound[3]); // stop2.mp3 ကို ဖွင့်ပါ
      }

    } else {
      // <span style="color:red;">၁၀ စက္ကန့်နဲ့ ဝေးကွာနေရင် Background ကို ပုံမှန်အတိုင်းထားပါ</span>
      // Reset မှာ ပြန်ပြောင်းမယ့် အတိုင်း သတ်မှတ်ပါ
      body.style.backgroundImage = ""; 
      body.style.backgroundColor = "rgba(233, 168, 227, 0.6)"; 
    }

    // မူလ code မှာ backgroumdColor လို့ စာလုံးပေါင်းမှားနေသည် (backgroumdColor -> backgroundColor)
    // body.style.backgroumdColor = "rgba(0,0,0,0)"; // ဤလိုင်းကို အပေါ်က logic တွင် ပြင်ပြီးဖြစ်သည်။
  }, false
);


////////////////////////
// Resetボタンクリック
////////////////////////
reset.addEventListener("click",
  function () {
    soundControl("reset", resultSound[0]);

    // Buttons ကို Initial State ပြန်ထားခြင်း
    setButtonStateInitial();
    timer.textContent = "00:00.000";
    stopTime = 0;
    
    // <span style="color:red;">Background ကို သန့်ရှင်းစွာ ပြန်ထားခြင်း (Reset မှာ အမြဲလုပ်ရမည်)</span>
    const body = document.body;
    body.style.backgroundImage = "";
    // CSS မှာ သတ်မှတ်ထားတဲ့ မူရင်းအရောင်ကို ပြန်ထားခြင်း
    body.style.backgroundColor = "rgba(233, 168, 227, 0.6)"; 
  }
);


function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  /* padStart()で２桁固定表示とする */
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  /* 描画 */
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    //再帰呼び出し
    countUp();
  }, 10);
}

// 初期 または Reset後
function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop_button.classList.add("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.remove("js-unclickable");
  stop_button.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden"); //時間を見えなくする
  start.classList.add("js-inactive");   // 非活性
  stop_button.classList.remove("js-inactive");  // 活性
  reset.classList.add("js-inactive");   // 非活性
  start.classList.add("js-unclickable");
  stop_button.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden"); //時間を見えるようにする
  timer.classList.add(".timer_appear"); //時間をゆっくり表示
  start.classList.add("js-inactive"); // 活性
  stop_button.classList.add("js-inactive");     // 非活性
  reset.classList.remove("js-inactive"); // 活性
  start.classList.add("js-unclickable");
  stop_button.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
}