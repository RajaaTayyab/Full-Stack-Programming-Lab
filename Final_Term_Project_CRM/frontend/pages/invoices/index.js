import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Download, FileText } from 'lucide-react';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    api.get('/invoices').then(({ data }) => setInvoices(data)).catch(() => toast.error('Failed to load invoices'));
  }, []);

  const downloadPDF = async (inv) => {
    try {
      const { default: jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      doc.setFontSize(22); doc.setTextColor(44, 74, 62);
      doc.text('Nexus CRM', 20, 25);
      doc.setFontSize(10); doc.setTextColor(120, 120, 120);
      doc.text('by Tayyab Janjua', 20, 31);
      doc.setFontSize(11); doc.setTextColor(60, 60, 70);
      doc.text(`Invoice No: ${inv.invoiceNo}`, 20, 46);
      doc.text(`Date: ${new Date(inv.date).toLocaleDateString()}`, 20, 54);
      doc.text(`Customer: ${inv.customerName}`, 20, 62);
      doc.setFontSize(12); doc.setTextColor(40, 40, 50);
      doc.text('Services:', 20, 78);
      inv.services.forEach((s, i) => {
        doc.setFontSize(11); doc.setTextColor(90, 90, 100);
        doc.text(`• ${s.name}`, 24, 88 + i * 10);
        doc.text(`Rs. ${Number(s.amount).toLocaleString()}`, 150, 88 + i * 10, { align: 'right' });
      });
      const y = 98 + inv.services.length * 10;
      doc.setDrawColor(200, 210, 200); doc.line(20, y - 4, 190, y - 4);
      doc.setFontSize(14); doc.setTextColor(44, 74, 62);
      doc.text(`Total: Rs. ${Number(inv.totalAmount).toLocaleString()}`, 20, y + 6);
      doc.save(`Invoice_${inv.invoiceNo}.pdf`);
      toast.success(`${inv.invoiceNo} downloaded!`);
    } catch { toast.error('PDF failed'); }
  };

  return (
    <Layout>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em' }}>Invoices</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 4, fontSize: 13 }}>
          Go to Customers → invoice icon to generate one
        </p>
      </div>

      {invoices.length === 0 ? (
        <div style={{
          background: 'var(--bg)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '60px 20px',
          textAlign: 'center', boxShadow: 'var(--shadow-xs)',
        }}>
          <div style={{ width: 52, height: 52, background: 'var(--primary-soft)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <FileText size={22} color="var(--primary)" strokeWidth={1.5} />
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>No invoices yet</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Generate your first invoice from the Customers page</div>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {['Invoice No', 'Customer', 'Services', 'Total (PKR)', 'Date', 'Action'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv._id}>
                  <td>
                    <span style={{
                      fontWeight: 700, color: 'var(--primary)',
                      background: 'var(--primary-soft)',
                      padding: '3px 9px', borderRadius: 6, fontSize: 12,
                      border: '1px solid #c8ddd5',
                    }}>
                      {inv.invoiceNo}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <div style={{
                        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                        background: 'var(--primary-soft)', border: '1.5px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 800, color: 'var(--primary)',
                      }}>
                        {inv.customerName.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--text)' }}>{inv.customerName}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{inv.services.map(s => s.name).join(', ')}</td>
                  <td style={{ fontWeight: 700, color: 'var(--text)' }}>₨ {inv.totalAmount.toLocaleString()}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{new Date(inv.date).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => downloadPDF(inv)} className="btn-secondary" style={{ padding: '6px 14px', fontSize: 12, gap: 6 }}>
                      <Download size={13} /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
