$(function(){
  const $empList = $(".employee-list");
  $.ajax('https://randomuser.me/api/?results=12', {
  	url: 'https://randomuser.me/api/?results=12',
  	dataType: 'json',
  	success: function(data){
       console.log(data.results);
      for(let i= 0; i <= 12; i++){
            $empList.append('<li>'+  '<img src="' + data.results[i].picture.large +'"><div class = "info"'
              + '<p class = "name"><b>' + data.results[i].name.first +' ' + data.results[i].name.last + '</b></p>'
              + '<p class = "email">' + data.results[i].email + '</p>'
              + '<p class = "city">' + data.results[i].location.city + '</p></div>'+'</li>');
          }
      }
});
});
