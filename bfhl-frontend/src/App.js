// App.js
import React, { useState, useEffect } from 'react';
import './App.css';




function App() {

    // in App.js or index.js
useEffect(() => {
  document.title = "your_roll_number";
}, []);



      const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            const res = await fetch('https://your-backend-url.herokuapp.com/bfhl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(parsedJson),
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error("Invalid JSON or API Error", error);
        }
    };

    const renderResponse = () => {
        if (!response) return null;

        const result = {};

        if (selectedOptions.includes("Alphabets")) {
            result.alphabets = response.alphabets;
        }
        if (selectedOptions.includes("Numbers")) {
            result.numbers = response.numbers;
        }
        if (selectedOptions.includes("Highest alphabet")) {
            result.highest_alphabet = response.highest_alphabet;
        }

        return <pre>{JSON.stringify(result, null, 2)}</pre>;
    };

    return (
        <div className="App">
            <h1>BFHL Challenge</h1>
            <input
                type="text"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here'
            />
            <button onClick={handleSubmit}>Submit</button>
            {response && (
                <>
                    <h2>Filter Response</h2>
                    <select multiple onChange={(e) => setSelectedOptions([...e.target.selectedOptions].map(option => option.value))}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest alphabet">Highest alphabet</option>
                    </select>
                    {renderResponse()}
                </>
            )}
        </div>
    );
}

export default App;
