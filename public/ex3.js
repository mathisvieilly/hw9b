const form = document.createElement("form");

const titleLabel = document.createElement("label");
titleLabel.textContent = "Title:";
titleLabel.for = "title";

const input = document.createElement("input");
input.type = "text";
input.name = "title";
input.style.marginLeft = "4px";
input.style.marginBottom = "20px";

form.appendChild(titleLabel);
form.appendChild(input);

form.appendChild(document.createElement("br"));

const contentLabel = document.createElement("label");
contentLabel.textContent = "Content:";
contentLabel.for = "content";

const textarea = document.createElement("textarea");
textarea.style.height = "100px";
textarea.style.marginBottom = "10px";
textarea.name = "content";

const submitButton = document.createElement("button");
submitButton.textContent = "Add";
submitButton.type = "submit";

form.appendChild(contentLabel);
form.appendChild(document.createElement("br"));
form.appendChild(textarea);

form.appendChild(document.createElement("br"));

form.appendChild(submitButton);

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.target);
  if (!formData.get('title') || !formData.get('content')) {
    return;
  }

  fetch('/articles', {
    method: 'POST',
    body: formData
  })
  .then((response) => response.text())
  .then((response) => {
    form.reset();
    document.getElementById("response").innerText = response;
  });
});

document.getElementById("content").appendChild(form);