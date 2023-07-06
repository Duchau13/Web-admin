
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'
import Home from './component/Home/Home'
import ListItems from "./component/ListItems/ListItems";
import NewItem from "./component/Create-item/NewItem";
import Update from "./component/Create-item/UpdateItem";
import Oders from "./component/Oders/oders";
import OderDetail from "./component/Oders/oderDetail";
import Revenu from "./component/Revenu/Revenu";
import Ingredient from "./component/Ingredient/Ingredient";
import IngredientDetail from "./component/Ingredient/IngredientDetail"
import NewIngredient from "./component/Ingredient/NewIngredien";
import IngredientQuantity from "./component/Ingredient/IngredientQuantity";
import Unprocessedingredients from "./component/Unprocessedingredients/Unprocessedingredients";
import UnprocessedingredientsDetail from "./component/Unprocessedingredients/UnprocessedingredientsDetail";
import NewUnprocessedingredients from "./component/Unprocessedingredients/NewUnprocessedingredients";

function App() {

  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('token')){
        navigate("/login")
    }

  },[])
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<ListItems/>} />
          <Route path="/login" element ={<Home/>} />
          <Route path="/item/:id" element ={<Update/>} />
          <Route path="/NewItem" element={<NewItem/>} />
          <Route path="/oders" element={<Oders/>} />
          <Route path="/oder/:id_order" element={<OderDetail/>} />
          <Route path="/revenu" element={<Revenu/>} />
          <Route path="/ingredient" element={<Ingredient/>} />
          <Route path="/ingredient/:id_ingredient" element={<IngredientDetail/>} />
          <Route path="/ingredient/Newingredỉnt" element={<NewIngredient/>} />
          <Route path="/ingredient/quantity/:id_ingredient" element={<IngredientQuantity/>} />
          <Route path="/unprocessedingredients" element={<Unprocessedingredients/>} />
          <Route path="/unprocessedingredients/detail/:id_u_ingredient" element={<UnprocessedingredientsDetail/>} />
          <Route path="/unprocessedingredients/NewUnprocessedingredients" element={<NewUnprocessedingredients/>} />

      </Routes>
    </div>
  );
}

export default App;
