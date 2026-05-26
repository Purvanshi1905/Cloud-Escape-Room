function startGame() {
  let team = document.getElementById("team").value;
  if (!team) return alert("Enter team name");

  localStorage.setItem("team", team);
  localStorage.setItem("startTime", Date.now());
  localStorage.setItem("progress", 1);

  window.location.href = "case.html";
}

function startTimer() {
  let start = localStorage.getItem("startTime");

  setInterval(() => {
    let diff = Math.floor((Date.now() - start) / 1000);
    let m = Math.floor(diff / 60);
    let s = diff % 60;

    document.getElementById("timer").innerText =
      `⏱ ${m}:${s < 10 ? "0" + s : s}`;
  }, 1000);
}

function loadDashboard() {
  let progress = localStorage.getItem("progress");

  for (let i = 1; i <= 5; i++) {
    let btn = document.getElementById("room" + i);
    if (i <= progress) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
      btn.classList.add("locked");
    }
  }
}

function unlockNext(room) {
  localStorage.setItem("progress", room + 1);
}

function useHint(id, text) {
  if (!localStorage.getItem(id)) {
    alert("💡 HINT: " + text);
    localStorage.setItem(id, true);
  } else {
    alert("Hint already used!");
  }
}