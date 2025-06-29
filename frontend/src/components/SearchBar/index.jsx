"use client"
import './estilos.css'

export const SearchBar = ({ value, onChange, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Search recipes..." 
            value={value} 
            onChange={onChange}  
          />
          <button type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  )
}
