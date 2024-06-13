import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { localRequest } from "../../utils/axios";
// import ToastError from "../../utils/toast"
// import axios from "axios"


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            let res = await localRequest.post(`/login`, {
                email,
                password,
            });
            let { data } = res

            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (error) {
            console.log(error);
            //   ToastError(error.response?.data?.message || error.message, "error");
        }
    };

    async function handleCredentialResponse(response) {
        try {
            // console.log("Encoded JWT ID token: " + response.credential);
            const { data } = await localRequest({
                method: "POST",
                url: "/google-login",
                headers: { google_token: response.credential }
            })
            localStorage.setItem("token", data.token);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        window.onload = function () {
            google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
            );
            google.accounts.id.prompt(); // also display the One Tap dialog
        }
    }, [])
    return (
        <>
            <div className="mt-5">
                <form onSubmit={submitLogin} className="max-w-md mx-auto">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                    <button type="submit" className="text-white bg-red-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Lets Go!</button>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                Don't have an account?
                <Link
                  to="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Signup Here
                </Link>
              </p>
              <div className="text-center m-1 text-sm text-gray-500 grid gap-3 items-center justify-content">
                <span>Or</span>

                <div  id="buttonDiv" className="d-flex flex justify-center mx-5"></div>
              </div>
                    
            </div>
        </>
    );
}
