"use client"

export const SearchBar = ({ value, onChange, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="searchBar-container">
        <input 
          type="text" 
          placeholder="Buscar receta..." 
          value={value} 
          onChange={onChange} 
          className="search-input" 
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
    </div>
  )
}
