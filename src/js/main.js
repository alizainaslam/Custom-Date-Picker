/**
 * DOM element representing the each select input.
 * @type {HTMLSelectElement}
 */
const setYear = document.querySelector("#year");
const setMonth = document.querySelector("#month");
const setDate = document.querySelector("#date");

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
const monthName = [];
for (let i = 0; i < 12; i++) {
  const monthOption = document.createElement("option");
  const monthList = new Date(currentYear, i).toLocaleDateString(
    navigator.language,
    {
      month: "long",
    }
  );

  monthOption.textContent = monthList;
  monthName.push(monthList);
  setMonth.appendChild(monthOption);
  monthOption.hidden = i < currentMonth;
}
setMonth.value = monthName[currentMonth];
// Month Date
let date = new Date(currentYear, currentMonth + 1, 0).getDate();
const currentDate = new Date().getDate();
for (let i = 0; i <= date; i++) {
  const dateOption = document.createElement("option");
  dateOption.textContent = i;
  setDate.appendChild(dateOption);
  dateOption.hidden = i < currentDate;
}
setDate.value = currentDate;
// Event Handler
setYear.addEventListener("change", () => {
  for (let i = 0; i < setMonth.length; i++) {
    if (setYear.value > currentYear) {
      setMonth[i].hidden = false;
    } else {
      if (i < currentMonth) {
        setMonth[i].hidden = true;
        setMonth.value = monthName[currentMonth];
      }
    }
  }
  for (let i = 1; i < setDate.length; i++) {
    if (setYear.value > currentYear) {
      setDate[i].hidden = false;
    } else {
      if (i < currentDate) {
        setDate[i].hidden = true;
        setDate.value = currentDate;
      }
    }
  }
});

setMonth.addEventListener("change", () => {
  setDate.innerHTML = "";
  let date = new Date(
    setYear.value,
    monthName.indexOf(setMonth.value) + 1,
    0
  ).getDate();
  const currentDate = new Date().getDate();
  for (let i = 1; i <= date; i++) {
    const dateOption = document.createElement("option");
    dateOption.textContent = i;
    setDate.appendChild(dateOption);
    dateOption.hidden = false;
  }
  setDate.value = currentDate;
});
// Add event listener to the form for submission.
document.querySelector("form").addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  // Extract values from form fields
  const year = setYear.value;
  const date = setDate.value;
  let month;
  if (monthName.indexOf(setMonth.value) + 1 < 10) {
    month = `0${monthName.indexOf(setMonth.value) + 1}`;
  } else {
    month = monthName.indexOf(setMonth.value) + 1;
  }
  const queryString = `year=${year}&month=${month}&date=${date}`;

  // Alert the constructed query string
  alert(queryString);
}
