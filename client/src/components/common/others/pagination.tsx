import { rows } from "../../../constants/row.constant";

type TablePagination = {
    array: any[],
    page: number,
    row: number,
    setPage: (page: number) => void,
    setRow: (row: number) => void
}

const TablePagination = (props: TablePagination) => {
    const { page, row, setPage, setRow } = props;

    return (
        <div className="flex justify-between w-full px-4 py-2 mt-3">
            <div className="flex gap-2 items-center">
                <span className="text-sm">Số hàng</span>
                <select value={row} onChange={(event) => {
                    setRow(parseInt(event.target.value));
                    setPage(1);
                }}
                    className="border border-gray-300 py-1 px-2 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                    {rows.map(row => (
                        <option key={row.id} value={row.value}>{row.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex gap-2 items-center">
                <button className={`border text-center w-7 h-7 text-md rounded font-semibold 
                transition-colors ${page === 1 ? 'border-gray-600 text-gray-300 bg-gray-600' : 'border-gray-300 text-gray-600'}`}
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    <i className="fa-solid fa-angle-left"></i>
                </button>
                {
                    Array.from({ length: (Math.ceil(props.array.length / row)) }, (_, i) => (
                        <button 
                            key={i}
                            className={`border text-center w-7 h-7 text-md rounded font-semibold transition-colors
                                ${page === (i + 1) 
                                    ? 'border-blue-500 text-blue-600 bg-blue-50' 
                                    : 'border-gray-300 text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50'
                                }`} 
                            onClick={() => setPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))
                }
                <button className={`border text-center w-7 h-7 text-md rounded font-semibold 
                transition-colors ${page > (props.array.length / row) - 1 ? 'border-gray-600 text-gray-300 bg-gray-600' : 'border-gray-300 text-gray-600'}`}
                    disabled={page > (props.array.length / row) - 1}
                    onClick={() => setPage(page + 1)}
                >
                    <i className="fa-solid fa-angle-right"></i>
                </button>
            </div>
        </div>
    )
}

export default TablePagination;