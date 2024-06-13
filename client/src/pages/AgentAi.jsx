import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { localRequest } from '../../utils/axios'

export default function AgentAi() {
    const [agent1, setAgent1] = useState('')
    const [agent2, setAgent2] = useState('')
    const [result, setResult] = useState(null)
    const navigate = useNavigate()

    const handleAgentAi = async (event) => {
        event.preventDefault()
        try {
            let { data } = await localRequest.post("/helpMe", {
                agent1,

                agent2,
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                },
                
            )
            setResult(data)
            navigate('/helpMe')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <>
        <>
    <div className="max-w-md mx-auto p-4 bg-gray-100 border rounded-lg">
        <h2 className="text-center text-lg font-bold mb-4">Ask The Agent?</h2>
        <form onSubmit={handleAgentAi}>
            <h6 className="text-red-500 text-sm text-center"></h6>
            <label htmlFor="agentName" className="block mb-1">The First Agent</label>
            <input
                type="text"
                name="agentName"
                id="agentName"
                value={agent1}
                onChange={(event) => setAgent1(event.target.value)}
                className="w-full px-3 py-2 mb-4 border rounded-lg"
            />
            <label htmlFor="agentName" className="block mb-1">The Second Agent</label>
            <input
                type="text"
                name="agentName"
                id="agentName"
                value={agent2}
                onChange={(event) => setAgent2(event.target.value)}
                className="w-full px-3 py-2 mb-4 border rounded-lg"
            />
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg">Compare</button>
        </form>
        {result && (
            <div className="mt-4 p-4 border rounded-lg bg-white">
                <h3 className="text-lg font-bold">Fact Result:</h3>
                <p>{JSON.stringify(result)}</p>
            </div>
        )}
    </div>
</>

        </>
    )
}
