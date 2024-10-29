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
  

  const newdata = [25,30,25,36,25,56,25]


  const getAllData = async () => {
    await axios.get('http://127.0.0.1:8001/api/getAllData').then((res) => {
      console.log(res.data.data)
      setData(res.data.data)
      setEndYear(res.data.data.map((item) => item.end_year))
      setTopics(res.data.data.map((item) => item.topic))
      setSectors(res.data.data.map((item) => item.sector))
      setRegions(res.data.data.map((item) => item.region))
      setCountries(res.data.data.map((item) => item.country))
      setPests(res.data.data.map((item) => item.pest))
      setSources(res.data.data.map((item) => item.source))
      setSwots(res.data.data.map((item) => item.swot))
      setCities(res.data.data.map((item) => item.city))
      setIntensity(res.data.data.map((item) => item.intensity))
      setLikelihood(res.data.data.map((item) => item.likelihood))
      setRelevance(res.data.data.map((item) => item.relevance))
      setStartYear(res.data.data.map((item) => item.start_year))++.
      3
    })
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      <div className="w-4/5 mx-auto absolute top-20 right-0 px-10 py-5">
        <h1 className="text-2xl font-bold text-center py-5">Dashboarad</h1>
        
        {/* Filter */}

        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 items-center justify-center">
          <div className="w-full flex gap-5">
          <label className='text-lg font-bold text-[#413a3a]'> Filter By: </label>
          </div>
          <div className="w-full flex gap-5 mx-2">
            <label className='text-lg font-medium text-[#413a3a] w-[150px]'>End Year</label>
            <select name="" id="" defaultValue={""} className='text-lg font-medium w-[150px] text-[#413a3a]'>
              <option value="" disabled>Select</option>
              {
                [...new Set(endYear)].map((item) => {
                  return (
                    <option value={item}>{item}</option>
                  )
                })
              }

            </select>
          </div>
          <div className="w-full flex gap-5 mx-2">
            <label className='text-lg font-medium text-[#413a3a]'>Topics</label>
            <select name="" id="" defaultValue={""} className='text-lg font-medium w-[150px] text-[#413a3a]'>
              <option value="" disabled>Select</option>
              {[...new Set(topics)].map((item) => {
                return (
                  <option value={item}>{item}</option>
                )
              })

              }
            </select>
          </div>
          <div className="w-full flex gap-5 mx-2">
            <label className='text-lg font-medium text-[#413a3a]'>Sector</label>
            <select name="" id="" defaultValue={""} className='text-lg font-medium w-[150px] text-[#413a3a]'>
              <option value="" disabled>Select</option>
              {
                [...new Set(sectors)].map((item) => {
                  return (
                    <option value={item}>{item}</option>
                  )
                })
              }

            </select>
          </div>
          <div className="w-full flex gap-5 mx-2">
          <label className='text-lg font-medium text-[#413a3a]'>Region</label>
          <select name="" id="" defaultValue={""} className='text-lg font-medium w-[150px] text-[#413a3a]'>
            <option value="" disabled>Select</option>
            {
              [...new Set(regions)].map((item) => {
                return (
                  <option value={item}>{item}</option>
                )
              })
            }
          </select>
          </div>
          <div className="w-full flex gap-5 mx-2">
          <label className='text-lg font-medium text-[#413a3a]'>Country</label>
          <select name="" id="" defaultValue={""} className='text-lg font-medium w-[150px] text-[#413a3a]'>
            <option value="" disabled>Select</option>
            {
              [...new Set(countries)].map((item) => {
                return (
                  <option value={item}>{item}</option>
                )
              })
            }
          </select>
          </div>
          <div className='w-full flex gap-5 mx-2'>       
          <label className='text-lg font-medium text-[#413a3a]'>Pests</label>
          <select name="" id="" defaultValue={""} className='text-lg font-medium w-[150px] text-[#413a3a]'>
            <option value="" disabled>Select</option>
            {
              [...new Set(pests)].map((item) => {
                return (
                  <option value={item}>{item}</option>
                )
              })
            }
          </select>
          </div>
          <div className='w-full flex gap-5 mx-2'>         
          <label className='text-lg font-medium text-[#413a3a]'>Source</label>
          <select name="" id="" defaultValue={""} className='text-lg font-medium w-[150px] text-[#413a3a]'>
            <option value="" disabled>Select</option>
            {
              [...new Set(sources)].map((item) => {
                return (
                  <option value={item}>{item}</option>
                )
              })
            }
          </select>
          </div>
          <div className='w-full flex gap-5 mx-2'>
          <label className='text-lg font-medium text-[#413a3a]'>SWOT</label>
          <select name="" id="" defaultValue={""} className='text-lg font-medium w-[150px] text-[#413a3a]'>
            <option value="" disabled>Select</option>
            {
              [...new Set(swots)].map((item) => {
                return (
                  <option value={item}>{item}</option>
                )
              })
            }
          </select>
          </div>
          <div className='w-full flex gap-5 mx-2'>
          <label className='text-lg font-medium text-[#413a3a]'>City</label>
          <select name="" id="" defaultValue={""} className='text-lg font-medium w-[150px] text-[#413a3a]'>
            <option value="" disabled>Select</option>
            {
              [...new Set(cities)].map((item) => {
                return (
                  <option value={item}>{item}</option>
                )
              })
            }
          </select>
          </div>
        </div>

        {/* BarChart */}

        <div className='w-full border shadow-lg p-5'>
          <BarChart data={newdata} />
            Intensity
            <PieChart data={newdata} />
        </div>

        
        

      </div>

    </>
  )
}

export default Home