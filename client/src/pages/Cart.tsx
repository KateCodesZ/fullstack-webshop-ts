import { useCart } from "../hooks/useCart";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Cart({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const shippingCost = 29;  const subtotal = Math.round(cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  ));
  const totalSavings = Math.round(cart.reduce(
    (sum, product) => {
      if (product.isOnSale && product.originalPrice) {
        return sum + (product.originalPrice - product.price) * product.quantity;
      }
      return sum;
    },
    0
  ));
  const total = subtotal + shippingCost;

  // Lock background scroll when cart is open and compensate for scrollbar width
  useEffect(() => {
    let originalOverflow = '';
    let originalPaddingRight = '';
    if (isOpen) {
      originalOverflow = document.body.style.overflow;
      originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);
  return (
    <>
      {/* Background dimming with transition */}
      <div
        className={`fixed inset-0 z-[998] bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      /> {/* Cart panel with slide-in animation */}
      <aside
        className={`fixed top-0 right-0 z-[999] h-screen w-full bg-floralwhite shadow-lg transition-transform duration-400 p-5 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } min-[376px]:w-[85%] md:w-96 lg:w-[28rem]`}
        style={{ maxWidth: "100vw" }}
      ><div className="w-full h-full flex flex-col">
          {/* Cart header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-2 md:text-3xl text-marianblue">Varukorg</h1>
            <button
              className="border border-marianblue text-gray-700 px-4 py-2 text-base transition-colors hover:bg-gray-100"
              onClick={onClose}
            >
              Stäng
            </button>
          </div>

          {/* Product list */}
          <div className="flex-1 overflow-y-auto pb-4">
            {cart.length === 0 ? (
              <div className="text-center text-gray-700 py-16 text-xl flex flex-col items-center">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-4 text-marianblue"
                >
                  <path d="M6.78381 9.6H17.2162C18.1041 9.6 18.7121 9.60118 19.1722 9.66086C19.6152 9.71833 19.839 9.82144 19.9994 9.96876C20.1598 10.1161 20.2816 10.3303 20.3766 10.7668C20.4753 11.2201 20.5282 11.8258 20.6038 12.7105L21.2167 19.8808C21.2616 20.4061 21.2886 20.7378 21.2758 20.9809C21.264 21.2067 21.221 21.2537 21.2055 21.2705C21.1901 21.2874 21.1469 21.3342 20.9229 21.3652C20.6818 21.3986 20.349 21.4 19.8218 21.4H4.17823C3.65102 21.4 3.31816 21.3986 3.07706 21.3652C2.85309 21.3342 2.80994 21.2874 2.79448 21.2705C2.77901 21.2537 2.73605 21.2067 2.72419 20.9809C2.71143 20.7378 2.73842 20.4061 2.78332 19.8808L3.39617 12.7105C3.47178 11.8258 3.52474 11.2201 3.62338 10.7668C3.71837 10.3303 3.84016 10.1161 4.0006 9.96876C4.16105 9.82144 4.38484 9.71833 4.82784 9.66086C5.28789 9.60118 5.89588 9.6 6.78381 9.6Z" stroke="currentColor" strokeOpacity="0.95" strokeWidth="1.2"/>
                  <path d="M8 12L8 8C8 5.79086 9.79086 4 12 4V4C14.2091 4 16 5.79086 16 8L16 12" stroke="currentColor" strokeOpacity="0.95" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Din varukorg är tom.
              </div>
            ) : (
              cart.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-row gap-2 py-6 border-b border-gray-200"
                >
                  {/* Product image */}
                  <div className="flex-shrink-0 w-24 h-32 bg-gray-200 overflow-hidden rounded-md relative">
                    <img
                      className="w-full h-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                    {product.isOnSale && product.price < product.originalPrice && (
                      <div className="absolute top-1 left-1 bg-mahogany text-white text-xs px-1 py-0.5 rounded">
                        SALE
                      </div>
                    )}
                  </div>
                  {/* Product info */}
                  <div className="flex-1 ml-1 mt-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-800">
                        {product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                      >
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.41 12L17.71 7.71C17.8983 7.5217 18.0041 7.2663 18.0041 7C18.0041 6.7337 17.8983 6.47831 17.71 6.29C17.5217 6.1017 17.2663 5.99591 17 5.99591C16.7337 5.99591 16.4783 6.1017 16.29 6.29L12 10.59L7.71 6.29C7.5217 6.1017 7.2663 5.99591 7 5.99591C6.7337 5.99591 6.4783 6.1017 6.29 6.29C6.1017 6.47831 5.99591 6.7337 5.99591 7C5.99591 7.2663 6.1017 7.5217 6.29 7.71L10.59 12L6.29 16.29C6.19627 16.383 6.12188 16.4936 6.07111 16.6154C6.02034 16.7373 5.9942 16.868 5.9942 17C5.9942 17.132 6.02034 17.2627 6.07111 17.3846C6.12188 17.5064 6.19627 17.617 6.29 17.71C6.38296 17.8037 6.49356 17.8781 6.61542 17.9289C6.73728 17.9797 6.86799 18.0058 7 18.0058C7.13201 18.0058 7.26272 17.9797 7.38458 17.9289C7.50644 17.8781 7.61704 17.8037 7.71 17.71L12 13.41L16.29 17.71C16.383 17.8037 16.4936 17.8781 16.6154 17.9289C16.7373 17.9797 16.868 18.0058 17 18.0058C17.132 18.0058 17.2627 17.9797 17.3846 17.9289C17.5064 17.8781 17.617 17.8037 17.71 17.71C17.8037 17.617 17.8781 17.5064 17.9289 17.3846C17.9797 17.2627 18.0058 17.132 18.0058 17C18.0058 16.868 17.9797 16.7373 17.9289 16.6154C17.8781 16.4936 17.8037 16.383 17.71 16.29L13.41 12Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, product.quantity - 1)
                          }
                          className="px-2 py-1 hover:bg-gray-100"
                          disabled={product.quantity <= 1}
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 4L6 8L10 12"
                              stroke="#1F2937"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <span className="px-1">{product.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, product.quantity + 1)
                          }
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 4L10 8L6 12"
                              stroke="#1F2937"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                      {product.isOnSale && product.price < product.originalPrice ? (
                        <div className="text-md font-medium">
                          <div className="flex flex-col md:flex-row items-center gap-2">
                            <span className="text-mahogany font-bold">{Math.round(product.price * product.quantity)} KR</span>
                            <span className="line-through text-gray-400 text-sm">{Math.round(product.originalPrice * product.quantity)} KR</span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-md font-medium">
                          {Math.round(product.price * product.quantity)} KR
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order summary */}
          <div className="pt-4 border-t border-gray-200">
            <div className="space-y-3">
             {totalSavings > 0 && (
                <div className="flex justify-between">
                  <span className="text-mahogany">Du sparar</span>
                  <span className="font-medium text-mahogany">-{totalSavings} KR</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Delsumma</span>
                <span className="font-medium">{subtotal} KR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frakt</span>
                <span className="font-medium">{shippingCost} KR</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-lg font-semibold">TOTALT</span>
                <span className="text-lg font-semibold">{total} KR</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-start">
              Inkl. moms
            </p>

            <Button
              className="w-full mt-6 font-medium"
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
            >
              Gå till kassan
            </Button>

            <button
              onClick={onClose}
              className="w-full mt-3 border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 px-4 rounded-md font-medium"
            >
              Fortsätt handla
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
