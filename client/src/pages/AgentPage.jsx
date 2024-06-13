import { useEffect, useState } from "react";
import { localRequest } from "../../utils/axios";
import TableAgent from "../components/TableAgent"
import ToastError, { ToastSuccess } from "../../utils/toast"

export default function AgentPage() {
  const [agent, setAgent] = useState([]);

  const fetchData = async () => {
    try {
      const {data} = await localRequest.get("/agents",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAgent(data);
    } catch (error) {
      ToastError(error.response?.data?.message || error.message, "error");

    }
  };

  const handleDelete = async (id) => {
    try {
      const {data} = await localRequest.delete("/agents/" +id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      // console.log(res.data.data);
      fetchData();
      ToastSuccess(data?.message, "message")
    } catch (error) {
      // console.log(error);
      ToastError(error.response?.data?.message || error.message, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
   <>
   
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    id
                </th>
                <th scope="col" className="px-6 py-3">
                    agentName
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    nickName
                </th>
                <th scope="col" className="px-6 py-3">
                    agentRole
                </th>
                <th scope="col" className="px-6 py-3">
                    agentDescription
                </th>
                <th scope="col" className="px-6 py-3">
                    Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody> 
        {agent&&
              agent.map((item) => {
                return (
                  <TableAgent
                    key={item.id}
                    item={item}
                    handleDelete={handleDelete}
                  />
                );
              })}
        </tbody>
    </table>
</div>

   </>
  );
}