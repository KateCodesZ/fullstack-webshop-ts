interface ProductPriceProps {
  price: number;
  isSale?: boolean;
  discountPrice?: number;
  salePercent?: number; // default is 50%
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  isSale = false,
  discountPrice,
  salePercent = 50,
}) => {
  // Prefer discountPrice if provided and less than price
  if (isSale && typeof discountPrice === 'number' && discountPrice < price) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-mahogany font-bold">{discountPrice} KR</span>
        <span className="line-through text-gray-400">{Number(price)} KR</span>
      </div>
    );
  }
  // Fallback: calculate sale price from percent if isSale
  if (isSale) {
    const salePrice = Math.round(price * (1 - salePercent / 100));
    return (
      <div className="flex items-center gap-2">
        <span className="text-mahogany font-bold">{salePrice} KR</span>
        <span className="line-through text-gray-400">{Number(price)} KR</span>
      </div>
    );
  }
  return (
    <span className="text-base font-medium text-gray-600">{Number(price)} KR</span>
  );
};

export default ProductPrice;
