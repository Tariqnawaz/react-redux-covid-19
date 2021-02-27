import MapContainer from './redux/containers/mapContainer';
import './App.css';

function App() {
  return (
    <>
      <div className = "app-container">
        <h2 className="header">Covid-19 Tracker</h2>
        <MapContainer/>
      </div>
    </>
  );
}

export default App;
