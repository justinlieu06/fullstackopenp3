// a person's data consists of name and number
const Person = ({name, number, personId, deletePerson}) => {
    return (
        <li>
        {name} : {number} <button onClick={()=>deletePerson(personId, name)}>Delete</button>
        </li>
    )
}

export default Person
