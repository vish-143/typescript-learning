type ButtonProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function Button(props: ButtonProps) {
  return (
    <div>
      <button onClick={props.handleClick}>Click Me</button>
    </div>
  );
}
