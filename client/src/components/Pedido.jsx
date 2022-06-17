import { useState } from "react";
import Button from "./Conta";
import Par from "./Par";

export function Pedido() {
  const [valor, setValor] = useState(1);
  const [resultadoOK, setRes] = useState(false);
  function incrementa() {
    updateForm({ Quantidade: valor + 1 });
    setValor(valor + 1);
  }
  function subtrai() {
    if (valor <= 0) {
      alert("Contagem mínima é 0!");
    } else {
      updateForm({ Quantidade: valor - 1 });
      setValor(valor - 1);
    }
  }

  const [form, setForm] = useState({
    Nome: "",
    CPF: "",
    CEP: "",
    Rua: "",
    Numero: "",
    Bairro: "",
    Complemento: "",
    Tipo: "",
    Tamanho: "P",
    Quantidade: 1,
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const [loc, setLoc] = useState({
    logradouro: "",
    bairro: "",
    complemento: ""
  });
  async function executaPesquisa() {
    const url =
      "https://viacep.com.br/ws/" +
      document.getElementById("cep").value +
      "/json/";

    try {
      const res = await fetch(url);
      const jsres = await res.json();
      updateForm({ Rua: jsres.logradouro, Bairro: jsres.bairro, Complemento: jsres.complemento });

      setLoc(jsres);
      setRes(true);
    } catch (erro) {
      console.error(erro);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newPed = { ...form };

    await fetch("http://localhost:5000/record/addPed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPed),
    })
      .catch(error => {
        window.alert(error);
      });

    setForm({
      Nome: "", CPF: "", CEP: "", Rua: "", Numero: "", Bairro: "", Complemento: "", Tipo: "", Tamanho: "P", Quantidade: 1
    });
  }
  async function buscaCli(e) {
    e.preventDefault();

    return (
      console.log("oi")    
      )
  }

  return (
    <div class="tudo">
      <form onSubmit={onSubmit}>
        <div class="cont1">
          <table class="tabela">
            <tr>
              <h3>Dados do cliente:</h3>
              <td>
                <p>Nome Completo:</p>
              </td>
              <td>
                <input class="input-text" type="text" id="nome" name="nome" value={form.Nome}
                  onChange={(e) => updateForm({ Nome: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>CPF:</p>
              </td>
              <td>
                <input class="input-text" id="cpf" name="cpf" value={form.CPF}
                  onChange={(e) => updateForm({ CPF: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>CEP:</p>
              </td>
              <td>
                <input class="input-text" type="text" id="cep" name="cep" value={form.CEP}
                  onChange={(e) => updateForm({ CEP: e.target.value })}
                />
                <button onClick={executaPesquisa} type="button">Pesquisar</button>
              </td>
            </tr>
            <tr>
              <div id="resultado">{!resultadoOK ? "" : <Resultado />}</div>
            </tr>
            <tr>
              <td>
                <p>Número:</p>
              </td>
              <td>
                <input class="input-text" type="text" id="num" name="num" value={form.Numero}
                  onChange={(e) => updateForm({ Numero: e.target.value })}
                />
              </td>
            </tr>
          </table>
        </div>
        <div class="cont2">
          <table class="tabela">
            <h3>Dados do pedido:</h3>
            <tr>
              <td>
                <p>Tipo:</p>
              </td>
              <td>
                <input class="input-text" type="text" id="tipo" name="tipo" value={form.Tipo}
                  onChange={(e) => updateForm({ Tipo: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>Tamanho:</p>
              </td>
              <td>
                <input type="radio" id="tamP" name="tam" value="P" onClick={(e) => updateForm({ Tamanho: e.target.value })} />
                Pequena
                <input type="radio" id="tamM" name="tam" value="M" onClick={(e) => updateForm({ Tamanho: e.target.value })} />
                Média
                <input type="radio" id="tamG" name="tam" value="G" onClick={(e) => updateForm({ Tamanho: e.target.value })} />
                Grande
              </td>
            </tr>
            <tr>
              <td>
                <p>Quantidade:</p>
              </td>
              <td className="x">
                <div id="Contagens">
                  <Button texto="-" onClick={subtrai} type="button" />
                  <span class="resultado" name="qtd">{valor}</span>
                  <Button texto="+" onClick={incrementa} type="button" />
                </div>
              </td>
            </tr>
          </table>
          <button class="final">Fechar Pedido</button>
        </div>
      </form>
      
    </div >
  );

  function Resultado() {
    return (
      <>
        <Par name="rua" value={loc.logradouro}
          onChange={(e) => updateForm({ Rua: e.target.value })}>
          Rua
        </Par>
        <Par name="bairro" value={loc.bairro}>
          Bairro
        </Par>
        <Par name="comp" value={loc.complemento}>
          Complemento
        </Par>
      </>
    );
  }
}
