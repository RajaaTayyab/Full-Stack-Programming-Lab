import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Plus, X, Download, CheckCircle } from 'lucide-react';

export default function GenerateInvoice() {
  const [customer, setCustomer] = useState(null);
  const [services, setServices] = useState([{ name: '', amount: '' }]);
  const [loading, setLoading]   = useState(false);
  const [generated, setGenerated] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) api.get(`/customers/${id}`).then(({ data }) => setCustomer(data));
  }, [id]);

  const addService    = () => setServices([...services, { name: '', amount: '' }]);
  const removeService = (i) => setServices(services.filter((_, idx) => idx !== i));
  const updateService = (i, field, val) => {
    const s = [...services]; s[i][field] = val; setServices(s);
  };
  const total = services.reduce((s, sv) => s + (Number(sv.amount) || 0), 0);

  const handleGenerate = async () => {
    if (services.some(s => !s.name || !s.amount)) { toast.error('Fill all service fields'); return; }
    setLoading(true);
    try {
      const { data } = await api.post('/invoices', {
        customerId: id,
        services: services.map(s => ({ name: s.name, amount: Number(s.amount) })),
      });
      setGenerated(data);
      toast.success('Invoice generated!');
    } catch { toast.error('Failed to generate invoice'); }
    finally { setLoading(false); }
  };

  const downloadPDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.setFontSize(22); doc.setTextColor(44, 74, 62); doc.text('Nexus CRM', 20, 25);
    doc.setFontSize(10); doc.setTextColor(120, 120, 120); doc.text('by Tayyab Janjua', 20, 31);
    doc.setFontSize(11); doc.setTextColor(60, 60, 70);
    doc.text(`Invoice No: ${generated.invoiceNo}`, 20, 46);
    doc.text(`Date: ${new Date(generated.date || Date.now()).toLocaleDateString()}`, 20, 54);
    doc.text(`Customer: ${customer.name} (${customer.company})`, 20, 62);
    doc.setFontSize(12); doc.setTextColor(40, 40, 50); doc.text('Services:', 20, 78);
    const tgt = generated.services || services;
    tgt.forEach((s, i) => {
      doc.setFontSize(11); doc.setTextColor(90, 90, 100);
      doc.text(`• ${s.name}`, 24, 88 + i * 10);
      doc.text(`Rs. ${Number(s.amount).toLocaleString()}`, 150, 88 + i * 10, { align: 'right' });
    });
    const y = 98 + tgt.length * 10;
    doc.setDrawColor(200, 210, 200); doc.line(20, y - 4, 190, y - 4);
    doc.setFontSize(14); doc.setTextColor(44, 74, 62);
    doc.text(`Total: Rs. ${Number(generated.totalAmount || total).toLocaleString()}`, 20, y + 6);
    doc.save(`Invoice_${generated.invoiceNo}.pdf`);
    toast.success('PDF downloaded!');
  };

  if (!customer) return (
    <Layout>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-muted)', padding: 40 }}>
        <div className="spin" style={{ width: 15, height: 15, border: '2px solid var(--border-dark)', borderTopColor: 'var(--primary)', borderRadius: '50%' }} />
        Loading customer…
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em' }}>Generate Invoice</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 4, fontSize: 13 }}>
          For: <strong style={{ color: 'var(--text)' }}>{customer.name}</strong> · {customer.company}
        </p>
      </div>

      <div style={{ maxWidth: 560 }}>
        {/* Customer strip */}
        <div style={{
          background: 'var(--primary)', borderRadius: 'var(--radius-lg)',
          padding: '14px 18px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 4px 14px rgba(44,74,62,0.22)',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 800, color: '#fff',
          }}>
            {customer.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{customer.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>{customer.company} · {customer.service}</div>
          </div>
        </div>

        {/* Service items */}
        <div style={{
          background: 'var(--bg)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '22px 24px', marginBottom: 14,
          boxShadow: 'var(--shadow-xs)',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>Service Line Items</div>
          {services.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              <input className="input-field" placeholder="Service name" value={s.name}
                onChange={e => updateService(i, 'name', e.target.value)} style={{ flex: 2 }} />
              <input className="input-field" type="number" placeholder="Amount (PKR)" value={s.amount}
                onChange={e => updateService(i, 'amount', e.target.value)} style={{ flex: 1 }} />
              {services.length > 1 && (
                <button className="btn-ghost" onClick={() => removeService(i)}
                  style={{ padding: '7px', color: 'var(--danger)', flexShrink: 0 }}>
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          <button onClick={addService} style={{
            width: '100%', padding: '8px', marginTop: 6,
            background: 'transparent', border: '1.5px dashed var(--border-dark)',
            borderRadius: 'var(--radius)', cursor: 'pointer',
            color: 'var(--text-muted)', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            transition: 'background 0.15s, color 0.15s, border-color 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-soft)'; e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-dark)'; }}
          >
            <Plus size={13} strokeWidth={2.5} /> Add Line Item
          </button>
        </div>

        {/* Total */}
        <div style={{
          background: 'var(--primary-soft)', border: '1px solid #c8ddd5',
          borderRadius: 'var(--radius-lg)', padding: '14px 20px', marginBottom: 18,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>Total</span>
          <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em' }}>
            ₨ {total.toLocaleString()}
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-primary" onClick={handleGenerate}
            disabled={loading || !!generated} style={{ flex: 1, justifyContent: 'center', padding: '10px' }}>
            {loading ? 'Generating…' : generated ? '✓ Generated' : 'Generate Invoice'}
          </button>
          {generated && (
            <button className="btn-secondary" onClick={downloadPDF} style={{ gap: 7 }}>
              <Download size={14} /> PDF
            </button>
          )}
          <button className="btn-secondary" onClick={() => router.push('/customers')}>Back</button>
        </div>

        {generated && (
          <div style={{
            marginTop: 14, padding: '11px 14px',
            background: 'var(--success-soft)', border: '1px solid #c8ddd5',
            borderRadius: 'var(--radius)', fontSize: 13, color: 'var(--success)',
            display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600,
          }}>
            <CheckCircle size={15} />
            Invoice <strong>{generated.invoiceNo}</strong> saved to database.
          </div>
        )}
      </div>
    </Layout>
  );
}
