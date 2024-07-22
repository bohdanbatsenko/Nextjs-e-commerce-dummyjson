import ProductCard from "@/components/ProductCard";

const GridProducts = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-0 md:px-5 lg:px-0 lg:pr-10">
      {products.map((product) => (
       <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  );
};

export default GridProducts;