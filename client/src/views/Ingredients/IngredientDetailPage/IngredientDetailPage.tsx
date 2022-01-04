import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { showIngredient } from '../../../store/ingredients/ingredients.slice';
import { RootState } from '../../../rootReducer';
import { RiAddFill, RiPencilFill, RiAddLine, RiCloseCircleFill } from 'react-icons/ri';
import FloatingButton from '../../../components/navigation/FloatingButton/FloatingButton';
import { BasketItem, Recipe } from '../../../utils/types/record.types';
import Button from '../../../components/forms/Button/Button';
import { createBasketItem, destroyBasketItem } from '../../../store/basketItems/basketItems.slice';
import Input from '../../../components/forms/Input/Input';
import { units } from '../../../utils/helpers/units.helpers';
import Datalist from '../../../components/forms/Datalist/Datalist';
import { UnitGroups } from '../../../utils/types/units.types';
import Fieldset from '../../../components/forms/Fieldset/Fieldset';
import IngredientDetailPageStyles from './IngredientDetailPage.styles';

function IngredientDetailPage() {
  const [basketFormData, setBasketFormData] = useState({
    quantity: 0,
    units: ''
  });
  const [disableForm, setDisableForm] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredient = useSelector((state: RootState) => state.ingredients.activeIngredient);
  const basketItems = useSelector((state: RootState) => state.basketItems.basketItems);

  useEffect(() => {
    if (params.id) dispatch(showIngredient({id: parseInt(params.id, 10)}))
  }, [dispatch, params.id]);

  const handleEditIngredient = () => {
    navigate(`/ingredients/${params.id}/edit`)
  };

  const handleBasketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasketFormData({
      ...basketFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleBasketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sideEffect = (success: boolean) => {
      setDisableForm(false);
      if (success) {
        setBasketFormData({quantity: 0, units: ''});
      }
    };
    setDisableForm(true);
    dispatch(createBasketItem({body: {...basketFormData, ingredient_id: ingredient!.id, name: ''}, sideEffect}))
  };

  const renderRecipe = (recipe: Recipe) => {
    return (
      <div key={recipe.id}>
        <Link to={`/recipes/${recipe.id}`}>
          {recipe.name}
        </Link>
      </div>
    )
  };

  const renderIngredient = () => {
    if (!ingredient) return null;
    return (
      <>
        <div className='page-header'>{ingredient.name}</div>
      </>
    );
  };

  const renderRecipes = () => {
    if (!ingredient) return null;
    return (
      <>
        <div className='page-subheader'>Recipes</div>
        <div className='recipe-list'>
          {ingredient.recipes.length > 0 ? ingredient.recipes.map(renderRecipe) : 'No recipes (yet!)'}
        </div>
      </>
    );
  }

  const handleBasketItemDelete = (id: number) => {
    dispatch(destroyBasketItem({ id }));
  }
  
  
  const renderBasketItems = (relatedBasketItems: BasketItem[]) => {
    if (!ingredient || relatedBasketItems.length === 0) return 'Not found in basket';
    return (
      <div className='basket-items'>
      {relatedBasketItems.map(basketItem => (
        <React.Fragment key={basketItem.id}>
          <span className='basket-delete'>
            <RiCloseCircleFill onClick={() => handleBasketItemDelete(basketItem.id)} />
          </span>
          <span className='basket-quantity'>
            {basketItem.quantity ? basketItem.quantity : null} {basketItem.units ? basketItem.units : ingredient.name}
          </span>
        </React.Fragment>
      ))}
    </div>
    );
  };
  
  const renderBasket = () => {
    if (!ingredient) return null;
    const relatedBasketItems = basketItems.filter(basketItem => basketItem.ingredient_id === ingredient.id);
    return (
      <>
        <div className='page-subheader'>Basket</div>
        <form onSubmit={handleBasketSubmit}>
          <Fieldset disabled={disableForm}>
            <Input label='Quantity' type='number' name='quantity' value={basketFormData.quantity} onChange={handleBasketChange} />
            <Datalist label='Units' name='units' value={basketFormData.units} onChange={handleBasketChange}>
              {(Object.keys(units) as UnitGroups[]).map(group => (
                <React.Fragment key={group}>
                  <optgroup label={group}>
                    {Object.keys(units[group]).map(unit => (
                      <option value={unit} key={unit}></option>
                    ))}
                  </optgroup>
                </React.Fragment>
              ))}
            </Datalist>
            <span></span>
            <Button type='submit'>Add to Basket</Button>
          </Fieldset>
        </form>
        {renderBasketItems(relatedBasketItems)}
      </>
    )
  };

  return (
    <IngredientDetailPageStyles>
      <div><Button onClick={() => navigate('/ingredients')}>Back to Ingredients</Button></div>
      {renderIngredient()}
      {renderRecipes()}
      {renderBasket()}
      <FloatingButton handleClickEvent={handleEditIngredient}><RiPencilFill /></FloatingButton>
    </IngredientDetailPageStyles>
  );
}

export default IngredientDetailPage;
