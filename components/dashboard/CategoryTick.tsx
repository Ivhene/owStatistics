export const CategoryTick = (props: any) => {
  return (
    <foreignObject x={props.x - 20} y={props.y} width={40} height={40}>
      <img src={props.payload.value} />
    </foreignObject>
  );
};
