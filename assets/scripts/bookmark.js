var Bookmarks;
var rData
$(document).ready(function () {
	if (localStorage.getItem('Bookmarks') == undefined) {
		Bookmarks = [];
	} else {
		Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
	}
	if (localStorage.getItem('data') == undefined) {
		rData = [];
	} else {
		rData = JSON.parse(localStorage.getItem('data'));
	}

	$('#searchTable').on("click", "tr td a img", function (e) {
		e.preventDefault()
		var $row = $(this).closest('tr');
		var $tds = $row.find('td')
		console.log(rData)
		var $idx=$row.index()
		if(isBookmarked(rData[$idx]._id)){
			console.log('deleting')
			deleteFavorite(rData[$idx]._id)
		}
		else{
			console.log('adding')
		addFavorite(rData[$idx])
		}
	});
});


function addFavorite(data) {
	Bookmarks.push({...data});
	localStorage.setItem('Bookmarks', JSON.stringify(Bookmarks));
}

function deleteFavorite(id) {
	for (var i in Bookmarks) {
		if (Bookmarks[i]._id == id) {
			Bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem('Bookmarks', JSON.stringify(Bookmarks));
}


function isBookmarked(id){
	for(let i=0;i<Bookmarks.length;i++)
	{
		if(Bookmarks[i]._id==id){
			return true
		}
	}
	return false
}
// $tds[3].childNodes[0].attributes[1].value
// $tds[0].childNodes[0].data, $tds[1].childNodes[0].text, $tds[2].childNodes[0].data,$tds[3].childNodes[0].attributes[1].value



// function updateList() {
// 	if (typeof Bookmarks !== 'undefined' && Bookmarks.length > 0) {
// 		for (var i in Bookmarks) {
// 			console.log('Update List console', Bookmarks[i].name, Bookmarks[i].email, Bookmarks[i].number)
// 			$('.search-data-table').find('tbody').append("<tr class='search-data-row'>" +
// 				"<td>" + Bookmarks[i].name +
// 				"<br /><a href='' class='company-link'>" + Bookmarks[i].email + "</a>" +
// 				"</td>" +
// 				"<td>" +
// 				"<a href='mailto:'" + Bookmarks[i].email + "'>" + Bookmarks[i].email + "</a></td>" +
// 				"<td>" + Bookmarks[i].number +
// 				"</td>" +
// 				"<td>" +
//             "<a href='' data-id='" + Bookmarks[i].id + "'><img src='/assets/images/svgs/bookmark.svg' class='bookmark' alt=''></a>" +
//             "</td>" + 
// 				"</tr>"
// 			)
// 		}
// 	}
// }