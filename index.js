//Управление диапазонами
const fromInput = document.querySelector(".from");
const toInput = document.querySelector(".to");
const rangeFrom = document.querySelector(".range-from");
const rangeTo = document.querySelector(".range-to");

function updateRangeFromInput() {
  rangeFrom.value = fromInput.value;
  rangeTo.value = toInput.value;
}

function updateInputFromRange() {
  fromInput.value = rangeFrom.value;
  toInput.value = rangeTo.value;
}

fromInput.addEventListener("input", () => {
  if (parseInt(fromInput.value) > parseInt(toInput.value)) {
    fromInput.value = toInput.value;
  }
  updateRangeFromInput();
});

toInput.addEventListener("input", () => {
  if (parseInt(toInput.value) < parseInt(fromInput.value)) {
    toInput.value = fromInput.value;
  }
  updateRangeFromInput();
});

rangeFrom.addEventListener("input", () => {
  if (parseInt(rangeFrom.value) > parseInt(rangeTo.value)) {
    rangeFrom.value = rangeTo.value;
  }
  updateInputFromRange();
});

rangeTo.addEventListener("input", () => {
  if (parseInt(rangeTo.value) < parseInt(rangeFrom.value)) {
    rangeTo.value = rangeFrom.value;
  }
  updateInputFromRange();
});

//Управление кастомными радио-кнопками
const radioButtons = document.querySelectorAll(
  'input[type="radio"][name="language"]'
);

radioButtons.forEach((radio) => {
  radio.addEventListener("change", function () {
    document.querySelectorAll("label").forEach((label) => {
      label.classList.remove("active");
    });

    if (this.checked) {
      const label = this.closest("label");
      label.classList.add("active");
    }
  });
});

//Установка текущего года
const currentYear = new Date().getFullYear();
document.querySelector(".currentYear").textContent = currentYear;

//Валидация ФИО
function validateFIO(fio) {
  const regex =
    /^[А-Яа-яЁёA-Za-z]{2,}\s[А-Яа-яЁёA-Za-z]{2,}\s[А-Яа-яЁёA-Za-z]{2,}$/;
  return regex.test(fio);
}

//Показ модального окна
function showModal() {
  document.querySelector(".modal-box").classList.add("active");
  document.querySelector(".overplay").classList.add("active");
}

function hideModal() {
  document.querySelector(".modal-box").classList.remove("active");
  document.querySelector(".overplay").classList.remove("active");
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const fio = document.querySelector(".fio").value;
  const fioError = document.querySelector(".fio-error");

  if (!validateFIO(fio)) {
    fioError.style.display = "block";
    return;
  } else {
    fioError.style.display = "none";
  }

  const from = document.querySelector(".from").value;
  const to = document.querySelector(".to").value;
  const select = document.querySelector(".select").value;
  const radio = document.querySelector('input[name="language"]:checked').value;
  const age = document.querySelector(".age").value;
  const requiredCheckbox = document.querySelector(".required").checked
    ? "Обязательный checkbox"
    : "";
  const unrequiredCheckbox = document.querySelector(".unrequired").checked
    ? "Необязательный checkbox"
    : "";
  const checkboxes = [requiredCheckbox, unrequiredCheckbox]
    .filter(Boolean)
    .join(", ");

  document.querySelector(
    ".modal-box__range"
  ).textContent = `от ${from} до ${to}`;
  document.querySelector(".modal-box__select").textContent = select;
  document.querySelector(".modal-box__radio").textContent = radio;
  document.querySelector(".modal-box__fio").textContent = fio;
  document.querySelector(".modal-box__age").textContent = age;
  document.querySelector(".modal-box__checkbox").textContent = checkboxes;

  showModal();
});

document.querySelector(".overplay").addEventListener("click", function () {
  hideModal();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    hideModal();
  }
});
