import "./App.css";
import CartHeader from "./components/CartHeader";
import CartFooter from "./components/CartFooter";
import CartItems from "./components/CartItems";
import cartItemsList from "./components/cartItemsList";
import currentYear from "./components/currentYear";
import { Component } from "react";
import AddItem from "./components/AddItem";

class App extends Component {
  state = {
    products: [
      { id: 40, name: "Mediocre Iron Watch", priceInCents: 399 },
      { id: 41, name: "Heavy Duty Concrete Plate", priceInCents: 499 },
      { id: 42, name: "Intelligent Paper Knife", priceInCents: 1999 },
      { id: 43, name: "Small Aluminum Keyboard", priceInCents: 2500 },
      { id: 44, name: "Practical Copper Plate", priceInCents: 1000 },
      { id: 45, name: "Awesome Bronze Pants", priceInCents: 399 },
      { id: 46, name: "Intelligent Leather Clock", priceInCents: 2999 },
      { id: 47, name: "Ergonomic Bronze Lamp", priceInCents: 40000 },
      { id: 48, name: "Awesome Leather Shoes", priceInCents: 3990 },
    ],
    items: cartItemsList,
  };

  onFormSubmission = (e) => {
    e.preventDefault();

    const id = parseInt(e.target.elements.product.value);
    const quantity = parseInt(e.target.elements.quantity.value);
    const product = this.state.products.find((product) => product.id === id);

    this.createNewItem(product, quantity);
  };

  createNewItem(product, quantity) {
    const item = { product, quantity };
    this.createNewItemsList(item);
  }

  createNewItemsList(item) {
    const newItemsList = this.state.items.concat({
      id: this.state.items.length + 1,
      product: item.product,
      quantity: item.quantity,
    });
    this.setState({ items: newItemsList });
  }

  render = () => (
    <div>
      <CartHeader />
      <CartItems cartItemsList={this.state.items} />
      <AddItem
        products={this.state.products}
        onFormSubmission={this.onFormSubmission}
      />
      <CartFooter copyright={currentYear} />
    </div>
  );
}

export default App;
