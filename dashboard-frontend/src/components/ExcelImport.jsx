import * as XLSX from 'xlsx';

const ExcelImport = ({ setData }) => {

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const workbook = XLSX.read(bstr, { type: 'binary' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            setData(jsonData);
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls, .csv" />
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            {/* <input type="hidden" name="" value={data} /> */}
        </div>
    );
};

export default ExcelImport;
