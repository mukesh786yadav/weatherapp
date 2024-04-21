
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CitesTable from './Components/CitesTable'
import WeatherPage from './Components/WeatherPage'

function App() {
  

  return (
    <>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<CitesTable/>}></Route>
                <Route path='/weather/:cityName' element={<WeatherPage/>}></Route>
              </Routes>
            </BrowserRouter>
    </>
  )
}

export default App
