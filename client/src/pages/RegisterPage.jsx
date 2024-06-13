import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { localRequest } from '../../utils/axios'

export default function Register() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (event) => {
        event.preventDefault()
        try {
            await localRequest.post('/register', {
                fullName,
                email,
                password,
            })
            navigate('/login')
        } catch (error) {
            console.log(error)
            alert(error.response.data.message)
        }
    }
    return (
        // <>
        //     <title>AYO CEPETAN</title>

        //     <section >
        //         <div className="login-left w-50 h-100 d-flex justify-content-center align-items-center">
        //             {/* <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQzNMnjzjA7BfNJ18gWXJB6pCGnQwwZ3Knf2zsM50IibfYAfNKMe5D0R1eRPqv04MfnwLHGsPodnHqDuiE2MwuOobL4w5U6_gU2X7F95g4hOiPaO6dseRjio-7aIz84Pc5mdMpW0qi3bA0yJNHo77U3A5ykPpWV4tlQGD31QhjWAcX-S-y8_tYHIqLeP0/d/bitcoin-wallpaper-4k.jpg" className="w-50" /> */}
        //         </div>
        //         <div className="login-right w-50 h-100">
        //             <div className="d-flex justify-content-center align-items-center h-100">
        //                 <div>
        //                     <div className="header">
        //                         <h1> 
        //                             HaloHalo
        //                         </h1>
        //                     </div>
        //                     <form onSubmit={handleRegister}>
        //                         <div className="login-form">
        //                             <label
        //                                 htmlFor="name"
        //                                 className="form-label"
        //                             >
        //                                 Full Name
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 className="form-control"
        //                                 id="name"
        //                                 value={fullName}
        //                                 onChange={(event) =>
        //                                     setFullName(event.target.value)
        //                                 }
        //                             />

        //                             <label
        //                                 htmlFor="email"
        //                                 className="form-label"
        //                             >
        //                                 Email
        //                             </label>
        //                             <input
        //                                 type="email"
        //                                 className="form-control"
        //                                 id="email"
        //                                 value={email}
        //                                 onChange={(event) =>
        //                                     setEmail(event.target.value)
        //                                 }
        //                             />

        //                             <label
        //                                 htmlFor="password"
        //                                 className="form-label"
        //                             >
        //                                 Password
        //                             </label>
        //                             <input
        //                                 type="password"
        //                                 className="form-control"
        //                                 id="password"
        //                                 value={password}
        //                                 onChange={(event) =>
        //                                     setPassword(event.target.value)
        //                                 }
        //                             />

        //                             <button className="signin">Register</button>

        //                             <span>
        //                                 Do you have an account?
        //                                 <Link
        //                                     to="/login"
        //                                     className="text-decoration-none"
        //                                 >
        //                                     Login
        //                                 </Link>
        //                             </span>
        //                         </div>
        //                     </form>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </>
        <>
            <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-5">
            <div className="mb-5">
                    <label
                        htmlFor="fullName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your full Name
                    </label>
                    <input
                        type="fullName"
                        id="fullName"
                        name= "fullName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Aselole Jos"
                        value={fullName}
                        onChange={(event)=> setFullName(event.target.value)}
                    />
                </div>                
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        value={email}
                        onChange={(event)=> setEmail(event.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event)=>setPassword(event.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
                
                <span>
                                        Do you have an account?
                                        <Link
                                            to="/login"
                                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                            >
                                            Login
                                        </Link>
                                    </span>
            </form>


        </>
    )
}
