import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    api.get('/invoices')
      .then(({ data }) => setInvoices(data))
      .catch(() => toast.error('Failed to load invoices'));
  }, []);

  // PDF Generator Engine mapped directly to your Sage & Alabaster theme
  const downloadPDF = async (inv) => {
    try {
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
      doc.text(`Invoice No: ${inv.invoiceNo}`, 20, 46);
      doc.text(`Date: ${new Date(inv.date).toLocaleDateString()}`, 20, 54);
      doc.text(`Customer Reference: ${inv.customerName}`, 20, 62);
      
      // Items Subheading Table Header Layout
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 50);
      doc.text('Billed Service Items & Records:', 20, 78);
      
      // Dynamic List Array Rendering
      inv.services.forEach((s, i) => {
        doc.setFontSize(11);
        doc.setTextColor(90, 90, 100);
        doc.text(`• ${s.name}`, 24, 88 + i * 10);
        doc.text(`₨ ${Number(s.amount).toLocaleString()}`, 150, 88 + i * 10, { align: 'right' });
      });
      
      const yLinePosition = 98 + inv.services.length * 10;
      doc.setDrawColor(220, 225, 220);
      doc.line(20, yLinePosition - 4, 190, yLinePosition - 4);
      
      // Aggregated Values Panel Section
      doc.setFontSize(14);
      doc.setTextColor(63, 102, 85);
      doc.text(`Total Balanced Amount: ₨ ${Number(inv.totalAmount).toLocaleString()}`, 20, yLinePosition + 6);
      
      // Complete file output deployment
      doc.save(`Invoice_${inv.invoiceNo}.pdf`);
      toast.success(`PDF for ${inv.invoiceNo} downloaded!`);
    } catch (err) {
      console.error(err);
      toast.error('Could not generate PDF download');
    }
  };

  return (
    <Layout>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', marginBottom: 8, letterSpacing: '-0.02em' }}>Invoices</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Go to Customers → click Invoice to generate one</p>
      
      <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.01)' }}>
              {['Invoice No', 'Customer', 'Services', 'Total (PKR)', 'Date', 'Action'].map(h => (
                <th key={h} style={{ padding: '16px', textAlign: 'left', color: 'var(--text-muted)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>No invoices saved yet</td>
              </tr>
            ) : invoices.map(inv => (
              <tr key={inv._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="table-row-hover">
                <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 600 }}>{inv.invoiceNo}</td>
                <td style={{ padding: '16px', color: 'var(--text)', fontWeight: 500 }}>{inv.customerName}</td>
                <td style={{ padding: '16px', color: 'var(--text-muted)' }}>
                  {inv.services.map(s => s.name).join(', ')}
                </td>
                <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 600 }}>
                  ₨ {inv.totalAmount.toLocaleString()}
                </td>
                <td style={{ padding: '16px', color: 'var(--text-muted)' }}>
                  {new Date(inv.date).toLocaleDateString()}
                </td>
                <td style={{ padding: '16px' }}>
                  <button 
                    onClick={() => downloadPDF(inv)}
                    className="btn-secondary"
                    style={{ 
                      padding: '6px 12px', 
                      fontSize: 12, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 6,
                      borderColor: 'var(--border)'
                    }}
                  >
                    📥 PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}