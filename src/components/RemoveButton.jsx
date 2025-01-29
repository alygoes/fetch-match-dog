import { Button } from "react-bootstrap";

const RemoveButton = ({ breed, removeBreed }) => {
  return (
    <Button onClick={() => removeBreed(breed)} variant="btn-outline-dark" >
      {breed} &#10005;
    </Button>
  );
};

export default RemoveButton