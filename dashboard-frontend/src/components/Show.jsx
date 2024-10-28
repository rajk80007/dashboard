import React from 'react'
import axios from 'axios'

const Show = () => {

    const downloadExcel = () => {
        const url = 'http://127.0.0.1:8001/api/download';
        axios.get(url)
            .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }
    
  return (
    <>
        <div className='w-4/5 absolute right-0 top-20 bg-gray-100 text-gray-800 h-screen p-5'>

            <h2 className='text-2xl font-bold text-center py-10'>Show</h2>
            <button
            onClick={() => {downloadExcel()}}
             className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'> Download Excel </button>
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
                <tr className='text-center py-2 my-1'>
                    <td>title1</td>
                    <td>2018</td>
                    <td>2019</td>
                    <td>city1</td>
                    <td>region1</td>
                    <td>Country1</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>topic1</td>
                    <td>sector1</td>
                    <td>source1</td>
                    <td>url1</td>
                    <td>pest1</td>
                    <td>swot1</td>
                </tr>
            </table>
        </div>
    </>
  )
}

export default Show