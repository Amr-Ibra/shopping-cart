import "./App.css";
import CartHeader from "./components/CartHeader";
import CartFooter from "./components/CartFooter";
import CartItems from "./components/CartItems";
import cartItemsList from "./components/cartItemsList";
import currentYear from "./components/currentYear";

function App() {
  return (
    <div>
      <CartHeader />
      <CartItems key={cartItemsList.id} cartItemsList={cartItemsList} />
      <CartFooter copyright={currentYear} />
    </div>
  );
}

export default App;
