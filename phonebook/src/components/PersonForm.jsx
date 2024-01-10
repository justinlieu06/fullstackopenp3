// form to submit new person (with name and number)
const PersonForm = ({submitPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <>
        <h2>Submit New Entry:</h2>
        <form onSubmit={submitPerson}>
            <div>
            name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default PersonForm