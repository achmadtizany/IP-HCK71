
import { Link } from "react-router-dom";

export default function AgentCard({ item }) {
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg" src={item.imgUrl} style={{ height: "10rem", objectFit: "cover" }} alt="Please Upload The Image" />
        <div className="p-5">

          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.agentName}!</h5>
          </div>
          <div>
          <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">Nick Name :  {item.nickName}!</h5>

          <h1 className="mb-2 text-1xl font-bold tracking-tight text-gray-700 dark:text-white">Role: {item.agentRole}!</h1>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
          <Link to={`/agents/${item.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-300 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  
  );
}