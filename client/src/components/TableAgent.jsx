import { Link } from "react-router-dom";

export default function TableAgent({ item, handleDelete }) {
  const onDelete = () => {
    handleDelete(item.id);
  };
  return (
    <>
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {item.id}
        </th>
        <td class="px-6 py-4">
          {item.agentName}
        </td>
        <td class="px-6 py-4">
          {item.description}
        </td>
        <td class="px-6 py-4">
          {item.nickName}
        </td>
        <td class="px-6 py-4">
          {item.agentRole}
        </td>
        <td class="px-6 py-4">
          {item.agentDescription}
        </td>
        {/* <td class="px-6 py-4">
          {item.abilities}
        </td> */}
        <td scope="col">
          <img
            src={item.imgUrl}
            alt="PLEASE PUT YOUR IMAGE!"
            style={{ width: "100px", height: "80px" }}
          />
        </td>
        <td class="px-3 py-3">
          <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-1 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={onDelete}>Delete</button>
          <Link to={`/agents-detail/${item.id}`} type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-0.5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" >Update</Link>
        </td>
      </tr>
    </>
  );
}