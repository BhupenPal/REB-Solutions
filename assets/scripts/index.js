// const { json } = require("express");
let count=0
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

            // bake_cookie('myData', data)
           var dataObj = {
               data : data,
               country : CountryElement,
               city : CityElement
                    }
            localStorage.setItem('myData', JSON.stringify(dataObj))
            console.log(JSON.parse(localStorage.getItem('myData')))

            window.location = 'http://localhost:3000/search'
            // console.log(read_cookie('myData'))

        } else {
            console.log("ERROR: AJAX COULD NOT CONNECT");
        }
    }
    xhr.send(`country=${CountryElement}&city=${CityElement}&pageNo=1`)
})

let cityCount = 0;
const countrySelect = document.getElementById('country')
countrySelect.addEventListener('onchange', (e)=>{
e.preventDefault()
cityCount++;
const CountryElement = document.getElementById('country').value
const xhr = new XMLHttpRequest()
xhr.open('POST', '/getcity', true)
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

       
       

        // console.log(read_cookie('myData'))

    } else {
        console.log("ERROR: AJAX COULD NOT CONNECT");
    }
}
xhr.send(`country=${CountryElement}&pageNo=${cityCount}`)
})


// function bake_cookie(name, data) {
//     var d = new Date();
//   d.setTime(d.getTime() + (24*60 * 60 * 1000));
//   var expires = "expires="+d.toGMTString();
//    var cookie = name + "=" + JSON.stringify(data)+ ";" + expires + ";path=/";
// // var cookie = "name=Agrim"+";"+expires
//     document.cookie = cookie;
//   }

//   function read_cookie(name) {
//      name = name + "=";
//   var ca = document.cookie.split(';');
//   for(var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
//    }

   