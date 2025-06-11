import { FC } from 'react';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { Preloader } from '../ui/preloader';
import { useLocation, useParams } from 'react-router-dom';
import { getIngredientsData } from '../../services/slices/ingredients/ingredientsSlice';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const location = useLocation();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  //const ingredientToFind = location.pathname.replace('/ingredients/', '');
  const { id } = useParams();
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
