import './App.css';
import {Routes, Route} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import MainPage from './components/MainPage/MainPage';
import FormPage from './components/FormPage/FormPage';
import DetailPage from './components/MainPage/DetailPage/DetailPage';
function App() {
  return (
    <div className="App">
      <h1>Henry Pokemon Project</h1>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/pokemon" element={<MainPage/>}/>
        <Route path='/create-pokemon' element={<FormPage/>}/>
        <Route path='/pokemon/:nombre' element={<DetailPage/>}/>
      </Routes>

    </div>
  );
}

export default App;
