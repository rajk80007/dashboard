import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExcelExport = ({ data }) => {
    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const fileBlob = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const file = new Blob([fileBlob], { type: 'application/octet-stream' });
        saveAs(file, 'data.xlsx');
    };

    return (
        <button onClick={handleExport}>Export to Excel</button>
    );
};

export default ExcelExport;
