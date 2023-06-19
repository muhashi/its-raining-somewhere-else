import './App.css';
import PlayMusicButton from './components/PlayMusicButton';
import RainBackground from './components/RainBackground';
import RainData from './components/RainData';

function App() {
  return (
    <>
      <RainBackground />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '90vh',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
        }}>
          <div></div> {/* empty div for spacing */}
          <h1>
            <i>it's raining somewhere else</i>
          </h1>
          <PlayMusicButton />
        </div>
        <RainData />
        <div></div> {/* empty div for spacing */}
      </div>
    </>
  )
}

export default App
