import Card from "./Card";

const List = ({ items }) => {
  return (
    <div>
      {items.map((item, key) => (
        <Card key={key} item={item} />
      ))}
    </div>
  );
};

export default List;
