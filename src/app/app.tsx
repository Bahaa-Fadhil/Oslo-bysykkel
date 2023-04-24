import { ApplicationHeader } from '@oslo-bysykkel/shared/application-header';
import { Home } from './pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

export function App() {
  return (
    <BrowserRouter>
      <ApplicationHeader
        appName="Oslo bysykkel"
        logo={<DirectionsBikeIcon />}
      />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
