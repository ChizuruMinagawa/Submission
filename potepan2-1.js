const timeElement = document.getElementById('time');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

let timer;
let startTime; //開始時間
let elapsedTime = 0; // 経過時間のミリ秒
let holdTime = 0; //一時停止時間保持

//タイマー表記
function updateTime() {
  const ms = elapsedTime % 1000;
  const s = Math.floor(elapsedTime / 1000) % 60;
  const m = Math.floor(elapsedTime / (1000*60)) % 60;
  const h = Math.floor(elapsedTime / (1000*60*60));
  
  const msStr = ms.toString().padStart(3,'0');
  const sStr = s.toString().padStart(2,'0');
  const mStr = m.toString().padStart(2,'0');
  const hStr = h.toString().padStart(2,'0');
  
  timeElement.innerHTML = `${hStr}:${mStr}:${sStr}.${msStr}`;
}

//計測
function measureTime() {
  timer = setTimeout(function() {
    elapsedTime = Date.now() - startTime + holdTime;
    updateTime();
    measureTime();
    },10);
  }

//スタート
start.addEventListener('click',function(e) {
  startTime = Date.now();
  measureTime();
  start.disabled = true;
  stop.disabled = false;
  reset.disabled = false;
});

//ストップ
stop.addEventListener('click',function(e) {
  clearInterval(timer);
  holdTime += Date.now() - startTime;
  start.disabled = false;
  stop.disabled = true;
  reset.disabled = false;
});

//リセット
reset.addEventListener('click',function(e) {
  clearInterval(timer);
  elapsedTime = 0;
  holdTime = 0;
  updateTime();
  start.disabled = false;
  stop.disabled = true;
  reset.disabled = true;
});