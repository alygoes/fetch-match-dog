import Dropdown from "react-bootstrap/Dropdown";

const SelectableItem = ({ id, text, onSelect, onRemove, isSelectedItem }) => {
  const itemClick = () => {
    if (isSelectedItem) {
      onRemove(id);
    } else {
      onSelect(id);
    }
  };

  return (
    <Dropdown.Item
      onClick={itemClick}
      style={isSelectedItem ? { background: "#d7d7d7" } : {}}
    >
      {text}
    </Dropdown.Item>
  );
};

const MultiSelect = ({ items, onSelect, onRemove, selectedItems }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        data-bs-theme="light"
        variant="light"
        id="dropdown-basic"
      >
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
            isSelectedItem={selectedItems.includes(item)}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default MultiSelect;
