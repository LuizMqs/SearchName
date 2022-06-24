let products = [];
let cont = 0;
let num = 1;

let objId;
function editHandler(id) {
  objId = id;

  for (let i = 0; i < products.length; i++) {
    if (products[i]["id"] == id) {
      document.getElementById("btn-editar").style.display = "flex";
      document.getElementById("btn-incluir").style.display = "none";

      const nome = document.getElementById("nome");
      const descricao = document.getElementById("descricao");
      const valor = document.getElementById("valor");

      nome.value = products[i]["name"];
      descricao.value = products[i]["description"];
      valor.value = products[i]["value"];

      return;
    }
  }
}

function finishEdit() {
  document.getElementById("btn-editar").style.display = "none";
  document.getElementById("btn-incluir").style.display = "flex";

  console.log(objId);
  for (let i = 0; i < products.length; i++) {
    if (products[i]["id"] == objId) {
      const nome = document.getElementById("nome");
      const descricao = document.getElementById("descricao");
      const valor = document.getElementById("valor");

      products[i]["name"] = nome.value;
      products[i]["description"] = descricao.value;
      products[i]["value"] = valor.value;

      return;
    }
  }
}

function deleteHandler(id) {
  products.forEach((product, index) => {
    if (product.id == id) id = index;
  });
  products.splice(id, 1);
}

function addRow(products) {
  document.getElementById("container").innerHTML = `
    <table id="table">
      <tr>
        <th id="product-name">Produto</th>
        <th id="product-id">ID</th>
        <th id="product-value">Valor</th>
        <th>Editar</th>
        <th>Apagar</th>
      </tr>
    </table>`;

  let tableRef = document.getElementById("table");

  for (let i = 0; i < products.length; i++) {
    if (products[i]) {
      tableRef.innerHTML += `
    <tr>
      <td onclick="apresentar(${products[i]["id"]})">${products[i]["name"]}</td>
      <td>${products[i]["id"]}</td>
      <td>${products[i]["value"]}</td>
      <td class="icons"><img src="./images/caneta.svg" onclick="editHandler(${products[i]["id"]})" /></td>
      <td class="icons"><img src="./images/lixeira.svg" onclick="deleteHandler(${products[i]["id"]})" /></td>
    </tr>`;
    }
  }
}

function apresentar(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i]["id"] == id) {
      document.getElementById("result").style.display = "flex";
      const objT = new Date(products[i]["inclusion_date"]);
      document.getElementById("result").innerHTML = `
      <p>id: ${products[i]["id"]}</p>
      <p>nome: ${products[i]["name"]}</p>
      <p>descrição: ${products[i]["description"]}</p>
      <p>valor: ${products[i]["value"]}</p>
      <p>${objT.getDate()}/${objT.getMonth()}/${objT.getFullYear()} – ${objT.getHours()}:${objT.getMinutes()}:${objT.getSeconds()}</p>
      `;
      return;
    }

    i++;
  }
}

function showTable(products) {
  document.getElementById("sucesso").innerHTML = "";
  document.getElementById("fracasso").innerHTML = "";

  addRow(products);

  document
    .getElementById("product-name")
    .addEventListener("click", sortProductsByName);
  document
    .getElementById("product-value")
    .addEventListener("click", sortProductsByValue);
}

function storageProductData(product) {
  products.push(product);
}

function productValidation(product) {
  let sucess = document.getElementById("sucesso");
  let failure = document.getElementById("fracasso");
  document.getElementById("sucesso").innerHTML = "";
  document.getElementById("fracasso").innerHTML = "";
  if (product.name != "" || product.description != "" || product.value != "") {
    storageProductData(product);
    sucess.textContent = `Produto ${product["name"]} incluído com sucesso`;
    num++;
  } else {
    failure.textContent = `Falha no cadastro do produto!`;
  }
}

function getProductData() {
  const product = {
    id: num,
    name: document.getElementById("nome").value,
    description: document.getElementById("descricao").value,
    value: document.getElementById("valor").value,
    inclusion_date: new Date(),
  };

  productValidation(product);

  console.log(products);
}

function sortProductsByName() {
  products = products.sort((productA, productB) => {
    if (productA.name.toLowerCase() < productB.name.toLowerCase()) return -1;
    else if (productB.name.toLowerCase() < productA.name.toLowerCase())
      return 1;
    else return 0;
  });
  showTable(products);
}

function sortProductsByValue() {
  products = products.sort((productA, productB) => {
    if (Number(productA.value) < Number(productB.value)) return -1;
    else if (Number(productA.value) < Number(productB.value)) return 1;
    else return 0;
  });
  showTable(products);
}

function searchProduct() {
  let filteredProducts = products;
  if (document.getElementById("pesquisa-nome").value != "")
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase() ==
        document.getElementById("pesquisa-nome").value.toLowerCase()
    );

  if (document.getElementById("pesquisa-descricao").value != "")
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.description.toLowerCase() ==
        document.getElementById("pesquisa-descricao").value.toLowerCase()
    );

  showTable(filteredProducts);
}

document
  .getElementById("btn-listar")
  .addEventListener("click", () => showTable(products));
document.getElementById("btn-editar").addEventListener("click", finishEdit);
document
  .getElementById("btn-incluir")
  .addEventListener("click", getProductData);
document
  .getElementById("btn-pesquisa")
  .addEventListener("click", searchProduct);
