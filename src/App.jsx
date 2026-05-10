import { useState, useEffect } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {

  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  // SWAP FUNCTION
  const swapCurrency = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  // CONVERT FUNCTION
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  // AUTO CONVERT
  useEffect(() => {
    convert();
  }, [amount, from, to]);

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070')",
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30">

          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >

            {/* FROM */}
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
              />
            </div>

            {/* SWAP BUTTON */}
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swapCurrency}
              >
                Swap
              </button>
            </div>

            {/* TO */}
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisabled
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default App;