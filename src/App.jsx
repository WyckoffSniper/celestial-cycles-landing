import { Routes, Route } from 'react-router-dom';
import FilmGrain from './components/FilmGrain';
import LandingPage from './components/LandingPage';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  return (
    <>
      <FilmGrain />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}
