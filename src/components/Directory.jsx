// lists persons in phonebook--if not filter, then simply list all
const Directory = ({newFilter, getFiltered, getAllPersons}) => {
    return (
        <>
        <h2>Directory:</h2>
        <ul>
            {newFilter.length ? getFiltered() : getAllPersons()}
        </ul>
        </>
    )
}

export default Directory
