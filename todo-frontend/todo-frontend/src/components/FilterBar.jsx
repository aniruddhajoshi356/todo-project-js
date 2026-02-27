function FilterBar({
    filter,
    setFilter,
    selectedIds,
    todos,
    handleSelectAll,
    searchTerm,
    setSearchTerm,
    setToast,
}) {

    const selectStatus = () =>{
        if (todos.length === 0) {
            setToast("Add Todos first");
            return false;
        }
        return (todos.length === selectedIds.length);
    }

    return (
        <div className="flex justify-between items-center mb-6 text-black">

            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={selectStatus()}
                    onChange={handleSelectAll}
                    className="w-5 h-5"
                />
                <span className="text-lg font-medium">
                    Select All
                </span>
            </div>

            <div className="flex gap-6 items-center">

                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border px-3 py-1 rounded-md"
                />

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="ALL"
                        checked={filter === "ALL"}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    ALL
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="completed"
                        checked={filter === "completed"}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    COMPLETED
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="on-hold"
                        checked={filter === "on-hold"}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    ON HOLD
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="in_progress"
                        checked={filter === "in_progress"}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    IN PROGRESS
                </label>

            </div>
        </div>
    );
}

export default FilterBar;
