import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PieChart from '../components/PieChart';
import { count, select } from 'd3';

const Home = () => {

  // API State Variables
  const [data, setData] = useState([])
  const [intensity, setIntensity] = useState(0)
  const [likelihood, setLikelihood] = useState(0)
  const [relevance, setRelevance] = useState(0)
  const [year, setYear] = useState(0)
  const [country, setCountry] = useState(0)
  const [topics, setTopics] = useState(0)
  const [region, setRegion] = useState(0)
  const [city, setCity] = useState(0)
  const [pest, setPest] = useState(0)
  const [selectedPest, setSelectedPest] = useState([])
  const [loading, setLoading] = useState(true)

  // Average Variables for display in pie chart
  const [intensityAverage, setIntensityAverage] = useState(0);
  const [likelihoodAverage, setLikelihoodAverage] = useState(0);
  const [relevanceAverage, setRelevanceAverage] = useState(0);
  const [yearAverage, setYearAverage] = useState(0);
  const [totalCountry, setTotalCountry] = useState(0);
  const [totalTopics, setTotalTopics] = useState(0);
  const [totalRegion, setTotalRegion] = useState(0);
  const [totalCity, setTotalCity] = useState(0);
  // 

  const newData = [
    { name: 'intensity', count: intensityAverage },
    { name: 'likelihood', count: likelihoodAverage },
    { name: 'relevance', count: relevanceAverage },
    { name: 'year', count: yearAverage },
    { name: 'country', count: totalCountry },
    { name: 'topics', count: totalTopics },
    { name: 'region', count: totalRegion },
    { name: 'city', count: totalCity },
  ]

  useEffect(() => {
    axios.get('http://127.0.0.1:8001/api/getAllData').then((res) => {
      console.log(res.data);
      res = Array.from(res.data.data);
      setData(res);
      setPest([...new Set(res.map(item => item.pest).filter(pest => pest !== ""))]);
      setSelectedPest(Array.from(pest));
      console.log(pest);
      setIntensity(res.map((item) => Number(item.intensity)));
      const totalIntensity = intensity.reduce((a, b) => a + b, 0)
      setIntensityAverage((totalIntensity / intensity.length).toFixed(2));
      setLikelihood(res.map((item) => Number(item.likelihood)));
      const totalLikelihood = likelihood.reduce((a, b) => a + b, 0)
      setLikelihoodAverage((totalLikelihood / likelihood.length).toFixed(2));
      setRelevance(res.map((item) => Number(item.relevance)));
      const totalRelevance = relevance.reduce((a, b) => a + b, 0)
      setRelevanceAverage((totalRelevance / relevance.length).toFixed(2));
      setYear(res.map((item) => (item.end_year && item.start_year) ? (Number(item.end_year) - Number(item.start_year)) : 0));
      const totalYear = year.reduce((a, b) => a + b, 0)
      setYearAverage((totalYear / year.length).toFixed(2));

      setCountry(res.map((item) => item.country).filter(country => country !== ""));
      setTotalCountry(country.length);

      setTopics(res.map((item) => item.topic).filter(topic => topic !== ""));
      setTotalTopics(topics.length);

      setRegion(res.map((item) => item.region).filter(region => region !== ""));
      setTotalRegion(region.length);

      setCity(res.map((item) => item.city).filter(city => city !== ""));
      setTotalCity(city.length);
      console.log(region);
      // console.log(year);
    }).catch((err) => {
      console.log(err);
    });
    setLoading(false);
  }, [pest.length]);

  const togglePest = (item) => {
    if (selectedPest && selectedPest.includes(item)) {
      setSelectedPest(selectedPest.filter((pest) => pest !== item));
    } else {
      setSelectedPest([...selectedPest, item]);
    }
  }

  useEffect(() => {

    axios.post('http://127.0.0.1:8001/api/filter', { pests: selectedPest }).then((res) => {
      console.log(res.data);
      res = Array.from(res.data.data);
      setData(res);
      setIntensity(res.map((item) => Number(item.intensity)));
      const totalIntensity = intensity.reduce((a, b) => a + b, 0)
      setIntensityAverage((totalIntensity / intensity.length).toFixed(2));
      setLikelihood(res.map((item) => Number(item.likelihood)));
      const totalLikelihood = likelihood.reduce((a, b) => a + b, 0)
      setLikelihoodAverage((totalLikelihood / likelihood.length).toFixed(2));
      setRelevance(res.map((item) => Number(item.relevance)));
      const totalRelevance = relevance.reduce((a, b) => a + b, 0)
      setRelevanceAverage((totalRelevance / relevance.length).toFixed(2));
      setYear(res.map((item) => (item.end_year && item.start_year) ? (Number(item.end_year) - Number(item.start_year)) : 0));
      const totalYear = year.reduce((a, b) => a + b, 0)
      setYearAverage((totalYear / year.length).toFixed(2));
      setCountry(res.map((item) => item.country).filter(country => country !== ""));
      setTotalCountry(country.length);

      setTopics(res.map((item) => item.topic).filter(topic => topic !== ""));
      setTotalTopics(topics.length);

      setRegion(res.map((item) => item.region).filter(region => region !== ""));
      setTotalRegion(region.length);

      setCity(res.map((item) => item.city).filter(city => city !== ""));
      setTotalCity(city.length);
      // console.log(year);
    }).catch((err) => {
      console.log(err);
    })

  }, [selectedPest.length, data.length, pest.length, year.length, country.length, topics.length, region.length, city.length]);

  return (
    <>
      <div className='w-[100%] lg:w-[80%] mx-auto absolute top-20 right-0 px-10 py-5'>
        <h1 className='text-2xl font-bold text-center py-10'>Dashboard</h1>

        {
          loading ? (
            <h1 className='text-center'>Loading...</h1>
          ) : (
            <div className='w-full h-full overflow-y-auto grid grid-cols-1 md:grid-cols-4 justify-items-center gap-1'>
              {/* <div className='col-span-1'> */}
              <ul className='col-span-1 text-sm py-2 text-[#6f93e0] flex flex-col gap-2 border-2 border-[#413a3a] items-center justify-center font-bold'>
                {pest && pest.map((item, index) => (
                  <li key={index}
                    onClick={() => togglePest(item)}
                    className={`w-full px-5 py-2 rounded hover:bg-green-300 ${selectedPest.includes(item) ? 'bg-green-500 text-white' : ''} hover:text-white cursor-pointer`}>{item}</li>
                ))}
              </ul>
              {/* </div> */}
              <div className='flex flex-col col-span-2 items-center justify-center gap-5'>
                <h3 className='text-center font-bold'>Total Records : {data.length}</h3>

                <div className='flex gap-2 scale-75 lg:scale-100'>

                  <PieChart data={newData} className='w-full mx-2' />
                </div>
              </div>
              <ul className='flex flex-col gap-3 px-5 mt-5 text-sm col-span-1
                  border-2 border-[#413a3a] items-center justify-center font-bold text-[#6f93e0] text-center'>
                <li>intensity : {intensityAverage}</li>
                <li>likelihood : {likelihoodAverage}</li>
                <li>relevance : {relevanceAverage}</li>
                <li>year : {yearAverage}</li>
                <li>country : {totalCountry}</li>
                <li>topics : {totalTopics}</li>
                <li>region : {totalRegion}</li>
                <li>city : {totalCity}</li>
              </ul>
            </div>
          )
        }


      </div>
    </>
  )
}

export default Home