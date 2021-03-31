import ProductOption from "./ProductOption";

const AddItem = ({ products, onFormSubmission }) => (
  <form className="container" onSubmit={onFormSubmission}>
    <div className="form-group">
      <label htmlFor="quantity">Quantity</label>
      <input
        className="form-control"
        type="text"
        id="quantity"
        name="quantity"
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="products">Products</label>
      <select className="custom-select" id="products" name="product" required>
        <option disabled>Select an option...</option>
        {products.map((product) => (
          <ProductOption
            key={product.id}
            value={product.id}
            name={product.name}
          />
        ))}
      </select>
    </div>
    <input className="btn btn-primary" type="submit" value="Submit" />
  </form>
);

export default AddItem;
