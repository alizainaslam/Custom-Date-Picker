/**
 * DOM element representing the each select input.
 * @type {HTMLSelectElement}
 */
const setYear = document.querySelector("#year");
const setMonth = document.querySelector("#month");
const setWeekday = document.querySelector("#weekday");

/**
 * Create new Date object
 */
const newDate = new Date();

/**
 * The current year
 * @type {number}
 */
const currentYear = newDate.getFullYear();

/**
 * The maximun year allowed, which is the current year plus 5.
 * @type {number}
 */
const maximumYear = currentYear + 5;

/**
 * Array to store the list of years
 * @type {number[]}
 */
const listOfYears = [];

let i = currentYear - 1;
while (i < maximumYear) {
  i++;
  listOfYears.push(i);
}

// Populate the year select input with options.
listOfYears.forEach((year) => {
  const option = document.createElement("option");
  option.value = year;
  option.text = year;
  setYear.appendChild(option);
});

/**
 * The current month
 * @type {string}
 */
const currentMonth = newDate.getMonth();

/**
 * Array to store the list of month names.
 * @type {string[]}
 */
const listOfMonths = [];

// Populate the list of month names.
Array.from({ length: 12 }, (_, i) => {
  return listOfMonths.push(
    new Date(currentYear, i).toLocaleDateString(undefined, {
      month: "long",
    })
  );
});

// Populate the month select input with options.
listOfMonths.forEach((month, index) => {
  const option = document.createElement("option");
  option.value = month;
  option.textContent = month;
  setMonth.appendChild(option);

  // Disable past months
  if (index < currentMonth) {
    option.disabled = true;
  }
});

// Set the default value of the month select input.
setMonth.value = listOfMonths[currentMonth];

// Handle past month's values if year is bigger than the current year.
setYear.addEventListener("change", () => {
  const selectedYear = parseInt(setYear.value);
  Array.from(setMonth).forEach((month, index) => {
    if (selectedYear > currentYear && index < currentMonth) {
      month.disabled = false;
    } else if (selectedYear <= currentYear && index < currentMonth) {
      month.disabled = true;
    }
  });
});

/**
 * The current weekday
 * @type {string}
 */
const currentWeekday = newDate.getDay();

/**
 *  Array to store the list of weekday names.
 * @type {string[]}
 */
const listOfWeekDays = [];

// Populate the list of weekday names.
Array.from({ length: 7 }, (_, i) => {
  const dayIndex = i + 3 + currentWeekday;
  return listOfWeekDays.push(
    new Date(currentYear, currentMonth, dayIndex).toLocaleDateString(
      undefined,
      {
        weekday: "long",
      }
    )
  );
});

// Populate the weekday select input with options.
listOfWeekDays.forEach((day, index) => {
  const option = document.createElement("option");
  option.value = day;
  option.textContent = day;
  setWeekday.appendChild(option);

  // Disable past days
  if (index !== currentWeekday) {
    option.disabled = true;
  }
});

// Set the default value of the weekday select input.
setWeekday.value = listOfWeekDays[currentWeekday];

// Disable past days 🔴
setMonth.addEventListener("change", () => {
  const selectedMonthIndex = listOfMonths.indexOf(setMonth.value);
  if (selectedMonthIndex !== listOfMonths[currentMonth]) {
    Array.from(setWeekday).forEach((day) => {
      if (day.disabled) {
        day.disabled = false;
      } else if (selectedMonthIndex > currentMonth) {
        day.disabled = false;
      } else if (selectedMonthIndex === currentMonth) {
        if (day.value !== listOfWeekDays[currentWeekday]) {
          day.disabled = true;
        }
      }
    });
  }
});

// Add event listener to the form for submission.
document.querySelector("form").addEventListener("submit", submitForm);

/**
 * Function to handle form submission.
 * @param {Event} event - The submit event,
 */
function submitForm(event) {
  event.preventDefault();
  alert(`${setWeekday.value} ${setMonth.value} ${setYear.value}`);
}
