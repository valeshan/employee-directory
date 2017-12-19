$(function(){

  const $empList = $(".employee-list");
  $.ajax("https://randomuser.me/api/", {
  	Url: 'https://randomuser.me/api/',
  	dataType: 'json',
    type: 'GET',
  	success: function(people){
        console.log(people.results[0]);
        $empList.append('<li>name: '+ people.results[0].name.first +' ' + people.results[0].name.last + '</li>');
      }
});
});
