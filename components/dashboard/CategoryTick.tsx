export const CategoryTick = (props: any) => {
  return (
    <foreignObject x={props.x - 20} y={props.y} width={35} height={35}>
      <img src={props.payload.value} />
    </foreignObject>
  );
};
