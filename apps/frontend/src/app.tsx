import { useState, useEffect } from 'react'

interface Box {
    _id: string
    name: string
}

export default function App() {
    const [boxes, setBoxes] = useState<Box[]>([])
    const [error, setError] = useState<string | null>(null)

    const addBox = async (text: string) => {
        try {
            const res = await fetch('/api/boxes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: text }),
            })
            const resJson = await res.json()
            setBoxes([...boxes, resJson])
        } catch (err) {
            setError(err)
        }
    }

    const deleteBox = async (id: string) => {
        try {
            await fetch(`/api/boxes/${id}`, {
                method: 'DELETE',
            })
            setBoxes(boxes.filter((box) => box._id !== id))
        } catch (err) {
            setError(err)
        }
    }

    useEffect(() => {
        fetch("/api/boxes")
            .then(response => response.json())
            .then(data => setBoxes(data))
    }, [])

    if (error) {
        return <h1>Something went wrong! sadge</h1>
    }

    return (
        <>
            <h1>Creative title with good styling (trust)</h1>
            {boxes.length > 0 && <>
                <h3>Here are the boxes:</h3>
                <ul>
                    {boxes.map((box) => (
                        <div key={box._id}>
                            <p className="border-2 border-black">{box.name}</p>
                            <button onClick={() => deleteBox(box._id)}>Delete</button>
                        </div>
                    ))}
                </ul>
            </>}
            <h3>Insanely creative form</h3>
            <form className="flex flex-col" onSubmit={(e) => {
                e.preventDefault()
                addBox(e.target[0].value)
            }
            }>
                <label className="border-2 border-black">Add a box: </label>
                <input className="border-2 border-black" type="text" />
                <button className="border-2 border-black" type="submit">Add</button>
            </form>
        </>
    )
}
