let fruits = [
  { id: 1, title: "title1", price: 20 },
  { id: 2, title: "title2", price: 30 },
  { id: 3, title: "title3", price: 50 },
  { id: 4, title: "title4", price: 70 },
];

const toHTML = (fruit) => `<div class="card" style="width: 18rem;">
<img src="" class="card-img-top" alt="" />
<div class="card-body">
  <h5 class="card-title">${fruit.title}</h5>
  <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Price</a>
  <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">delete</a>
</div>
</div>`;

function render() {
  const html = fruits.map((fruit) => toHTML(fruit)).join("");
  document.querySelector("#fruits").innerHTML = html;
}
render();
const priceModal = $.modal({
  title: "Цена на товар",
  closable: true,
  width: "400px",
  footerButtons: [
    {
      text: "OK",
      type: "primary",
      handler() {
        priceModal.close();
      },
    },
  ],
});

document.addEventListener("click", (event) => {
  event.preventDefault();
  const target = event.target.dataset.btn;
  const id = +event.target.dataset.id;
  const fruit = fruits.find((f) => f.id === id);
  if (target === "price") {
    console.log(fruit);
    priceModal.setContent(`
    <p>Price is ${fruit.title}:<strong>${fruit.price}</strong></p>`);
    priceModal.open();
  }

  if (target === "remove") {
    $.confirm({
      title: "Вы уверены?",
      content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`,
    })
      .then(() => {
        fruits = fruits.filter((f) => f.id !== id);
        render();
      })
      .catch(() => {
        console.log("remove");
      });
  }
});
