import { useState, useEffect } from 'react'

export default function App() {
    const [boxes, setBoxes] = useState<string[]>([])

    const addBox = (text: string) => {
        setBoxes([...boxes, text])
    }

    const removeBox = (index: number) => {
        setBoxes(boxes.filter((_, i) => i !== index))
    }

    return (
        <>
            <h1>Creative title with good styling (trust)</h1>
            {boxes.length > 0 && <>
                <h3>Here are the boxes:</h3>
                <ul>
                    {boxes.map((box, index) => (
                        <li key={index}>
                            {box}
                            <button onClick={() => removeBox(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </>}

        </>
    )
}
