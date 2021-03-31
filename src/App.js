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

    /* The items array has only the product ids and not the product
    objects, so fill the items with the corresponding products */
    items.forEach((item) => {
      this.addProductToItem(products, item);
    });

    this.setState({ items: items, products: products });
    this.calculateTotalPrice(items);
  }

  addProductToItem(products, item) {
    const product = products.find((product) => product.id === item.product_id);

    item.product_id = product;

    /* Rename the item's key "product_id" into "product" */
    item["product"] = item["product_id"];
    delete item["product_id"];
  }

  onFormSubmission = (e) => {
    e.preventDefault();

    const productId = parseInt(e.target.elements.product.value);
    const quantity = parseInt(e.target.elements.quantity.value);
    const id = this.state.items.length + 1;

    this.updateItemsList(productId, quantity, id);
  };

  async updateItemsList(productId, quantity, id) {
    const item = { product_id: productId, quantity: quantity, id: id };

    const itemResponse = await fetch("http://localhost:8082/api/items", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const newItem = await itemResponse.json();

    this.addProductToItem(this.state.products, newItem);

    const newItemsList = this.state.items.concat(newItem);

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
      <AddItem
        products={this.state.products}
        onFormSubmission={this.onFormSubmission}
      />
      <CartFooter copyright={currentYear} />
    </div>
  );
}

export default App;
