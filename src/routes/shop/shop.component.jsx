// REACT HOOKS
import { useContext } from "react";
// IMPORTING PROTUCTS CONTEXT API
import { ProductsContext } from "../../contexts/products.context";
// COMPONENTS
import ProductCard from "../../components/product-card/product-card.component";
// CSS STYLES
import "./shop.styles.scss";

const Shop = () => {
  // GETTING VALUES FROM PRODUCT CONTEXT API
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default Shop;
