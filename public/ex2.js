document.getElementById("call-api").addEventListener('click', () => {
  fetch('/api/countries', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "Mathis",
      countries: [
        {
          name: "USA",
          year: 2023
        }
      ]
    })
  }).then(response => response.text()).then(text => {
    document.getElementById("response").innerText = text;
  }).catch(err => {
    console.error(err);
  });
});