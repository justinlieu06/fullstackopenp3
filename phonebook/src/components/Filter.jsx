// input to change the filter state
const Filter = ({newFilter, handleFilterChange}) => {
    return (
        <>
        <h2>Filter Directory (By Name)</h2>
        <div>
            name: <input value={newFilter} onChange={handleFilterChange} />
        </div>
        </>
    )
}

export default Filter