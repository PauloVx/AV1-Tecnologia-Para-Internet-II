const produtosContainer = document.querySelector('.products-list .container');

const searchButton = document.querySelector('.search .container button');
const searchInput = document.querySelector('.search .container input');

//Produtos estáticos
const produtos = [
  {
    id: 1,
    nome: 'Acarajé',
    valor: 55.90,
    foto: 'acaraje.jpg'
  },
  {
    id: 2,
    nome: 'Feijão',
    valor: 10,
    foto: 'feijao.jpg'
  },
  {
    id: 3,
    nome: 'Arroz',
    valor: 10,
    foto: 'arroz.jpg'
  },
  {
    id: 4,
    nome: 'Pizza',
    valor: 10,
    foto: 'pizza.jpg'
  },
  {
    id: 5,
    nome: 'Frango',
    valor: 60,
    foto: 'frango.jpg'
  },
  {
    id: 6,
    nome: 'Torta',
    valor: 45.99,
    foto: 'torta.jpg'
  },
  {
    id: 7,
    nome: 'Pastel',
    valor: 2.99,
    foto: 'pastel.jpg'
  },
  {
    id: 8,
    nome: 'Esfirra',
    valor: 2,
    foto: 'esfirra.jpg'
  },
  {
    id: 9,
    nome: 'Sushi',
    valor: 30,
    foto: 'sushi.jpg'
  },
  {
    id: 10,
    nome: 'Yakisoba',
    valor: 20,
    foto: 'yakisoba.jpg'
  },
]

const carrinho = [];

//Botao quantidade produto
function incrementValue(e) {
  e.preventDefault();
  var fieldName = $(e.target).data('field');
  var parent = $(e.target).closest('div');
  var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

  if (!isNaN(currentVal)) {
    parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
  } else {
    parent.find('input[name=' + fieldName + ']').val(0);
  }
}

function decrementValue(e) {
  e.preventDefault();
  var fieldName = $(e.target).data('field');
  var parent = $(e.target).closest('div');
  var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

  if (!isNaN(currentVal) && currentVal > 0) {
    parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
  } else {
    parent.find('input[name=' + fieldName + ']').val(0);
  }
}

function filtrarProdutos(parametro) {

  //Retornando todos caso não haja pesquisa
  if(!parametro) return produtos;
  else {

    const filtrados = [];

    produtos.forEach(p => {
      if(p.nome.toUpperCase().includes(parametro.toUpperCase()) || p.valor == parametro) {
        filtrados.push(p);
      }
    });

    return filtrados;
  }
}

function barraPesquisa() {
  const parametroPesquisa = searchInput.value;

  const produtosFiltrados = filtrarProdutos(parametroPesquisa);
  
  let template = '';

  if(produtosFiltrados.length < 1) {
    template = `<h1 class="not-found-text">Nenhum resultado encontrado para a pesquisa "${parametroPesquisa}".</h1>`
    produtosContainer.innerHTML = template;
    return;
  }

  produtosFiltrados.forEach(produto => {
    template += 
   `<div class="card">
      <h2>${produto.nome}</h2>
      <p>${produto.valor} R$</p>
      <img src="./assets/${produto.foto}" class="produtoImagem"/>
      <div class="input-container">

        <div class="input-group">
          <input type="button" value="-" class="button-minus" data-field="quantity" >
          <input type="number" step="1" max="" value="1" name="quantity" class="quantity-field" id="input-quantidade${produto.id}">
          <input type="button" value="+" class="button-plus" data-field="quantity">
        </div>

        <button class="btn-carrinho" onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao carrinho</button>
      </div>
    </div>`

    $(document).ready(function() {
      $('.input-group').on('click', '.button-plus', function(e) {
        incrementValue(e);
      });
      
      $('.input-group').on('click', '.button-minus', function(e) {
        decrementValue(e);
      });
    })
  });

  produtosContainer.innerHTML = template;
}

function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  const quantidade = document.getElementById('input-quantidade' + id).value;
  const valorFinal = quantidade * produto.valor;
  const index = carrinho.length + 1;

  const itemCarrinho = {
    id: index,
    produto,
    quantidade,
    valor: valorFinal
  }

  carrinho.push(itemCarrinho);

  localStorage.setItem('carrinho', JSON.stringify(carrinho))
}

function listarProdutos() {

  const produtos = filtrarProdutos();

  let template = '';

  produtos.forEach(produto => {
    template += 
   `<div class="card">
      <h2>${produto.nome}</h2>
      <p>${produto.valor} R$</p>
      <img src="./assets/${produto.foto}" class="produtoImagem"/>
      <div class="input-container">

      <div class="input-group">
        <input type="button" value="-" class="button-minus" data-field="quantity">
        <input type="number" step="1" max="" value="1" name="quantity" class="quantity-field" id="input-quantidade${produto.id}">
        <input type="button" value="+" class="button-plus" data-field="quantity">
      </div>

        <button class="btn-carrinho" onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao carrinho</button>
      </div>
    </div>`
  });

  produtosContainer.innerHTML = template;

}

$(document).ready(function() {
  $('.input-group').on('click', '.button-plus', function(e) {
    incrementValue(e);
  });
  
  $('.input-group').on('click', '.button-minus', function(e) {
    decrementValue(e);
  });
})

window.addEventListener('DOMContentLoaded', listarProdutos);
searchButton.addEventListener('click', barraPesquisa);
