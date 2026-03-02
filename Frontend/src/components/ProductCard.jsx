import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-bold text-lg truncate hover:text-blue-600">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-slate-900">${product.price}</span>
          <Link 
            to={`/product/${product._id}`}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;