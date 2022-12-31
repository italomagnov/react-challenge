import { useState } from 'react';
import './App.css';

function App() {
    const [clickList, setClickList] = useState([]);
    const [undone, setUndone] = useState([]);

    const handleClick = (event) => {
        const newDot = {
            coordX: event.clientX,
            coordY: event.clientY,
        };

        setClickList((coord) => [...coord, newDot]);
    };

    const handleUndo = (event) => {
        event.stopPropagation();

        if (clickList.length === 0) {
            return;
        }

        const lastItem = clickList[clickList.length - 1];
        setUndone((prev) => [...prev, lastItem]);

        setClickList((prev) => {
            const newArray = [...prev].slice(0, -1);
            return newArray;
        });
    };

    const handleRedo = (event) => {
        event.stopPropagation();

        if (undone.length === 0) {
            return;
        }

        const dot = undone[undone.length - 1];

        setUndone((prev) => {
            const newArray = [...prev].slice(0, -1);
            return newArray;
        });
        setClickList((prev) => [...prev, dot]);
    };

    return (
        <div className="App" onClick={handleClick}>
            <h1>React Challenge</h1>
            <p>Clique em qualquer lugar da tela para criar um círculo</p>
            <div className="buttons">
                <button onClick={handleUndo}>Desfazer</button>
                <button onClick={handleRedo}>Refazer</button>
            </div>
            {clickList.map((item) => (
                <div
                    className="circle"
                    style={{ left: item.coordX - 25, top: item.coordY - 25 }}
                ></div>
            ))}
        </div>
    );
}

export default App;
