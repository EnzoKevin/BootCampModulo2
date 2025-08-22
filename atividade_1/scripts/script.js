const form = document.getElementById("pedidoForm");
const resumoDiv = document.getElementById("resumoPedido");
let pratoSelecionado = document.getElementsByClassName("Principal");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let telefone = document.getElementById("telefone").value;
  let email = document.getElementById("email").value;

  let acompanhamentos = document.querySelectorAll(
    "input[type='checkbox']:checked"
  );
  let Prato1 = pratoSelecionado[0].value;
  let Prato2 = pratoSelecionado[1].value;
  let Prato3 = pratoSelecionado[2].value;

  let total = Number(pratoSelecionado.value);

  for (i = 0; i < pratoSelecionado.length; i++) {
    if (pratoSelecionado[i] >= 1) {
      var prato = true;
    }

    if (i === 2 && prato) {
      alert("Escolha um prato principal!");
      return;
    }
  }

  let resumo = `<p><b>Cliente:</b> ${nome} <br> <b>Telefone:</b> ${telefone} <br> <b>Email:</b> ${email}</p>`;
  resumo += `<p><b>Prato Principal:</b> ${pratoSelecionado.dataset.nome} - R$ ${pratoSelecionado.value},00</p>`;

  if (acompanhamentos.length > 0) {
    resumo += "<p><b>Acompanhamentos:</b><br>";
    acompanhamentos.forEach((item) => {
      resumo += `- ${item.dataset.nome} (R$ ${item.value},00)<br>`;
      total += Number(item.value);
    });
    resumo += "</p>";
  }

  resumo += `<p class="total">Preço Final: R$ ${total},00</p>`;

  resumoDiv.innerHTML = resumo;
});
