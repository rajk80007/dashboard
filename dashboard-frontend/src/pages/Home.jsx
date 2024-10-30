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

  // Average Intensity
  const totalInensity = Intensity.reduce((sum, value)=> sum + Number(value), 0)
  const averageIntensity = totalInensity/Intensity.length;
  

  // Average Likelihood
  const totalLikelihood = Likelihood.reduce((sum, value)=> sum + Number(value), 0)
  const averageLikelihood = totalLikelihood/Likelihood.length;

  // Average Relevance
  const totalRelevance = Relevance.reduce((sum, value)=> sum + Number(value), 0)
  const averageRelevance = totalRelevance/Relevance.length;

  // Average Year
  const totalYear = Year.reduce((sum, value)=> sum + Number(value), 0)
  const averageYear = totalYear/Year.length;

  // console.log(averageYear);
  const newdata = [{
    name: 'Intensity', count: averageIntensity.toFixed(2)}, 
    {name: 'Likelihood', count: averageLikelihood.toFixed(2)}, 
    {name: 'Relevance', count: averageRelevance.toFixed(2)}, 
    {name: 'Year', count: averageYear.toFixed(2)},
    {name: 'Countries', count: Number(countries.length) }, 
    {name: 'Topics', count: Number(topics.length)}, 
    {name: 'Regions', count: Number(regions.length)},
    {name: 'Cities', count: Number(cities.length)}];


  const getAllData = () => {
    axios.get('http://127.0.0.1:8001/api/getAllData').then((res) => {
      // console.log(res.data.data)
      res = Array.from(res.data.data)
      setData(res);
      setIntensity(data.map((item) => item.intensity))
      setLikelihood(data.map((item) => item.likelihood))
      setRelevance(data.map((item) => item.relevance))
      setYear(data.filter(item => item.end_year && item.start_year)
          .map(item => Number(item.end_year) - Number(item.start_year))
      );
     
      setCountries([...new Set(res)].map((item) => item.country)
            .filter((country) => country && country.trim() !== ''),
      )
      setTopics([...new Set(res)].map((item) => item.topic).filter((topic) => topic && topic.trim() !== ''))
      setRegions([...new Set(res)].map((item) => item.region).filter((region) => region && region.trim() !== ''))
      setCities([...new Set(res)].map((item) => item.city).filter((city) => city && city.trim() !== ''));
      console.log(Year);
      // setSectors(res.data.data.map((item) => item.sector))
      setPests(data.map((item) => item.pest))
      // console.log(pests);
      // setSources(res.data.data.map((item) => item.source))
      // setSwots(res.data.data.map((item) => item.swot))
      // setIntensity([...new Set(res.data.data)].map((item) => item.intensity))
      
      // setCountries(res.data.data.map((item) => item.country))
      // setSelectedPest([...new Set(pests)].filter(item => item.length > 0 && item))

    })
  }
  
  
  const getFilterData = () => {
    console.log(selectedPest);

    axios.post('http://127.0.0.1:8001/api/filter', {pests: selectedPest}, 
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    ).then((res) => {
      console.log(res.data.data);
      res = Array.from(res.data.data)
      setIntensity(res.map((item) => item.intensity))
      setLikelihood(res.map((item) => item.likelihood))
      setRelevance(res.map((item) => item.relevance))
      setCountries([...new Set(res)].map((item) => item.country)
            .filter((country) => country && country.trim() !== ''),
      )
      setTopics([...new Set(res)].map((item) => item.topic).filter((topic) => topic && topic.trim() !== ''))
      setRegions([...new Set(res)].map((item) => item.region).filter((region) => region && region.trim() !== ''))
      setCities([...new Set(res)].map((item) => item.city).filter((city) => city && city.trim() !== ''));
      setYear(res.filter(item => item.end_year && item.start_year).map(item => Number(item.end_year)-Number(item.start_year)));
    });
  }
  const togglePest = (item) => {
    if (selectedPest.includes(item)) {
      setSelectedPest(selectedPest.filter((pest) => pest !== item))
    } else {
      setSelectedPest([...selectedPest, item])
    }
    getFilterData()
    
  }

  useEffect(() => {
    getFilterData();
}, [selectedPest]);
  
  useEffect(() => {
    getAllData()
   
    // getFilterData()
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

          <div className='col-span-3 flex flex-col justify-center items-center w-full border shadow-lg p-2 '>
            <h3 className='text-xl font-bold text-center py-5'>Average</h3>
          <PieChart data={newdata} />
          </div>

        </div>


        {/* BarChart */}
{/* 
        <div className='w-full border shadow-lg p-5'>
          <BarChart data={newdata} />
          Intensity
          
        </div> */}




      </div>

    </>
  )
}

export default Home