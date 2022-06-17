import { Route } from "react-router-dom";
import { Home } from "./Home";
import { Pedido } from "./Pedido";
import { Cliente } from "./Cliente";
import { Marmita } from "./Marmita";
import { Registro } from "./Registro";

export default function Main() {
  return (
    <div className="Main">
      <Route exact path="/" component={Home} />
      <Route path="/Pedido" component={Pedido} />
      <Route path="/Cliente" component={Cliente} />
      <Route path="/Marmita" component={Marmita} />
      <Route path="/Registro" component={Registro} />
    </div>
  );
}
