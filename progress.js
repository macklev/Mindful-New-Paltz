document.addEventListener("DOMContentLoaded", () => {
  const activities = [
    { name: "River to Ridge Trail", type: "Nature", completed: false },
    { name: "Environmental Alliance", type: "Nature", completed: false },
    { name: "Mohonk Preserve", type: "Nature", completed: false },
    { name: "Outing Club", type: "Nature", completed: false },
    { name: "Vitality Yoga", type: "Movement", completed: false },
    { name: "Gambit Submission Fighting", type: "Movement", completed: false },
    { name: "NP Gym Group Exercise", type: "Movement", completed: false },
    { name: "Elting Memorial Library", type: "Community", completed: false },
    { name: "Dorsky Museum", type: "Community", completed: false },
    { name: "Greek Life Organizations", type: "Community", completed: false },
    { name: "Hall Government", type: "Service", completed: false },
    { name: "Helping Hands Food Pantry", type: "Service", completed: false },
  ];

  const progressContainer = document.querySelector("#progressPage #progressContainer");
  const activityDetails = document.querySelector("#progressPage #activityDetails");

  const typeDescriptions = {
    "Nature": "Hikes, outdoor adventures, and environmental activities",
    "Movement": "Yoga, fitness classes, and group exercise",
    "Community": "Clubs, campus events, and social gatherings",
    "Service": "Volunteering and service projects",
  };

  const types = [...new Set(activities.map(a => a.type))];

  types.forEach(type => {
    const typeActivities = activities.filter(a => a.type === type);
    const completedCount = typeActivities.filter(a => a.completed).length;
    const percent = Math.round((completedCount / typeActivities.length) * 100);

    const typeContainer = document.createElement("div");
    typeContainer.classList.add("type-container");

    typeContainer.innerHTML = `
      <div class="circle-wrapper">
        <svg class="circular-svg" width="120" height="120">
          <circle class="circular-bg" cx="60" cy="60" r="60"></circle>
          <circle class="circular-progress" cx="60" cy="60" r="60"></circle>
        </svg>
        <div class="circle-label">
          <span>${completedCount}/${typeActivities.length}</span>
          <span>(${percent}%)</span>
        </div>
      </div>
      <div class="type-info">
        <p>${typeDescriptions[type]}</p>
      </div>
    `;

    // Animate circle fill
    const progressCircle = typeContainer.querySelector(".circular-progress");
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;
    setTimeout(() => {
      progressCircle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    }, 100);

    typeContainer.addEventListener("click", () => showTypeDetails(type, typeActivities));
    progressContainer.appendChild(typeContainer);
  });

  function showTypeDetails(type, typeActivities) {
    activityDetails.innerHTML = `<h3>${type} Activities</h3>`;
    const list = document.createElement("ul");
    typeActivities.forEach(a => {
      const li = document.createElement("li");
      li.textContent = `${a.name} - ${a.completed ? "Completed" : "Not completed"}`;
      list.appendChild(li);
    });
    activityDetails.appendChild(list);
  }
});
