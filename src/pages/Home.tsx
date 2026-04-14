import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSwitch = () => {
    navigate("/game");
  };

  return (
    <div>
      <button onClick={handleSwitch}>Play Game</button>
    </div>
  );
};

export default Home;
