document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("activities")) || [];

  const progressContainer = document.getElementById("progressContainer");
  const activityDetails = document.getElementById("activityDetails");

  const typeDescriptions = {
    "Nature": "Explore the outdoors with trail reccommendations and nature activities.",
    "Movement": "Yoga, fitness classes, and group exercise",
    "Community": "Clubs, campus events, and social gatherings",
    "Service": "Volunteering and service projects",
  };

  const types = ["Nature","Movement","Community","Service"];

  types.forEach(type => {
    const typeActivities = saved.filter(a => a.type === type);
    const completed = typeActivities.filter(a => a.completed).length;
    const total = typeActivities.length;
    const percent = total ? Math.round((completed / total) * 100) : 0;

    const container = document.createElement("div");
    container.classList.add("type-container");
    container.innerHTML = `
      <div class="circle-wrapper">
        <svg class="circular-svg" width="120" height="120">
          <circle class="circular-bg" cx="60" cy="60" r="60"></circle>
          <circle class="circular-progress" cx="60" cy="60" r="60"></circle>
        </svg>
        <div class="circle-label">
          <span>${completed}/${total}</span>
          <span>(${percent}%)</span>
        </div>
      </div>
      <div class="type-info">
        <p>${typeDescriptions[type]}</p>
      </div>
    `;

    const circle = container.querySelector(".circular-progress");
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;

    container.addEventListener("click", () => showDetails(type, typeActivities));
    progressContainer.appendChild(container);
  });

  function showDetails(type, typeActivities) {
    activityDetails.innerHTML = `<h3>${type} Activities</h3>`;
    const ul = document.createElement("ul");
    typeActivities.forEach(a => {
      const li = document.createElement("li");
      li.textContent = `${a.name} - ${a.completed ? "Completed" : "Not completed"}`;
      ul.appendChild(li);
    });
    activityDetails.appendChild(ul);
  }
});
