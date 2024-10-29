import { useEffect, useState } from 'react'
import axios from 'axios'
import ExcelExport from '../components/excelExport';

const Show = () => {

    const [data, setData] = useState([]);

    const deleteAll = () => {
        const url = 'http://127.0.0.1:8001/api/delete';
        axios.get(url)
            .then((response) => {
                console.log(response);
                showData();
            }).catch((error) => {
                console.log(error);
            })
    }
    // const downloadExcel = () => {
    //     const url = 'http://127.0.0.1:8001/api/download';
    //     axios.get(url)
    //         .then((response) => {
                
    //             console.log(Array.isArray(response) );
    //         setData(response);
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }

    // const data = [
    //     {
    //         title: 'title1',
    //         start_year: '2018',
    //         end_year: '2019',
    //         city: 'city1',
    //         region: 'region1',
    //         country: 'Country1',
    //         intensity: '4',
    //         likelihood: '5',
    //         relevance: '6',
    //         topic: 'topic1',
    //         sector: 'sector1',
    //         source: 'source1',
    //         url: 'url1',
    //         pest: 'pest1',
    //         swot: 'swot1',
    //     }
    // ]
    const showData = () => {
        const url = 'http://127.0.0.1:8001/api/show';
        axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data.data);
                response = Array.from(response.data.data);
                setData(response);
                console.log(data);  
            }).catch((error) => {
                console.log(error);
            })
    }
    
    useEffect(() => {
        showData();
    }, [])

  return (
    <>
        <div className='w-4/5 absolute right-0 top-20 bg-gray-100 text-gray-800 h-screen p-5'>

            <h2 className='text-2xl font-bold text-center py-10'>Show</h2>
            <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'> <ExcelExport
            data={data} /> </button>
            <button
            onClick={deleteAll}
             className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 mx-2'>Delete All</button>
            <table className='w-full border-collapse border-2'>
                <tr className='border py-2 my-1'>
                    <th>Title</th>
                    <th>Start year</th>
                    <th>End year</th>
                    <th>city</th>
                    <th>region</th>
                    <th>country</th>
                    <th>intensity</th>
                    <th>likelihood</th>
                    <th>relevance</th>
                    <th>topic</th>
                    <th>sector</th>
                    <th>source</th>
                    <th>url</th>
                    <th>pest</th>
                    <th>swot</th>
                </tr>
                {data.length === 0 && <tr className='text-center'><td colSpan={15}>No data found</td></tr>}
                { data && data.map((item, index) => (                
                <tr key={index} className='text-center py-2 my-1'>
                    <td>{item.title}</td>
                    <td>{item.start_year}</td>
                    <td>{item.end_year}</td>
                    <td>{item.city}</td>
                    <td>{item.region}</td>
                    <td>{item.country}</td>
                    <td>{item.intensity}</td>
                    <td>{item.likelihood}</td>
                    <td>{item.relevance}</td>
                    <td>{item.topic}</td>
                    <td>{item.sector}</td>
                    <td>{item.source}</td>
                    <td>{item.url}</td>
                    <td>{item.pest}</td>
                    <td>{item.swot}</td>
                </tr>
                ))
                }
            </table>
        </div>
    </>
  )
}

export default Show