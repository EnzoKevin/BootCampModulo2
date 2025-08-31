const form = document.getElementById("pedidoForm");
const resumoDiv = document.getElementById("resumoPedido");

function alterarQtd(btn, valor, preco) {
  const input = btn.parentNode.querySelector("input");
  let qtd = parseInt(input.value);

  qtd += valor;
  if (qtd < 0) qtd = 0;

  input.value = qtd;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let telefone = document.getElementById("telefone").value;
  let email = document.getElementById("email").value;
  let pratoSelecionado = document.getElementsByClassName("pratoPrin");
  let acomp = document.getElementsByClassName("acomp");
  var quantidade = 0;
  var soma = 0;
  var selected = false;
  var plates = [];

  for (let i = 0; i < pratoSelecionado.length; i++) {
    quantidade = Number(pratoSelecionado[i].value);
    let preco = Number(pratoSelecionado[i].getAttribute("data-preco"));
    let nome = pratoSelecionado[i].getAttribute("data-nome");
    let id = Number(pratoSelecionado[i].getAttribute("data-id"));

    if (quantidade != 0) {
      let obj = {
        valor: preco,
        nome: nome,
        id: id,
        price: quantidade * preco,
        quantidade: quantidade,
      };
      plates.push(obj);
      console.log(plates);
    }

    if (!isNaN(quantidade) && quantidade > 0) {
      soma += quantidade * preco;
      selected = true;
    }
    if (soma == 0) selected = false;
  }

  for (let i = 0; i < acomp.length; i++) {
    let acompanhamento = Number(acomp[i].value);
    let precoAcompanhamento = Number(acomp[i].getAttribute("data-preco"));
    let nome = acomp[i].getAttribute("data-nome");
    let id = acomp[i].getAttribute("data-id");

    if (acompanhamento != 0) {
      let obj = {
        valor: precoAcompanhamento,
        nome: nome,
        id: id,
        price: acompanhamento * precoAcompanhamento,
        quantidade: acompanhamento,
      };
      plates.push(obj);
      console.log(plates);
    }

    if (!isNaN(acompanhamento) && acompanhamento > 0) {
      soma += acompanhamento * precoAcompanhamento;
    }
  }

  if (!selected) {
    alert("Escolha um prato principal!");
    return;
  }
  console.log("cheguei");
  let resumo = `
          <h1>Caro ${nome}</h1>
            <br/>
          <p>Seguem os dados do seu pedido</p>
            <br/>
          <p>O seu pedido é</p>
            <br/>
        `;
  for (let i = 0; i < plates.length; i++) {
    resumo += `
            <li>
              Prato: ${plates[i].nome} - Preço unitario: R$${plates[i].valor} - Quantidade: ${plates[i].quantidade} - Total: ${plates[i].price}
            </li>
          `;
  }

  resumo += `
    <br/>
    <h1 style="text-align: left; "> Preço Final - R$${soma}</h2>
    <br/>
  `;

  resumoDiv.innerHTML = resumo;
  console.log("partiu");
});
