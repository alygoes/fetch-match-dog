import Card from "react-bootstrap/Card";
import { useState } from "react";

const DogCard = ({
  dog,
  initialFavorite,
  setFavoriteDogs
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite ? true : false);
  const toggleFavorite = () => {
    console.log(isFavorite);
    if (isFavorite) {
      setFavoriteDogs((dogs)=>dogs.filter(favDog=>favDog.id !==dog.id ))
      setIsFavorite(false);
    } else {
      setFavoriteDogs((dogs)=>([...dogs, dog.id]))
      setIsFavorite(true);
    }
  };
  return (
    <Card style={{ width: "18rem", height: "350px" }}>
      <div className="card-img-top">
        <img
          src={dog.img}
          style={{ maxWidth: "100%", maxHeight: "150px" }}
          alt={`Dog profile`}
        ></img>
      </div>

      <div className="card-body">
        <h5 className="card-title">{dog.name} </h5>
        <h6>{dog.breed}</h6>
        <p>
          {dog.age} years old {dog.id} in {dog.zip_code}
        </p>
        <input
          id={dog.id}
          type="checkbox"
          value={isFavorite ? true : false}
          onClick={toggleFavorite}
        ></input>
        <label htmlFor={dog.id}>Favorite</label>
      </div>
    </Card>
  );
};

export default DogCard;
