import React, { useEffect, useState } from "react";

const Pedido = (props) => (
  <tr>
    <td>{props.pedido.Nome}</td>
    <td>{props.pedido.CPF}</td>
    <td>{props.pedido.CEP}</td>
    <td>{props.pedido.Rua}</td>
    <td>{props.pedido.Numero}</td>
    <td>{props.pedido.Bairro}</td>
    <td>{props.pedido.Tipo}</td>
    <td>{props.pedido.Tamanho}</td>
    <td>{props.pedido.Quantidade}</td>
    <td>
      <button className="btn btn-link"
        onClick={() => {
          props.deletePedido(props.pedido._id);
        }}
      >
        Excluir
      </button>
    </td>
  </tr>
);

export function Registro() {
  const [pedido, setPedido] = useState([]);

  useEffect(() => {
    async function getPedido() {
      const response = await fetch(`http://localhost:5000/registro/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const pedido = await response.json();
      setPedido(pedido);
    }

    getPedido();

  }, [pedido.length]);

  
  async function deletePedido(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

    const newPedido = pedido.filter((el) => el._id !== id);
    setPedido(newPedido);
  }

  function recordList() {
    return pedido.map((pedido) => {
      return (
        <Pedido
        pedido={pedido}
          deletePedido={() => deletePedido(pedido._id)}
          key={pedido._id}
        />
      );
    });
  }
  return (
    <div class="tudo">
      <h2>Listagem de pedidos:</h2>
      <div class="cont1">
        <table class="marmitas">
        <thead>
         <tr>
           <th>Nome</th>
           <th>CPF</th>
           <th>CEP</th>
           <th>Rua</th>
           <th>Número</th>
           <th>Bairro</th>
           <th>Tipo</th>
           <th>Tamanho</th>
           <th>Quantidade</th>           
           <th>Ações</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
        </table>
      </div>
    </div>
  );
}
