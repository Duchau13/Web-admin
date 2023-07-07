
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'
import Home from './component/Home/Home'

/* Item */
import ListItems from "./component/ListItems/ListItems";
import NewItem from "./component/Create-item/NewItem";
import RepiceItem from "./component/Create-item/RepiceItem";
import Update from "./component/Create-item/UpdateItem";
import ItemQuantity from "./component/Create-item/ItemQuantity";

/* orders */
import Oders from "./component/Oders/oders";
import OderDetail from "./component/Oders/oderDetail";
/* renevu */
import Revenu from "./component/Revenu/Revenu";

/* Ingredient */
import Ingredient from "./component/Ingredient/Ingredient";
import IngredientDetail from "./component/Ingredient/IngredientDetail"
import NewIngredient from "./component/Ingredient/NewIngredien";
import IngredientQuantity from "./component/Ingredient/IngredientQuantity";
import RepiceIngredient from "./component/Ingredient/RepiceIngredient";

/* Un-ingredien */
import Unprocessedingredients from "./component/Unprocessedingredients/Unprocessedingredients";
import UnprocessedingredientsDetail from "./component/Unprocessedingredients/UnprocessedingredientsDetail";
import NewUnprocessedingredients from "./component/Unprocessedingredients/NewUnprocessedingredients";

/* report */
import Repost from "./component/Report/Report";
import ReportDetail from "./component/Report/ReportDetail";

/* invoice */
import Importimvoice from "./component/Importimvoice/Importimvoice";
import ImportimvoiceDetail from "./component/Importimvoice/ImportimvoiceDetail"


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
          <Route path="/item/repice/:id" element ={<RepiceItem/>} />
          <Route path="/NewItem" element={<NewItem/>} />
          <Route path="/item/quantity/:id" element={<ItemQuantity/>} />
          <Route path="/oders" element={<Oders/>} />
          <Route path="/oder/:id_order" element={<OderDetail/>} />
          <Route path="/revenu" element={<Revenu/>} />
          <Route path="/ingredient" element={<Ingredient/>} />
          <Route path="/ingredient/:id_ingredient" element={<IngredientDetail/>} />
          <Route path="/ingredient/Newingredỉnt" element={<NewIngredient/>} />
          <Route path="/ingredient/quantity/:id_ingredient" element={<IngredientQuantity/>} />
          <Route path="/ingredient/repice/:id_ingredient" element={<RepiceIngredient/>} />
          <Route path="/unprocessedingredients" element={<Unprocessedingredients/>} />
          <Route path="/unprocessedingredients/detail/:id_u_ingredient" element={<UnprocessedingredientsDetail/>} />
          <Route path="/unprocessedingredients/NewUnprocessedingredients" element={<NewUnprocessedingredients/>} />
          <Route path="/repost" element ={<Repost/>} />
          <Route path="/report/detail/:id_report" element ={<ReportDetail/>} />
          <Route path="/importinvoice" element ={<Importimvoice/>} />
          <Route path="/importinvoices/:id_i_invoice" element ={<ImportimvoiceDetail/>} />
          
      </Routes>
    </div>
  );
}

export default App;
