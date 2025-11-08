document.addEventListener("DOMContentLoaded", () => {

  let activities = [
    { name: "River to Ridge Trail", type: "Nature", season: ["Fall","Spring","Summer"], price: "Free", distance: "In New Paltz", completed: false },
    { name: "Environmental Alliance", type: "Nature", season: ["Fall","Winter","Spring"], price: "Free", distance: "On campus", completed: false },
    { name: "Mohonk Preserve", type: "Nature", season: ["Fall","Winter","Spring","Summer"], price: ["$","$$"], distance: "Hudson Valley", completed: false },
    { name: "Outing Club", type: "Nature", season: ["Fall","Winter","Spring"], price: "Free", distance: "On campus", completed: false },
    { name: "Vitality Yoga", type: "Movement", season: ["Fall","Winter","Spring","Summer"], price: "$$", distance: "In New Paltz", completed: false },
    { name: "Gambit Submission Fighting", type: "Movement", season: ["Fall","Winter","Spring","Summer"], price: "$$", distance: "In New Paltz", completed: false },
    { name: "NP Gym Group Exercise", type: "Movement", season: ["Fall","Winter","Spring"], price: "Free", distance: "On campus", completed: false },
    { name: "Elting Memorial Library", type: "Community", season: ["Fall","Winter","Spring","Summer"], price: "Free", distance: "In New Paltz", completed: false },
    { name: "Dorsky Museum", type: "Community", season: ["Fall","Winter","Spring","Summer"], price: "Free", distance: "On campus", completed: false },
    { name: "Greek Life Organizations", type: "Community", season: ["Fall","Winter","Spring","Summer"], price: ["Free","$","$$","$$$"], distance: "On campus", completed: false },
    { name: "Hall Government", type: "Service", season: ["Fall","Winter","Spring"], price: "Free", distance: "On campus", completed: false },
    { name: "Human Services Club", type: "Service", season: ["Fall","Winter","Spring"], price: "Free", distance: "On campus", completed: false },
    { name: "Family of New Paltz", type: "Service", season: ["Fall","Winter","Spring","Summer"], price: "Free", distance: "In New Paltz", completed: false },
    { name: "Helping Hands Food Pantry", type: "Service", season: ["Fall","Winter","Spring","Summer"], price: "Free", distance: "Hudson Valley", completed: false },
  ];

  const saved = JSON.parse(localStorage.getItem("activities"));
  if (saved) {
    activities = activities.map(a => {
      const found = saved.find(sa => sa.name === a.name);
      if (found) a.completed = found.completed;
      return a;
    });
  }

  const container = document.getElementById("activityContainer");

  let selectedSeasons = [];
  let selectedTypes = [];
  let selectedPrices = [];
  let selectedDistances = [];


  function setupButtonGroup(selector, stateArray, key) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const value = button.dataset[key];
        if (stateArray.includes(value)) {
          stateArray.splice(stateArray.indexOf(value), 1);
          button.classList.remove("active");
        } else {
          stateArray.push(value);
          button.classList.add("active");
        }
        filterActivities();
      });
    });
  }

  setupButtonGroup(".season-btn", selectedSeasons, "season");
  setupButtonGroup(".type-btn", selectedTypes, "type");
  setupButtonGroup(".price-btn", selectedPrices, "price");
  setupButtonGroup(".distance-btn", selectedDistances, "distance");

  function displayActivities(list) {
    container.innerHTML = "";
    list.forEach(a => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${a.name}</h3>
        <p>${a.type} | ${a.season.join(", ")}</p>
        <p>${Array.isArray(a.price) ? a.price.join(", ") : a.price} | ${a.distance}</p>
        <button class="complete-btn">${a.completed ? "Completed" : "Mark Complete"}</button>
      `;

      const btn = card.querySelector(".complete-btn");
      btn.addEventListener("click", () => {
        a.completed = !a.completed;
        btn.textContent = a.completed ? "Completed" : "Mark Complete";
        localStorage.setItem("activities", JSON.stringify(activities));
      });

      container.appendChild(card);
    });
  }

  function filterActivities() {
    const filtered = activities.filter(a => {
      const matchSeason = selectedSeasons.length === 0 || a.season.some(s => selectedSeasons.includes(s));
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(a.type);
      const matchPrice = selectedPrices.length === 0 || 
        (Array.isArray(a.price) ? a.price.some(p => selectedPrices.includes(p)) : selectedPrices.includes(a.price));
      const matchDistance = selectedDistances.length === 0 || selectedDistances.includes(a.distance);

      return matchSeason && matchType && matchPrice && matchDistance;
    });

    displayActivities(filtered);
  }

  displayActivities(activities);
});
