const CountryCity = [
  {
    Country: "India",
    City: [
      "Pune",
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Chennai",
      "Hyderabad",
      "Chennai",
      "Ahemdabad"
    ],
  },
  {
    Country: "USA",
    City: [
      "DV7",
      "DB9",
      "DBS",
      "Rapide",
      "V8 Vantage",
      "Vanquish",
      "Vantage",
      "Virage"
    ],
  }
]

const setCities = (SelectBox) => {
  const cityBox = document.getElementById('city-trigger')
  cityBox.innerHTML = '<option disabled selected>City</option>'

  const cities = CountryCity.reduce((result, obj) => {
    if (obj.Country === SelectBox.value) {
      result = obj.City
    }
    return result
  }, null)

  for (let count = 0; count < cities.length; count++) {
    let opt = document.createElement('option');
    opt.value = cities[count];
    opt.innerHTML = cities[count];
    cityBox.appendChild(opt);
  }
}