let hamburger = document.querySelector(".hamburger");
let hamMenu = document.querySelector(".ham-menu");
let button = document.querySelector('.searh-button')

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("change");
    hamMenu.classList.toggle("hide");
})

const SearchForm = document.getElementById('search-bar-form')
SearchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const CountryElement = document.getElementById('country').value
    const CityElement = document.getElementById('city-trigger').value
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/search', true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.onload = function () {
        if (this.status === 200) {
            try {
                data = JSON.parse(this.response).data
            } catch (err) {
                return Swal.fire({
                    position: 'top-end',
                    title: 'Please login first',
                    showConfirmButton: true,
                    timer: 1500
                })
            }

            if (this.response.includes('Please subscribe')) {
                return Swal.fire({
                    position: 'top-end',
                    title: data,
                    showConfirmButton: false,
                    timer: 2000
                })
            }

            console.log(data)
        } else {
            console.log("ERROR: AJAX COULD NOT CONNECT");
        }
    }
    xhr.send(`country=${CountryElement}&city=${CityElement}&pageNo=1`)
})