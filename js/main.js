const $empList = $(".employee-list");


//append modal
const $overlay = $("<div id='overlay'></div>");
const $modal = $('<div id = "modal"></div>');
const $image = $('<img id="modal-image">');
const $basicInfo = $("<div id = 'basicInfo'></div>");
const $secondaryInfo = $("<div id = 'secondaryInfo'></div>");


$modal.append($image);
$modal.append($basicInfo);
$modal.append($secondaryInfo);
$overlay.append($modal);
$("body").append($overlay);


//list of employees
function empList(employees){
  $.each(employees, function(i, employee){
        $empList.append('<li class= "employee" id = "'+ i + '">'+  '<a><img src="' + employee.picture.large +'"><div class = "info">'
          + '<p class = "name primary"><b>' + employee.name.first.charAt(0).toUpperCase()+employee.name.first.slice(1)
          +' ' + employee.name.last.charAt(0).toUpperCase()+employee.name.last.slice(1) + '</b></p>'
          + '<p class = "email secondary">' + employee.email + '</p>'
          + '<p class = "city secondary">' + employee.location.city.charAt(0).toUpperCase()+ employee.location.city.slice(1)
          + '</p></a></div>'+'</li>');
        });
}


//employee modal

function modalShow(employees){
  $("li").click(function(e){
    e.preventDefault();

    //id of selected employee
    const id = $(this).attr('id');

    //img of employee
    const src= $('img', this).attr('src');
    $image.attr('src', src);

    //basic info of employee
    const name = $('.name', this).text();
    const email = $('.email', this).text();
    const city = $('.city', this).text();

    $basicInfo.append(`<p class = "name primary"><b>${name}<b></p>`);
    $basicInfo.append(`<p class = "email secondary"> ${email}</p>`);
    $basicInfo.append(`<p class = "city secondary"> ${city}</p><hr>`);

    //secondary info of employee
    const phone = employees[id].phone;
    const street = employees[id].location.street;
    const state = employees[id].location.state.charAt(0).toUpperCase()+employees[id].location.state.slice(1);;
    const postcode = employees[id].location.postcode;
    const day = employees[id].dob.slice(8,10);
    const month = employees[id].dob.slice(5,7);
    const year = employees[id].dob.slice(1,3);

    $secondaryInfo.append(`<p class = "phone tertiary"> ${phone}</p>`);
    $secondaryInfo.append(`<p class = "street tertiary"> ${street}, ${state}, ${postcode}</p>`);
    $secondaryInfo.append(`<p class = "dob tertiary">Birthday:  ${day}/${month}/${year}</p>`);

    $overlay.show();
  });
}

$(function(){
//ajax request
$.ajax('https://randomuser.me/api/?results=12', {
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data){
    console.log(data.results);
    let employees = data.results;
    empList(employees);
    modalShow(employees);
    }
  });
});
