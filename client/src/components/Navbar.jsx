import { Link, NavLink, useNavigate } from "react-router-dom";
import { localRequest } from "../../utils/axios";

export default function Navbar() {
  const navigate = useNavigate();

  const handleOnUpgrade = async () => {
    // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
    const { data } = await localRequest.get("/payment/midtrans/initiate", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    window.snap.pay(data.transactionToken, {
      onSuccess: async function (result) {
        /* You may add your own implementation here */
        alert("payment success!"); console.log(result);
        await localRequest.patch("/users/me/upgrade", {
          orderId: data.orderId
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
      },
    })
  }
  return (
    <>
      <nav className="border-gray-700 bg-gray-800 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Let's Learn the Agent </span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-900 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <NavLink to="/" className="block py-2 px-3 md:p-0 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</NavLink>
              </li>
              <li>
                <Link to="/table" className="block py-2 px-3 md:p-0 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Admin Only</Link>
              </li>
              <button onClick={handleOnUpgrade} className="block py-2 px-3 md:p-0 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Save The Dev's</button>
              <li>
                <Link to={"/helpMe"} className="block py-2 px-3 md:p-0 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Ask To Compare?</Link>
              </li>
              <li>
                <button onClick={() => {
                  localStorage.removeItem("token")
                  navigate('/login')
                }} className="block py-2 px-3 md:p-0 text-gray-200 rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Log-Out</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}