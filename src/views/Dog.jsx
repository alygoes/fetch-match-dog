import { useEffect, useState } from "react";
import { axiosInstance } from "../api/util";
import Button from "react-bootstrap/Button";
import DogCard from "../components/DogCard";
import MultiSelect from "../components/MultiSelect";
import { Link } from "react-router";

const Dog = () => {
  const [adoptableDogs, setAdoptableDogs] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  //future  todo max out favorite dogs
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const [match, setMatch] = useState({});
  const [showMatch, setShowMatch] = useState(false)



  useEffect(() => {
    axiosInstance
      .get("dogs/breeds")
      .then((res) => {
        setBreeds(res.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    //TODO: if this is a 401, handle that to say login to see dogs
    const breedQueries = selectedBreeds.length
      ? selectedBreeds.map((breed) => `&breeds=${breed}`).join("")
      : "";
    axiosInstance
      .get(`dogs/search?sort=breed:${sortDirection}${breedQueries}`)
      .then((res) => {
        return res.data.resultIds;
      })
      .then((resIds) => {
        axiosInstance.post("dogs", resIds).then((res) => {
          setAdoptableDogs(res.data);
        });
      });
  }, [sortDirection, selectedBreeds]);

  const toggleSortDirection = () =>
    sortDirection === "asc"
      ? setSortDirection("desc")
      : setSortDirection("asc");

  const addBreedFilter = (newBreed) => {
    setSelectedBreeds((arr) => [...arr, newBreed]);
  };
  const removeBreedFilter = (breed) => {
    const toRemove = selectedBreeds.findIndex((x) => x === breed);
    setSelectedBreeds((arr) => arr.toSpliced(toRemove, 1));
  };

  const generateMatch = async()=>{
    let matchID;
    try {
      const response = await  axiosInstance.post("/dogs/match", favoriteDogs)
      console.log(response.data)
      matchID = response?.data.match
    }
    catch (err) {
      console.error(err)
    }
    if (matchID) {
      try {
        const response = await  axiosInstance.post("/dogs", [matchID])
        if (response.data) {
          setMatch(response.data[0])
          setShowMatch(true)
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div className="container text-center">
      <div>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
      <div className="row">
        <h1>Go Fetch</h1>
      </div>
      <div className="row">
        <label>Filter dogs by breed</label>
        <MultiSelect
          items={breeds}
          onSelect={addBreedFilter}
          onRemove={removeBreedFilter}
          selectedItems={selectedBreeds}
        />
      </div>
      <div className="row">
        Filters applied: {selectedBreeds.map((breed) => `${breed}`)}
      </div>
      <div><Button onClick={generateMatch}>Match me with a dog!</Button></div>
    {showMatch && <DogCard dog={match}/>}
    
      <div>Favorite dogs: {favoriteDogs.map(dog=> `${dog}`)}</div>
      <div>Adoptable dogs</div>
      <div>
        Sorting by breed: {sortDirection}
        <Button onClick={toggleSortDirection}>
          {sortDirection === "asc" ? "desc" : "asc"}
        </Button>
      </div>

      <div className="row">
        {adoptableDogs.map((dog, i) => (
          <DogCard
            dog={dog}
            key={i}
            initialFavorite={favoriteDogs.includes(dog.id)}
            setFavoriteDogs={setFavoriteDogs}
          />
        ))}
      </div>

      <div>pagination goes here</div>
    </div>
  );
};

export default Dog;
