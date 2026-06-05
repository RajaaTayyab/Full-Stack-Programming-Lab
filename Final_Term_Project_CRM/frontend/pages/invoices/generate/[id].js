import { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import api from '../../../utils/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function GenerateInvoice() {
  const [customer, setCustomer] = useState(null);
  const [services, setServices] = useState([{ name: '', amount: '' }]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) api.get(`/customers/${id}`).then(({ data }) => setCustomer(data));
  }, [id]);

  const addService = () => setServices([...services, { name: '', amount: '' }]);
  const removeService = (i) => setServices(services.filter((_, idx) => idx !== i));
  const updateService = (i, field, val) => {
    const updated = [...services];
    updated[i][field] = val;
    setServices(updated);
  };

  const total = services.reduce((s, sv) => s + (Number(sv.amount) || 0), 0);

  const handleGenerate = async () => {
    if (services.some(s => !s.name || !s.amount)) { 
      toast.error('Fill all service fields'); 
      return; 
    }
    setLoading(true);
    try {
      // Structure payload clearly for backend route handler compatibility
      const formattedServices = services.map(s => ({
        name: s.name,
        amount: Number(s.amount)
      }));

      const { data } = await api.post('/invoices', { 
        customerId: id, 
        services: formattedServices 
      });
      
      setGenerated(data);
      toast.success('Invoice generated successfully! 🧾');
    } catch {
      toast.error('Failed to generate invoice');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    const { default: jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    // Header Block - Nexum Premium Brand Identity Tuning
    doc.setFontSize(22);
    doc.setTextColor(63, 102, 85); // Sage Organic Deep Green
    doc.text('Nexum CRM', 20, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.text('by Tayyab Janjua', 20, 31);
    
    // Meta Blueprint Section
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 70);
    doc.text(`Invoice No: ${generated.invoiceNo || 'INV-' + Math.floor(Math.random() * 90000)}`, 20, 46);
    doc.text(`Date: ${new Date(generated.date || Date.now()).toLocaleDateString()}`, 20, 54);
    doc.text(`Customer Reference: ${customer.name} (${customer.company || 'Private Entity'})`, 20, 62);
    
    // Items Subheading Table Header Layout
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 50);
    doc.text('Billed Service Items & Records:', 20, 78);
    
    // Dynamic List Array Rendering
    const targetServices = generated.services || services;
    targetServices.forEach((s, i) => {
      doc.setFontSize(11);
      doc.setTextColor(90, 90, 100);
      doc.text(`• ${s.name}`, 24, 88 + i * 10);
      doc.text(`₨ ${Number(s.amount).toLocaleString()}`, 150, 88 + i * 10, { align: 'right' });
    });
    
    const yLinePosition = 98 + targetServices.length * 10;
    doc.setDrawColor(220, 225, 220);
    doc.line(20, yLinePosition - 4, 190, yLinePosition - 4);
    
    // Aggregated Values Panel Section
    doc.setFontSize(14);
    doc.setTextColor(63, 102, 85);
    doc.text(`Total Balanced Amount: ₨ ${Number(generated.totalAmount || total).toLocaleString()}`, 20, yLinePosition + 6);
    
    // Complete file output deployment
    doc.save(`Invoice_${generated.invoiceNo || 'Draft'}.pdf`);
    toast.success('PDF document downloaded!');
  };

  if (!customer) return <Layout><p style={{ color:'var(--text-muted)' }}>Loading records...</p></Layout>;

  return (
    <Layout>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>Generate Invoice</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>For: <strong style={{ color: 'var(--text)' }}>{customer.name}</strong> — {customer.company}</p>
      
      <div className="card" style={{ maxWidth: 580, padding: '32px' }}>
        {services.map((s, i) => (
          <div key={i} style={{ display:'flex', gap:10, marginBottom:12, alignItems:'center' }}>
            <input className="input-field" placeholder="Service name" value={s.name}
              onChange={e => updateService(i, 'name', e.target.value)} style={{ flex:2 }} />
            <input className="input-field" type="number" placeholder="Amount PKR" value={s.amount}
              onChange={e => updateService(i, 'amount', e.target.value)} style={{ flex:1 }} />
            {services.length > 1 && (
              <button className="btn-ghost" onClick={() => removeService(i)} style={{ color: 'var(--danger)', padding: '8px 12px' }}>✕</button>
            )}
          </div>
        ))}
        
        <button className="btn-ghost" onClick={addService} style={{ marginBottom: 24, border: '1px dashed var(--border)', width: '100%', justifyContent: 'center' }}>
          + Add Service Line Item
        </button>
        
        <div style={{ padding:'16px', background:'rgba(63, 102, 85, 0.06)', borderRadius:'var(--radius)', marginBottom:24, display:'flex', justifyContent:'space-between', alignItems: 'center' }}>
          <span style={{ color:'var(--text-muted)', fontSize: 13, fontWeight: 500 }}>Total Calculated Amount</span>
          <span style={{ color:'var(--primary)', fontWeight:700, fontSize:20 }}>₨ {total.toLocaleString()}</span>
        </div>
        
        <div style={{ display:'flex', gap:12 }}>
          <button className="btn-primary" onClick={handleGenerate} disabled={loading || !!generated}>
            {loading ? 'Generating Module...' : generated ? 'Generated ✓' : 'Generate Invoice'}
          </button>
          
          {generated && (
            <button className="btn-primary" onClick={downloadPDF} style={{ background: 'var(--primary)' }}>
              ⬇ Download PDF Document
            </button>
          )}
          <button className="btn-secondary" onClick={() => router.push('/customers')}>Back</button>
        </div>
        
        {generated && (
          <div style={{ marginTop:20, padding:16, background:'rgba(63, 102, 85, 0.08)', border: '1px solid var(--border)', borderRadius:'var(--radius)', fontSize:13, color:'var(--primary)' }}>
            ✅ Invoice <strong style={{ fontWeight: 700 }}>{generated.invoiceNo}</strong> has been saved directly to your MongoDB cluster instance.
          </div>
        )}
      </div>
    </Layout>
  );
}