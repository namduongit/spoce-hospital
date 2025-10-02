type DoctorTablePagination = {
    array: Array<any>,
    row: number,
    setRow?: (row: number) => void,
    page: number,
    setPage: (page: number) => void
}

const DoctorTablePagination = (props: DoctorTablePagination) => {
    const numberOfPage = Math.ceil(props.array.length / props.row);

    return (
        <div className="pagination-component flex justify-end">
            <button className="px-1.5 py-1 rounded me-2 bg-gray-100" disabled={props.page === 1} onClick={() => props.setPage(props.page - 1)}>
                <i className={`fa-solid fa-chevron-left ${props.page === 1 && 'text-gray-400'}`}></i>
            </button>
            {Array.from({ length: numberOfPage }, (_, i) => (
                <button
                    key={i}
                    onClick={() => props.setPage(i + 1)}
                    className={`px-3 py-1 rounded-md me-2 ${props.page === i + 1 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                    {i + 1}
                </button>
            ))}
            <button className="px-1.5 py-1 rounded bg-gray-100" disabled={props.page === numberOfPage} onClick={() => props.setPage(props.page + 1)}>
                <i className={`fa-solid fa-chevron-right ${props.page === numberOfPage && 'text-gray-400'}`}></i>
            </button>
        </div>
    )
}

export default DoctorTablePagination;