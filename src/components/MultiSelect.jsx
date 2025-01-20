import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const SelectableItem = ({ id, text, onSelect, onRemove }) => {
  const [isSelected, setIsSelected] = useState(false);
  const itemClick = () => {
    if (isSelected) {
      onRemove(id)
    } else {
      onSelect(id)
    }
    setIsSelected((x) => !x);
  };

  return (
    <Dropdown.Item
      onClick={itemClick}
      style={isSelected ? { background: "hotpink" } : {}}
    >
      {text}
    </Dropdown.Item>
  );
};

const MultiSelect = ({ items, onSelect, onRemove }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter by Breed
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ height: "500px", overflowY: "scroll" }}>
        {items.map((item, i) => (
          <SelectableItem
            key={i}
            text={item}
            id={item}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MultiSelect;
