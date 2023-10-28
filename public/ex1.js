const createInput = (name, text, type) => {
  const div = document.createElement("div");
  const label = document.createElement("label");
  label.setAttribute("for", name);
  label.innerText = text;
  
  const input = document.createElement('input');
  input.name = name;
  input.type = "text";
  input.style.marginLeft = "4px";

  div.appendChild(label);
  div.appendChild(input);
  return {div, input};
}

const createCheckboxs = (name, text, options) => {
  const div = document.createElement("div");
  const label = document.createElement("label");
  label.setAttribute("for", name);
  label.innerText = text;

  div.appendChild(label);
  options.forEach((option) => {
    const optionDiv = document.createElement("div");
    const optionLabel = document.createElement("label");
    optionLabel.style.marginLeft = "4px";
    optionLabel.setAttribute("for", option);
    optionLabel.innerText = option;
    div.appendChild(optionLabel);
    const input = document.createElement('input');
    input.name = name;
    input.type = "radio";
    input.value = option.toLowerCase();

    optionDiv.appendChild(input);
    optionDiv.appendChild(optionLabel);
    div.appendChild(optionDiv);
  })
  return {div};
}

const createDropdown = (name, text, options) => {
  const div = document.createElement("div");
  const label = document.createElement("label");
  label.setAttribute("for", name);
  label.innerText = text;
  
  const select = document.createElement('select');
  select.name = name;
  select.style.marginLeft = "4px";

  Object.keys(options).forEach((option) => {
    const optionEl = document.createElement("option");
    optionEl.value = option;
    optionEl.innerText = options[option];
    select.appendChild(optionEl);
  });

  div.appendChild(label);
  div.appendChild(select);
  return {div};
}

const form = document.createElement('form');

// Inputs
const nameInput = createInput("name", "Name:", "text");
const emailInput = createInput("email", "Email:", "email");

const paymentMethods = createCheckboxs("payment", "Payment Type:", ["Cash", "Credit Card", "Google Pay", "Apple Pay"]);

const checkPromotions = document.createElement("input");
checkPromotions.type = "checkbox";
checkPromotions.name = "promotions";
checkPromotions.id = "promotions";
const promotionsLabel = document.createElement("label");
promotionsLabel.setAttribute("for", "promotions");
promotionsLabel.style.marginLeft = "4px";
promotionsLabel.innerText = "Sign me up for special promotions";

form.appendChild(nameInput.div);
form.appendChild(emailInput.div);

form.appendChild(paymentMethods.div);
form.appendChild(checkPromotions);
form.appendChild(promotionsLabel);

const preferredLocations = createDropdown("preferredLocations", "Preferred Location:", {
  'la': 'Los Angeles',
  'oc': 'Orange County',
  'riverside': 'Riverside',
  'sd': 'San Diego',
});

form.appendChild(preferredLocations.div);

const buttonDiv = document.createElement("div");

const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.innerText = "Submit";

const resetButton = document.createElement("button");
resetButton.type = "reset";
resetButton.innerText = "Cancel";
resetButton.style.marginLeft = "4px";

buttonDiv.appendChild(submitButton);
buttonDiv.appendChild(resetButton);
form.appendChild(buttonDiv);

document.getElementById("content").appendChild(form);

document.querySelector("form").addEventListener("submit", event => {
  event.preventDefault();

  fetch('/ex1/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.input.value,
      email: emailInput.input.value,
      payment: paymentMethods.div.querySelector('input[type="radio"]:checked'),
      promotions: checkPromotions.checked,
      preferredLocations: preferredLocations.div.querySelector('select').value,
    })
  }).then(response => response.text()).then(response => {
    const text = document.createElement("p");
    text.innerText = response;
    document.getElementById("content").appendChild(text);
  });
});