var chance;
var favorites;
var storage;

$(document).ready(function () {
	chance = new Chance(); // Just for random hash generation
	if (window.Storage != undefined) {
		storage = window.localStorage;
		if (storage.getItem('favorites') == undefined) {
			favorites = [];
		} else {
			favorites = JSON.parse(storage.getItem('favorites'));
		}

		$('#searchTable').on("click", "tr td a", function (e) {
			e.preventDefault()
			var $row = $(this).closest('tr');
			var $tds = $row.find('td')
			console.log($tds[0].childNodes)
			console.log($tds[1].childNodes)
			console.log($tds[2].childNodes[0])
			addFavorite($tds[0].childNodes[0].data, $tds[1].childNodes[1].childNodes[0].data, $tds[2].childNodes[0].data, $tds)
		});

		// $('#searchTable').on("click" , "tr td a" , function() {
		//   deleteFavorite($(this)[0].attributes[1].value);

		// });
	} else {
		// No support for local storage
		// Fall back to cookies or session based storage
	}
});

function addFavorite(name, email, number, tds) {
	var id = chance.hash({
		length: 15
	})
	favorites.push({
		id: id,
		name: name,
		email: email,
		number: number
	});
	storage.setItem('favorites', JSON.stringify(favorites));
	//   tds[3].attr('data-id', id)
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
	if (typeof favorites !== 'undefined' && favorites.length > 0) {

		for (var i in favorites) {
			console.log('Update List console', favorites[i].name, favorites[i].email, favorites[i].number)
			$('.search-data-table').find('tbody').append("<tr class='search-data-row'>" +
				"<td>" + favorites[i].name +
				"<br /><a href='' class='company-link'>" + favorites[i].email + "</a>" +
				"</td>" +
				"<td>" +
				"<a href='mailto:'" + favorites[i].email + "'>" + favorites[i].email + "</a></td>" +
				"<td>" + favorites[i].number +
				"</td>" +
				"</tr>")
		}
	}
}
