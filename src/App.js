import "./App.css";
import CartHeader from "./components/CartHeader";
import CartFooter from "./components/CartFooter";
import CartItems from "./components/CartItems";
import AddItem from "./components/AddItem";
import { Component } from "react";

const currentYear = new Date().getFullYear();

class App extends Component {
  state = { items: [], products: [], totalPrice: 0 };

  async componentDidMount() {
    const itemsResponse = await fetch("http://localhost:8082/api/items");
    const productsResponse = await fetch("http://localhost:8082/api/products");

    const items = await itemsResponse.json();
    const products = await productsResponse.json();

    /* Fill items with products at the corresponding product_id */
    items.forEach((item) => {
      products.forEach((product) => {
        if (item.product_id === product.id) {
          item.product_id = product;
        }
      });
    });

    this.setState({ items: items, products: products });
    this.calculateTotalPrice(items);
  }

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

    this.calculateTotalPrice(newItemsList);
  }

  calculateTotalPrice(items) {
    const prices = items.map(
      (item) => item.product_id.priceInCents * item.quantity
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
      <AddItem
        products={this.state.products}
        onFormSubmission={this.onFormSubmission}
      />
      <CartFooter copyright={currentYear} />
    </div>
  );
}

export default App;
