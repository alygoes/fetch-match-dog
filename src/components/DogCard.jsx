import Card from "react-bootstrap/Card";
import { useState } from "react";

const DogCard = ({ dog, initialFavorite, setFavoriteDogs, freezeButton }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite ? true : false);
  const toggleFavorite = () => {
    if (isFavorite) {
      setFavoriteDogs((dogs) => ([...dogs.filter((favDog) => favDog !== dog.id)]));
      setIsFavorite(false);
    } else {
      setFavoriteDogs((dogs) => ([...dogs, dog.id]));
      setIsFavorite(true);
    }
  };
  return (
    <Card
      style={{ width: "18rem", height: "350px", padding: "0" }}
      className="mb-3 text-center"
    >
      <div className="card-img-top">
        <img
          src={dog.img}
          style={{ width: "100%", height: "200px" }}
          alt={`Dog profile`}
        ></img>
      </div>

      <div className="card-body">
        <h5 className="card-title">{dog.name} </h5>
        <h6>{dog.breed}</h6>
        <h6>
          {dog.age} {dog.age === 1 ? "year" : "years"} old
        </h6>
        <h6>{dog.zip_code}</h6>
        {isFavorite ? (
          <button
            onClick={freezeButton ? ()=>{} : toggleFavorite}
            style={{
              border: "0",
              background: "none",

              fontSize: "40px",
              position: "absolute",
              bottom: "0px",
              left: "15px",
            }}
          >
            &#x2665;
          </button>
        ) : (
          <button
            onClick={toggleFavorite}
            style={{
              border: "0",
              background: "none",
              fontSize: "40px",
              position: "absolute",
              bottom: "0px",
              left: "15px",
            }}
          >
            &#x2661;
          </button>
        )}
      </div>
    </Card>
  );
};

export default DogCard;
