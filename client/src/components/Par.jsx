export default function Par(props) {
  return (
    <div style={par}>
      {props.children}:
      <input
        id={props.name}
        defaultValue={props.value}
        className="input"
        style={inp}
      ></input>
    </div>
  );
}

const par = {
  textAlign: "left",
  padding: "5px"
};
const inp = {
  textAlign: "left",
  marginLeft: "10px"
};