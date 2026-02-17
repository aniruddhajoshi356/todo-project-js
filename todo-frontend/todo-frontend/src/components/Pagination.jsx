

const Pagination = ({ currentPage, totalPages, onPageChange, setSelectedIds }) => {
    return (
        <div className="flex justify-center items-center gap-2">
        <button
            onClick={() => {
                onPageChange(currentPage - 1)
                setSelectedIds([])
            }}
            disabled={currentPage <=1}
            className="px-3 py-1 border rounded disabled:opacity-50"
        >
            Previous
        </button>
        <span className="text-black">Page {currentPage} of {totalPages}</span>
        <button
            onClick={() => {
                onPageChange(currentPage + 1)
                setSelectedIds([])
            }}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
        >
            Next
        </button>
        </div>
    )
}

export default Pagination