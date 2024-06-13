import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
                    <div className="relative w-full mb-5">
                        <input
                            type="email"
                            name="floating_email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
                            placeholder="Email address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative w-full mb-5">
                        <input
                            type="password"
                            name="floating_password"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                    >
                        Let's Go!
                    </button>
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
                <div className="text-center mt-4 text-sm text-gray-500">
                    <span>Or</span>
                </div>
            </div>
            <div id="buttonDiv" className="d-flex flex justify-center mx-5"></div>
        </>

    );
}
