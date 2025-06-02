import { useState } from "react";
import { useCart } from "../hooks/useCart";
import Button from "../components/Button";

export default function CheckoutPage() {
  const { cart } = useCart();
  // Calculate order summary from cart
  const shippingCost = 29;
  const subtotal = Math.round(
    cart.reduce((sum, product) => sum + product.price * product.quantity, 0)
  );
  const totalSavings = Math.round(
    cart.reduce((sum, product) => {
      if (product.isOnSale && product.originalPrice) {
        return sum + (product.originalPrice - product.price) * product.quantity;
      }
      return sum;
    }, 0)
  );
  const total = subtotal + shippingCost;
  const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);

  const [dropdown1, setDropdown1] = useState(false);
  const [changeText1, setChangeText1] = useState("Utgångsdatum");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");

  const handleText1 = (e: string) => {
    setChangeText1(e);
    setDropdown1(false);
  };

  const handlePaymentChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add payment processing logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-4 px-4 md:px-6 lg:px-20 xl:px-44">
        <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:gap-10 2xl:gap-36 gap-12 lg:gap-y-0">
          {/* Payment Section */}
          <div className="flex w-full flex-col justify-start items-start">
            <div>
              <h1 className="text-3xl lg:text-4xl font-semibold text-marianblue">
                Kassa
              </h1>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-semibold text-marianblue">
                Betalningsmetod
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 w-full space-y-8">
              <div className="flex justify-start items-center gap-8">
                {/* Credit Card Option */}
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "credit-card"}
                      onChange={() => handlePaymentChange("credit-card")}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 border rounded-full mr-2 flex items-center justify-center ${
                        paymentMethod === "credit-card"
                          ? "border-gray-800 bg-gray-800"
                          : "border-gray-400"
                      }`}
                    >
                      {paymentMethod === "credit-card" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-base text-gray-600">Kreditkort</span>
                  </label>
                </div>

                {/* Klarna Option */}
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "klarna"}
                      onChange={() => handlePaymentChange("klarna")}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 border rounded-full mr-2 flex items-center justify-center ${
                        paymentMethod === "klarna"
                          ? "border-gray-800 bg-gray-800"
                          : "border-gray-400"
                      }`}
                    >
                      {paymentMethod === "klarna" && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-base text-gray-600">Klarna</span>
                  </label>
                </div>
              </div>

              {paymentMethod === "credit-card" && (
                <>
                  <input
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="px-2 w-full py-4 border-b border-gray-200 text-base placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    type="text"
                    placeholder="Namn på kortet"
                    required
                  />

                  <input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="px-2 w-full py-4 border-b border-gray-200 text-base placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    type="text"
                    placeholder="Kortnummer"
                    required
                  />

                  <div className="relative w-full">
                    <div
                      onClick={() => setDropdown1(!dropdown1)}
                      className="flex justify-between items-center cursor-pointer px-2 border-b border-gray-200 py-4"
                    >
                      <span className="text-base text-gray-600">
                        {changeText1}
                      </span>
                      <svg
                        className={`transform transition-transform ${
                          dropdown1 ? "rotate-180" : ""
                        }`}
                        width={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 6L8 10L4 6"
                          stroke="#4B5563"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    {dropdown1 && (
                      <div className="absolute z-10 bg-white w-full mt-1 shadow-lg rounded-md">
                        <div className="flex flex-col w-full">
                          {["30-Dec-2026", "31-Jan-2027", "28-Feb-2028"].map(
                            (date) => (
                              <div
                                key={date}
                                onClick={() => handleText1(date)}
                                className="px-3 py-2 text-base text-gray-600 hover:bg-gray-100 cursor-pointer"
                              >
                                {date}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="px-2 w-full py-4 border-b border-gray-200 text-base placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    type="text"
                    placeholder="CVC"
                    required
                  />
                </>
              )}

              <Button
                type="submit"
                className="mt-8 w-full md:w-4/12 lg:w-full py-4 text-base font-medium text-white bg-gray-800 hover:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors"
              >
                Slutför köp
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
            <h2 className="text-2xl font-semibold text-gray-800">
              Ordersammanfattning
            </h2>
            <div className="flex mt-7 flex-col w-full gap-6">
              <div className="flex justify-between w-full items-center">
                <p className="text-lg text-gray-600">Antal varor</p>
                <p className="text-lg font-semibold text-gray-600">{totalItems}</p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg text-gray-600">Totalt</p>
                <p className="text-lg font-semibold text-gray-600">{subtotal} kr</p>
              </div>
              <div className="flex justify-between w-full items-center">
                <p className="text-lg text-gray-600">Frakt</p>
                <p className="text-lg font-semibold text-gray-600">{shippingCost} kr</p>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg text-mahogany">Du sparar</p>
                  <p className="text-lg font-semibold text-mahogany">-{totalSavings} kr</p>
                </div>
              )}
            </div>
            <div className="flex justify-between w-full items-center mt-10 md:mt-32 pt-6 border-t border-gray-200">
              <p className="text-xl font-semibold text-gray-800">
                Beräknat totalbelopp
              </p>
              <p className="text-lg font-semibold text-gray-800">{total} kr</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-8 md:h-12 lg:h-16" />
    </div>
  );
}
