const produtosContainer = document.querySelector('.content .container');

const carrinho = JSON.parse(localStorage.getItem('carrinho'));

function removerDoCarrinho(id) {
  const novoCarrinho = carrinho.filter(i => i.id !== id);

  localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));

  window.location.replace("carrinho.html")
}

function listarCarrinho() {

  let template = '';

  if(!carrinho) template = `<h1  class="meu-carrinho">Seu Carrinho Está Vazio</h1>`;

  if(carrinho) template += `<h1 class="meu-carrinho">Meu Carrinho</h1>`;
  let valorTotal = 0;

  if(carrinho) {
    carrinho.forEach(item => {
      valorTotal += item.valor;
      template += `
      <div class="card lista-carrinho">
        <div class="text-container">
          <h2>Nome: ${item.produto.nome}</h2>
          <p>Quantidade: ${item.quantidade}</h2>
          <p>Valor: ${item.valor}R$</h2>
        </div>

        <button class="btn-excluir" onclick="removerDoCarrinho(${item.id})">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
      `
    })
  }

  if(carrinho) {
    template += `
      <div class="carrinho-info-container">
        <h1 class="valor-total">Valor Total: ${valorTotal}R$</h1>
        <a href="finalizar.html" class="btn-finalizar">Finalizar Pedido</a>
      </div>
    `;
  }

  produtosContainer.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', listarCarrinho);