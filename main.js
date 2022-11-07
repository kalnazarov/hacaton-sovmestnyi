let API = "http://localhost:8000/sultans";

let del = document.querySelector(".del");
let postBtn = document.querySelector("#post");
let editBtn = document.querySelector(".edit-card");
let inp1 = document.querySelector(".inp1");
let inp2 = document.querySelector(".inp2");
let inp3 = document.querySelector(".inp3");
let inp4 = document.querySelector(".inp4");

let list = document.querySelector("#products-list");

let editInp1 = document.querySelector(".edit-inp1");
let editInp2 = document.querySelector(".edit-inp2");
let editInp3 = document.querySelector(".edit-inp3");
let editInp4 = document.querySelector(".edit-inp4");

let searchInp = document.querySelector("#search");
let searchVal = "";

postBtn.addEventListener("click", async function () {
  let obj = {
    inp1: inp1.value,
    inp2: inp2.value,
    inp3: inp3.value,
    inp4: inp4.value,
  };
  if (
    !obj.inp1.trim() ||
    !obj.inp2.trim() ||
    !obj.inp3.trim() ||
    !obj.inp4.trim()
  ) {
    alert("ЗАПОЛНИ ПОЛЕ!!!");
    return;
  }
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  inp1.value = "";
  inp2.value = "";
  inp3.value = "";
  inp4.value = "";
  render();
});

async function render() {
  let sultans = await fetch(`${API}?q=${searchVal}`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  list.innerHTML = "";
  sultans.forEach((element) => {
    let newElem = document.createElement("div");
    newElem.classList.add("card-main");

    console.log(element.id);
    newElem.id = element.id;
    newElem.innerHTML = `
    <div class='hui2'>
    <img src=${element.inp4} class="card-img-top avatar" alt="..."> 
    <div class="card-body">
      <p class="card-title">Лайки: ${element.inp1}   <img class='heart' src="./img/heart-svgrepo-com.svg" alt=""></p>
      <p class="card-text">Комментарии<img class="com" src="./img/message-svgrepo-com.svg" alt="">:${element.inp2}</p>
      <p class="card-text">Репосты<img src="./img/repost-svgrepo-com.svg" alt="">:${element.inp3}</p>
      
    </div>
    </div>
    <img class="elip btn-edit btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"src="./img/ellipsis-svgrepo-com.svg" alt="">
    <button class="btn-delete btn-danger" id=${element.id} onclick="deleteProduct(${element.id})">Delete</button>
    

    
    
    
    
  `;
    list.append(newElem);
  });
}
render();


function deleteProduct(id) {
  console.log(id);
  fetch(`${API}/${id}`, {
    method: "DELETE",
  }).then(() => render());
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-edit")) {
    // let id = e.target.id;
    let id = e.target.parentElement.id;
    console.log(e.target.parentElement.id);
    console.log("---------------------");
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((dat) => {
        // for (let data of dat) {
        console.log(dat.inp1);
        editInp1.value = dat.inp1;
        editInp2.value = dat.inp2;
        editInp3.value = dat.inp3;
        editInp4.value = dat.inp4;
        editBtn.setAttribute("id", dat.id);
        // }
      });
  }
});

editBtn.addEventListener("click", function () {
  let id = this.id;
  let inp1 = editInp1.value;
  let inp2 = editInp2.value;
  let inp3 = editInp3.value;
  let inp4 = editInp4.value;
  if (!inp1 || !inp2 || !inp3 || !inp4) return;
  let editedPost = {
    inp1: inp1,
    inp2: inp2,
    inp3: inp3,
    inp4: inp4,
  };
  saveEdit(editedPost, id);
});

function saveEdit(editedProduct, id) {
  fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editedProduct),
  }).then(() => {
    render();
  });
  let modal = bootstrap.Modal.getInstance(exampleModal);
  modal.hide();
}
searchInp.addEventListener("input", () => {
  searchVal = searchInp.value;
  render();
});
