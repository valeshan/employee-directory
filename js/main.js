$(function(){

  const $empList = $(".employee-list");
  $.ajax("https://randomuser.me/api/", {
  	Url: 'https://randomuser.me/api/',
  	dataType: 'json',
  	success: function(people){
        console.log(people.results[0]);
        $empList.append('<li>'+  '<img src="' + people.results[0].picture.large +'"><div class = "info"'
        + '<p class = "name"><b>' + people.results[0].name.first +' ' + people.results[0].name.last + '</b></p>'
        + '<p class = "email">' + people.results[0].email + '</p>'
        + '<p class = "city">' + people.results[0].location.city + '</p></div>'+'</li>');
      }
});
});
