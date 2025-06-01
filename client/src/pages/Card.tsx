import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from '../components/Button';
import PageHeading from '../components/PageHeading';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  color_id: number;
  category_id: number;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductCard() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProductAndCategory() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
        // Fetch all categories and find the matching one
        const catRes = await axios.get('/api/products/categories');
        const category = catRes.data.find((cat: Category) => cat.id === res.data.category_id);
        setCategoryName(category ? category.name : "");
      } catch {
        setError("Kunde inte hämta produkt.");
      } finally {
        setLoading(false);
      }
    }
    fetchProductAndCategory();
  }, [id]);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  if (loading) return <div className="text-center py-12">Laddar...</div>;
  if (error || !product) return (
    <div className="text-center py-12 text-red-500">{error || "Produkt hittades inte."}</div>
  );

  return (
    <>
      <div className="min-h-screen flex justify-center items-start px-6">
        <div className="max-w-6xl w-full bg-white overflow-hidden">
          <div className="pt-4 md:pl-10">
            <PageHeading
              title=""
              breadcrumbs={[
                { name: "Shop", path: "/shop" },
                ...(categoryName ? [{ name: categoryName, path: `/shop?category=${product?.category_id}` }] : []),
                ...(product ? [{ name: product.name, path: `/card/${product.id}` }] : []),
              ]}
            />
          </div>
          <div className="lg:flex gap-8 pb-4 md:p-10">
            {/* Product Image */}
            <div className="w-full lg:w-1/3 flex justify-center items-center">
              <img
                src={product.image}
                alt={product.name}
                className=" w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="mt-6 lg:mt-0 flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-marianblue">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-marianblue">
                  {Number(product.price)} KR
                </p>
              </div>

              <p className="mt-8 text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-8">
                <p className="text-base font-medium text-gray-600">
                  Antal
                </p>
                <div className="flex items-center border border-gray-300 rounded-lg w-20 h-10 mt-2">
                  <button
                    onClick={decrement}
                    className="flex-1 flex justify-center items-center outline-none"
                    aria-label="Minska antal"
                  >
                    <DecrementIcon />
                  </button>
                  <span className="text-base text-gray-800 w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increment}
                    className="flex-1 flex justify-center items-center outline-none"
                    aria-label="Öka antal"
                  >
                    <IncrementIcon />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button className="flex-1" type="button">
                  Lägg i varukorg
                </Button>
                <button className="border border-gray-600 text-gray-800 font-medium py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-gray-50 flex-1">
                  <HeartIcon />
                  Önskelista
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// SVG Components
const HeartIcon = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <path
      d="M7.99994 14C7.80306 14 7.60931 13.9406 7.43744 13.825C6.26244 13.0281 4.55619 11.7937 3.33119 10.3C2.08119 8.77813 1.48119 7.2125 1.49994 5.51875C1.51869 3.57813 3.07806 2 4.97181 2C6.47494 2 7.47181 2.92188 7.99994 3.59375C8.52806 2.92188 9.52494 2 11.0281 2C12.9218 2 14.4781 3.57813 14.4999 5.51875C14.5156 7.2125 13.9187 8.77813 12.6687 10.3C11.4437 11.7937 9.73744 13.0281 8.56244 13.825C8.39056 13.9437 8.19681 14 7.99994 14ZM4.97181 3C3.62494 3 2.51556 4.13438 2.49994 5.53125C2.46556 8.8 5.26244 11.1438 7.99994 13C10.7374 11.1406 13.5343 8.8 13.4999 5.53125C13.4843 4.1375 12.3781 3 11.0281 3C9.34056 3 8.45306 4.70625 8.44681 4.725C8.36244 4.89375 8.19056 5 7.99994 5C7.80931 5 7.63744 4.89375 7.55306 4.72188C7.54369 4.70625 6.65619 3 4.97181 3Z"
      fill="#6B7280"
    />
  </svg>
);

const DecrementIcon = () => (
  <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <path d="M8.625 1.5L3.375 6L8.625 10.5L8.625 1.5Z" fill="#1F2937" />
  </svg>
);

const IncrementIcon = () => (
  <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <path d="M3.375 10.5L8.625 6L3.375 1.5L3.375 10.5Z" fill="#1F2937" />
  </svg>
);
