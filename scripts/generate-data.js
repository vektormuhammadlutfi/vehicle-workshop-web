const fs = require('fs');

const branches = [
  'SERUI GENERAL REPAIR',
  'JAKARTA SERVICE CENTER',
  'BANDUNG WORKSHOP',
  'SURABAYA REPAIR STATION',
  'MEDAN MAINTENANCE CENTER'
];

const advisors = [
  'ERWIN WIJAYA',
  'BUDI SANTOSO',
  'AHMAD RAHMAN',
  'SITI AMINAH',
  'JOHN DOE'
];

const technicians = [
  'MUJI FIORAN',
  'CHRISTIAN',
  'DEDI KURNIAWAN',
  'RUDI HARTONO',
  'JAMES WILSON'
];

const statuses = ['Invoice', 'Settlement', 'In Progress', 'Pending'];

function generateWorkOrderNo() {
  const year = Math.floor(Math.random() * (24 - 20 + 1)) + 20;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const sequence = String(Math.floor(Math.random() * 99999)).padStart(5, '0');
  return `20102/SWO/${year}/${month}/${sequence}`;
}

function generateServiceInvoice() {
  const year = Math.floor(Math.random() * (25 - 20 + 1)) + 20;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const sequence = String(Math.floor(Math.random() * 99999)).padStart(5, '0');
  return `20102/INV/${year}/${month}/${sequence}`;
}

function generateVehicleUnit() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const regions = ['DD', 'B', 'L', 'W', 'BK'];
  const region = regions[Math.floor(Math.random() * regions.length)];
  const numbers = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
  const suffix = letters[Math.floor(Math.random() * letters.length)] + 
                letters[Math.floor(Math.random() * letters.length)];
  return `${region}${numbers}${suffix}`;
}

function generateFrameSerialNo() {
  const prefix = ['MH1', 'MK2', 'JH4', 'WDB'];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let serial = prefix[Math.floor(Math.random() * prefix.length)];
  for (let i = 0; i < 12; i++) {
    serial += chars[Math.floor(Math.random() * chars.length)];
  }
  return serial;
}

function generateRandomDate(start, end) {
  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();
  const randomDate = new Date(startDate + Math.random() * (endDate - startDate));
  return randomDate.toISOString().split('T')[0];
}

function generateWorkOrders(count) {
  const workorders = [];
  
  for (let i = 1; i <= count; i++) {
    const workOrderDate = generateRandomDate('2024-01-01', '2024-12-31');
    const invoiceDate = generateRandomDate(workOrderDate, '2025-12-31');
    
    workorders.push({
      id: i,
      branch: branches[Math.floor(Math.random() * branches.length)],
      workOrderNo: generateWorkOrderNo(),
      workOrderDate,
      serviceInvoice: generateServiceInvoice(),
      invoiceDate,
      vehicleUnit: generateVehicleUnit(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      serviceAdvisor: advisors[Math.floor(Math.random() * advisors.length)],
      technician: technicians[Math.floor(Math.random() * technicians.length)],
      frameSerialNo: generateFrameSerialNo()
    });
  }

  return workorders;
}

const data = {
  workorders: generateWorkOrders(100)
};

fs.writeFileSync('data/db.json', JSON.stringify(data, null, 2));
console.log('Generated 100 work orders in data/db.json');
