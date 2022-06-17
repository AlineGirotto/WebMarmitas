import { useState } from "react";
import Par from "./Par";

export function Cliente() {
  const [resultadoOK, setRes] = useState(false);
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

  const [form, setForm] = useState({
    Nome: "",
    CPF: "",
    CEP: "",
    Rua: "",
    Numero: "",
    Bairro: "",
    Complemento: "",
    Contato: "",
    Email: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }


  async function onSubmit(e) {
    e.preventDefault();

    const newCli = { ...form };

    await fetch("http://localhost:5000/record/addCli", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCli),
    })
      .catch(error => {
        window.alert(error);
      });
    setForm({
      Nome: "", CPF: "", CEP: "", Rua: "", Numero: "", Bairro: "", Complemento: "", Contato: "", Email: ""
    });

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
                  onChange={(e) => updateForm({ Nome: e.target.value })} />
              </td>
            </tr>
            <tr>
              <td>
                <p>CPF:</p>
              </td>
              <td>
                <input class="input-text" id="cpf" name="cpf" value={form.CPF}
                  onChange={(e) => updateForm({ CPF: e.target.value })} />
              </td>
            </tr>
            <tr>
              <td>
                <p>CEP:</p>
              </td>
              <td>
                <input class="input-text" type="text" id="cep" name="cep" value={form.CEP}
                  onChange={(e) => updateForm({ CEP: e.target.value })} />
                <button onClick={executaPesquisa} type="button">Pesquisar</button>
              </td>
            </tr>
            <tr>
              <td>
                <div id="resultado">{!resultadoOK ? "" : <Resultado />}</div>
              </td>
            </tr>
            <tr>
              <td>
                <p>Número:</p>
              </td>
              <td>
                <input class="input-text" type="text" id="num" name="num" value={form.Numero}
                  onChange={(e) => updateForm({ Numero: e.target.value })} />
              </td>
            </tr>
            <tr>
              <td>
                <p>Telefone:</p>
              </td>
              <td>
                <input class="input-text" type="text" id="tel" name="tel" value={form.Contato}
                  onChange={(e) => updateForm({ Contato: e.target.value })} />
              </td>
            </tr>
            <tr>
              <td>
                <p>E-mail:</p>
              </td>
              <td>
                <input class="input-text" type="text" id="email" name="email" value={form.Email}
                  onChange={(e) => updateForm({ Email: e.target.value })} />
              </td>
            </tr>
          </table>
        </div>
        <button class="final" type="submit">
          Cadastrar Cliente
        </button>
      </form>
    </div>
  );

  function Resultado() {
    return (
      <>
        <Par name="rua" id="rua" value={loc.logradouro}>
          Rua
        </Par>
        <Par name="bairro" id="bairro" value={loc.bairro}>
          Bairro
        </Par>
        <Par name="comp" id="comp" value={loc.complemento}>
          Complemento
        </Par>
      </>
    );
  }
}

