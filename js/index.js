/// <reference types="../@types/jquery" />

$("h5.h3").on("click", function () {
  $(".inner1").animate({ "width": "toggle" }, {
    duration: 500,
    step: function (now) {
      $(".open-btn").css("left", now + "px");
    }
  });
});

$(window).on('load', function(){
  $('#lodelyer').fadeOut(1000);
  $('body').css('overflow', 'visible');
})


let curunt = "#Home";
let prev;
var regx = {
  UserName: /^[a-z]{3,}$/,
  UserEmail:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  UserPhon: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  UserAge: /^[1-9]{1,2}$/,
  UserPass: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
};


function vaildation(id) {
  let value = $(`#${id}`).val();

  if (id == "UserPass" || id == "UserRePass") {
    let pass = $("#UserPass").val();
    let repass = $("#UserRePass").val();
    if (pass == repass) {
      $(`#UserRePass`).addClass("valid");
      $(`#UserRePass`).removeClass("inValid");
      $(`#UserRePass`).siblings(".trueAl").removeClass("hidden");
      $(`#UserRePass`).siblings(".trueAl").addClass("block");
      $(`#UserRePass`).siblings(".falseAl").removeClass("block");
      $(`#UserRePass`).siblings(".falseAl").addClass("hidden");
    } else {
      $(`#UserRePass`).removeClass("valid");
      $(`#UserRePass`).addClass("inValid");
      $(`#UserRePass`).siblings(".falseAl").removeClass("hidden");
      $(`#UserRePass`).siblings(".falseAl").addClass("block");
      $(`#UserRePass`).siblings(".trueAl").removeClass("block");
      $(`#UserRePass`).siblings(".trueAl").addClass("hidden");
    }
  }

  if (id != "UserRePass") {
    if (regx[id].test(value)) {
      $(`#${id}`).addClass("valid");
      $(`#${id}`).removeClass("inValid");
      $(`#${id}`).siblings(".trueAl").removeClass("hidden");
      $(`#${id}`).siblings(".trueAl").addClass("block");
      $(`#${id}`).siblings(".falseAl").removeClass("block");
      $(`#${id}`).siblings(".falseAl").addClass("hidden");
    } else {
      $(`#${id}`).removeClass("valid");
      $(`#${id}`).addClass("inValid");
      $(`#${id}`).siblings(".falseAl").removeClass("hidden");
      $(`#${id}`).siblings(".falseAl").addClass("block");
      $(`#${id}`).siblings(".trueAl").removeClass("block");
      $(`#${id}`).siblings(".trueAl").addClass("hidden");
    }
  }
}




// categories
getCatgories();
async function getCatgories() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await res.json();

  console.log(data.categories[0]);
  setCatgories(data);
}

function setCatgories(data) {
  let cartona = "";
  for (const item of data.categories) {
    if (item.idCategory < 13) {
      let chieldNode = `
            <div class="col-md-3">
           <div class="card border-black">
           <img src="${item.strCategoryThumb}" class="w-100" alt=""><div
        class="meal-layer d-flex justify-content-center align-items-center  position-absolute overflow-hidden">
        <div class="text-black text-center w-75">
            <h3>${item.strCategory}</h3>
            <p>
            ${item.strCategory}
            </p>
        </div>
    </div>
</div>
</div>
        `;
      cartona += chieldNode;
    }
  }
  let row = document.getElementById("categCont");

  row.innerHTML = cartona;

  $(".lyarcatg").on("click", (e) => {
    let word = e.target.getAttribute("id");
    set_A_I_C("C", word);
  });
}




// area

get_setArea();
async function get_setArea() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await res.json();

  console.log(data.meals);
  let cartona = "";
  for (let i = 0; i <= 19; i++) {
    let chieldNode = `
  <div class="col-md-3">
<div class="rounded-2 text-center text-white">
    <i class="fa-solid fa-house-laptop fa-4x"></i>
    <h3>${data.meals[i].strArea}</h3>
</div>
</div>
        `;
    cartona += chieldNode;
  }
  let row = document.getElementById("area");

  row.innerHTML = cartona;

  $(".lyarArea").on("click", (e) => {
    let word = e.target.getAttribute("id");
    set_A_I_C("A", word);
  });
}


// ingredients


get_setIngred();
async function get_setIngred() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await res.json();

  console.log(data.meals);
  let cartona = "";
  for (let i = 0; i <= 19; i++) {
    let chieldNode = `
 <div class="col-md-3">
<div class="rounded-2 text-center text-white">
    <i class="fa-solid fa-drumstick-bite fa-5x"></i>
    <h3>${data.meals[i].strIngredient}</h3>
    <p>${data.meals[i].strIngredient}</p>
</div>
</div> 
        `;
    cartona += chieldNode;
  }
  let row = document.getElementById("ingred");

  row.innerHTML = cartona;

  $(".lyarIngred").on("click", (e) => {
    let word = e.target.getAttribute("id");
    set_A_I_C("I", word);
  });
}


// 

$(".search").on("input", function () {
  let word = $(".searchInput").val();
  getbyName(word);
});
async function getbyName(namee) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${namee}`
  );
  let data = await res.json();

  console.log(data.meals);
  setbyN_L_All(data, "searchInput");
}

$(".stInput").on("input", function () {
  let word = $(".stInput").val();
  getbyStLatter(word);
});
async function getbyStLatter(latter) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${latter}`
  );
  let data = await res.json();

  console.log(data);
  setbyN_L_All(data, "search");
}



// 

