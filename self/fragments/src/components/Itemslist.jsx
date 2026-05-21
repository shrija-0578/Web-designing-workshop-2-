import Item from "./Item";
const Itemslist = ({ items }) => {
    

    return (    
      <ul className="list-group">
        {items.map((item) => (
          <Item key={item}  itemslist={item} ></Item>
        ))} 
      </ul> 
    );
};
export default Itemslist;