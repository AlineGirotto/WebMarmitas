export default function Conta(props) {
    const buttonStyle = props.style || { minWidth: "40px" };
  
    const { texto, ...rest } = props;
    return (
      <div>
        <button {...rest} style={buttonStyle}>
          {" "}
          {texto}
        </button>
        {props.cont}
      </div>
    );
  }
  