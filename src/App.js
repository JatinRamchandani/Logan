import logo from './logo.svg';
import './App.css';
import { useUserContext } from './context/userContext';
import Homepage from "./components/Homepage";
import Auth from "./components/Auth"

function App() {

  const {loading, error, user} = useUserContext();
  return (
    <div className="App">
      {error && <p>{error}</p>}
      {loading ? <h2>Loading...</h2> : <>{user ? <Homepage/> : <Auth/>}</>}
    </div>
  );
}

export default App;
