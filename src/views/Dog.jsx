import { useEffect, useState } from "react";
import { axiosInstance } from "../api/util";
import Button from "react-bootstrap/Button";
import DogCard from "../components/DogCard";
import MultiSelect from "../components/MultiSelect";
import ResponsivePaginationComponent from "react-responsive-pagination";
import { getBreeds, searchDogs } from "../api/dog";
import { Col, Dropdown, Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import RemoveButton from "../components/RemoveButton";

const Dog = () => {
  const [adoptableDogs, setAdoptableDogs] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const [match, setMatch] = useState({});
  const [showMatch, setShowMatch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading...");

  useEffect(() => {
    getBreeds()
      .then((res) => {
        setBreeds(res.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const breedQueries = selectedBreeds.length
      ? selectedBreeds.map((breed) => `&breeds=${breed}`).join("")
      : "";
    searchDogs(currentPage, sortDirection, breedQueries)
      .then((res) => {
        setTotal(res?.data?.total);
        return res?.data?.resultIds;
      })
      .then((resIds) => {
        axiosInstance
          .post("dogs", resIds)
          .then((res) => {
            setAdoptableDogs(res.data);
            if (res.data.length === 0) {
              setLoadingText("There are no dogs, please search again.");
            }
          })
          .catch(console.error);
      });
  }, [sortDirection, selectedBreeds, currentPage]);

  const setAscending = () => setSortDirection("asc");
  const setDescending = () => setSortDirection("desc");

  const addBreedFilter = (newBreed) => {
    setSelectedBreeds((arr) => [...arr, newBreed]);
  };
  const removeBreedFilter = (breed) => {
    const toRemove = selectedBreeds.findIndex((x) => x === breed);
    setSelectedBreeds((arr) => arr.toSpliced(toRemove, 1));
  };

  const generateMatch = async () => {
    console.log(favoriteDogs);
    let matchID;
    try {
      const response = await axiosInstance.post("/dogs/match", favoriteDogs);
      console.log(response.data);
      matchID = response?.data.match;
    } catch (err) {
      console.error(err);
    }
    if (matchID) {
      try {
        const response = await axiosInstance.post("/dogs", [matchID]);
        if (response.data) {
          setMatch(response.data[0]);
          setShowMatch(true);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Go Fetch!</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button onClick={generateMatch}>Match me with a dog!</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container ">
        <h3 className="mt-4 mb-4 text-center">
          Search adoptable dogs and find your perfect match! &#x2661;
        </h3>
        {showMatch && (
          <div className="mt-4 mb-4">
            <div className="row justify-content-center">
              Congratulations! You have a match:
            </div>
            <div className="row justify-content-center">
              <DogCard dog={match} initialFavorite={true} freezeButton />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col">
            <MultiSelect
              items={breeds}
              onSelect={addBreedFilter}
              onRemove={removeBreedFilter}
              selectedItems={selectedBreeds}
            />
          </div>
          <div className="col">
            <Dropdown>
              <Dropdown.Toggle data-bs-theme="light" variant="light">
                Sort By Breed {sortDirection === "asc" ? "A-Z" : "Z-A"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={setAscending}>Breed A-Z</Dropdown.Item>
                <Dropdown.Item onClick={setDescending}>Breed Z-A</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {selectedBreeds.map((breed) => (
              <RemoveButton
                key={breed}
                breed={breed}
                removeBreed={removeBreedFilter}
              />
            ))}
          </div>
        </div>

        <div className="container mt-4">
          {adoptableDogs.length > 0 ? (
            <div>
              <div className="row">
                {adoptableDogs.map((dog, i) => (
                  <Col key={i}>
                    <DogCard
                      dog={dog}
                      initialFavorite={favoriteDogs.includes(dog.id)}
                      setFavoriteDogs={setFavoriteDogs}
                      favoriteDogs={favoriteDogs}
                    />
                  </Col>
                ))}
              </div>
              <div className="mt-2">
                <ResponsivePaginationComponent
                  current={currentPage}
                  total={total ? total / 25 : 0}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          ) : (
            <div>
              <h2>{loadingText}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dog;
