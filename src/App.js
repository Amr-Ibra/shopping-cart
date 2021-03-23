import "./App.css";
import CartHeader from "./components/CartHeader";
import CartFooter from "./components/CartFooter";
import CartItems from "./components/CartItems";
import cartItemsList from "./components/cartItemsList";
import currentYear from "./components/currentYear";
import AddItem from "./components/AddItem";
import products from "./components/products";
import { Component } from "react";

class App extends Component {
  state = { items: cartItemsList, totalPrice: 0 };

  componentDidMount() {
    this.calculateTotalPrice(cartItemsList);
  }

  onFormSubmission = (e) => {
    e.preventDefault();

    const id = parseInt(e.target.elements.product.value);
    const quantity = parseInt(e.target.elements.quantity.value);
    const product = products.find((product) => product.id === id);

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

    this.calculateTotalPrice(newItemsList);
  }

  calculateTotalPrice(items) {
    const prices = items.map(
      (item) => item.product.priceInCents * item.quantity
    );
    const totalPrice = prices.reduce((total, current) => total + current);
    this.setState({ totalPrice: totalPrice });
  }

  render = () => (
    <div>
      <CartHeader />
      <CartItems
        cartItemsList={this.state.items}
        totalPrice={this.state.totalPrice}
      />
      <AddItem products={products} onFormSubmission={this.onFormSubmission} />
      <CartFooter copyright={currentYear} />
    </div>
  );
}

export default App;
