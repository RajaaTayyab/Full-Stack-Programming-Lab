const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection;

    // Drop collections directly
    try { await db.collection('users').drop(); } catch(e) {}
    try { await db.collection('customers').drop(); } catch(e) {}
    console.log('Cleared existing data');

    // Hash password manually
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Insert admin directly into collection (bypasses all hooks)
    await db.collection('users').insertOne({
      name: 'Admin User',
      email: 'admin@nexuscrm.pk',
      password: hashedPassword,
      createdAt: new Date()
    });
    console.log('Admin created → email: admin@nexuscrm.pk | password: admin123');

    // Insert all 15 customers directly
    await db.collection('customers').insertMany([
      { name: 'Tayyab Janjua',      email: 'ahmed.raza@techcorp.pk',    phone: '0301-1234567', company: 'TechCorp PK',     status: 'Active',   service: 'Web Development',     value: 150000, notes: 'Long-term client',           createdAt: new Date() },
      { name: 'Sara Khan',       email: 'sara.khan@digitalhub.io',   phone: '0312-2345678', company: 'Digital Hub',     status: 'Lead',     service: 'SEO Services',        value: 45000,  notes: 'Interested in monthly plan', createdAt: new Date() },
      { name: 'Bilal Khan',   email: 'bilal@cloudnine.pk',        phone: '0333-3456789', company: 'Cloud Nine',      status: 'Active',   service: 'Cloud Hosting',       value: 80000,  notes: 'Renewal due in July',        createdAt: new Date() },
      { name: 'Ayesha Siddiqui', email: 'ayesha@fashionpk.com',      phone: '0321-4567890', company: 'FashionPK',       status: 'Inactive', service: 'E-commerce Setup',    value: 200000, notes: 'Project on hold',            createdAt: new Date() },
      { name: 'Usman Tariq',     email: 'usman@buildpro.pk',         phone: '0345-5678901', company: 'BuildPro',        status: 'Active',   service: 'CRM Integration',     value: 120000, notes: 'VIP client',                 createdAt: new Date() },
      { name: 'Zara Mirza',      email: 'zara@mediaplus.io',         phone: '0311-6789012', company: 'Media Plus',      status: 'Lead',     service: 'Social Media Mgmt',   value: 35000,  notes: 'Meeting scheduled',          createdAt: new Date() },
      { name: 'Hamza Khan',       email: 'hamza@fintech360.pk',       phone: '0322-7890123', company: 'FinTech 360',     status: 'Active',   service: 'Mobile App Dev',      value: 300000, notes: 'Phase 2 starting',           createdAt: new Date() },
      { name: 'Nadia Sheikh',    email: 'nadia@edulearn.com',        phone: '0334-8901234', company: 'EduLearn',        status: 'Lead',     service: 'LMS Development',     value: 90000,  notes: 'Proposal sent',              createdAt: new Date() },
      { name: 'Faisal Qureshi',  email: 'faisal@retailmax.pk',       phone: '0344-9012345', company: 'RetailMax',       status: 'Active',   service: 'POS System',          value: 175000, notes: '3 branches',                 createdAt: new Date() },
      { name: 'Mariam Javed',    email: 'mariam@healthplus.io',      phone: '0315-0123456', company: 'HealthPlus',      status: 'Inactive', service: 'Healthcare Portal',   value: 250000, notes: 'Budget constraints',         createdAt: new Date() },
      { name: 'Kashif Nawaz',    email: 'kashif@logisticspk.com',    phone: '0336-1234560', company: 'Logistics PK',    status: 'Active',   service: 'Tracking System',     value: 140000, notes: 'Happy client',               createdAt: new Date() },
      { name: 'Sana Riaz',       email: 'sana@startuplab.io',        phone: '0347-2345671', company: 'Startup Lab',     status: 'Lead',     service: 'MVP Development',     value: 60000,  notes: 'Startup discount applied',   createdAt: new Date() },
      { name: 'Tariq Hassan',    email: 'tariq@exporters.pk',        phone: '0323-3456782', company: 'Exporters PK',    status: 'Active',   service: 'ERP Integration',     value: 380000, notes: 'Largest account',            createdAt: new Date() },
      { name: 'Hira Ajmal',       email: 'hira@creativestudio.pk',    phone: '0352-4567893', company: 'Creative Studio', status: 'Lead',     service: 'UI/UX Design',        value: 55000,  notes: 'Portfolio review done',      createdAt: new Date() },
      { name: 'Omar Farooq',     email: 'omar@securetech.io',        phone: '0317-5678904', company: 'SecureTech',      status: 'Active',   service: 'Cybersecurity Audit', value: 220000, notes: 'Annual contract',            createdAt: new Date() }
    ]);
    console.log('15 customers seeded successfully');

    console.log('\n✅ Database seeded! You can now log in.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();