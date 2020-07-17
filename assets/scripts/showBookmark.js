var favorites;
var storage;
$(document).ready(function(){
        storage = window.localStorage;
        if (storage.favorites == undefined) {
          favorites = [];
        } else {
          favorites = JSON.parse(storage.favorites);
        }
    
    $('#bookmarkTable').on("click", "tr td a" , function(e){
        console.log($(this))
        console.log($(this)[0].attributes[1].value)

        deleteFavorite($(this)[0].attributes[1].value);
        updateList();
        console.log('Hello')
      });
    
    
    function init(){
        updateList()
    }
    init()
})

function deleteFavorite(id) {
    for (var i in favorites) {
      if (favorites[i].id == id) {
          console.log('deleting')
        favorites.splice(i, 1);
      }
    }
    storage.setItem('favorites', JSON.stringify(favorites));
    console.log(favorites)
  }


  function updateList() {
    if (typeof favorites !== 'undefined' && favorites.length > 0) {
      
      for (var i in favorites) {
          console.log('Update List console' ,favorites[i].name , favorites[i].email , favorites[i].number)
        $('.search-data-table').find('tbody').append("<tr class='search-data-row'>" +
         "<td>" + favorites[i].name +
        "<br /><a href='' class='company-link'>"+ favorites[i].email + "</a>" + 
        "</td>" + 
        "<td>"+
        `<a href='mailto:${favorites[i].email}'>` + favorites[i].email + "</a></td>"+
      "<td>" + favorites[i].number + 
       "</td>"+ 
       "<td>"+
       "<a href='' data-id='" + favorites[i].id + "'><img src='/assets/images/svgs/bookmark.svg' class='bookmark bookmark-click' alt=''></a>"+
   "</td>"+
      "</tr>")
      }
    }
}
