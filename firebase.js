// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔴 PASTE YOUR CONFIG HERE
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// SAVE RESULT
export async function saveScore(team, time) {
  await addDoc(collection(db, "leaderboard"), {
    team: team,
    time: time,
    timestamp: Date.now()
  });
}

// GET LEADERBOARD
export async function getLeaderboard() {
  const q = query(collection(db, "leaderboard"), orderBy("time"));
  const snapshot = await getDocs(q);

  let data = [];
  snapshot.forEach(doc => data.push(doc.data()));

  return data;
}