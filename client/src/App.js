import {Router, Route} from 'react-router-dom';
import LandingPage from './modules/LandingPage';
import HomePage from './modules/HomePage';

function App() {
  return (
    <div>

      <Router>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<HomePage/>}/>
      </Router>
            
    </div>
  );
}

export default App;
