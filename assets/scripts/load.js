$(document).ready(function () {

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
            } else {
                console.log("ERROR: AJAX COULD NOT CONNECT");
            }
        }
        xhr.send(`country=${CountryElement}&city=${CityElement}&pageNo=1`)
    })

    function init() {
        const dataObj = JSON.parse(localStorage.getItem('SearchData'))
        if (dataObj !== null) {
            setCities({ value: dataObj.CountryElement })
            $('#country').val(dataObj.CountryElement)
            $('#city-trigger').val(dataObj.CityElement)
            appendRows(dataObj.data)
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
            "<a href='' data-id='" + data[i]._id + "'><img src='/assets/images/svgs/bookmark.svg' class='bookmark' alt=''></a>" +
            "</td>" +
            "</tr>")
    }
}