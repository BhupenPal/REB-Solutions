            var chance;
			var favorites;
			var storage;

			$(document).ready(function() {
			  chance = new Chance(); // Just for random hash generation
			  if (window.Storage != undefined) {
			    storage = window.localStorage;
			    if (storage.favorites == undefined) {
			      favorites = [];
			    } else {
			      favorites = JSON.parse(storage.favorites);
			    }
			    updateList();

			    $('#fav').click(function(e) {
                    e.preventDefault()
                  var $row = $(this).closest('tr');
                  var $tds = $row.find('td')
                  console.log($tds[0].childNodes[0])
                  console.log($tds[1].childNodes[0])
                  console.log($tds[2].childNodes[0])
                //   addFavorite($tds[0].text(), $td[1].text(), $tds[2].text())
			    //   updateList();
			    });

			    $('#list').on('click', 'li a', function() {
			      deleteFavorite($(this).data('id'));
			      updateList();
			    });
			  } else {
			    // No support for local storage
			    // Fall back to cookies or session based storage
			  }
			});

			function addFavorite(name,email,number) {
			  favorites.push({
			    id: chance.hash({
			      length: 15
			    }),
               name : name,
               email : email,
               number  :number
			  });
			  storage.setItem('favorites', JSON.stringify(favorites));
			}

			function deleteFavorite(id) {
			  for (var i in favorites) {
			    if (favorites[i].id == id) {
			      favorites.splice(i, 1);
			    }
			  }
			  storage.setItem('favorites', JSON.stringify(favorites));
			}

			function updateList() {
			  $('#list').empty();
			  if (typeof favorites !== 'undefined' && favorites.length > 0) {
                
			    for (var i in favorites) {
                    console.log( favorites[i].name , favorites[i].email , favorites[i].number)
			      $('#list').append('<li>' +
			        favorites[i].name +  ' ' + favorites[i].email + ''+ favorites[i].number + 
			        '&nbsp;&nbsp;&nbsp;&nbsp;' +
			        '<a class="delete" href="#" data-id="' + favorites[i].id + '">delete</a>' +
			        '</li>');
			    }
			  } else {
			    $('#list').append('<li>Nothing stored!</li>');
			  }
			}
