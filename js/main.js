$(function(){
  const $empList = $(".employee-list");
  $.ajax('https://randomuser.me/api/?results=12', {
  	url: 'https://randomuser.me/api/?results=12',
  	dataType: 'json',
  	success: function(data){
       console.log(data.results);

      for(let i= 0; i <= 12; i++){
            $empList.append('<li>'+  '<a onClick= "modalShow()" ><img src="' + data.results[i].picture.medium +'"><div class = "info"></a><a>'
              + '<p class = "name"><b>' + data.results[i].name.first.charAt(0).toUpperCase()+data.results[i].name.first.slice(1)
              +' ' + data.results[i].name.last.charAt(0).toUpperCase()+data.results[i].name.last.slice(1) + '</b></p>'
              + '<p class = "email">' + data.results[i].email + '</p>'
              + '<p class = "city">' + data.results[i].location.city.charAt(0).toUpperCase()+ data.results[i].location.city.slice(1)
              + '</p></a></div>'+'</li>');
          }
      }
    });

});
function modalShow(){
  $.ajax('https://randomuser.me/api/', {
  	url: 'https://randomuser.me/api/',
  	dataType: 'json',
  	success: function(data){
       console.log($(this).data.results[0].location.street);
      }
    });
}
