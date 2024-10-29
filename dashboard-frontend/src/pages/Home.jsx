import axios from 'axios'
import { useEffect } from 'react'

const Home = () => {

  const getAllData = async () => {
    await axios.get('http://127.0.0.1:8001/api/getAllData').then((res) => {
      console.log(res.data)
    })
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      <div className="w-4/5 mx-auto absolute top-20 right-0 px-10 py-5">
        <h1 className="text-2xl font-bold text-center py-5">Dashboarad</h1>
        <div className="flex gap-5 items-center justify-center">
          <label className='text-lg font-bold text-[#413a3a]'> Filter By: </label>

          <select name="" id="" className='text-lg font-medium w-[200px] text-[#413a3a]'>
              <option value="" disabled>Select</option>
              <option value="">End Year</option>
              <option value="">Topics</option>
              <option value="">Sector</option>
              <option value="">Region</option>
              <option value="">Pest</option>
              <option value="">Source</option>
              <option value="">Swot</option>
              <option value="">Country</option>
              <option value="">City</option>
          </select>
        </div>
      </div>

    </>
  )
}

export default Home