import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from "react";
import AdoptedPetContext from "./contexts/AdoptedPetContext";
import fetchPet from "./api/fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./components/Modal";


const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

  const [showModal, setShowModal] = useState(false);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images}/>
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Me leva {pet.name}</button>
        <p>{pet.description}</p>
        {
          showModal ? (
            <Modal>
              <div>
                <h1>Gostaria de adotar o pet {pet.name}?</h1>
                <div className="buttons">
                  <button onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}>Sim</button>
                  <button onClick={() => setShowModal(false)}>Não</button>
                </div>
              </div>
            </Modal>
          ) : null
        }
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
