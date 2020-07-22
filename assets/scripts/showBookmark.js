var favorites;
var storage;
var rData
$(document).ready(function () {
  storage = window.localStorage;
  if (storage.getItem('Bookmarks') == undefined) {
    favorites = [];
  } else {
    favorites = JSON.parse(storage.getItem('Bookmarks'));
  }
  if (storage.getItem('data') == undefined) {
    rData = [];
  } else {
    rData = JSON.parse(storage.getItem('data'));
  }

  $('#bookmarkTable').on('click','.companyname', function(e){
    e.preventDefault()
    // console.log(rData)
  var $idx=   $(this).index()
  console.log($idx)
var tempObj = Bookmarks[$idx]
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

  $('#bookmarkTable').on("click", "tr td a", function (e) {
    console.log($(this))
    console.log($(this)[0].attributes[1].value)

    deleteFavorite($(this)[0].attributes[1].value);
    updateList();
    console.log('Hello')
  });


  function init() {
    updateList()
  }
  init()
})

function deleteFavorite(id) {
  for (var i in favorites) {
    if (favorites[i]._id == id) {
      console.log('deleting')
      favorites.splice(i, 1);
    }
  }
  storage.setItem('Bookmarks', JSON.stringify(favorites));
  console.log(favorites)
}


function updateList() {
  if (typeof favorites !== 'undefined' && favorites.length > 0) {

    for (var i in favorites) {
      console.log('Update List console', favorites[i].CompanyName, favorites[i].CorporateEmail, favorites[i].MobileNum)
      $('.search-data-table').find('tbody').append("<tr class='search-data-row'>" +
        "<td class='companyname' title='Click to get full information' style='cursor:pointer;'>" + favorites[i].CompanyName +
        "<br /><a href='' class='company-link'>" + favorites[i].CorporateEmail + "</a>" +
        "</td>" +
        "<td>" +
        `<a href='mailto:${favorites[i].CorporateEmail}'>` + favorites[i].CorporateEmail + "</a></td>" +
        "<td>" + favorites[i].MobileNum +
        "</td>" +
        "<td>" +
        "<a href='' data-id='" + favorites[i]._id + "'><img src='/assets/images/svgs/bookmark.svg' class='bookmark bookmark-click' alt=''></a>" +
        "</td>" +
        "</tr>")
    }
  }
}
