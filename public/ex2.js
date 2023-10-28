document.getElementById("call-api").addEventListener('click', () => {
  fetch('/api/countries', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "Sam",
      countries: [
        {
          name: "Italy",
          year: 2022
        },
        {
          name: "Ireland",
          year: 2021
        },
        {
          name: "USA",
          year: 2021
        }
      ]
    })
  }).then(response => response.text()).then(text => {
    document.getElementById("response").innerText = text;
  }).catch(err => {
    console.error(err);
  });
});