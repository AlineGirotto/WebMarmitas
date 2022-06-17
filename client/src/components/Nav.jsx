import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="menu">
      <ul className="flex-nav">
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/pedido">Fazer Pedido</Link>
        </li>
        <li>
          <Link to="/cliente">Cadastro Clientes</Link>
        </li>
        <li>
          <Link to="/marmita">Cadastro Marmitas</Link>
        </li>
        <li>
          <Link to="/registro">Registro de Pedidos</Link>
        </li>
      </ul>
    </div>
  );
}
