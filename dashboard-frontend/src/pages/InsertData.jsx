import { useState } from "react"
import ExcelImport from "../components/ExcelImport"
import axios from "axios"

const InsertData = () => {

    const [data, setData] = useState([])

    const handleUpload = (e) => {  
        e.preventDefault()

        axios.post('https://dash.rajkushdev.com/public/api/insert', 
             data, {
            headers: {
                'Accept': 'application/json'
            }
        } )
        .then((response) => {
            console.log(response);
            setData([]);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <div className="w-full lg:w-[80%] mx-auto absolute top-20 right-0 px-10 py-5">

                <h2 className="text-2xl font-bold text-center py-10">Insert Data</h2>
                <form className="w-full mx-5 mt-5 flex gap-5 items-center justify-center"
                onSubmit={handleUpload}>

                    <ExcelImport setData={setData} />
                    <button type="submit" className="bg-[#613e59] text-white py-2 px-4 rounded">Submit</button>
                </form>
                <div className="text-center">

                <span className="text-red-500">
                    (Note: Please upload .xlsx or .csv file only)
                </span>
                </div>
            </div>

        </>
    )
}

export default InsertData