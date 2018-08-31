var url = 'https://restcountries.eu/rest/v2/name/';
var countriesList = $('#countries');

$('#search').click(searchCountries);

function searchCountries() {
	var countryName = $('#country-name').val();
	if(!countryName.length) {
		countryName = 'Poland';
	}
	$.ajax({
		 url: url + countryName,
		 method: 'GET',
		 success: showCountriesList
	 });
}

function showCountriesList(resp) {
	countriesList.empty();
	resp.forEach(function(item){
		const countryName = "<h4>" + item.name + "</h4>";
		const countryNativeName = "Native Name: " + item.nativeName; 
		const countryCapital = "Capital: " +  item.capital;
		const listLanguages = function() {
			const list = [];
			let list2;
			item.languages.forEach(function(lang){
				list.push(lang.name);
			})
			list2 = list.join(", ");
			return list2;
		}
		
	
		const countryLanguages = "Languages: " + listLanguages();

		const $country = $('<li>');
		const $countrySubList = $('<ul>');
		const $countryNativeName = $('<li>');
		const $countryCapital = $('<li>');
		const $countryLanguages = $('<li>');

		$country.html(countryName);
		$countryNativeName.html(countryNativeName);
		$countryCapital.html(countryCapital);
		$countryLanguages.html(countryLanguages);

		$country.appendTo(countriesList);
		$countryNativeName.appendTo($countrySubList);
		$countryCapital.appendTo($countrySubList);
		$countryLanguages.appendTo($countrySubList);
		$countrySubList.appendTo(countriesList);
		

	});
}

$("#country-name").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#search").click();
    }
});