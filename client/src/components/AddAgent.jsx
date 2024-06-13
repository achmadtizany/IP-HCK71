import { useEffect, useState } from "react";
import { localRequest } from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import ToastError from "../../utils/toast"

export default function AddAgent() {
  const [agents, setAgent] = useState({
    agentName: "",
    description: "",
    agentRole: "",
    agentDescription: "",
    imgUrl: "",
    nickName: "",
    abilities: ""

  })
  const { id } = useParams()

  const navigate = useNavigate()

  const handleChangeInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setAgent({
      ...agents,
      [key]: value
    })
  }
  const fetchDataEdit = async () => {
    try {
      const { data } = await localRequest.get("/agents/" + id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // setAgent(data.data);
      setAgent({
        agentName: data.agentName,
        nickName: data.nickName,
        description: data.description,
        agentRole: data.agentRole,
        agentDescription: data.agentDescription,
        imgUrl: data.imgUrl,
        abilities: data.abilities
      })
      // setAgent(data)

    } catch (error) {
      ToastError(error.response?.data?.message || error.message, "error");
      // console.log(error.response);
    }
  };

 useEffect(()=>{
  fetchDataEdit()
 }, [id])

  const handleAgent = async (e) => {
    e.preventDefault()

    try {
      const { data } = await localRequest({
        method: id ? "PUT" : "POST",
        url: `/agents${id ? `/${id}` : ""}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: {...agents}
      })
      // console.log(data);
      navigate("/table")

    } catch (error) {
        // console.log(error);
      ToastError(error.response?.data?.message || error.message, "error");
    }
  }

  return (
    <>
      <div className="mb-5 mt-0 pb-3 text-center">
        <h1 className="mb-4">Add/Update Agent</h1>
      </div>
      <form onSubmit={handleAgent} autoComplete="off" className="max-w-sm mx-auto">
        <div className="form-outline">
          <label htmlFor="agentName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            agentName
          </label>
          <div>
            <input type="text" id="agentName"  name="agentName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={agents.agentName} onChange={handleChangeInput} />
          </div>
        </div>
        <div className="form-outline mb-5">
          <label htmlFor="nickName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            nickName
          </label>
          <div>
            <input type="text" id="nickName"  name="nickName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={agents.nickName} onChange={handleChangeInput} />
          </div>
        </div>
        <div className="form-outline mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <div>
            <input type="text" id="description"  name="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={agents.description} onChange={handleChangeInput} />
          </div>
        </div>
        <div className="form-outline mb-5" >
          <label htmlFor="agentRole" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            agentRole
          </label>
          <div>
            <input type="text" id="agentRole"  name="agentRole" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={agents.agentRole} onChange={handleChangeInput} />
          </div>
        </div>
        <div className="form-outline mb-5">
          <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Image
          </label>
          <div>
            <input type="text" id="image"  name="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={agents.imgUrl} onChange={handleChangeInput} />
          </div>
        </div>
        <div className="form-outline mb-5" >
          <label htmlFor="agentDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            agentDescription
          </label>
          <div>
            <input type="text" id="agentDescription"  name="agentDescription" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={agents.agentDescription} onChange={handleChangeInput} />
          </div>
        </div>
        <div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
        </div>
      </form>
    </>
  );
}