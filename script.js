const slider = document.getElementById("slider");
const rangeNum = document.getElementById("rangeValue");
const text = document.querySelector(".password_text");
const button = document.querySelector("#button");
const upperCase = document.getElementById("uppercase");
const lowerCase = document.getElementById("lowercase");
const number = document.getElementById("numbers");
const symbol = document.getElementById("symbols");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const barValue = document.querySelector("#bar-value");
const strengthBars = document.querySelectorAll(".strength-bar");

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(text.innerHTML);
    alert("Your password copied to clipboard => " + text.innerHTML);
  } catch (err) {
    alert("Failed to copy: ", err);
  }
};

function generatePassword(range, upperCase, lowerCase, number, symbol) {
  // Set up the characters that can be used in the password
  let charSet = "";
  if (upperCase) {
    charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (lowerCase) {
    charSet += "abcdefghijklmnopqrstuvwxyz";
  }
  if (number) {
    charSet += "0123456789";
  }
  if (symbol) {
    charSet += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  }

  let password = "";

  // Add characters to the password until it reaches the specified length
  while (password.length < range) {
    // Choose a random character from the set
    const char = charSet[Math.floor(Math.random() * charSet.length)];
    // Add the character to the password
    password += char;
  }

  // Shuffle the characters in the password
  return shuffle(password);
}

// Shuffle the characters in a string
function shuffle(str) {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

const resetBar = () => {
  strengthBars.forEach((el) => {
    el.classList.remove("bg-red");
    el.classList.remove("bg-orange");
    el.classList.remove("bg-yellow");
    el.classList.remove("bg-green");
    el.classList.add("strength-bar-empty");
  });
};

const generateSecurityBar = (
  options = {
      upperCase,
      lowerCase,
      number,
      symbol,
  }
) => {
  let totalOptions = 0;
  //  Get the total number of enabled options
  Object.keys(options).forEach((key) => {
      if (options[key]) totalOptions++;
  });

  // Reset the bar style to empty
  resetBar();

  //  Add the style to the bar
  for (let i = 0; i < totalOptions; i++) {
      strengthBars[i].classList.remove("strength-bar-empty");
      if (totalOptions === 1) {
          strengthBars[i].classList.add("bg-red");
          barValue.textContent = "TOO WEAK!";
      }
      if (totalOptions === 2) {
          strengthBars[i].classList.add("bg-orange");
          barValue.textContent = "WEAK";
      }
      if (totalOptions === 3) {
          strengthBars[i].classList.add("bg-yellow");
          barValue.textContent = "MEDIUM";
      }
      if (totalOptions === 4) {
          strengthBars[i].classList.add("bg-green");
          barValue.textContent = "STRONG";
      }
  }
};



button.addEventListener("click", function () {
  // Generate a new password and set it as the content of the password span
  text.innerHTML = generatePassword(
    slider.value,
    upperCase.checked,
    lowerCase.checked,
    number.checked,
    symbol.checked,
  );

  const options = {
    uppercase: upperCase.checked,
    lowercase: lowerCase.checked,
    number: number.checked,
    symbol: symbol.checked,
};

  generateSecurityBar( options );
});

// Add the event listener to the body
document.body.addEventListener("change", () => {
  // Enable the generate button if at least one checkbox is checked
  button.disabled = true;
  button.classList.add("disabled");

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked === true && rangeNum.textContent > "0") {
      button.disabled = false;
      button.classList.remove("disabled");
    }
  });
});

window.onload = function () {
  upperCase.checked = false;
  lowerCase.checked = false;
  number.checked = false;
  symbol.checked = false;
  button.disabled = true;
  button.classList.add("disabled");
};
