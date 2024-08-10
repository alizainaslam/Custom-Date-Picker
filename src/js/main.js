const setYear = document.querySelector("#year");
const setMonth = document.querySelector("#month");
const setDate = document.querySelector("#date");
const submitBtn = document.querySelector("#submit-btn");
const customDatePicker = document.querySelector("#custom-date-picker");

const currentYear = new Date().getFullYear();

// Year options
for (let i = 0; i < 10; i++) {
  setYear.children[i].textContent = currentYear + i;
}

// Month options
const currentMonth = new Date().getMonth();
for (let i = 0; i < 12; i++) {
  const monthNameInBrowserLang = new Date(currentYear, i).toLocaleDateString(
    navigator.language,
    { month: "long" }
  );
  setMonth.children[i].textContent = monthNameInBrowserLang;
  setMonth.children[i].value = i;
  setMonth.children[i].hidden = i < currentMonth;
}
setMonth.value = currentMonth;

// Date options
for (let i = 0; i < 31; i++) {
  setDate.children[i].textContent = i + 1;
  setDate.children[i].hidden = i < new Date().getDate() - 1;
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

// Custom Element

class customDatePickerElement extends HTMLElement {
  static formAssociated = true;
  static observedAttributes = ["value", "name", "required"];
  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  get value() {
    return this.getAttribute("value");
  }
  set value(newValue) {
    return this.setAttribute("value", newValue);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(newValue) {
    return this.setAttribute("name", newValue);
  }
  get required() {
    return this.getAttribute("required");
  }
  set required(isRequired) {
    if (isRequired) {
      this.setAttribute("required", "");
    } else {
      this.removeAttribute("required");
    }
  }
  connectedCallback() {
    this.name = "custom-date";
    this.required = true;
    this.updateValue();
    setYear.addEventListener("input", () => this.updateValue());
    setMonth.addEventListener("input", () => this.updateValue());
    setDate.addEventListener("input", () => this.updateValue());
  }
  updateValue() {
    const fullDate = `${setYear.value}-${String(
      Number(setMonth.value) + 1
    ).padStart(2, "0")}-${String(setDate.value).padStart(2, "0")}`;
    this.value = fullDate;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value") {
      this._internals.setFormValue(newValue);
    }
  }
  requiredHandler() {
    if (!this.required) {
      console.log("Required attribute is not set.");
    } else {
      console.log("Required attribute is set.");
    }
  }
}
customElements.define("custom-date-picker", customDatePickerElement);
console.log(customDatePicker);

document.querySelector("form").addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const submit = formData.get("custom-date");
  alert(submit);
});
