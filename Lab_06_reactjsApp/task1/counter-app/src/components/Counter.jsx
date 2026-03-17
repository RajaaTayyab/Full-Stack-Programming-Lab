// src/components/Counter.jsx
import { useState } from "react";
import "./Counter.css";

function Counter() {
    const [count, setCount] = useState(0);
    const [maxReached, setMax] = useState(0);
    const [totalClicks, setTotal] = useState(0);
    const [shaking, setShaking] = useState(false);

    const MAX_GOAL = 20;

    const increment = () => {
        const next = count + 1;
        setCount(next);
        setTotal(t => t + 1);
        if (next > maxReached) setMax(next);
    };

    const decrement = () => {
        if (count === 0) { triggerShake(); return; }
        setCount(c => c - 1);
        setTotal(t => t + 1);
    };

    const reset = () => {
        setCount(0);
        setTotal(t => t + 1);
    };

    const triggerShake = () => {
        setShaking(true);
        setTimeout(() => setShaking(false), 300);
    };

    const progress = Math.min((count / MAX_GOAL) * 100, 100);

    return (
        <div className="ca-wrap">
            <div className="ca-card">
                <p className="ca-label">Counter Component</p>

                <span className={`ca-number ${shaking ? "shake" : ""}`}>
                    {count}
                </span>

                {count === 0 && <p className="ca-warning">⚠ Cannot go below 0</p>}

                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>

                <div className="ca-btns">
                    <button className="btn-dec" onClick={decrement} disabled={count === 0}>
                        <span>−</span> Decrement
                    </button>
                    <button className="btn-reset" onClick={reset}>
                        <span>↺</span> Reset
                    </button>
                    <button className="btn-inc" onClick={increment}>
                        <span>+</span> Increment
                    </button>
                </div>

                <div className="ca-stats">
                    <div className="stat"><b>{maxReached}</b><small>Max Reached</small></div>
                    <div className="stat"><b>{totalClicks}</b><small>Total Clicks</small></div>
                    <div className="stat"><b>{Math.round(progress)}%</b><small>Of Goal (20)</small></div>
                </div>
            </div>
        </div>
    );
}

export default Counter;