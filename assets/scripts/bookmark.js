var Bookmarks;

$(document).ready(function () {
	if (localStorage.getItem('Bookmarks') == undefined) {
		Bookmarks = [];
	} else {
		Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
	}

	$('#searchTable').on("click", "tr td a", function (e) {
		e.preventDefault()
		var $row = $(this).closest('tr');
		var $tds = $row.find('td')
		addFavorite($tds[0].childNodes[0].data, $tds[1].childNodes[0].text, $tds[2].childNodes[0].data)
	});
});

function addFavorite(name, email, number) {
	Bookmarks.push({
		id: Math.floor(Math.random() * 1000000000),
		name: name,
		email: email,
		number: number
	});
	localStorage.setItem('Bookmarks', JSON.stringify(Bookmarks));
}

function deleteFavorite(id) {
	for (var i in Bookmarks) {
		if (Bookmarks[i].id == id) {
			Bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem('Bookmarks', JSON.stringify(Bookmarks));
}

function updateList() {
	if (typeof Bookmarks !== 'undefined' && Bookmarks.length > 0) {
		for (var i in Bookmarks) {
			console.log('Update List console', Bookmarks[i].name, Bookmarks[i].email, Bookmarks[i].number)
			$('.search-data-table').find('tbody').append("<tr class='search-data-row'>" +
				"<td>" + Bookmarks[i].name +
				"<br /><a href='' class='company-link'>" + Bookmarks[i].email + "</a>" +
				"</td>" +
				"<td>" +
				"<a href='mailto:'" + Bookmarks[i].email + "'>" + Bookmarks[i].email + "</a></td>" +
				"<td>" + Bookmarks[i].number +
				"</td>" +
				"</tr>"
			)
		}
	}
}