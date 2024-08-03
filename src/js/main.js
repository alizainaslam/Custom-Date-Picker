const setYear = document.querySelector("#year");
const setMonth = document.querySelector("#month");
const setDate = document.querySelector("#date");
const submitBtn = document.querySelector("#submit-btn");

const currentYear = new Date().getFullYear();
const maximumNextYearLimit = currentYear + 10;

// Year options
for (let i = currentYear; i <= maximumNextYearLimit; i++) {
  let optionElement = document.createElement("option");
  optionElement.textContent = i;
  optionElement.value = i;
  setYear.appendChild(optionElement);
}
setYear.value = currentYear;

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Month options
const currentMonth = new Date().getMonth();
for (let i = 0; i < 12; i++) {
  const monthNameInBrowserLang = new Date(currentYear, i).toLocaleDateString(
    navigator.language,
    { month: "long" }
  );
  let optionElement = document.createElement("option");
  optionElement.textContent = monthNameInBrowserLang;
  optionElement.value = i;
  setMonth.appendChild(optionElement);
  optionElement.hidden = i < currentMonth;
}
setMonth.value = currentMonth;

// Date options
for (let i = 1; i <= 31; i++) {
  let optionElement = document.createElement("option");
  optionElement.textContent = i;
  optionElement.value = i;
  optionElement.hidden = i < new Date().getDate();
  setDate.appendChild(optionElement);
}
setDate.value = new Date().getDate();

function updateDateOptions() {
  const selectedYear = Number(setYear.value);
  const selectedMonth = Number(setMonth.value);
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  while (setDate.firstChild) {
    setDate.removeChild(setDate.firstChild);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    let optionElement = document.createElement("option");
    optionElement.textContent = i;
    optionElement.value = i;
    setDate.appendChild(optionElement);
    if (selectedYear === currentYear && selectedMonth === currentMonth) {
      optionElement.hidden = i < new Date().getDate();
    } else {
      optionElement.hidden = false;
    }
  }

  setDate.value =
    selectedYear === currentYear && selectedMonth === currentMonth
      ? new Date().getDate()
      : 1;
}

// Event Listener => Year
setYear.addEventListener("change", function () {
  const selectedYear = Number(setYear.value);
  setMonth.childNodes.forEach((node) => {
    const monthValue = Number(node.value);
    node.hidden = selectedYear === currentYear && monthValue < currentMonth;
    if (selectedYear === currentYear && setMonth.value < currentMonth) {
      setMonth.value = currentMonth;
    }
  });
  updateDateOptions();
});

// Event Listener => Month
setMonth.addEventListener("change", updateDateOptions);

// Submit Date / alert
function submitDate() {
  const selectedYear = setYear.value;
  const selectedMonth = setMonth.value;
  const selectedDate = setDate.value;
  const fullDate = `${selectedYear}-${String(
    Number(selectedMonth) + 1
  ).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
  alert(`Selected Date: ${fullDate}`);
}

submitBtn.addEventListener("click", submitDate);
