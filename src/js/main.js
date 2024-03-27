const setYear = document.querySelector("#year");
const setMonth = document.querySelector("#month");
const setWeekday = document.querySelector("#weekday");
document.querySelector("form").addEventListener("submit", submitForm);

/**
 * Create new Date
 * @type {Date} newDate
 */
const newDate = new Date();

/**
 * Section for YEAR field 1️⃣
 *
 * Set minimum year for currentYear,
 * set maximum year for currentYear + 5,
 *
 * @type {number} - currentYear
 * @type {number} - maximum
 *
 * Create array and push all year <min / max>,
 * @type {Array} - listOfYears
 */

const currentYear = newDate.getFullYear();
const maximumYear = currentYear + 5;

const listOfYears = [];

let i = currentYear - 1;
while (i < maximumYear) {
  i++;
  listOfYears.push(i);
}

listOfYears.forEach((year) => {
  const option = document.createElement("option");
  option.value = year;
  option.text = year;
  setYear.appendChild(option);
});

/**
 * Section for MONTH field 1️2️⃣
 *
 * Set currentMonth for current month,
 * @type {number} - currentMonth
 *
 * Create array and push list of month names,
 * @type {Array} - listOfMonths
 */
const currentMonth = newDate.getMonth();

const listOfMonths = [];

Array.from({ length: 12 }, (_, i) => {
  return listOfMonths.push(
    new Date(currentYear, i).toLocaleDateString(undefined, {
      month: "long",
    })
  );
});

listOfMonths.forEach((month, index) => {
  const option = document.createElement("option");
  option.value = month;
  option.textContent = month;
  setMonth.appendChild(option);

  if (index < currentMonth) {
    option.disabled = true;
  }
});

setMonth.value = listOfMonths[currentMonth];

/**
 * Handle submission form
 * @type {Event} event
 */
function submitForm(event) {
  event.preventDefault();
  console.log(setYear.value, setMonth.value);
}
