import React from "react";

import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { localRequest } from "../../utils/axios";

export default function AgentDetail() {
    const [agent, setAgent] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const fetchData = async () => {
        try {
            const { data } = await localRequest.get(`/agents/` + id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            setAgent(data);
            setLoading("Loading...");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
         <a
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 transition-colors duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
        <img
            className="object-contain w-full h-48 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={agent.imgUrl}
            alt="Agent Portrait"
        />
        <div className="flex flex-col justify-between p-4">
            <div className="mb-4 font-semibold tracking-tight text-gray-900 dark:text-white overflow-hidden">
                <pre className="whitespace-pre-wrap">{JSON.stringify(agent.abilities, null, 2)}</pre>
            </div>
        </div>
    </a>
        </>


    );
}
