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

  // Handle if selectedYear bigger than currentYear, It'll effect on month's value.
  if (selectedYear > currentYear) {
    setMonth.value = listOfMonths[0];
  } else {
    setMonth.value = listOfMonths[currentMonth];
  }
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
const listOfWeekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Thursday",
  "Wednesday",
  "Friday",
  "Saturday",
];

// Populate the weekday select input with options.
listOfWeekDays.forEach((day) => {
  const option = document.createElement("option");
  option.value = day;
  option.textContent = day;
  setWeekday.appendChild(option);
});

// Set the default value of the weekday select input.
setWeekday.value = listOfWeekDays[currentWeekday];

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
