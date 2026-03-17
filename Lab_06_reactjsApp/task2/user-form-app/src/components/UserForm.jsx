import { useState } from "react";
import "./UserForm.css";

function UserForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(null);
    const [history, setHistory] = useState([]);

    const handleSubmit = () => {
        const data = { name, email };
        setSubmitted(data);
        setHistory(prev => [data, ...prev]);
        setName("");       // ← clear fields after submit
        setEmail("");
    };

    return (
        <div className="uf-wrap">
            <div className="uf-card">
                <p className="uf-title">User Form</p>
                <p className="uf-subtitle">Fill in your details and submit</p>

                <div className="uf-field">
                    <label className="uf-label">Name</label>
                    <input
                        className="uf-input"
                        type="text"
                        placeholder="e.g. Tayyab Ahmed"
                        value={name}
                        onChange={(e) => setName(e.target.value)}  // ← onChange updates state
                    />
                </div>

                <div className="uf-field">
                    <label className="uf-label">Email</label>
                    <input
                        className="uf-input"
                        type="email"
                        placeholder="e.g. tayyab@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // ← onChange updates state
                    />
                </div>

                <button
                    className="uf-btn"
                    onClick={handleSubmit}
                    disabled={!name.trim() || !email.trim()}
                >
                    Submit
                </button>

                <div className="uf-divider"></div>

                <p className="uf-result-label">Submitted Data</p>
                {submitted ? (
                    <div className="uf-result">
                        <div className="uf-result-row">
                            <div className="uf-result-icon icon-name">👤</div>
                            <div className="uf-result-info">
                                <span className="uf-result-key">Name</span>
                                <span className="uf-result-val">{submitted.name}</span>
                            </div>
                        </div>
                        <div className="uf-result-row">
                            <div className="uf-result-icon icon-email">✉️</div>
                            <div className="uf-result-info">
                                <span className="uf-result-key">Email</span>
                                <span className="uf-result-val">{submitted.email}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="uf-empty">No submission yet</p>
                )}

                {history.length > 1 && (
                    <div>
                        <p className="uf-history-label">Previous Submissions</p>
                        {history.slice(1).map((h, i) => (
                            <div className="uf-history-item" key={i}>
                                <span>{h.name}</span>
                                <span>{h.email}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserForm;