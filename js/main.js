  const $empList = $(".employee-list");


//append modal
const $modal = $("<div id='modal'></div>");
$("body").append($modal);


//list of employees
function empList(employees){
  $.each(employees, function(i, employee){
        $empList.append('<li>'+  '<a onClick= "modalShow()" ><img src="' + employee.picture.medium +'"><div class = "info"></a><a>'
          + '<p class = "name"><b>' + employee.name.first.charAt(0).toUpperCase()+employee.name.first.slice(1)
          +' ' + employee.name.last.charAt(0).toUpperCase()+employee.name.last.slice(1) + '</b></p>'
          + '<p class = "email">' + employee.email + '</p>'
          + '<p class = "city">' + employee.location.city.charAt(0).toUpperCase()+ employee.location.city.slice(1)
          + '</p></a></div>'+'</li>');
        });
}


//employee modal
function modalShow(){

}

//ajax request
$.ajax('https://randomuser.me/api/?results=12', {
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data){
//     console.log(data.results);
    let employees = data.results;
    empList(employees);
    }
  });
