//********************** LAYOUT FORMAT **********************//

const $empList = $(".employee-list");
const $searchBar = $('#search-bar');

//append modal
const $overlay = $("<div id='overlay'></div>");
const $modal = $('<div id = "modal"></div>');

//close button
const $close = $('<button id = "close"> X </button>');

//modal content
const $image = $('<img id="modal-image">');
const $basicInfo = $("<div id = 'basicInfo'></div>");
const $secondaryInfo = $("<div id = 'secondaryInfo'></div>");

//next and prev buttons
const $prev = $('<button id = "prev"> < </button>');
const $next = $('<button id = "next"> > </button>');

$modal.append($prev);
$modal.append($next);
$modal.append($close);
$modal.append($image);
$modal.append($basicInfo);
$modal.append($secondaryInfo);
$overlay.append($modal);
$("body").append($overlay);

//********************** INFORMATION FORMAT FUNCTIONS **********************//

//capitalise
function capitalise(entry){
  let capEntry = "";
  const strArray = entry.split(" ");
  $.each(strArray, function(i, word){
    capEntry += word.charAt(0).toUpperCase() + word.slice(1) + " ";
  })
  return capEntry;
}

//state initials if state is longer than 1 word
function initLetters(state){
  let stateEntry = "";
  const stateArray = state.split(" ");

  if (stateArray.length > 1){
    $.each(stateArray, function(i, word){
      stateEntry += word.charAt(0).toUpperCase()
    })
  } else{
    stateEntry = state.charAt(0).toUpperCase() + state.slice(1);
  }
  return stateEntry;
}

//phone no. format
function pFormat(phone){
  let formP = "";
  let finalP = "";
  const pArray = phone.split("");
  $.each(pArray, function(i, char){
    if (!isNaN(char)){
      formP += char;
    }
  })
  finalP = `(${formP.slice(0,3)}) ${formP.slice(3, 6)}-${formP.slice(6)}`;
  return finalP;
}

//********************** LIST OF EMPLOYEES **********************//

//list of employees on page load
function empList(employees){
  $.each(employees, function(i, employee){
        $empList.append('<li class= "employee" id = "'+ i + '">'+  '<a><img class = "list-img" src="' + employee.picture.large +'"><div class = "info">'
          + '<p class = "name primary"><b>' + capitalise(employee.name.first)
          +' ' + capitalise(employee.name.last) + '</b></p>'
          + '<p class = "email secondary">' + employee.email + '</p>'
          + '<p class = "city secondary">' + capitalise(employee.location.city)
          + '</p></a></div>'+'</li>');
        });
}


//********************** EMPLOYEE MODAL **********************//
//modal shows more content of the selected employee

//employee modal
function modalWindow(employees){
  $("li").click(function(e){
    e.preventDefault();
    const currentID = $(this).attr('id');
    modalShow(employees, currentID);
  });
};


function modalShow(employees, id){
    //id of selected employee
    let employee = employees[id];
    //img of employee
    const src = employee.picture.large;
    $image.attr('src', src);

    //basic info of employee
    const name = `${capitalise(employee.name.first)} ${capitalise(employee.name.last)}`;
    const email = employee.email;
    const city = capitalise(employee.location.city);

    $basicInfo.append(`<p class = "name primary"><b>${name}<b></p>`);
    $basicInfo.append(`<p class = "email secondary"> ${email}</p>`);
    $basicInfo.append(`<p class = "city secondary"> ${city}</p>`);

    $basicInfo.append(`<hr>`);

    //secondary info of employee
    const phone = pFormat(employee.phone);
    const street = capitalise(employee.location.street);
    const state = initLetters(employee.location.state);
    const postcode = employee.location.postcode;
    const day = employee.dob.slice(8,10);
    const month = employee.dob.slice(5,7);
    const year = employee.dob.slice(1,3);

    $secondaryInfo.append(`<p class = "phone tertiary"> ${phone}</p>`);
    $secondaryInfo.append(`<p class = "street tertiary"> ${street}, ${state}, ${postcode}</p>`);
    $secondaryInfo.append(`<p class = "dob tertiary">Birthday:  ${day}/${month}/${year}</p>`);

    $overlay.show();
    $modal.show();
    nextShow(employees, id);
    prevShow(employees, id);
};


//******* CLICKABLE FUNCTIONS *******//


//Buttons
//hide and clear modal

$close.click(function(e){
  e.preventDefault();
  $image.removeAttr('src');
  $basicInfo.empty();
  $secondaryInfo.empty();
  $overlay.hide();
})

//next employee
function nextShow(employees, id){
  $next.click(function(e){
    e.preventDefault();
    let nextID = parseInt(id)+1;
    if(id <11){
        $image.removeAttr('src');
        $basicInfo.empty();
        $secondaryInfo.empty();
        modalShow(employees, nextID);
    }
  })
}


//previous employee
function prevShow(employees, id){
  $prev.click(function(e){
    e.preventDefault();
    let prevID = parseInt(id)-1;
    if(id >0){
      $image.removeAttr('src');
      $basicInfo.empty();
      $secondaryInfo.empty();
      modalShow(employees, prevID);
    }
  })
}

//********************** SEARCH BAR **********************//

//search function

$searchBar.keyup(function(){
  let searchItem = $searchBar.val().toLowerCase();
  let searchedEmployees = $('p:contains('+ searchItem + ')').closest('li');
  $('li').hide();
  searchedEmployees.show();
});



//********************** AJAX REQUEST **********************//

//ajax request
$(function(){
$.ajax('https://randomuser.me/api/?results=12', {
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data){
    let employees = data.results;
    empList(employees);
    modalWindow(employees);
    }
  });
});
