type ChildProps = {
  children: string;
};

export default function Child(props: ChildProps) {
  return <div>{props.children}</div>;
}
