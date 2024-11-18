import React from 'react';
import { BrowserRouter as Router, Route, Routes,   } from 'react-router-dom';
import Home from './pages/Home';
import Songs from './pages/Songs';
import Artists from './pages/Artists';
import AboutUs from './pages/AboutUs';
import MenuComponent from './pages/MenuComponents';
import SongDetail from './pages/SongDetail';
import ArtistDetailPage from './pages/ArtistDetail';
import SignInPage from './pages/SignIn';
import './App.css';
import './i18n'; 

function App() {
  return (
    <Router>
      <div className="app">
        <MenuComponent/>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/songs/:title" element={<SongDetail />} />
            <Route path="/artist/:singer" element={<ArtistDetailPage />}/>
            <Route path='/signin' element={<SignInPage/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
