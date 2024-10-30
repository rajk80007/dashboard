import axios from 'axios'
import { useEffect, useState } from 'react'
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

const Home = () => {

  const [data, setData] = useState([]);
  const [endYear, setEndYear] = useState([]);
  const [startYear, setStartYear] = useState([]);
  const [topics, setTopics] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [pests, setPests] = useState([]);
  const [sources, setSources] = useState([]);
  const [swots, setSwots] = useState([]);
  const [cities, setCities] = useState([]);
  const [Intensity, setIntensity] = useState([]);
  const [Likelihood, setLikelihood] = useState([]);
  const [Relevance, setRelevance] = useState([]);

  
  const [selectedPest, setSelectedPest] = useState([[...new Set(pests)].filter(item => item.length > 0 && item)]);
  
  const [Year, setYear] = useState([]);


  const newdata = [{
    name: 'Intensity', count: Intensity.length}, 
    {name: 'Likelihood', count: Likelihood.length}, 
    {name: 'Relevance', count: Relevance.length}, 
    {name: 'Year', count: Year.length},
    {name: 'Countries', count: countries.length}, 
    {name: 'Topics', count:topics.length}, 
    {name: 'Regions', count:regions.length},
    {name: 'Cities', count:cities.length}];


  const getAllData = () => {
    axios.get('http://127.0.0.1:8001/api/getAllData').then((res) => {
      console.log(res.data.data)
      setData(res.data.data)
      setEndYear(res.data.data.map((item) => item.end_year))
      setTopics(res.data.data.map((item) => item.topic))
      setSectors(res.data.data.map((item) => item.sector))
      setRegions(res.data.data.map((item) => item.region))
      setCountries(res.data.data.map((item) => item.country))
      setPests(res.data.data.map((item) => item.pest))
      console.log(pests);
      setSources(res.data.data.map((item) => item.source))
      setSwots(res.data.data.map((item) => item.swot))
      setCities(res.data.data.map((item) => item.city))
      setIntensity([...new Set(res.data.data)].map((item) => item.intensity))
      
      setLikelihood(res.data.data.map((item) => item.likelihood))
      setRelevance(res.data.data.map((item) => item.relevance))
      setStartYear(res.data.data.map((item) => item.start_year))
      setCountries(res.data.data.map((item) => item.country))
      setSelectedPest([...new Set(pests)].filter(item => item.length > 0 && item))

    })
  }
  
  console.log(selectedPest);
  
  const togglePest = (item) => {
    if (selectedPest.includes(item)) {
      setSelectedPest(selectedPest.filter((pest) => pest !== item))
    } else {
      setSelectedPest([...selectedPest, item])
    }
    getFilterData()
    
  }

  const getFilterData = () => {
    axios.post('http://127.0.0.1:8001/api/filter', {pests: selectedPest}, 
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    ).then((res) => {
      console.log(res.data.data)
      setIntensity(res.data.data.map((item) => item.intensity))
    });
  }
  
  useEffect(() => {
    getAllData()
    getFilterData()
    // setSelectedPest([...new Set(pests)].filter(item => item.length > 0 && item))
  }, [])

  useEffect(() => {
    if (pests.length > 0) {
      setSelectedPest([...new Set(pests)].filter(item => item.length > 0 && item))
    }
  }, [pests])

  return (
    <>
      <div className="w-4/5 mx-auto absolute top-20 right-0 px-10 py-5 container">
        <h1 className="text-2xl font-bold text-center py-5">Dashboarad</h1>

        {/* Filter */}

        <div className='w-full grid grid-cols-4 gap-5'>

          <div className='w-full border shadow-lg p-5 '>
            <h2 className='text-xl font-bold text-center py-5'>Filter - Pestle</h2>
            <div className='text-center'>
              {
                [...new Set(pests)].map((item, index) => {
                  return ( item.length > 0 &&
                    <div onClick={() => togglePest(item)}
                    key={index} className={` ${selectedPest.includes(item) ? 'bg-green-500 text-white' : ''} border p-2 cursor-pointer font-bold duration-300 transition rounded-sm my-1 hover:bg-green-500 hover:text-white bg-gray-100`}>{item}</div>
                  )
                })
              }
             
            </div>

          </div>

          <div className='col-span-3 flex justify-center items-center w-full border shadow-lg p-5 '>
          <PieChart data={newdata} />
          </div>

        </div>


        {/* BarChart */}

        <div className='w-full border shadow-lg p-5'>
          <BarChart data={newdata} />
          Intensity
          
        </div>




      </div>

    </>
  )
}

export default Home