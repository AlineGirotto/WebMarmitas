import pesquisar from "../img/logo.svg";

export function Home() {
    return (
        <div class="tudo">
            <div class="cont1" style={cont}>
                <h3> Seja bem-vindo(a)!</h3>
                <img src={pesquisar} alt="pesquisar" width="300px" />
            </div>
        </div>);
}


const cont = {
    textAlign: "center",
  };