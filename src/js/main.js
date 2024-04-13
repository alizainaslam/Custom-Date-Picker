/**
 * DOM element representing the each select input.
 * @type {HTMLSelectElement}
 */
const setYear = document.querySelector("#year");
const setMonth = document.querySelector("#month");
const setDay = document.querySelector("#day");

// Year
const currentYear = new Date().getFullYear();
const maximumYear = currentYear + 5; // The maximum year allowed currentYear + 5.

for (let i = currentYear; i < maximumYear; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = i;
  setYear.appendChild(option);
}

// Month
const currentMonth = new Date().getMonth();
const monthNames = [];
for (let i = 0; i < 12; i++) {
  const monthOption = document.createElement("option");
  const monthList = new Date(currentYear, i).toLocaleDateString(
    navigator.language,
    {
      month: "long",
    }
  );

  monthOption.textContent = monthList;
  monthNames.push(monthList);
  setMonth.value = monthNames[currentMonth];
  setMonth.appendChild(monthOption);

  if (i < currentMonth) {
    monthOption.disabled = true;
  }
}

// Month Date
const dateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const currentDay = new Date().getDate();
for (let i = 1; i <= dateOfMonth; i++) {
  const dateOption = document.createElement("option");
  dateOption.textContent = i;
  setDay.value = currentDay;
  setDay.appendChild(dateOption);

  if (i < currentDay) {
    dateOption.disabled = true;
  }
}

// Event Handler
setYear.addEventListener("change", () => {
  if (setYear.value > currentYear) {
    for (let i = 0; i < setMonth.length; i++) {
      setMonth[i].disabled = false;
    }
  } else {
    for (let i = 0; i < setMonth.length; i++) {
      if (i < currentMonth) {
        setMonth[i].disabled = true;
      }
    }
  }
});

setMonth.addEventListener("change", () => {
  if (setMonth.value > monthNames[currentMonth]) {
    for (let i = 0; i < setDay.length; i++) {
      setDay[i].disabled = false;
    }
  } else {
    for (let i = 0; i < setDay.length; i++) {
      if (i < currentDay) {
        setDay[i].disabled = true;
      }
    }
  }
});

// Add event listener to the form for submission.
document.querySelector("form").addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  alert(`${setDay.value} ${setMonth.value} ${setYear.value}`);
}
