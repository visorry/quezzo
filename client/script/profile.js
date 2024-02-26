const stats = document.getElementById("stats");
const badges = document.getElementById("badges");
const leaderboard = document.getElementById("leaderboard");
const statsSection = document.querySelector(".stats");
const badgesSection = document.querySelector(".badges");
const leaderboardSection = document.querySelector(".leaderboard");
const username = document.getElementById("username");
const point = document.getElementById("total-points");
const mainLeaderboard = document.getElementById("mainLeaderboard");
const rank = document.getElementById("rank");
var a = document.createElement("a");
a.href = "#";

const url = "https://variable-sculptress-6789-e41a.onrender.com";

username.innerHTML = localStorage.getItem("name");
point.innerHTML = localStorage.getItem("points");

stats.addEventListener("click", () => {
  leaderboard.classList.remove("selected");
  stats.classList.add("selected");
  badges.classList.remove("selected");
  statsSection.classList.remove("hid");
  badgesSection.classList.add("hid");
  leaderboardSection.classList.add("hid");
});

badges.addEventListener("click", () => {
  leaderboard.classList.remove("selected");
  stats.classList.remove("selected");
  badges.classList.add("selected");
  statsSection.classList.add("hid");
  badgesSection.classList.remove("hid");
  leaderboardSection.classList.add("hid");
});

leaderboard.addEventListener("click", () => {
  leaderboard.classList.add("selected");
  stats.classList.remove("selected");
  badges.classList.remove("selected");
  statsSection.classList.add("hid");
  badgesSection.classList.add("hid");
  leaderboardSection.classList.remove("hid");
});

const fetchData = async (endpoint) => {
  try {
    const res = await fetch(
      `${url}/${endpoint}?sort=totalScore&order=desc&limit=3`
    );
    const data = await res.json();
    console.log(data);
    appendLeaderboard(data);
  } catch (error) {
    console.log(error);
  }
};

const fetchRank = () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

fetchData("users/user");

const createLeaderboardCard = (item, index) => {
  const leaderCard = document.createElement("div");
  leaderCard.className = "leader-card";

  const leaderCont = document.createElement("div");
  leaderCont.className = "leader-cont";

  const leaderRank = document.createElement("span");
  leaderRank.className = "leader-rank";
  leaderRank.id = "leader-rank";
  leaderRank.innerHTML = index + 1;

  const img = document.createElement("img");
  img.src = "../assets/images/ganjaboy.png";
  img.alt = "ganja";

  const leaderDetails = document.createElement("div");
  leaderDetails.className = "leader-details";

  const username = document.createElement("p");
  username.id = "username";
  username.innerText = `${item.username}`;

  const p = document.createElement("p");
  const userScore = document.createElement("span");
  userScore.id = "user-score";

  userScore.innerHTML = `${item.totalScore} Points`;

  leaderCard.append(leaderCont, leaderDetails);
  leaderCont.append(leaderRank, img);
  leaderDetails.append(username, p);

  p.append(userScore);

  const medal = document.createElement("img");
  if (index + 1 === 1) {
    medal.src = "../assets/medals/gold-medal.png";
    leaderCard.append(medal);
  } else if (index + 1 === 2) {
    medal.src = "../assets/medals/silver-medal.png";
    leaderCard.append(medal);
  } else if (index + 1 === 3) {
    medal.src = "../assets/medals/bronze-medal.png";
    leaderCard.append(medal);
  }

  return leaderCard;
};

const appendLeaderboard = (data) => {
  mainLeaderboard.innerHTML = "";
  a.innerHTML = "See All Rankings";
  data.forEach((item, index) => {
    mainLeaderboard.append(createLeaderboardCard(item, index));
  });
};
/////////////////////////////badges rendering////////////
document.addEventListener("DOMContentLoaded", async () => {
  const url = "https://variable-sculptress-6789-e41a.onrender.com";

  const userId = localStorage.getItem("userId");

  const userData = await fetchUserData(userId);

  const initialScore = userData.totalScore;
  const badgesArray = document.querySelectorAll(" .badge ");

  badgesArray.forEach(async (badge) => {
    const badgeCover = badge.querySelector(".cover");
    const requiredScore = getRequiredScore(badge);
    if (initialScore >= requiredScore) {
      badgeCover.classList.add('hid');
    }
    // else {
    //   badgeCover.classList.add('hid');
    // }
  });
});

async function fetchUserData(userId) {
  try {
    const res = await fetch(`${url}/users/user/${userId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function getRequiredScore(badgeElement) {
  const badgeImage = badgeElement.querySelector("img");
  const badgeType = badgeImage.alt;

  switch (badgeType) {
    case "Iron-1":
      return 100;
    case "Bronze-1":
      return 200;
    case "Silver-1":
      return 400;
    case "Gold-1":
      return 450;
    case "Platinum-1":
      return 1000;
    case "Diamond-1":
      return 2000;
    case "Ascendant-1":
      return 50000;
    case "Immortal-1":
      return 70000;
    case "Radiant":
      return 98000;
    default:
      return 0;
  }
}
