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

  // Load saved completion state
  const saved = JSON.parse(localStorage.getItem("activities"));
  if (saved) activities = activities.map(a => {
    const s = saved.find(sa => sa.name === a.name);
    if (s) a.completed = s.completed;
    return a;
  });

  const container = document.getElementById("activityContainer");

  let selectedSeasons = [];
  let selectedTypes = [];
  let selectedPrices = [];
  let selectedDistances = [];

  function setupButtons(selector, stateArray, key) {
    document.querySelectorAll(selector).forEach(btn => {
      btn.addEventListener("click", () => {
        const value = btn.dataset[key];
        if (stateArray.includes(value)) {
          stateArray.splice(stateArray.indexOf(value), 1);
          btn.classList.remove("active");
        } else {
          stateArray.push(value);
          btn.classList.add("active");
        }
        filterActivities();
      });
    });
  }

  setupButtons(".season-btn", selectedSeasons, "season");
  setupButtons(".type-btn", selectedTypes, "type");
  setupButtons(".price-btn", selectedPrices, "price");
  setupButtons(".distance-btn", selectedDistances, "distance");

  function display(list) {
    container.innerHTML = "";
    if (!list.length) {
      container.innerHTML = "<p>No activities match your filters.</p>";
      return;
    }

    list.forEach(a => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3>${a.name}</h3>
        <p>${a.type} | ${a.season.join(", ")}</p>
        <p>${Array.isArray(a.price) ? a.price.join(", ") : a.price} | ${a.distance}</p>
        <button class="complete-btn">${a.completed ? "Completed" : "Mark Complete"}</button>
      `;
      card.querySelector(".complete-btn").addEventListener("click", () => {
        a.completed = !a.completed;
        localStorage.setItem("activities", JSON.stringify(activities));
        display(filterActivities()); // update display
      });
      container.appendChild(card);
    });
  }

  function filterActivities() {
    const filtered = activities.filter(a => {
      const seasonMatch = !selectedSeasons.length || a.season.some(s => selectedSeasons.includes(s));
      const typeMatch = !selectedTypes.length || selectedTypes.includes(a.type);
      const priceMatch = !selectedPrices.length || (Array.isArray(a.price) ? a.price.some(p => selectedPrices.includes(p)) : selectedPrices.includes(a.price));
      const distanceMatch = !selectedDistances.length || selectedDistances.includes(a.distance);
      return seasonMatch && typeMatch && priceMatch && distanceMatch;
    });
    display(filtered);
    return filtered;
  }

  display(activities);
});
