
import { SearchBar } from './components/SearchBar/index';
import { Recipes } from './components/Recipes/index';
import Spinner from 'react-bootstrap/Spinner';
import { useRecipeSearch } from './useRecipeSearcher';

function InspoPage() {
  const {
    recipes,
    recipesSearch,
    setRecipesSearch,
    isLoading,
    getRecipes,
  } = useRecipeSearch('/external-recipes');

  return (
    <div className="inspo-page container mt-4">
      <SearchBar
        value={recipesSearch}
        onChange={(e) => setRecipesSearch(e.target.value)}
        onSearch={getRecipes}
      />

      {isLoading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Recipes recipes={recipes} isLoading={isLoading} />
      )}
    </div>
  );
}

export default InspoPage;
