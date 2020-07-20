

$(document).ready(function(){

let count =1;
    $('.load-btn').on('click', function(e){
        e.preventDefault()
        count++;
        const localData =JSON.parse(localStorage.getItem('myData'))
        console.log(localData)
        const CountryElement = localData.country
        const CityElement = localData.city
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
    
                // window.location = 'http://localhost:3000/search'
                console.log(data.length)
                if(data.length > 0){
                appendRows(data)
                }else if(data.length===0){
                    $('.load-btn').hide()
                }

    
            } else {
                console.log("ERROR: AJAX COULD NOT CONNECT");
            }
        }
        xhr.send(`country=${CountryElement}&city=${CityElement}&pageNo=${count}`)
    })
    $('#search-bar-form').on('submit', (e) => {
        
         e.preventDefault()
         $('.search-data-table tr').remove()
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
     
                 // window.location = 'http://localhost:3000/search'
                 
                 appendRows(data)
                 var dataObj = {
                    data : data,
                    country : CountryElement,
                    city : CityElement
                         }
                 localStorage.setItem('myData', JSON.stringify(dataObj))
                 console.log(JSON.parse(localStorage.getItem('myData')))
                 $('#country').val(CountryElement)
                 $('#city-trigger').val(CityElement)
     
             } else {
                 console.log("ERROR: AJAX COULD NOT CONNECT");
             }
         }
         xhr.send(`country=${CountryElement}&city=${CityElement}&pageNo=1`)
     })
     function init(){
         console.log(JSON.parse(localStorage.getItem('myData')))
         const dataObj = JSON.parse(localStorage.getItem('myData'))
         $('#country').val(dataObj.country)
         $('#city-trigger').val(dataObj.city)
         appendRows(dataObj.data)
        console.log(dataObj.data)

     }
     init()
    })



   


  function appendRows(data){
    for (var i in data) {
        // console.log('Update List console', data[i].CompanyName, data[i].CorporateEmail, data[i].MobileNum)
        $('.search-data-table').find('tbody').append("<tr class='search-data-row'>" +
          "<td>" + data[i].CompanyName +
          "<br /><a href='' class='company-link'>" + data[i].CorporateEmail + "</a>" +
          "</td>" +
          "<td>" +
          `<a href='mailto:${data[i].CorporateEmail}'>` + data[i].CorporateEmail + "</a></td>" +
          "<td>" + data[i].MobileNum +
          "</td>" +
          "<td>" +
          "<a href='' data-id='" + data[i]._id + "'><img src='/assets/images/svgs/bookmark.svg' alt=''></a>" +
          "</td>" +
          "</tr>")
      }
  }
  

  
