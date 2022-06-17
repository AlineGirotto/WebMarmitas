import { useState } from "react";

export function Marmita() {
  const [form, setForm] = useState({
    Tipo: "",
    Valor: "",
    Observacao: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  async function onSubmit(e) {
    e.preventDefault();

    const newMar = { ...form };

    await fetch("http://localhost:5000/record/addMar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMar),
    })
      .catch(error => {
        window.alert(error);
      });

    setForm({
      Tipo: "", Valor: "", Observacao: ""});
      
  }
    return (
      <div class="tudo">
        <form onSubmit={onSubmit}>
        <div class="cont1">
          <table class="tabela">
            <tr>
              <h3>Cadastro de Marmitas:</h3>
              <td>
                <p>Tipo:</p>
              </td>
              <td>
                <input class="input-text" type="text" id="tipo" name="tipo"  value={form.Tipo}
                  onChange={(e) => updateForm({ Tipo: e.target.value })} />
              </td>
            </tr>
            <tr>
              <td>
                <p>Valor:</p>
              </td>
              <td>
                <input class="input-text" id="val" name="val"  value={form.Valor}
                  onChange={(e) => updateForm({ Valor: e.target.value })}/>
              </td>
            </tr>
            <tr>
              <td>
                <p>Observação:</p>
              </td>
              <td>
                <textarea
                  class="input-text"
                  type="text"
                  id="obs"
                  name="obs"
                  value={form.Observacao}
                  onChange={(e) => updateForm({ Observacao: e.target.value })}
                ></textarea>
              </td>
            </tr>
          </table>
        </div>
        <button class="final" type="submit">
          Cadastrar Marmita
        </button>
        </form>
      </div>
    );
  }
  