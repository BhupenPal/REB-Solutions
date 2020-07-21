var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'))
var rData = []
$(document).ready(function () {
    var $favs
    let count = 1;
    $('.load-btn').on('click', function (e) {
        e.preventDefault()
        count++;
        const CountryElement = document.getElementById('country').value
        const CityElement = document.getElementById('city-trigger').value
        const xhr = new XMLHttpRequest()
        xhr.open('POST', '/search', true)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        xhr.onload = function () {
            if (this.status === 200) {
                try {
                    ResponseData = JSON.parse(this.response)
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
                        title: ResponseData.data,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }

                console.log(ResponseData.EndPage, count)
                if (ResponseData.EndPage == count - 1) {
                    $('.load-btn').hide()
                } else {
                    appendRows(ResponseData.data)
                }

            } else {
                console.log("ERROR: AJAX COULD NOT CONNECT");
            }
        }
        xhr.send(`country=${CountryElement}&city=${CityElement}&pageNo=${count}`)
    })

    $('#search-bar-form').on('submit', (e) => {
        e.preventDefault()
        $('.load-btn').hide()
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

                appendRows(data)
                $('.load-btn').show()
            } else {
                console.log("ERROR: AJAX COULD NOT CONNECT");
            }
        }
        xhr.send(`country=${CountryElement}&city=${CityElement}&pageNo=1`)
    })

    $('#searchTable').on('click','tr', function(e){
        e.preventDefault()
        // console.log(rData)
      var $idx=   $(this).index()
      var tempObj= rData[$idx]
        console.log(tempObj)
        return Swal.fire({
            position : 'center',
            title : tempObj.CompanyName,
            width: 600,
            html : ` <div class="container" style="font-size: medium; text-align: left; width: 100%;">
            <div id="first-container" style="width: auto;background: linear-gradient(to right,#E3EBFE,#CCD2E1,#C0C1C3); margin-bottom: 15px; padding: 20px; box-shadow: 5px 7px lightgrey;">
              <div style="padding: 15px;"><strong>Name: ${tempObj.CompanyName}</strong><br /></div>
              <div style="padding: 15px;"><strong>Location: ${tempObj.Location}</strong><br/></div>
              <div style="padding: 15px;"><strong>Website: ${tempObj.Website}</strong><br/></div>
            </div>
            <div id="second-container" style="background: linear-gradient(to right,#E3EBFE,#CCD2E1,#C0C1C3); margin-bottom: 15px; padding: 20px; box-shadow: 5px 7px lightgrey;">
              <div style="padding: 15px;"><strong>Turnover: ${tempObj.Turnover}</strong><br /></div>
              <div style="padding: 15px;"><strong>Employees: ${tempObj.Employees}</strong><br/></div>
              <div style="padding: 15px;"><strong>Industry Type: ${tempObj.Industry}</strong><br/></div> 
            </div>
            <div id="third-container" style="display: flex;flex-direction: column;background: linear-gradient(to right,#E3EBFE,#CCD2E1,#C0C1C3); margin-bottom: 15px; padding: 20px; box-shadow: 5px 7px lightgrey;">
              <div style="padding: 15px;display: flex;">
                  <div style="width: 50%;"><strong>Person Name: ${tempObj.Agent}</strong></div>
                  <div style="width: 50%;"><strong>Designation: ${tempObj.Designation}</strong><br/></div>
              </div>
            
              <div style="padding: 15px;display: flex;">
                  <div style="width: 50%;"><strong>Corporate Email ID: ${tempObj.CorporateEmail}</strong></div>
                  <div style="width: 50%;"><strong>Personal Email ID: ${tempObj.Email}</strong><br/></div>
              </div>
              <div style="padding: 15px;display: flex;">
                  <div style="width: 50%;"><strong>Work Number: ${tempObj.OfficeNum}</strong></div>
                  <div style="width: 50%;"><strong>Personal Number: ${tempObj.MobileNum}</strong><br/></div>
              </div>
            </div>
          </div>`
            
            })
        })

    function init() {
        const dataObj = JSON.parse(localStorage.getItem('SearchData'))
        if (dataObj !== null) {
            setCities({ value: dataObj.CountryElement })
            $('#country').val(dataObj.CountryElement)
            $('#city-trigger').val(dataObj.CityElement)
            appendRows(dataObj.data)
            $favs = $('.bookmark-link')
            console.log($favs)
            if(Bookmarks!==undefined){
                checkFavorite($favs)
            }
            localStorage.removeItem('SearchData')
        }
    }
    init()
})

function appendRows(data) {
    for (var i in data) {
        $('.search-data-table').find('tbody').append("<tr class='search-data-row'>" +
            "<td>" + data[i].CompanyName +
            "<br /><a href='' class='company-link'>" + data[i].CorporateEmail + "</a>" +
            "</td>" +
            "<td>" +
            `<a href='mailto:${data[i].CorporateEmail}'>` + data[i].CorporateEmail + "</a></td>" +
            "<td>" + data[i].MobileNum +
            "</td>" +
            "<td>" +
            "<a href='' data-id='" + data[i]._id + "' class='bookmark-link'><img src='/assets/images/svgs/bookmark.svg' class='bookmark' alt='' onclick='toggleBookmark(this)'></a>" +
            "</td>" +
            "</tr>")

            rData.push({...data[i]})
    }
}

function checkFavorite(data){
   for(let i=0;i<data.length;i++){
       for(let j=0;j<Bookmarks.length;j++)
       {
        //    console.log(Bookmarks[j])
           if(Bookmarks[j].id === data[i].attributes[1].value){
               data[i].childNodes[0].classList.add('bookmark-click')
           }
       }
   }

    // Bookmarks.forEach((b)=> {
    //     if(b.id === element[0].attributes[1].value){
    //         element[0].childNodes[0].classList.add('bookmark-click')
    //     }
    // })
}
