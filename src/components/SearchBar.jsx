import React, {useState} from "react";

const SearchBar = ({onSearch}) =>{
  const [city, setCity] = useState('')

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(city.trim() !==''){
      onSearch(city);
      setCity('');
    }
  }
  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input 
        type = "text"
        placeholder = "Enter city"
        value = {city}
        onChange={(e)=> setCity(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  )
}

export default SearchBar