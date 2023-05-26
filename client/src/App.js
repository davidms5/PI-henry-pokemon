import './App.css';
import {Routes, Route} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import MainPage from './components/MainPage/MainPage';
import FormPage from './components/FormPage/FormPage';
function App() {
  return (
    <div className="App">
      <h1>Henry Pokemon</h1>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/pokemon" element={<MainPage/>}/>
        <Route path='/create-pokemon' element={<FormPage/>}/>
      </Routes>

    </div>
  );
}

export default App;
