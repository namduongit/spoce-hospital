type Pagination = {
    array: Array<any>,
    row: number,
    setRow?: (row: number) => void,
    page: number,
    setPage: (page: number) => void
}

const DoctorTablePagination = (page: Pagination) => {
    const pages = Math.ceil(page.array.length / page.row);

    return (
        <div className="pagination-component">
            {Array.from({ length: pages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => page.setPage(i + 1)}
                    className={`px-3 py-1 rounded-md me-2 ${page.page === i + 1 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    )
}

export default DoctorTablePagination;