import { useState } from 'react';
import { useRouter } from 'next/router';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import api from '../utils/api';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hello! Type help to see available commands.' }]);
  const [input, setInput] = useState('');
  const router = useRouter();

  const send = async () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');
    let reply = '';
    if (cmd === 'help') {
      reply = 'Available commands:\n• list customers\n• add customer\n• invoices';
    } else if (cmd === 'list customers') {
      const { data } = await api.get('/customers');
      reply = `Found ${data.length} customers:\n` + data.slice(0, 5).map(c => `• ${c.name} (${c.status})`).join('\n') + (data.length > 5 ? `\n   ...and ${data.length - 5} more` : '');
    } else if (cmd === 'add customer') {
      router.push('/customers/add');
      reply = 'Navigating to Add Customer...';
    } else if (cmd === 'invoices') {
      router.push('/invoices');
      reply = 'Navigating to Invoices...';
    } else {
      reply = 'Unknown command. Type help to see what I can do.';
    }
    setMessages(prev => [...prev, { from: 'bot', text: reply }]);
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }}>
      {open && (
        <div className="card" style={{ width: 320, height: 420, display: 'flex', flexDirection: 'column', marginBottom: 12, boxShadow: 'var(--shadow-md)' }}>
          {/* Header */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, background: 'var(--primary-soft)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={14} color="var(--primary)" />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Sage Assistant</div>
                <div style={{ fontSize: 11, color: 'var(--success)', fontWeight: 500 }}>Online</div>
              </div>
            </div>
            <button className="btn-ghost" onClick={() => setOpen(false)} style={{ padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                background: m.from === 'user' ? 'var(--primary)' : 'var(--bg-tertiary)',
                color: m.from === 'user' ? '#fff' : 'var(--text)',
                padding: '8px 12px', borderRadius: m.from === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                fontSize: 13, maxWidth: '88%', whiteSpace: 'pre-wrap', lineHeight: 1.5
              }}>{" "}{m.text}</div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, alignItems: 'center' }}>
            <input className="input-field" placeholder="Type a command..." value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              style={{ flex: 1, padding: '7px 12px', fontSize: 13 }} />
            <button className="btn-primary" onClick={send} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button onClick={() => setOpen(o => !o)} style={{
        width: 48, height: 48, borderRadius: '50%', background: 'var(--primary)',
        border: 'none', color: '#fff', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(44, 74, 62, 0.25)', transition: 'transform 0.15s'
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        {open ? <X size={20} /> : <MessageSquare size={20} />}
      </button>
    </div>
  );
}