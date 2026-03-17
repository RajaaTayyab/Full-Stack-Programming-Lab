import { useState } from "react";
import "./Actions.css";

const backgrounds = [
    "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
    "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    "linear-gradient(135deg, #134e5e, #71b280)",
    "linear-gradient(135deg, #200122, #6f0000)",
    "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
];

const hoverColors = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#a29bfe", "#fd79a8"];

function Actions() {
    const [message, setMessage] = useState(false);
    const [bgIndex, setBgIndex] = useState(0);
    const [alertBox, setAlertBox] = useState(false);
    const [titleColor, setTitleColor] = useState("#fff");
    const [colorIndex, setColorIndex] = useState(0);

    // onClick — Show / hide message
    const handleShowMessage = () => setMessage(prev => !prev);

    // onClick — Cycle background color
    const handleChangeBg = () => setBgIndex(prev => (prev + 1) % backgrounds.length);

    // onClick — Show alert
    const handleShowAlert = () => setAlertBox(true);

    // onMouseOver — Change title text color
    const handleMouseOver = () => {
        setTitleColor(hoverColors[colorIndex % hoverColors.length]);
        setColorIndex(prev => prev + 1);
    };

    // onMouseOut — Reset title text color
    const handleMouseOut = () => setTitleColor("#fff");

    return (
        <div className="ea-wrap" style={{ background: backgrounds[bgIndex] }}>

            {/* Custom Alert Box */}
            {alertBox && (
                <div className="ea-alert-overlay">
                    <div className="ea-alert-box">
                        <div className="ea-alert-icon">🔔</div>
                        <p className="ea-alert-title">Alert!</p>
                        <p className="ea-alert-msg">
                            This is triggered by the onClick event on the Alert button.
                        </p>
                        <button className="ea-alert-close" onClick={() => setAlertBox(false)}>
                            Got it!
                        </button>
                    </div>
                </div>
            )}

            <div className="ea-card">
                <span className="ea-badge">Event Handling</span>

                {/* onMouseOver changes text color */}
                <h1
                    className="ea-title"
                    style={{ color: titleColor }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    Actions Component
                </h1>

                <p className="ea-subtitle">Hover over the title · Click the buttons below</p>

                <div className="ea-btns">

                    {/* Button 1 — onClick: Show Message */}
                    <button className="ea-btn btn-msg" onClick={handleShowMessage}>
                        <div className="ea-btn-icon">💬</div>
                        <span className="ea-btn-text">Show Message</span>
                        <span className="ea-btn-arrow">→</span>
                    </button>

                    {/* Button 2 — onClick: Change Background */}
                    <button className="ea-btn btn-bg" onClick={handleChangeBg}>
                        <div className="ea-btn-icon">🎨</div>
                        <span className="ea-btn-text">Change Background</span>
                        <span className="ea-btn-arrow">→</span>
                    </button>

                    {/* Button 3 — onClick: Show Alert */}
                    <button className="ea-btn btn-alert" onClick={handleShowAlert}>
                        <div className="ea-btn-icon">🔔</div>
                        <span className="ea-btn-text">Show Alert</span>
                        <span className="ea-btn-arrow">→</span>
                    </button>

                </div>

                {/* Message shown below buttons */}
                {message && (
                    <div className="ea-msg-box">
                        <div className="ea-msg-dot"></div>
                        <p className="ea-msg-text">
                            👋 Hello! This message was shown using the <strong>onClick</strong> event handler.
                        </p>
                    </div>
                )}

                <p className="ea-hover-hint">💡 Hover over the title to change its color</p>
            </div>
        </div>
    );
}

export default Actions;