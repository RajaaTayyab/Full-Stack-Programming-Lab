require('dotenv').config();
const mongoose = require('mongoose');
const Customer = require('./models/Customer');

const SEED_USER_ID = 'Janjua-1780507795134'; // cclsopy from MongoDB after registering

const customers = [
  { name: 'Tayyab Janjua', email: 'tayyab@gmail.com', phone: '0301-1111111', company: 'TechPk', status: 'Active' },
  { name: 'Bilal Zaheer', email: 'bilal@corp.com', phone: '0302-2222222', company: 'SoftHouse', status: 'Lead' },
  { name: 'Hassan Raza', email: 'hassan@startup.io', phone: '0303-3333333', company: 'Startup.io', status: 'Active' },
  { name: 'Omer Farooq', email: 'omer@agency.pk', phone: '0304-4444444', company: 'Agency PK', status: 'Inactive' },
  { name: 'Ahad Malik', email: 'ahad@designlab.com', phone: '0305-5555555', company: 'DesignLab', status: 'Lead' },
  { name: 'Hamza Javed', email: 'hamza@firm.com', phone: '0306-6666666', company: 'ConsultFirm', status: 'Active' },
  { name: 'Basit Junaid', email: 'basit@zara.pk', phone: '0307-7777777', company: 'ZaraStudio', status: 'Lead' },
  { name: 'Ali Khan', email: 'ali@dev.io', phone: '0308-8888888', company: 'DevHub', status: 'Active' },
  { name: 'Zainab Malik', email: 'zainab@media.com', phone: '0309-9999999', company: 'MediaCo', status: 'Inactive' },
  { name: 'Ayesha Baig', email: 'ayesha@trade.pk', phone: '0310-1010101', company: 'TradeNet', status: 'Active' },
  { name: 'Nadia Farooq', email: 'nadia@ngo.org', phone: '0311-1111222', company: 'HopeNGO', status: 'Lead' },
  { name: 'Eman Sohail', email: 'eman@ts.com', phone: '0312-3334444', company: 'TS Group', status: 'Active' },
  { name: 'Laiba Qureshi', email: 'amina@edu.pk', phone: '0313-5556666', company: 'EduPak', status: 'Inactive' },
  { name: 'Javeria Khalid', email: 'rehan@rktech.io', phone: '0314-7778888', company: 'RK Tech', status: 'Lead' },
  { name: 'Amal Javed', email: 'sobia@sj.pk', phone: '0315-9990000', company: 'SJ Ventures', status: 'Active' },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Customer.deleteMany({});
  await Customer.insertMany(customers.map(c => ({ ...c, createdBy: SEED_USER_ID })));
  console.log('15 customers seeded!');
  process.exit();
});