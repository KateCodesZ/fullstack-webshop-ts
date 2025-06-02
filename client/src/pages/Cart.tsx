import { useCart } from "../hooks/useCart";
import { useEffect } from "react";

export default function Cart({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const shippingCost = 29;
  const subtotal = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
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
      document.body.style.paddingRight = originalPaddingRight;    };
  }, [isOpen]);
  return (
    <>
      {/* Background dimming with transition */}
      <div
        className={`fixed inset-0 z-[998] bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Cart panel with slide-in animation */}
      <aside
        className={`fixed top-0 right-0 z-[999] h-screen w-[85%] bg-floralwhite shadow-lg transition-transform duration-400 p-5 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:w-96 lg:w-[28rem]`}
        style={{ maxWidth: "100vw" }}
      >        <div className="w-full h-full flex flex-col">
          {/* Cart header */}
          <div className="border-b border-gray-200 pb-4 mb-5 flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-2 md:text-3xl">Varukorg</h1>
            <button
              className="border border-gray-800 px-4 py-2 text-base transition-colors hover:bg-gray-100"
              onClick={onClose}
            >
              Stäng
            </button>
          </div>

          {/* Product list */}
          <div className="flex-1 overflow-y-auto py-4">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 py-16 text-xl">
                Din varukorg är tom.
              </div>
            ) : (
              cart.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col md:flex-row py-6 border-b border-gray-200"                >
                  {/* Product image */}
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  {/* Product info */}
                  <div className="flex-1 md:ml-4 mt-4 md:mt-0">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium text-gray-800">
                        {product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-gray-400 hover:text-gray-600"
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

                    <p className="text-gray-600 mt-1">{product.price} KR</p>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, product.quantity - 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100"
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
                        <span className="px-3">{product.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, product.quantity + 1)
                          }
                          className="px-3 py-1 hover:bg-gray-100"
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
                      <p className="text-lg font-medium">
                        {product.price * product.quantity} KR
                      </p>
                    </div>
                  </div>
                </div>
              ))            )}
          </div>

          {/* Order summary */}
          <div className="pt-4 border-t border-gray-200">            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Delsumma</span>
                <span className="font-medium">{subtotal} KR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fraktavgifter</span>
                <span className="font-medium">{shippingCost} KR</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-lg font-semibold">TOTALT</span>
                <span className="text-lg font-semibold">{total} KR</span>
              </div>
              <p className="text-sm text-gray-600 text-center py-2">
                Inkl. moms
              </p>
            </div>

            <button className="w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-md font-medium">
              GÅ TILL KASSAN
            </button>

            <button
              onClick={onClose}
              className="w-full mt-3 border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 px-4 rounded-md font-medium"
            >
              FORTSÄTT HANDLA
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
