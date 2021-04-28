
const btnVoltar = document.querySelector('.btn-finalizar-group .btn-volta');
const btnFinalizar = document.querySelector('.btn-finalizar-group  .btn-finaliza');

const inputs = document.querySelectorAll('.finalizar-pedido input');

function voltar() {
  window.location.replace('index.html');
}

function finalizar() {

  const inputsArray = Array.prototype.slice.call(inputs);
  const vazios = inputsArray.filter(input => input.value.length === 0);

  if(vazios.length === 0) {
    alert('Pedido Concluído, Obrigado!');
    localStorage.removeItem('carrinho');
    window.location.replace('index.html');
  }
  else alert('Por favor, preencha todos os campos.');
}

btnVoltar.addEventListener('click', voltar);
btnFinalizar.addEventListener('click', finalizar);