import { useEffect, useState } from "react";
import AgentCard from "../components/AgentCard";
import SearchBar from "../components/SearchBar";
// import Filter from "../../components/Pub-Compo/Filter";
import { localRequest } from "../../utils/axios";


export default function HomePage() {
    const [agent, setAgent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("")

    const fetchData = async () => {
        try {
            const { data } = await localRequest.get(`/agents?page[number]=${currentPage}&search=${search}&filter=${filter}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            setAgent(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, search,filter]);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleFilter = (value) => {
      setFilter(value)
    }

    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="container mx-auto mt-8">
                    <div
                        className="pr-24 pl-24 pt-16 pb-16 rounded-3xl shadow-xl "
                        style={{ backgroundColor: "white" }}
                    >
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="dark:text-black text-3xl font-semibold mb-4 text-center underline decoration-purple-300">
                                Read Carefully Please
                            </h2>
                            <SearchBar onSearch={handleSearch} />
                            {/* <Filter handleFilter={handleFilter}/> */}
                        </div>


                        <div className="grid grid-cols-4 gap-4 mb-10">
                            {agent &&
                                agent.map((item) => {
                                    return <AgentCard key={item.id} item={item} />;
                                })}
                        </div>

                        <div className="flex justify-center mt-4 mb-4 gap-3 ">
                            <button
                                className="join-item btn dark:bg-gray-100 dark:text-black dark:border-none"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                «
                            </button>
                            <button className="join-item btn dark:bg-gray-100 dark:text-black dark:border-none">
                                Page {currentPage}
                            </button>
                            <button
                                className="join-item btn dark:bg-gray-100 dark:text-black dark:border-none"
                                onClick={handleNextPage}
                            >
                                »
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}