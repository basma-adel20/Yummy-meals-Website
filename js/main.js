
$(document).ready(function () {
  $('#loading').fadeOut(1200);
  $('body').css({overflowY:'auto'});
})

/*********    header section *************** */

$('.menu-header .open').click(function () {
    $('#menu').animate({left:0},500);
    $(this).addClass('d-none');
    $('.close').removeClass('d-none');
    for (let i = 0; i <5; i++) {
        $('.links li').eq(i).animate({top:0},(i+5)*100);
    }
});


$('.menu-header .close').click(closeNav);

function closeNav() {
    $('#menu').animate({left:-260},500);
    $('.close').addClass('d-none');
    $('.open').removeClass('d-none');
    $('.links li').animate({top:300},150);
}

/***********   main section   ******************** */

async function getMeals(){
  $('#loading').fadeIn(200);
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
     data = await data.json();
    let meals = data.meals;
    $('#loading').fadeOut(500);
    let content =``;
    console.log(meals[0]);
    for (let i = 0; i < meals.length; i++) {
        content +=`
      <div class="col-md-3">
        <div class="meal" id="${meals[i].idMeal}" onclick="displayDetailes(this.id)">
            <img src=${meals[i].strMealThumb} alt="">
            <div class="overlay p-2">
                <h3>${meals[i].strMeal}</h3>
            </div>
        </div>
      </div>
        `;
    }
    $('#main .row').html(content);
}

getMeals()


/************* get area section ******************* */

async function getAreas(){
  closeNav();
  $('#loading').fadeIn(200);
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
     data = await data.json();
    let meals = data.meals;
    $('#loading').fadeOut(500);
    let content =``;
    console.log(meals[0]);
    for (let i = 0; i < meals.length; i++) {
        content +=`
      <div class="col-md-3">
        <div class="meal text-center" id="${i}" onclick="filterArea(this.id)">
          <i class="fas fa-house-laptop fa-4x"></i>
          <h3>${meals[i].strArea}</h3>
        </div>
      </div>
        `;
    }
    $('#main .row').html(content);
}

$('a[href="#area"]').click(function () {
    getAreas();
})
/************* get categories section ******************* */

async function getCategories(){
  closeNav();
  $('#loading').fadeIn(200);
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
     data = await data.json();
    let meals = data.categories;
    $('#loading').fadeOut(500);
    let content =``;
    for (let i = 0; i < meals.length; i++) {
        content +=`
        <div class="col-md-3">
        <div class="meal" id="${meals[i].idCategory}" onclick="filterCategory(this.id)">
            <img src=${meals[i].strCategoryThumb} alt="">
            <div class="overlay flex-column text-center p-2">
                <h3>${meals[i].strCategory}</h3>
                <p>${meals[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
            </div>
        </div>
      </div>
        `;
    }
    $('#main .row').html(content);
}

$('a[href="#categories"]').click(function () {
    getCategories();
})


/************* get categories section ******************* */

async function getIngredients(){
  closeNav();
  $('#loading').fadeIn(200);
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
     data = await data.json();
     $('#loading').fadeOut(500);
    let meals = data.meals.slice(0,20);
    let content =``;
    for (let i = 0; i < meals.length; i++) {
        let desc = meals[i].strDescription ? meals[i].strDescription.split(' ').slice(0, 20).join(' ') : '';
        content +=`
      <div class="col-md-3">
        <div class="meal text-center" id="${meals[i].idIngredient}" onclick="filterIngredient(this.id)">
        <i class="fas fa-drumstick-bite fa-4x"></i>
        <h3>${meals[i].strIngredient}</h3>
        <p>${desc}</p>
        </div>
      </div>
        `;
    }
    $('#main .row').html(content);
}

$('a[href="#ingredientes"]').click(function () {
    getIngredients();
})


/************* get search section ******************* */

function searchMeals(){
  closeNav();
      let  content =`
        <div class="inputs w-75 mx-auto">
          <div class="row py-4 inputs">
            <div class="col-md-6">
              <input id="name" oninput="getSearchByName(this.value)" type="text" class="form-control text-white bg-transparent" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
              <input id="letter" oninput="getSearchByFletter(this.value)" type="text" class="form-control text-white bg-transparent" placeholder="Search By First Letter" maxlength="1">
            </div> 
        </div>
        </div>
        <div class="container">
          <div class="row g-4 py-5">

         </div>
        </div>`;
    $('#main ').html(content);
    
}

async function getSearchByName(name){
  $('#loading').fadeIn(200);
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
     data = await data.json();
     console.log(data);
    let meals = data.meals;
    $('#loading').fadeOut(200);
    let content =``;
    if (meals) { // Check if meals is not null
      for (let i = 0; i < meals.length; i++) {
          content += `
                <div class="col-md-3">
                <div class="meal" id="${meals[i].idMeal}" onclick="displayDetailes(this.id)">
                    <img src=${meals[i].strMealThumb} alt="">
                    <div class="overlay p-2">
                        <h3>${meals[i].strMeal}</h3>
                </div>
            </div>
          </div>
      `;
      }
  } else {
      // Handle case where meals is null
      console.error("No meals found for the provided name.");
  }
      $('#main .container .row').html(content);
}

async function getSearchByFletter(char){
  $('#loading').fadeIn(200);
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`);
     data = await data.json();
     console.log(data);
    let meals = data.meals;
    $('#loading').fadeOut(200);
    let content =``;
    if (meals) { // Check if meals is not null
      for (let i = 0; i < meals.length; i++) {
          content += `
                <div class="col-md-3">
                <div class="meal" id="${meals[i].idMeal}" onclick="displayDetailes(this.id)">
                    <img src=${meals[i].strMealThumb} alt="">
                    <div class="overlay p-2">
                        <h3>${meals[i].strMeal}</h3>
                </div>
            </div>
          </div>
      `;
      }
  } else {
      // Handle case where meals is null
      console.error("No meals found for the provided name.");
  }
      $('#main .container .row').html(content);
}


$('a[href="#search"]').click(function () {
    searchMeals();
})


/************* contact section ******************* */

function displayContacts(){
 closeNav();
 let content =`
 <div class="container d-flex flex-column align-items-center justify-content-center min-vh-100">
 <div class="row g-4 w-75 ">
      <div class="col-md-6">
        <input type="text" class="form-control" placeholder="Enter Your Name" oninput="validateName(this.value); validInputs()">
        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
      </div>
      <div class="col-md-6">
        <input type="text" class="form-control" placeholder="Enter Your Email" oninput="validateEmail(this.value);  validInputs()">
        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                     Email not valid *exemple@yyy.zzz
                </div>
      </div>
      <div class="col-md-6">
        <input type="text" class="form-control" placeholder="Enter Your Phone" oninput="validatePhone(this.value);  validInputs()">
        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                     Enter valid Phone Number
                </div>
      </div>
      <div class="col-md-6">
        <input type="number" class="form-control" placeholder="Enter Your Age" oninput="validateAge(this.value);  validInputs()">
        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
      </div>
      <div class="col-md-6">
        <input type="password" id="passInput"  class="form-control" placeholder="Enter Your Password" oninput="validatePassword(this.value);  validInputs()">
        <div id="passAlert" class="alert alert-danger w-100 mt-2 d-none">
                     Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
      </div>
      <div class="col-md-6">
        <input type="password" class="form-control" placeholder="Repassword" oninput="validateRepassword(this.value);  validInputs()">
        <div id="repassAlert" class="alert alert-danger w-100 mt-2 d-none">
                     Enter valid repassword
                </div>
      </div>
    </div>
    <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>

  </div>`;


    $('#main').html(content);

}

$('a[href="#contact"]').click(function () {
  displayContacts();
})



/************* details section ******************* */

async function displayDetailes(id){
  $('#loading').fadeIn(200);
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
   data = await data.json();
   console.log(data);
  let meal = data.meals[0];
  $('#loading').fadeOut(500);

  // create li of the tag
  let tags =[];
  if(meal.strTags)
     {
      tags = meal.strTags.split(',');
     } 
  let li_tags =``;
  for (let i = 0; i < tags.length; i++) {
    li_tags += `<li class="alert alert-danger m-2 p-1"> ${tags[i]}</li>`;
  }

  // create li of the Recipes
  let li_recipes =``;
  for (let key in meal) {
    if(key.startsWith('strIngredient') && `${meal[key]}`!="" && `${meal[key]}`!='null' ){
      let index = key.slice(13);
      let measureKey = 'strMeasure' + index;
      if(`${meal[measureKey]}`)
      {
        li_recipes += `<li class="alert alert-info m-2 p-1"> ${meal[measureKey]} ${meal[key]} </li>`;
      }
      else
      {
        li_recipes += `<li class="alert alert-info m-2 p-1"> ${meal[key]} </li>`;
      }
      
    }
  }

  
  let content =``;
  if(meal){
   content =`
   <div class="container">
    <div class="row py-5 g-4">
        <div class="col-md-4">
        <img src="${meal.strMealThumb}" alt="" class="rounded-3">
        <h2>${meal.strMeal}</h2>
      </div>
      <div class="col-md-8 details position-relative" >
      <i class="fas fa-x position-absolute top-0 end-0  fa-1x text-white" onclick="getMeals()"></i>
        <h2>
          Instructions
        </h2>
        <p> ${meal.strInstructions}</p>
        <h3>
          <span class="special">Area : </span> ${meal.strArea}
        </h3>
        <h3>
          <span class="special">Category : </span> ${meal.strCategory}
        </h3>
        <h3>
          <span>Recipes : </span>
        </h3>
        <ul class="d-flex g-3 flex-wrap">
          ${li_recipes}
        </ul>
        <h3>
          <span>Tags : </span>
        </h3>
        <ul class="d-flex g-3 flex-wrap">
          ${li_tags}
        </ul>
        <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
      </div>
    </div>
  </div>
  `;
    } 
    else {
    // Handle case where meals is null
    console.error("No meals found for the provided name.");
   }
    $('#main').html(content);
}

/************* filter category section ******************* */

async function filterCategory(idcateory){
  $('#loading').fadeIn(200);
  let cateory = $(`#${idcateory}`).children().eq(1).children().eq(0).text()
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cateory}`);
   data = await data.json();
   $('#loading').fadeOut(500);
  let meals = data.meals.slice(0,20);
  let content =``;
  console.log(meals[0]);
  for (let i = 0; i < meals.length; i++) {
      content +=`
    <div class="col-md-3">
      <div class="meal" id="${meals[i].idMeal}" onclick="displayDetailes(this.id)">
          <img src=${meals[i].strMealThumb} alt="">
          <div class="overlay p-2">
              <h3>${meals[i].strMeal}</h3>
          </div>
      </div>
    </div>
      `;
  }
  $('#main .row').html(content);
}


/************* filter ingredient section ******************* */

async function filterIngredient(id_ingredient){
  $('#loading').fadeIn(200);
  let ingredient = $(`#${id_ingredient}`).children().eq(1).text();
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
   data = await data.json();
   $('#loading').fadeOut(500);
  let meals = data.meals.slice(0,20);
  let content =``;
  console.log(meals[0]);
  for (let i = 0; i < meals.length; i++) {
      content +=`
    <div class="col-md-3">
      <div class="meal" id="${meals[i].idMeal}" onclick="displayDetailes(this.id)">
          <img src=${meals[i].strMealThumb} alt="">
          <div class="overlay p-2">
              <h3>${meals[i].strMeal}</h3>
          </div>
      </div>
    </div>
      `;
  }
  $('#main .row').html(content);
}

/************* filter ingredient section ******************* */

async function filterArea(id_area){
  $('#loading').fadeIn(200);
  let area = $(`#${id_area}`).children().eq(1).text();
  console.log(area);
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
   data = await data.json();
   $('#loading').fadeOut(500);
  let meals = data.meals.slice(0,20);
  let content =``;
  console.log(meals[0]);
  for (let i = 0; i < meals.length; i++) {
      content +=`
    <div class="col-md-3">
      <div class="meal" id="${meals[i].idMeal}" onclick="displayDetailes(this.id)">
          <img src=${meals[i].strMealThumb} alt="">
          <div class="overlay p-2">
              <h3>${meals[i].strMeal}</h3>
          </div>
      </div>
    </div>
      `;
  }
  $('#main .row').html(content);
}


/************* inputs  validation section ******************* */


let nameFlag=0 , emailFlag=0 , ageFlag=0 , passFlag=0 , phoneFlag=0 , repassFlag=0;

function validateName(name) {
  let regex= /^[a-zA-Z]+((\ )*[a-zA-Z]*)*$/;
  if(!regex.test(name))
  {
    $('#nameAlert').removeClass('d-none');
    nameFlag=0;
  }
  else{
    $('#nameAlert').addClass('d-none');
    nameFlag=1;
  }
}


function validateEmail(email) {
  let regex= /\S+@\S+\.\S+/;
  if(!regex.test(email))
  {
    $('#emailAlert').removeClass('d-none');
    emailFlag=0;
  }
  else{
    $('#emailAlert').addClass('d-none');
    emailFlag=1;
  }
}


function validatePhone(phone) {
  let regex= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if(!regex.test(phone))
  {
    $('#phoneAlert').removeClass('d-none');
    phoneFlag=0;
  }
  else{
    $('#phoneAlert').addClass('d-none');
    phoneFlag=1;
  }
}


function validatePassword(pass) {
  let regex= /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  if(!regex.test(pass))
  {
    $('#passAlert').removeClass('d-none');
    passFlag=0;
  }
  else{
    $('#passAlert').addClass('d-none');
    passFlag=1;
  }
}

function validateAge(age) {
  let regex= /^(([7-9])|([1-9][0-9])|([1][0-9][0-9])|200)$/;
  if(!regex.test(age))
  {
    $('#ageAlert').removeClass('d-none');
    ageFlag=0;
  }
  else{
    $('#ageAlert').addClass('d-none');
    ageFlag=1;
  }
}

function validateRepassword(repass) {
  if( repass != document.getElementById('passInput').value)
  {
    $('#repassAlert').removeClass('d-none');
    repassFlag=0;
  }
  else{
    $('#repassAlert').addClass('d-none');
    repassFlag=1;
  }
}

function validInputs()
{
  let submit = document.getElementById('submitBtn');
  if (nameFlag && emailFlag && ageFlag && passFlag && phoneFlag && repassFlag)
  {
    submit.removeAttribute("disabled");
  }
  else
  {
    submit.setAttribute("disabled",true);
  }
}