import './index.scss';
import Ingame from './Ingame';
import Rules from './Rules';
import { Route, Routes } from 'react-router-dom';
import Menu from './Menu';

function App() {

  return (
    <>
      <main className='main-container'>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="ingame" element={<Ingame />} />
          <Route path="rules" element={<Rules />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
