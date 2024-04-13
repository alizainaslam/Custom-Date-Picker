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
const monthNameList = [];
for (let i = 0; i < 12; i++) {
  const monthOption = document.createElement("option");
  const monthList = new Date(currentYear, i).toLocaleDateString(
    navigator.language,
    {
      month: "long",
    }
  );

  monthOption.textContent = monthList;
  monthNameList.push(monthList);
  setMonth.appendChild(monthOption);

  monthOption.hidden = i < currentMonth;
}
setMonth.value = monthNameList[currentMonth];

// Month Date
let dateNumberList = new Date(currentYear, currentMonth + 1, 0).getDate();
const currentDate = new Date().getDate();
for (let i = 1; i <= dateNumberList; i++) {
  const dateOption = document.createElement("option");
  dateOption.textContent = i;
  setDate.appendChild(dateOption);
  dateOption.hidden = i < currentDate;
}
setDate.value = currentDate;

// Event Handler
setYear.addEventListener("change", () => {
  if (setYear.value > currentYear) {
    for (let i = 0; i < setMonth.length; i++) {
      setMonth[i].hidden = false;
    }
  } else {
    for (let i = 0; i < setMonth.length; i++) {
      if (i < currentMonth) {
        setMonth[i].hidden = true;
      }
    }
  }

  if (setMonth.value <= monthNameList[currentMonth]) {
    for (let i = 0; i < setDate.length; i++) {
      setDate[i].hidden = false;
    }
  }
  if (setYear.value <= currentYear) {
    for (let i = 0; i < setDate.length; i++) {
      if (i < currentDate) {
        setDate[i].hidden = true;
        setMonth.value = monthNameList[currentMonth];
        setDate.value = currentDate;
      }
    }
  }
});

setMonth.addEventListener("change", () => {
  setDate.innerHTML = "";
  dateNumberList = new Date(
    currentYear,
    monthNameList.indexOf(setMonth.value) + 1,
    0
  ).getDate();
  for (let i = 1; i <= dateNumberList; i++) {
    const dateOption = document.createElement("option");
    dateOption.textContent = i;
    setDate.appendChild(dateOption);
    dateOption.hidden = i < currentDate;
  }
  if (setMonth.value > monthNameList[currentMonth]) {
    for (let i = 0; i < setDate.length; i++) {
      setDate[i].hidden = false;
    }
  } else {
    for (let i = 0; i < setDate.length; i++) {
      setDate[i].hidden = i < currentDate;
    }
    setDate.value = currentDate;
  }
});

// Add event listener to the form for submission.
document.querySelector("form").addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  const valueOfYear = setYear.value;
  const valueOfDate = setDate.value;
  let valueOfMonth;
  if (monthNameList.indexOf(setMonth.value) + 1 < 10) {
    valueOfMonth = `0${monthNameList.indexOf(setMonth.value) + 1}`;
  } else {
    valueOfMonth = monthNameList.indexOf(setMonth.value) + 1;
  }
  alert(`date=${valueOfYear}-${valueOfMonth}-${valueOfDate}`);
}
