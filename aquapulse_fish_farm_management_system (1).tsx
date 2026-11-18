import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LayoutDashboard,
  Waves,
  Fish,
  Utensils,
  Droplets,
  HeartPulse,
  Package,
  Scale,
  BadgeDollarSign,
  Receipt,
  BarChart3,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Bell,
  Menu,
  X,
  RotateCcw,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  MapPin,
  Thermometer,
  Activity,
  ShieldAlert,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  RefreshCw,
  Check,
  Lock,
  Mail,
  LogOut,
  EyeOff,
  ArrowRight
} from 'lucide-react';

// ============================================================================
// INITIAL REALISTIC AQUACULTURE SAMPLE DATA
// ============================================================================

const INITIAL_DATA = {
  ponds: [
    {
      id: 'P-101',
      name: 'North Sector Pond A1',
      size: 2500,
      sizeUnit: 'sq.m',
      capacity: 15000,
      location: 'North Sector - Zone 1',
      waterSource: 'Canal & Borewell',
      status: 'Active',
      depth: '1.8m',
      notes: 'Equipped with 2 paddlewheel aerators.'
    },
    {
      id: 'P-102',
      name: 'Godavari Grow-Out B2',
      size: 3200,
      sizeUnit: 'sq.m',
      capacity: 20000,
      location: 'East Sector - Zone 2',
      waterSource: 'River Intake',
      status: 'Active',
      depth: '2.1m',
      notes: 'Primary polyculture grow-out pond.'
    },
    {
      id: 'P-103',
      name: 'Emerald Nursery C1',
      size: 1200,
      sizeUnit: 'sq.m',
      capacity: 25000,
      location: 'Central Nursery Hub',
      waterSource: 'Filtered Borewell',
      status: 'Active',
      depth: '1.4m',
      notes: 'Fine mesh netting for fingerling protection.'
    },
    {
      id: 'P-104',
      name: 'Delta Harvest Basin D1',
      size: 2800,
      sizeUnit: 'sq.m',
      capacity: 16000,
      location: 'South Sector - Zone 3',
      waterSource: 'Canal',
      status: 'Harvesting',
      depth: '1.9m',
      notes: 'Scheduled for partial commercial harvest this week.'
    },
    {
      id: 'P-105',
      name: 'Bluewater Biofloc E2',
      size: 950,
      sizeUnit: 'sq.m',
      capacity: 12000,
      location: 'West Bio-Tech Wing',
      waterSource: 'RAS / Borewell',
      status: 'Maintenance',
      depth: '1.6m',
      notes: 'Liner inspection and liming in progress.'
    }
  ],
  batches: [
    {
      id: 'B-2026-01',
      batchCode: 'ROH-A1-01',
      species: 'Rohu (Labeo rohita)',
      pondId: 'P-101',
      initialQty: 8500,
      currentQty: 8120,
      stockingDate: '2026-06-15',
      avgWeightGrams: 680,
      status: 'Growing'
    },
    {
      id: 'B-2026-02',
      batchCode: 'CAT-B2-02',
      species: 'Catla (Catla catla)',
      pondId: 'P-102',
      initialQty: 6000,
      currentQty: 5790,
      stockingDate: '2026-05-20',
      avgWeightGrams: 920,
      status: 'Growing'
    },
    {
      id: 'B-2026-03',
      batchCode: 'TIL-C1-03',
      species: 'GIFT Tilapia',
      pondId: 'P-103',
      initialQty: 14000,
      currentQty: 13450,
      stockingDate: '2026-09-02',
      avgWeightGrams: 210,
      status: 'Nursery'
    },
    {
      id: 'B-2026-04',
      batchCode: 'CRP-D1-04',
      species: 'Common Carp',
      pondId: 'P-104',
      initialQty: 7500,
      currentQty: 6850,
      stockingDate: '2026-04-10',
      avgWeightGrams: 1150,
      status: 'Ready for Harvest'
    },
    {
      id: 'B-2026-05',
      batchCode: 'PAN-A1-05',
      species: 'Pangasius',
      pondId: 'P-101',
      initialQty: 4000,
      currentQty: 3890,
      stockingDate: '2026-07-12',
      avgWeightGrams: 540,
      status: 'Growing'
    }
  ],
  feedings: [
    {
      id: 'FD-01',
      dateTime: '2026-11-18 07:30',
      pondId: 'P-101',
      batchCode: 'ROH-A1-01',
      feedType: 'Floating Grower Pellets (32% Protein)',
      quantityKg: 85,
      frequency: 'Morning (1/3)',
      status: 'Completed',
      notes: 'Strong surface feeding response.'
    },
    {
      id: 'FD-02',
      dateTime: '2026-11-18 08:00',
      pondId: 'P-102',
      batchCode: 'CAT-B2-02',
      feedType: 'Floating Grower Pellets (32% Protein)',
      quantityKg: 95,
      frequency: 'Morning (1/3)',
      status: 'Completed',
      notes: 'Normal appetite, water temp 27.5°C.'
    },
    {
      id: 'FD-03',
      dateTime: '2026-11-18 13:00',
      pondId: 'P-103',
      batchCode: 'TIL-C1-03',
      feedType: 'Fingerling Crumble Starter (36% Protein)',
      quantityKg: 42,
      frequency: 'Midday (2/3)',
      status: 'Completed',
      notes: 'Even distribution across feeding rings.'
    },
    {
      id: 'FD-04',
      dateTime: '2026-11-18 17:30',
      pondId: 'P-101',
      batchCode: 'ROH-A1-01',
      feedType: 'Floating Grower Pellets (32% Protein)',
      quantityKg: 85,
      frequency: 'Evening (3/3)',
      status: 'Scheduled',
      notes: 'Evening ration before dusk.'
    },
    {
      id: 'FD-05',
      dateTime: '2026-11-18 18:00',
      pondId: 'P-104',
      batchCode: 'CRP-D1-04',
      feedType: 'Sinking Carp Feed (28% Protein)',
      quantityKg: 60,
      frequency: 'Evening (2/2)',
      status: 'Scheduled',
      notes: 'Reduced ration prior to harvest.'
    }
  ],
  waterLogs: [
    {
      id: 'WQ-01',
      pondId: 'P-101',
      recordedAt: '2026-11-18 06:45',
      temperature: 27.4,
      ph: 7.6,
      dissolvedOxygen: 6.2,
      ammonia: 0.02,
      turbidity: '32 cm (Optimal)'
    },
    {
      id: 'WQ-02',
      pondId: 'P-102',
      recordedAt: '2026-11-18 07:00',
      temperature: 28.1,
      ph: 7.9,
      dissolvedOxygen: 4.1,
      ammonia: 0.04,
      turbidity: '26 cm (Slightly High)'
    },
    {
      id: 'WQ-03',
      pondId: 'P-103',
      recordedAt: '2026-11-18 07:15',
      temperature: 26.8,
      ph: 7.4,
      dissolvedOxygen: 6.8,
      ammonia: 0.01,
      turbidity: '38 cm (Clear)'
    },
    {
      id: 'WQ-04',
      pondId: 'P-104',
      recordedAt: '2026-11-18 07:30',
      temperature: 28.9,
      ph: 8.4,
      dissolvedOxygen: 5.1,
      ammonia: 0.07,
      turbidity: '22 cm (Dense)'
    }
  ],
  healthRecords: [
    {
      id: 'HL-01',
      date: '2026-11-14',
      pondId: 'P-102',
      batchId: 'B-2026-02',
      issueType: 'Argulus (Fish Lice) Parasite',
      symptoms: 'Flashing against pond banks, minor scale irritation.',
      mortalityCount: 18,
      treatment: 'Cypermethrin Aqua-Safe Bath + Probiotic',
      dosage: '150 ml per acre',
      status: 'Under Treatment',
      notes: 'Follow-up scraping scheduled in 4 days.'
    },
    {
      id: 'HL-02',
      date: '2026-11-05',
      pondId: 'P-101',
      batchId: 'B-2026-01',
      issueType: 'Mild Fin Rot (Bacterial)',
      symptoms: 'Frayed caudal fin edges on 3% of sampled fish.',
      mortalityCount: 12,
      treatment: 'Oxytetracycline Medicated Feed + Vitamin C',
      dosage: '50 mg/kg biomass for 5 days',
      status: 'Recovered',
      notes: 'Complete recovery observed; normal feeding resumed.'
    },
    {
      id: 'HL-03',
      date: '2026-11-17',
      pondId: 'P-104',
      batchId: 'B-2026-04',
      issueType: 'Low DO Stress (Early Morning)',
      symptoms: 'Surface gasping at 05:30 AM before aerators kicked in.',
      mortalityCount: 9,
      treatment: 'Emergency Oxygen Tablets + Water Exchange (15%)',
      dosage: '2 kg/acre Sodium Percarbonate',
      status: 'Recovered',
      notes: 'Backup generator timer recalibrated.'
    }
  ],
  inventory: [
    {
      id: 'INV-01',
      name: 'Floating Grower Pellets (32% Protein)',
      category: 'Fish Feed',
      quantity: 1450,
      unit: 'kg',
      reorderLevel: 600,
      unitCost: 1.15,
      supplier: 'Avanti Aqua Feeds Ltd.'
    },
    {
      id: 'INV-02',
      name: 'Fingerling Crumble Starter (36% Protein)',
      category: 'Fish Feed',
      quantity: 220,
      unit: 'kg',
      reorderLevel: 300,
      unitCost: 1.45,
      supplier: 'Growel Formulations'
    },
    {
      id: 'INV-03',
      name: 'Sinking Carp Feed (28% Protein)',
      category: 'Fish Feed',
      quantity: 980,
      unit: 'kg',
      reorderLevel: 500,
      unitCost: 0.95,
      supplier: 'Avanti Aqua Feeds Ltd.'
    },
    {
      id: 'INV-04',
      name: 'Pond Probiotic & Zeolite Granules',
      category: 'Medicines & Probiotics',
      quantity: 45,
      unit: 'kg',
      reorderLevel: 50,
      unitCost: 4.80,
      supplier: 'Biostadt Aquaculture'
    },
    {
      id: 'INV-05',
      name: 'Sodium Percarbonate (Oxygen Tabs)',
      category: 'Medicines & Probiotics',
      quantity: 80,
      unit: 'kg',
      reorderLevel: 30,
      unitCost: 3.50,
      supplier: 'Neospark Healthcare'
    },
    {
      id: 'INV-06',
      name: 'Dissolved Oxygen Digital Meter Probes',
      category: 'Equipment',
      quantity: 4,
      unit: 'units',
      reorderLevel: 2,
      unitCost: 145.00,
      supplier: 'Hanna Instruments'
    }
  ],
  harvests: [
    {
      id: 'HV-01',
      date: '2026-11-12',
      pondId: 'P-104',
      batchId: 'B-2026-04',
      species: 'Common Carp',
      harvestType: 'Partial',
      quantityFish: 620,
      totalWeightKg: 713,
      avgWeightGrams: 1150,
      destination: 'Metro Fresh Wholesale Cold Chain'
    },
    {
      id: 'HV-02',
      date: '2026-10-28',
      pondId: 'P-102',
      batchId: 'B-2026-02',
      species: 'Catla (Catla catla)',
      harvestType: 'Partial',
      quantityFish: 450,
      totalWeightKg: 405,
      avgWeightGrams: 900,
      destination: 'Coastal Seafood Exports'
    },
    {
      id: 'HV-03',
      date: '2026-10-14',
      pondId: 'P-101',
      batchId: 'B-2026-01',
      species: 'Rohu (Labeo rohita)',
      harvestType: 'Partial',
      quantityFish: 510,
      totalWeightKg: 340,
      avgWeightGrams: 667,
      destination: 'Local Regional Fish Market'
    }
  ],
  customers: [
    {
      id: 'CUST-01',
      name: 'Rajeshwari Marine & Fresh Traders',
      contactPerson: 'Suresh Babu',
      phone: '+91 98480 22190',
      email: 'orders@rajeshwarifish.in',
      address: 'Wholesale Fish Market, Vijayawada',
      type: 'Wholesale Distributor'
    },
    {
      id: 'CUST-02',
      name: 'BlueOcean Cold Chain Exports',
      contactPerson: 'Ananya Sharma',
      phone: '+91 99123 77410',
      email: 'procurement@blueoceanexports.com',
      address: 'Port Area, Visakhapatnam',
      type: 'Processor & Exporter'
    },
    {
      id: 'CUST-03',
      name: 'GreenBasket Supermarkets',
      contactPerson: 'Vikram Reddy',
      phone: '+91 97011 45890',
      email: 'fresh@greenbasket.co.in',
      address: 'Guntur & Amaravati Hubs',
      type: 'Retail Chain'
    },
    {
      id: 'CUST-04',
      name: 'Kaveri Hotel & Catering Group',
      contactPerson: 'Meena Kumari',
      phone: '+91 94401 88320',
      email: 'kitchen@kaverihotels.in',
      address: 'MG Road, Hyderabad',
      type: 'HoReCa'
    }
  ],
  sales: [
    {
      id: 'SL-2026-101',
      date: '2026-11-12',
      customerId: 'CUST-01',
      species: 'Common Carp',
      quantityKg: 713,
      pricePerKg: 3.40,
      totalAmount: 2424.20,
      paymentStatus: 'Paid',
      paymentMethod: 'Bank Transfer (NEFT)'
    },
    {
      id: 'SL-2026-102',
      date: '2026-10-28',
      customerId: 'CUST-02',
      species: 'Catla (Catla catla)',
      quantityKg: 405,
      pricePerKg: 3.80,
      totalAmount: 1539.00,
      paymentStatus: 'Paid',
      paymentMethod: 'UPI / Instant'
    },
    {
      id: 'SL-2026-103',
      date: '2026-10-14',
      customerId: 'CUST-03',
      species: 'Rohu (Labeo rohita)',
      quantityKg: 340,
      pricePerKg: 3.60,
      totalAmount: 1224.00,
      paymentStatus: 'Partial',
      paymentMethod: 'Cheque'
    },
    {
      id: 'SL-2026-104',
      date: '2026-09-25',
      customerId: 'CUST-04',
      species: 'GIFT Tilapia',
      quantityKg: 280,
      pricePerKg: 3.20,
      totalAmount: 896.00,
      paymentStatus: 'Pending',
      paymentMethod: 'Credit (15 Days)'
    },
    {
      id: 'SL-2026-105',
      date: '2026-08-19',
      customerId: 'CUST-02',
      species: 'Pangasius',
      quantityKg: 520,
      pricePerKg: 2.95,
      totalAmount: 1534.00,
      paymentStatus: 'Paid',
      paymentMethod: 'Bank Transfer (NEFT)'
    }
  ],
  expenses: [
    {
      id: 'EXP-01',
      date: '2026-11-10',
      category: 'Fish Feed',
      description: '2 Tons Floating Grower Pellets (32%)',
      amount: 2300.00,
      vendor: 'Avanti Aqua Feeds Ltd.',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'EXP-02',
      date: '2026-11-05',
      category: 'Labor & Wages',
      description: 'Monthly Farm Technicians & Feeding Staff Wages',
      amount: 1450.00,
      vendor: 'Internal Payroll',
      paymentMethod: 'Direct Deposit'
    },
    {
      id: 'EXP-03',
      date: '2026-11-02',
      category: 'Electricity & Fuel',
      description: 'Aerator Grid Power & Diesel Backup Fuel',
      amount: 480.00,
      vendor: 'APSPDCL & IndianOil',
      paymentMethod: 'Card'
    },
    {
      id: 'EXP-04',
      date: '2026-10-22',
      category: 'Medicines & Chemicals',
      description: 'Probiotics, Zeolite & Oxygen Tablets',
      amount: 340.00,
      vendor: 'Biostadt Aquaculture',
      paymentMethod: 'UPI'
    },
    {
      id: 'EXP-05',
      date: '2026-09-15',
      category: 'Fingerlings & Seed',
      description: '14,000 GIFT Tilapia Monosex Fry',
      amount: 720.00,
      vendor: 'State Hatchery Center',
      paymentMethod: 'Bank Transfer'
    }
  ],
  monthlyMetrics: [
    { month: 'Jun', harvestKg: 380, revenue: 1320, expenses: 980 },
    { month: 'Jul', harvestKg: 440, revenue: 1510, expenses: 1050 },
    { month: 'Aug', harvestKg: 520, revenue: 1534, expenses: 1120 },
    { month: 'Sep', harvestKg: 490, revenue: 1680, expenses: 1190 },
    { month: 'Oct', harvestKg: 745, revenue: 2763, expenses: 1580 },
    { month: 'Nov', harvestKg: 890, revenue: 3120, expenses: 1790 }
  ]
};

// ============================================================================
// UTILITY & HELPER FUNCTIONS
// ============================================================================

const formatCurrency = (val) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

const formatNumber = (val) => {
  return new Intl.NumberFormat('en-US').format(Number(val) || 0);
};

const evaluateWaterQuality = (log) => {
  const issues = [];
  let severity = 'Optimal';

  if (log.dissolvedOxygen < 4.5) {
    severity = 'Critical';
    issues.push(`Low DO (${log.dissolvedOxygen} mg/L)`);
  } else if (log.dissolvedOxygen < 5.2) {
    if (severity !== 'Critical') severity = 'Warning';
    issues.push(`Borderline DO (${log.dissolvedOxygen} mg/L)`);
  }

  if (log.ammonia > 0.08) {
    severity = 'Critical';
    issues.push(`Toxic Ammonia (${log.ammonia} mg/L)`);
  } else if (log.ammonia > 0.04) {
    if (severity !== 'Critical') severity = 'Warning';
    issues.push(`Elevated Ammonia (${log.ammonia} mg/L)`);
  }

  if (log.ph < 6.5 || log.ph > 8.6) {
    severity = 'Critical';
    issues.push(`Extreme pH (${log.ph})`);
  } else if (log.ph < 6.8 || log.ph > 8.3) {
    if (severity !== 'Critical') severity = 'Warning';
    issues.push(`pH Drift (${log.ph})`);
  }

  if (log.temperature < 20 || log.temperature > 33) {
    if (severity !== 'Critical') severity = 'Warning';
    issues.push(`Temp Stress (${log.temperature}°C)`);
  }

  return {
    status: severity,
    issues: issues.length > 0 ? issues.join(' • ') : 'All parameters within ideal aquaculture range'
  };
};

// ============================================================================
// REUSABLE UI COMPONENTS (Badges, Modal, Toast, Custom Charts)
// ============================================================================

const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Growing: 'bg-sky-100 text-sky-800 border-sky-200',
    Nursery: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'Ready for Harvest': 'bg-amber-100 text-amber-800 border-amber-200',
    Harvesting: 'bg-amber-100 text-amber-800 border-amber-200',
    Maintenance: 'bg-slate-200 text-slate-700 border-slate-300',
    Empty: 'bg-gray-100 text-gray-600 border-gray-200',
    Completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Scheduled: 'bg-sky-100 text-sky-800 border-sky-200',
    Optimal: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Warning: 'bg-amber-100 text-amber-800 border-amber-200',
    Critical: 'bg-rose-100 text-rose-800 border-rose-200',
    Recovered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Under Treatment': 'bg-amber-100 text-amber-800 border-amber-200',
    Paid: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Partial: 'bg-amber-100 text-amber-800 border-amber-200',
    Pending: 'bg-rose-100 text-rose-800 border-rose-200',
    Full: 'bg-sky-100 text-sky-800 border-sky-200'
  };

  const cls = styles[status] || 'bg-slate-100 text-slate-700 border-slate-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {status}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div
        className={`bg-white rounded-2xl shadow-2xl border border-slate-200 w-full ${maxWidth} max-h-[90vh] flex flex-col overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-sky-50 to-emerald-50/50">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border transition-all duration-300 ${
            toast.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : toast.type === 'warning'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}
        >
          {toast.type === 'error' ? (
            <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          ) : toast.type === 'warning' ? (
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-sm font-medium">{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

// Custom Responsive SVG Bar/Combo Chart for Revenue vs Expenses & Production
const RevenueExpenseChart = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const maxVal = Math.max(...data.map((d) => Math.max(d.revenue, d.expenses, d.harvestKg)), 100);
  const chartHeight = 220;

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-sky-600 inline-block"></span>
            Revenue ($)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block"></span>
            Harvest (kg)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-rose-400 inline-block"></span>
            Expenses ($)
          </span>
        </div>
        {hoveredIdx !== null && data[hoveredIdx] && (
          <div className="text-xs bg-slate-800 text-white px-3 py-1 rounded-full shadow-xs">
            <strong>{data[hoveredIdx].month}:</strong> Rev {formatCurrency(data[hoveredIdx].revenue)} • Exp{' '}
            {formatCurrency(data[hoveredIdx].expenses)} • Yield {data[hoveredIdx].harvestKg} kg
          </div>
        )}
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox={`0 0 ${data.length * 95 + 40} ${chartHeight + 40}`} className="w-full h-60 min-w-[440px]">
          {[0, 0.25, 0.5, 0.75, 1].map((tick, idx) => {
            const y = chartHeight - tick * (chartHeight - 20) + 10;
            return (
              <g key={idx}>
                <line x1="35" y1={y} x2={data.length * 95 + 30} y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                <text x="0" y={y + 4} fontSize="10" fill="#64748b">
                  {Math.round(maxVal * tick)}
                </text>
              </g>
            );
          })}

          {data.map((d, i) => {
            const groupX = 50 + i * 95;
            const revH = (d.revenue / maxVal) * (chartHeight - 20);
            const harvH = (d.harvestKg / maxVal) * (chartHeight - 20);
            const expH = (d.expenses / maxVal) * (chartHeight - 20);

            return (
              <g
                key={d.month}
                className="cursor-pointer transition-opacity"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {hoveredIdx === i && (
                  <rect
                    x={groupX - 8}
                    y={5}
                    width="76"
                    height={chartHeight + 10}
                    rx="8"
                    fill="#f1f5f9"
                  />
                )}
                {/* Revenue Bar */}
                <rect
                  x={groupX}
                  y={chartHeight + 10 - revH}
                  width="18"
                  height={Math.max(revH, 2)}
                  rx="4"
                  fill="#0284c7"
                />
                {/* Harvest Bar */}
                <rect
                  x={groupX + 22}
                  y={chartHeight + 10 - harvH}
                  width="18"
                  height={Math.max(harvH, 2)}
                  rx="4"
                  fill="#10b981"
                />
                {/* Expense Bar */}
                <rect
                  x={groupX + 44}
                  y={chartHeight + 10 - expH}
                  width="18"
                  height={Math.max(expH, 2)}
                  rx="4"
                  fill="#fb7185"
                />
                <text x={groupX + 31} y={chartHeight + 28} textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569">
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

// Custom SVG Donut Chart for Species / Expense Breakdown
const DonutChart = ({ items, valueSuffix = '' }) => {
  const colors = ['#0284c7', '#10b981', '#0ea5e9', '#14b8a6', '#f59e0b', '#6366f1'];
  const total = items.reduce((acc, item) => acc + item.value, 0);

  let cumulativePercent = 0;
  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  if (total === 0) {
    return <div className="text-center py-10 text-sm text-slate-400">No data available for chart</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative w-44 h-44 shrink-0">
        <svg viewBox="-1.1 -1.1 2.2 2.2" className="w-full h-full -rotate-90">
          {items.map((item, idx) => {
            const percent = item.value / total;
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += percent;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
            const largeArcFlag = percent > 0.5 ? 1 : 0;

            if (percent >= 0.999) {
              return <circle key={idx} cx="0" cy="0" r="1" fill={colors[idx % colors.length]} />;
            }

            const pathData = [
              `M ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L 0 0`
            ].join(' ');

            return <path key={idx} d={pathData} fill={colors[idx % colors.length]} stroke="#ffffff" strokeWidth="0.03" />;
          })}
          <circle cx="0" cy="0" r="0.62" fill="#ffffff" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-xs text-slate-400 font-medium">Total</span>
          <span className="text-sm font-bold text-slate-800">
            {valueSuffix === '$' ? formatCurrency(total) : `${formatNumber(Math.round(total))}${valueSuffix}`}
          </span>
        </div>
      </div>

      <div className="flex-1 w-full space-y-2.5">
        {items.map((item, idx) => {
          const pct = Math.round((item.value / total) * 100);
          return (
            <div key={idx} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                />
                <span className="text-slate-700 font-medium truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-2">
                <span className="font-semibold text-slate-800">
                  {valueSuffix === '$' ? formatCurrency(item.value) : `${formatNumber(Math.round(item.value))}${valueSuffix}`}
                </span>
                <span className="text-xs text-slate-400 w-9 text-right">({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Persistent State with localStorage
  const [farmData, setFarmData] = useState(() => {
    try {
      const saved = localStorage.getItem('aquapulse_farm_data_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to read localStorage', e);
    }
    return INITIAL_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem('aquapulse_farm_data_v1', JSON.stringify(farmData));
    } catch (e) {
      console.error('Failed to save localStorage', e);
    }
  }, [farmData]);

  // Navigation & Layout State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleResetDemoData = () => {
    setFarmData(INITIAL_DATA);
    localStorage.removeItem('aquapulse_farm_data_v1');
    setResetConfirmOpen(false);
    addToast('Demo farm data has been restored to initial defaults.');
  };

  // ============================================================================
  // GLOBAL COMPUTED METRICS & ALERTS
  // ============================================================================
  const metrics = useMemo(() => {
    const totalPonds = farmData.ponds.length;
    const activePonds = farmData.ponds.filter((p) => p.status === 'Active' || p.status === 'Harvesting').length;
    const totalFishPopulation = farmData.batches.reduce((sum, b) => sum + Number(b.currentQty || 0), 0);
    const totalBiomassKg = farmData.batches.reduce(
      (sum, b) => sum + (Number(b.currentQty || 0) * Number(b.avgWeightGrams || 0)) / 1000,
      0
    );
    const activeBatches = farmData.batches.length;
    const totalSales = farmData.sales.reduce((sum, s) => sum + Number(s.totalAmount || 0), 0);
    const totalExpenses = farmData.expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const netProfit = totalSales - totalExpenses;

    // System Alerts
    const alerts = [];
    farmData.waterLogs.forEach((log) => {
      const evalRes = evaluateWaterQuality(log);
      if (evalRes.status !== 'Optimal') {
        const pond = farmData.ponds.find((p) => p.id === log.pondId);
        alerts.push({
          id: `wq-${log.id}`,
          severity: evalRes.status,
          module: 'water',
          title: `Water Alert: ${pond ? pond.name : log.pondId}`,
          detail: evalRes.issues
        });
      }
    });

    farmData.inventory.forEach((item) => {
      if (Number(item.quantity) <= Number(item.reorderLevel)) {
        alerts.push({
          id: `inv-${item.id}`,
          severity: 'Warning',
          module: 'inventory',
          title: `Low Stock: ${item.name}`,
          detail: `Only ${item.quantity} ${item.unit} left (Reorder threshold: ${item.reorderLevel} ${item.unit})`
        });
      }
    });

    farmData.healthRecords.forEach((hr) => {
      if (hr.status === 'Under Treatment' || hr.status === 'Critical') {
        const pond = farmData.ponds.find((p) => p.id === hr.pondId);
        alerts.push({
          id: `hl-${hr.id}`,
          severity: 'Warning',
          module: 'health',
          title: `Health Monitoring: ${hr.issueType}`,
          detail: `${pond ? pond.name : hr.pondId} • Status: ${hr.status}`
        });
      }
    });

    return {
      totalPonds,
      activePonds,
      totalFishPopulation,
      totalBiomassKg,
      activeBatches,
      totalSales,
      totalExpenses,
      netProfit,
      alerts
    };
  }, [farmData]);

  // Navigation Menu Items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ponds', label: 'Pond Management', icon: Waves },
    { id: 'fish', label: 'Fish Batches', icon: Fish },
    { id: 'feeding', label: 'Feeding Schedule', icon: Utensils },
    { id: 'water', label: 'Water Quality', icon: Droplets },
    { id: 'health', label: 'Fish Health', icon: HeartPulse },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'harvest', label: 'Harvests', icon: Scale },
    { id: 'sales', label: 'Sales & Customers', icon: BadgeDollarSign },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'reports', label: 'Analytics & Reports', icon: BarChart3 }
  ];

  // ============================================================================
  // MODULE 1: DASHBOARD VIEW
  // ============================================================================
  const DashboardView = () => {
    const speciesDistribution = useMemo(() => {
      const map = {};
      farmData.batches.forEach((b) => {
        const shortName = b.species.split(' (')[0];
        map[shortName] = (map[shortName] || 0) + Number(b.currentQty || 0);
      });
      return Object.entries(map).map(([label, value]) => ({ label, value }));
    }, []);

    const recentActivities = [
      ...farmData.feedings.slice(0, 2).map((f) => ({
        id: f.id,
        time: f.dateTime,
        title: `Fed ${f.quantityKg} kg (${f.feedType.split(' (')[0]})`,
        sub: `Batch ${f.batchCode} • ${f.status}`,
        color: 'bg-sky-100 text-sky-700'
      })),
      ...farmData.harvests.slice(0, 2).map((h) => ({
        id: h.id,
        time: h.date,
        title: `Harvested ${h.totalWeightKg} kg of ${h.species.split(' (')[0]}`,
        sub: `${h.harvestType} Harvest • ${h.destination}`,
        color: 'bg-emerald-100 text-emerald-700'
      })),
      ...farmData.sales.slice(0, 2).map((s) => ({
        id: s.id,
        time: s.date,
        title: `Sale Recorded: ${formatCurrency(s.totalAmount)}`,
        sub: `${s.quantityKg} kg ${s.species.split(' (')[0]} • ${s.paymentStatus}`,
        color: 'bg-teal-100 text-teal-700'
      }))
    ];

    return (
      <div className="space-y-6">
        {/* Top KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <div
            onClick={() => setActiveTab('ponds')}
            className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Ponds</span>
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                <Waves className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{metrics.totalPonds}</span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {metrics.activePonds} Active
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Click to inspect pond zones</p>
          </div>

          <div
            onClick={() => setActiveTab('fish')}
            className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Fish Population</span>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Fish className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{formatNumber(metrics.totalFishPopulation)}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Est. Biomass: <strong className="text-slate-700">{formatNumber(Math.round(metrics.totalBiomassKg))} kg</strong>
            </p>
          </div>

          <div
            onClick={() => setActiveTab('fish')}
            className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Batches</span>
              <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{metrics.activeBatches}</span>
              <span className="text-xs font-medium text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                {speciesDistribution.length} Species
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Across nursery & grow-out</p>
          </div>

          <div
            onClick={() => setActiveTab('sales')}
            className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Sales</span>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <BadgeDollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(metrics.totalSales)}</span>
            </div>
            <p className="mt-1 text-xs text-emerald-600 flex items-center gap-1 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> {farmData.sales.length} completed orders
            </p>
          </div>

          <div
            onClick={() => setActiveTab('expenses')}
            className="cursor-pointer bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-300 transition-all sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Expenses & Net</span>
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
                <Receipt className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(metrics.totalExpenses)}</span>
            </div>
            <p className="mt-1 text-xs font-medium">
              Net Profit:{' '}
              <span className={metrics.netProfit >= 0 ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                {formatCurrency(metrics.netProfit)}
              </span>
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-800">Production, Revenue & Expense Trends</h2>
                <p className="text-xs text-slate-500">6-month aquaculture yield vs financial performance</p>
              </div>
              <button
                onClick={() => setActiveTab('reports')}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 self-start sm:self-auto"
              >
                Full Report <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <RevenueExpenseChart data={farmData.monthlyMetrics} />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800">Stock by Fish Species</h2>
              <p className="text-xs text-slate-500 mb-5">Live headcount distribution across ponds</p>
              <DonutChart items={speciesDistribution} />
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Avg Survival Rate</span>
              <span className="font-bold text-emerald-600">94.8%</span>
            </div>
          </div>
        </div>

        {/* Alerts & Recent Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Critical & Warning Alerts */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-bold text-slate-800">Farm Alerts & Action Items</h2>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {metrics.alerts.length} Active
              </span>
            </div>

            {metrics.alerts.length === 0 ? (
              <div className="p-8 text-center bg-emerald-50/60 rounded-xl border border-emerald-100">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-emerald-900">All Farm Systems Optimal</p>
                <p className="text-xs text-emerald-700 mt-1">Water quality, feed inventory, and fish health are normal.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {metrics.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => setActiveTab(alert.module)}
                    className={`cursor-pointer p-3.5 rounded-xl border transition-all hover:shadow-xs flex items-start justify-between gap-3 ${
                      alert.severity === 'Critical'
                        ? 'bg-rose-50/70 border-rose-200 hover:bg-rose-50'
                        : 'bg-amber-50/70 border-amber-200 hover:bg-amber-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={`w-5 h-5 shrink-0 mt-0.5 ${
                          alert.severity === 'Critical' ? 'text-rose-600' : 'text-amber-600'
                        }`}
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-800">{alert.title}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{alert.detail}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Farm Activities */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-800">Recent Farm Activities</h2>
              <span className="text-xs text-slate-400">Live Operations Log</span>
            </div>
            <div className="space-y-3.5">
              {recentActivities.map((act, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${act.color.split(' ')[0].replace('100', '500')}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{act.title}</p>
                    <p className="text-xs text-slate-500">{act.sub}</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // MODULE 2: POND MANAGEMENT
  // ============================================================================
  const PondManagementView = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | 'view'
    const [selectedPond, setSelectedPond] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      size: '',
      sizeUnit: 'sq.m',
      capacity: '',
      location: '',
      waterSource: 'Canal & Borewell',
      status: 'Active',
      depth: '1.8m',
      notes: ''
    });

    const filteredPonds = farmData.ponds.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    const openAdd = () => {
      setFormData({
        name: '',
        size: '',
        sizeUnit: 'sq.m',
        capacity: '',
        location: '',
        waterSource: 'Canal & Borewell',
        status: 'Active',
        depth: '1.8m',
        notes: ''
      });
      setModalMode('add');
    };

    const openEdit = (pond) => {
      setSelectedPond(pond);
      setFormData({ ...pond });
      setModalMode('edit');
    };

    const openView = (pond) => {
      setSelectedPond(pond);
      setModalMode('view');
    };

    const handleDelete = (id) => {
      setFarmData((prev) => ({
        ...prev,
        ponds: prev.ponds.filter((p) => p.id !== id)
      }));
      addToast('Pond record deleted successfully.');
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.name.trim() || Number(formData.size) <= 0 || Number(formData.capacity) <= 0) {
        addToast('Please fill valid pond name, size, and capacity.', 'error');
        return;
      }
      if (modalMode === 'add') {
        const newPond = {
          ...formData,
          id: `P-${100 + farmData.ponds.length + Math.floor(Math.random() * 90)}`,
          size: Number(formData.size),
          capacity: Number(formData.capacity)
        };
        setFarmData((prev) => ({ ...prev, ponds: [newPond, ...prev.ponds] }));
        addToast(`Pond "${newPond.name}" created.`);
      } else if (modalMode === 'edit') {
        setFarmData((prev) => ({
          ...prev,
          ponds: prev.ponds.map((p) =>
            p.id === selectedPond.id
              ? { ...formData, size: Number(formData.size), capacity: Number(formData.capacity) }
              : p
          )
        }));
        addToast(`Pond "${formData.name}" updated.`);
      }
      setModalMode(null);
    };

    return (
      <div className="space-y-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pond name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Harvesting">Harvesting</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Empty">Empty</option>
            </select>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:opacity-95 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" /> Add New Pond
          </button>
        </div>

        {/* Pond Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredPonds.map((pond) => {
            const pondBatches = farmData.batches.filter((b) => b.pondId === pond.id);
            const currentFishCount = pondBatches.reduce((sum, b) => sum + Number(b.currentQty), 0);
            const occupancyPct = Math.min(100, Math.round((currentFishCount / pond.capacity) * 100));

            return (
              <div
                key={pond.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-sky-600">{pond.id}</span>
                      <h3 className="text-base font-bold text-slate-800 mt-0.5">{pond.name}</h3>
                    </div>
                    <StatusBadge status={pond.status} />
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{pond.location}</span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block">Surface Area</span>
                      <span className="font-bold text-slate-700">
                        {formatNumber(pond.size)} {pond.sizeUnit}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Water Source</span>
                      <span className="font-bold text-slate-700">{pond.waterSource}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 font-medium">Stocking Capacity</span>
                      <span className="font-bold text-slate-700">
                        {formatNumber(currentFishCount)} / {formatNumber(pond.capacity)} ({occupancyPct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          occupancyPct > 90 ? 'bg-amber-500' : 'bg-gradient-to-r from-sky-500 to-emerald-500'
                        }`}
                        style={{ width: `${occupancyPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {pondBatches.length} active {pondBatches.length === 1 ? 'batch' : 'batches'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openView(pond)}
                      className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEdit(pond)}
                      className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Edit Pond"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(pond.id)}
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Pond"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={modalMode === 'add' || modalMode === 'edit'}
          onClose={() => setModalMode(null)}
          title={modalMode === 'add' ? 'Add New Aquaculture Pond' : `Edit ${selectedPond?.name}`}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Pond Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., East Grow-Out Pond A2"
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Size *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Unit</label>
                <select
                  value={formData.sizeUnit}
                  onChange={(e) => setFormData({ ...formData, sizeUnit: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  <option value="sq.m">sq.m</option>
                  <option value="acres">acres</option>
                  <option value="hectares">hectares</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Max Capacity (Fish) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Sector *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="North Sector - Zone 1"
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Harvesting">Harvesting</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Empty">Empty</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Water Source</label>
                <input
                  type="text"
                  value={formData.waterSource}
                  onChange={(e) => setFormData({ ...formData, waterSource: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Avg Depth</label>
                <input
                  type="text"
                  value={formData.depth}
                  onChange={(e) => setFormData({ ...formData, depth: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Operational Notes</label>
              <textarea
                rows="2"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700"
              >
                {modalMode === 'add' ? 'Create Pond' : 'Save Changes'}
              </button>
            </div>
          </form>
        </Modal>

        {/* View Details Modal */}
        <Modal
          isOpen={modalMode === 'view' && !!selectedPond}
          onClose={() => setModalMode(null)}
          title={`Pond Specifications: ${selectedPond?.name}`}
        >
          {selectedPond && (
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-sky-50/70 border border-sky-100">
                <div>
                  <span className="text-xs text-slate-500">Pond Identifier</span>
                  <p className="font-bold text-slate-800">{selectedPond.id}</p>
                </div>
                <StatusBadge status={selectedPond.status} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400">Dimensions</span>
                  <p className="font-semibold text-slate-800">
                    {formatNumber(selectedPond.size)} {selectedPond.sizeUnit} (Depth: {selectedPond.depth || '1.8m'})
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Max Capacity</span>
                  <p className="font-semibold text-slate-800">{formatNumber(selectedPond.capacity)} Fish</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Location Zone</span>
                  <p className="font-semibold text-slate-800">{selectedPond.location}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Water Supply</span>
                  <p className="font-semibold text-slate-800">{selectedPond.waterSource}</p>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Notes</span>
                <p className="p-3 mt-1 rounded-xl bg-slate-50 text-slate-700">{selectedPond.notes || 'No notes recorded.'}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  };

  // ============================================================================
  // MODULE 3: FISH & BATCH MANAGEMENT
  // ============================================================================
  const FishManagementView = () => {
    const [search, setSearch] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('All');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingBatch, setEditingBatch] = useState(null);
    const [form, setForm] = useState({
      batchCode: '',
      species: 'Rohu (Labeo rohita)',
      pondId: farmData.ponds[0]?.id || '',
      initialQty: '',
      currentQty: '',
      stockingDate: '2026-11-18',
      avgWeightGrams: '',
      status: 'Growing'
    });

    const filteredBatches = farmData.batches.filter((b) => {
      const matchSearch =
        b.batchCode.toLowerCase().includes(search.toLowerCase()) ||
        b.species.toLowerCase().includes(search.toLowerCase());
      const matchSpecies = speciesFilter === 'All' || b.species === speciesFilter;
      return matchSearch && matchSpecies;
    });

    const openAdd = () => {
      setEditingBatch(null);
      setForm({
        batchCode: `BCH-${Math.floor(100 + Math.random() * 900)}`,
        species: 'Rohu (Labeo rohita)',
        pondId: farmData.ponds[0]?.id || '',
        initialQty: '',
        currentQty: '',
        stockingDate: new Date().toISOString().split('T')[0],
        avgWeightGrams: '',
        status: 'Nursery'
      });
      setModalOpen(true);
    };

    const openEdit = (batch) => {
      setEditingBatch(batch);
      setForm({ ...batch });
      setModalOpen(true);
    };

    const handleSave = (e) => {
      e.preventDefault();
      if (!form.batchCode || Number(form.currentQty) <= 0 || Number(form.avgWeightGrams) <= 0) {
        addToast('Enter valid batch code, fish count, and average weight.', 'error');
        return;
      }
      const payload = {
        ...form,
        initialQty: Number(form.initialQty || form.currentQty),
        currentQty: Number(form.currentQty),
        avgWeightGrams: Number(form.avgWeightGrams)
      };

      if (editingBatch) {
        setFarmData((prev) => ({
          ...prev,
          batches: prev.batches.map((b) => (b.id === editingBatch.id ? { ...payload, id: b.id } : b))
        }));
        addToast(`Batch ${payload.batchCode} updated.`);
      } else {
        setFarmData((prev) => ({
          ...prev,
          batches: [{ ...payload, id: `B-${Date.now()}` }, ...prev.batches]
        }));
        addToast(`Stocked new batch ${payload.batchCode}.`);
      }
      setModalOpen(false);
    };

    const handleDelete = (id) => {
      setFarmData((prev) => ({
        ...prev,
        batches: prev.batches.filter((b) => b.id !== id)
      }));
      addToast('Fish batch removed.');
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search batch code or fish species..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <select
              value={speciesFilter}
              onChange={(e) => setSpeciesFilter(e.target.value)}
              className="px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
            >
              <option value="All">All Species</option>
              <option value="Rohu (Labeo rohita)">Rohu (Labeo rohita)</option>
              <option value="Catla (Catla catla)">Catla (Catla catla)</option>
              <option value="GIFT Tilapia">GIFT Tilapia</option>
              <option value="Common Carp">Common Carp</option>
              <option value="Pangasius">Pangasius</option>
            </select>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:opacity-95 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Stock New Batch
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                  <th className="py-3.5 px-4">Batch Code</th>
                  <th className="py-3.5 px-4">Species</th>
                  <th className="py-3.5 px-4">Assigned Pond</th>
                  <th className="py-3.5 px-4">Stocking Date</th>
                  <th className="py-3.5 px-4 text-right">Live Qty</th>
                  <th className="py-3.5 px-4 text-right">Avg Weight</th>
                  <th className="py-3.5 px-4 text-right">Est. Biomass</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredBatches.map((batch) => {
                  const pond = farmData.ponds.find((p) => p.id === batch.pondId);
                  const biomassKg = ((batch.currentQty * batch.avgWeightGrams) / 1000).toFixed(1);
                  const survival = batch.initialQty ? Math.round((batch.currentQty / batch.initialQty) * 100) : 100;

                  return (
                    <tr key={batch.id} className="hover:bg-sky-50/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-sky-700">{batch.batchCode}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">{batch.species}</td>
                      <td className="py-3.5 px-4 text-slate-600">{pond ? pond.name : batch.pondId}</td>
                      <td className="py-3.5 px-4 text-slate-500">{batch.stockingDate}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="font-bold text-slate-800">{formatNumber(batch.currentQty)}</span>
                        <span className="block text-[11px] text-emerald-600">{survival}% survival</span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-slate-700">{batch.avgWeightGrams} g</td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-700">{formatNumber(biomassKg)} kg</td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={batch.status} />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => openEdit(batch)}
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(batch.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingBatch ? `Edit Batch ${editingBatch.batchCode}` : 'Stock New Fish Batch'}
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Batch Code *</label>
                <input
                  type="text"
                  required
                  value={form.batchCode}
                  onChange={(e) => setForm({ ...form, batchCode: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fish Species *</label>
                <select
                  value={form.species}
                  onChange={(e) => setForm({ ...form, species: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  <option value="Rohu (Labeo rohita)">Rohu (Labeo rohita)</option>
                  <option value="Catla (Catla catla)">Catla (Catla catla)</option>
                  <option value="GIFT Tilapia">GIFT Tilapia</option>
                  <option value="Common Carp">Common Carp</option>
                  <option value="Pangasius">Pangasius</option>
                  <option value="Mrigal Carp">Mrigal Carp</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Pond *</label>
                <select
                  value={form.pondId}
                  onChange={(e) => setForm({ ...form, pondId: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  {farmData.ponds.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.id})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Stocking Date *</label>
                <input
                  type="date"
                  required
                  value={form.stockingDate}
                  onChange={(e) => setForm({ ...form, stockingDate: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Qty</label>
                <input
                  type="number"
                  min="1"
                  value={form.initialQty}
                  onChange={(e) => setForm({ ...form, initialQty: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Qty *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={form.currentQty}
                  onChange={(e) => setForm({ ...form, currentQty: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Avg Weight (g) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={form.avgWeightGrams}
                  onChange={(e) => setForm({ ...form, avgWeightGrams: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Growth Stage / Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
              >
                <option value="Nursery">Nursery</option>
                <option value="Growing">Growing</option>
                <option value="Ready for Harvest">Ready for Harvest</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700"
              >
                Save Batch
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  // ============================================================================
  // MODULE 4: FEEDING MANAGEMENT
  // ============================================================================
  const FeedingManagementView = () => {
    const [filterStatus, setFilterStatus] = useState('All');
    const [modalOpen, setModalOpen] = useState(false);
    const [deductInventory, setDeductInventory] = useState(true);
    const [form, setForm] = useState({
      dateTime: '2026-11-18 17:30',
      pondId: farmData.ponds[0]?.id || '',
      batchCode: farmData.batches[0]?.batchCode || '',
      feedType: 'Floating Grower Pellets (32% Protein)',
      quantityKg: 50,
      frequency: 'Evening (2/2)',
      status: 'Completed',
      notes: ''
    });

    const filteredFeedings = farmData.feedings.filter(
      (f) => filterStatus === 'All' || f.status === filterStatus
    );

    const totalFedToday = farmData.feedings
      .filter((f) => f.status === 'Completed')
      .reduce((acc, f) => acc + Number(f.quantityKg || 0), 0);

    const scheduledCount = farmData.feedings.filter((f) => f.status === 'Scheduled').length;

    const handleMarkCompleted = (feed) => {
      setFarmData((prev) => {
        const updatedFeedings = prev.feedings.map((f) =>
          f.id === feed.id ? { ...f, status: 'Completed' } : f
        );
        const updatedInventory = prev.inventory.map((item) =>
          item.name === feed.feedType
            ? { ...item, quantity: Math.max(0, Number(item.quantity) - Number(feed.quantityKg)) }
            : item
        );
        return { ...prev, feedings: updatedFeedings, inventory: updatedInventory };
      });
      addToast(`Marked feeding complete & deducted ${feed.quantityKg} kg from inventory.`);
    };

    const handleAddFeeding = (e) => {
      e.preventDefault();
      if (Number(form.quantityKg) <= 0) {
        addToast('Feed quantity must be greater than 0 kg.', 'error');
        return;
      }

      const newFeed = {
        ...form,
        id: `FD-${Date.now()}`,
        quantityKg: Number(form.quantityKg)
      };

      setFarmData((prev) => {
        let updatedInv = prev.inventory;
        if (deductInventory && form.status === 'Completed') {
          updatedInv = prev.inventory.map((item) =>
            item.name === form.feedType
              ? { ...item, quantity: Math.max(0, Number(item.quantity) - Number(form.quantityKg)) }
              : item
          );
        }
        return {
          ...prev,
          feedings: [newFeed, ...prev.feedings],
          inventory: updatedInv
        };
      });

      addToast(
        form.status === 'Completed' && deductInventory
          ? `Feeding logged & ${form.quantityKg} kg deducted from feed stock.`
          : 'Feeding schedule added.'
      );
      setModalOpen(false);
    };

    const handleDelete = (id) => {
      setFarmData((prev) => ({
        ...prev,
        feedings: prev.feedings.filter((f) => f.id !== id)
      }));
      addToast('Feeding log deleted.');
    };

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-semibold uppercase text-slate-400">Total Feed Dispensed</span>
            <p className="text-2xl font-bold text-slate-800 mt-1">{formatNumber(totalFedToday)} kg</p>
            <span className="text-xs text-emerald-600 font-medium">Completed rations</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-semibold uppercase text-slate-400">Upcoming Rations</span>
            <p className="text-2xl font-bold text-sky-600 mt-1">{scheduledCount} Scheduled</p>
            <span className="text-xs text-slate-500">Pending distribution</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-semibold uppercase text-slate-400">Target FCR Benchmark</span>
            <p className="text-2xl font-bold text-emerald-600 mt-1">1.38</p>
            <span className="text-xs text-slate-500">Optimal feed conversion efficiency</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2">
            {['All', 'Completed', 'Scheduled'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterStatus === st
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:opacity-95 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Log / Schedule Feeding
          </button>
        </div>

        {/* Feeding Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Pond / Batch</th>
                  <th className="py-3.5 px-4">Feed Type</th>
                  <th className="py-3.5 px-4 text-right">Quantity</th>
                  <th className="py-3.5 px-4">Session</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredFeedings.map((feed) => {
                  const pond = farmData.ponds.find((p) => p.id === feed.pondId);
                  return (
                    <tr key={feed.id} className="hover:bg-sky-50/30">
                      <td className="py-3.5 px-4 font-medium text-slate-700">{feed.dateTime}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block">{pond ? pond.name : feed.pondId}</span>
                        <span className="text-xs text-sky-600 font-medium">{feed.batchCode}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">{feed.feedType}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-800">{feed.quantityKg} kg</td>
                      <td className="py-3.5 px-4 text-xs text-slate-500">{feed.frequency}</td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={feed.status} />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {feed.status === 'Scheduled' && (
                            <button
                              onClick={() => handleMarkCompleted(feed)}
                              className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 inline-flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" /> Complete
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(feed.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Schedule or Log Fish Feeding">
          <form onSubmit={handleAddFeeding} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date & Time *</label>
                <input
                  type="text"
                  required
                  value={form.dateTime}
                  onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pond *</label>
                <select
                  value={form.pondId}
                  onChange={(e) => setForm({ ...form, pondId: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  {farmData.ponds.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Batch Code</label>
                <select
                  value={form.batchCode}
                  onChange={(e) => setForm({ ...form, batchCode: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  {farmData.batches.map((b) => (
                    <option key={b.id} value={b.batchCode}>
                      {b.batchCode} ({b.species.split(' (')[0]})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Feed Type *</label>
                <select
                  value={form.feedType}
                  onChange={(e) => setForm({ ...form, feedType: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  <option value="Floating Grower Pellets (32% Protein)">Floating Grower Pellets (32% Protein)</option>
                  <option value="Fingerling Crumble Starter (36% Protein)">Fingerling Crumble Starter (36% Protein)</option>
                  <option value="Sinking Carp Feed (28% Protein)">Sinking Carp Feed (28% Protein)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity (kg) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={form.quantityKg}
                  onChange={(e) => setForm({ ...form, quantityKg: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ration Slot</label>
                <input
                  type="text"
                  value={form.frequency}
                  onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  <option value="Completed">Completed</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={deductInventory}
                onChange={(e) => setDeductInventory(e.target.checked)}
                className="rounded text-sky-600"
              />
              Automatically deduct feed quantity from Inventory when Completed
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700"
              >
                Save Record
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  // ============================================================================
  // MODULE 5: WATER QUALITY MONITORING
  // ============================================================================
  const WaterQualityView = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
      pondId: farmData.ponds[0]?.id || '',
      recordedAt: '2026-11-18 14:00',
      temperature: 27.5,
      ph: 7.5,
      dissolvedOxygen: 6.0,
      ammonia: 0.02,
      turbidity: '34 cm (Optimal)'
    });

    const handleAddLog = (e) => {
      e.preventDefault();
      const newLog = {
        ...form,
        id: `WQ-${Date.now()}`,
        temperature: Number(form.temperature),
        ph: Number(form.ph),
        dissolvedOxygen: Number(form.dissolvedOxygen),
        ammonia: Number(form.ammonia)
      };
      setFarmData((prev) => ({
        ...prev,
        waterLogs: [newLog, ...prev.waterLogs]
      }));
      const evalRes = evaluateWaterQuality(newLog);
      addToast(
        evalRes.status === 'Optimal'
          ? 'Water sample logged: Parameters Optimal.'
          : `Water sample logged with ${evalRes.status} alert: ${evalRes.issues}`,
        evalRes.status === 'Optimal' ? 'success' : 'warning'
      );
      setModalOpen(false);
    };

    const handleDelete = (id) => {
      setFarmData((prev) => ({
        ...prev,
        waterLogs: prev.waterLogs.filter((w) => w.id !== id)
      }));
      addToast('Water quality reading deleted.');
    };

    return (
      <div className="space-y-6">
        {/* Aquaculture Threshold Guide */}
        <div className="bg-gradient-to-r from-sky-900 to-teal-900 text-white p-5 rounded-2xl shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold flex items-center gap-2">
              <Droplets className="w-5 h-5 text-sky-300" /> Real-Time Water Quality Telemetry & Standards
            </h2>
            <p className="text-xs text-sky-200 mt-1">
              Ideal Thresholds: Dissolved Oxygen &ge; 5.2 mg/L • pH 6.8 – 8.3 • Unionized Ammonia &le; 0.04 mg/L • Temp 24 – 31°C
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-sky-900 text-sm font-bold rounded-xl hover:bg-sky-50 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" /> Log Water Sample
          </button>
        </div>

        {/* Water Quality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {farmData.waterLogs.map((log) => {
            const pond = farmData.ponds.find((p) => p.id === log.pondId);
            const evaluation = evaluateWaterQuality(log);

            return (
              <div
                key={log.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition-all ${
                  evaluation.status === 'Critical'
                    ? 'border-rose-300 ring-1 ring-rose-100'
                    : evaluation.status === 'Warning'
                    ? 'border-amber-300'
                    : 'border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-800">{pond ? pond.name : log.pondId}</h3>
                    <span className="text-xs text-slate-400">Sampled: {log.recordedAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={evaluation.status} />
                    <button
                      onClick={() => handleDelete(log.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-400 block">Temperature</span>
                    <span className="text-base font-bold text-slate-800">{log.temperature}°C</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-400 block">pH Level</span>
                    <span className="text-base font-bold text-slate-800">{log.ph}</span>
                  </div>
                  <div
                    className={`p-3 rounded-xl border ${
                      log.dissolvedOxygen < 5.0
                        ? 'bg-rose-50 border-rose-200 text-rose-900'
                        : 'bg-sky-50/60 border-sky-100 text-sky-900'
                    }`}
                  >
                    <span className="text-[11px] opacity-75 block">Dissolved O₂</span>
                    <span className="text-base font-bold">{log.dissolvedOxygen} mg/L</span>
                  </div>
                  <div
                    className={`p-3 rounded-xl border ${
                      log.ammonia > 0.04
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : 'bg-emerald-50/60 border-emerald-100 text-emerald-900'
                    }`}
                  >
                    <span className="text-[11px] opacity-75 block">Ammonia</span>
                    <span className="text-base font-bold">{log.ammonia} mg/L</span>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">{evaluation.issues}</span>
                  <span className="text-slate-400">Secchi: {log.turbidity}</span>
                </div>
              </div>
            );
          })}
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Record Water Quality Parameters">
          <form onSubmit={handleAddLog} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pond *</label>
                <select
                  value={form.pondId}
                  onChange={(e) => setForm({ ...form, pondId: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  {farmData.ponds.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Timestamp *</label>
                <input
                  type="text"
                  required
                  value={form.recordedAt}
                  onChange={(e) => setForm({ ...form, recordedAt: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Temperature (°C) *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={form.temperature}
                  onChange={(e) => setForm({ ...form, temperature: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">pH Level *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={form.ph}
                  onChange={(e) => setForm({ ...form, ph: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Dissolved Oxygen (mg/L) *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={form.dissolvedOxygen}
                  onChange={(e) => setForm({ ...form, dissolvedOxygen: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ammonia (mg/L) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.ammonia}
                  onChange={(e) => setForm({ ...form, ammonia: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Turbidity / Secchi Disk</label>
              <input
                type="text"
                value={form.turbidity}
                onChange={(e) => setForm({ ...form, turbidity: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700"
              >
                Save Reading
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  // ============================================================================
  // MODULE 6: FISH HEALTH & MORTALITY MANAGEMENT
  // ============================================================================
  const FishHealthView = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [deductMortality, setDeductMortality] = useState(true);
    const [form, setForm] = useState({
      date: '2026-11-18',
      pondId: farmData.ponds[0]?.id || '',
      batchId: farmData.batches[0]?.id || '',
      issueType: '',
      symptoms: '',
      mortalityCount: 0,
      treatment: '',
      dosage: '',
      status: 'Under Treatment',
      notes: ''
    });

    const totalMortality = farmData.healthRecords.reduce((s, r) => s + Number(r.mortalityCount || 0), 0);

    const handleAddHealth = (e) => {
      e.preventDefault();
      if (!form.issueType.trim()) {
        addToast('Please specify the disease or health issue.', 'error');
        return;
      }
      const mort = Number(form.mortalityCount || 0);
      const record = {
        ...form,
        id: `HL-${Date.now()}`,
        mortalityCount: mort
      };

      setFarmData((prev) => {
        let updatedBatches = prev.batches;
        if (deductMortality && mort > 0 && form.batchId) {
          updatedBatches = prev.batches.map((b) =>
            b.id === form.batchId ? { ...b, currentQty: Math.max(0, Number(b.currentQty) - mort) } : b
          );
        }
        return {
          ...prev,
          healthRecords: [record, ...prev.healthRecords],
          batches: updatedBatches
        };
      });

      addToast('Health & mortality record logged.');
      setModalOpen(false);
    };

    const toggleRecovered = (id) => {
      setFarmData((prev) => ({
        ...prev,
        healthRecords: prev.healthRecords.map((hr) =>
          hr.id === id ? { ...hr, status: hr.status === 'Recovered' ? 'Under Treatment' : 'Recovered' } : hr
        )
      }));
      addToast('Health treatment status updated.');
    };

    const handleDelete = (id) => {
      setFarmData((prev) => ({
        ...prev,
        healthRecords: prev.healthRecords.filter((hr) => hr.id !== id)
      }));
      addToast('Health record removed.');
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-xs text-slate-400 block">Cumulative Recorded Mortality</span>
              <span className="text-xl font-bold text-rose-600">{formatNumber(totalMortality)} Fish</span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <span className="text-xs text-slate-400 block">Active Treatments</span>
              <span className="text-xl font-bold text-amber-600">
                {farmData.healthRecords.filter((h) => h.status !== 'Recovered').length} Cases
              </span>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:opacity-95 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Log Health / Mortality Issue
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {farmData.healthRecords.map((rec) => {
            const pond = farmData.ponds.find((p) => p.id === rec.pondId);
            const batch = farmData.batches.find((b) => b.id === rec.batchId);

            return (
              <div key={rec.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base font-bold text-slate-800">{rec.issueType}</h3>
                      <StatusBadge status={rec.status} />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Date: <strong>{rec.date}</strong> • Pond: <strong>{pond ? pond.name : rec.pondId}</strong> • Batch:{' '}
                      <strong>{batch ? batch.batchCode : rec.batchId}</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-100">
                      Mortality: {rec.mortalityCount} fish
                    </span>
                    <button
                      onClick={() => toggleRecovered(rec.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 transition-colors"
                    >
                      {rec.status === 'Recovered' ? 'Reopen Case' : 'Mark Recovered'}
                    </button>
                    <button
                      onClick={() => handleDelete(rec.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-0.5">Observed Symptoms</span>
                    <p className="text-slate-700">{rec.symptoms}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block mb-0.5">Treatment & Dosage</span>
                    <p className="text-slate-700 font-medium">
                      {rec.treatment} ({rec.dosage})
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block mb-0.5">Veterinary Notes</span>
                    <p className="text-slate-600">{rec.notes || 'None'}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Record Fish Disease / Mortality">
          <form onSubmit={handleAddHealth} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Affected Pond *</label>
                <select
                  value={form.pondId}
                  onChange={(e) => setForm({ ...form, pondId: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  {farmData.ponds.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Affected Batch</label>
                <select
                  value={form.batchId}
                  onChange={(e) => setForm({ ...form, batchId: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  {farmData.batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.batchCode} ({b.species.split(' (')[0]})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mortality Count (Fish)</label>
                <input
                  type="number"
                  min="0"
                  value={form.mortalityCount}
                  onChange={(e) => setForm({ ...form, mortalityCount: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Disease / Health Issue *</label>
              <input
                type="text"
                required
                placeholder="e.g., Gill Flukes, Columnaris, Aeromonas"
                value={form.issueType}
                onChange={(e) => setForm({ ...form, issueType: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Symptoms</label>
              <input
                type="text"
                value={form.symptoms}
                onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Treatment Administered</label>
                <input
                  type="text"
                  value={form.treatment}
                  onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Dosage</label>
                <input
                  type="text"
                  value={form.dosage}
                  onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={deductMortality}
                onChange={(e) => setDeductMortality(e.target.checked)}
                className="rounded text-sky-600"
              />
              Automatically deduct mortality count from selected Fish Batch population
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700"
              >
                Save Health Log
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  // ============================================================================
  // MODULE 7: INVENTORY MANAGEMENT
  // ============================================================================
  const InventoryManagementView = () => {
    const [catFilter, setCatFilter] = useState('All');
    const [modalOpen, setModalOpen] = useState(false);
    const [restockItem, setRestockItem] = useState(null);
    const [restockQty, setRestockQty] = useState(100);
    const [form, setForm] = useState({
      name: '',
      category: 'Fish Feed',
      quantity: '',
      unit: 'kg',
      reorderLevel: '',
      unitCost: '',
      supplier: ''
    });

    const filteredItems = farmData.inventory.filter(
      (item) => catFilter === 'All' || item.category === catFilter
    );

    const handleAddItem = (e) => {
      e.preventDefault();
      if (!form.name.trim() || Number(form.quantity) < 0) {
        addToast('Enter valid item name and quantity.', 'error');
        return;
      }
      const newItem = {
        ...form,
        id: `INV-${Date.now()}`,
        quantity: Number(form.quantity),
        reorderLevel: Number(form.reorderLevel || 10),
        unitCost: Number(form.unitCost || 0)
      };
      setFarmData((prev) => ({
        ...prev,
        inventory: [newItem, ...prev.inventory]
      }));
      addToast(`Added "${newItem.name}" to inventory.`);
      setModalOpen(false);
    };

    const handleRestockSubmit = (e) => {
      e.preventDefault();
      const addAmount = Number(restockQty);
      if (addAmount <= 0) return;

      setFarmData((prev) => ({
        ...prev,
        inventory: prev.inventory.map((item) =>
          item.id === restockItem.id ? { ...item, quantity: Number(item.quantity) + addAmount } : item
        )
      }));
      addToast(`Restocked +${addAmount} ${restockItem.unit} of ${restockItem.name}.`);
      setRestockItem(null);
    };

    const handleDelete = (id) => {
      setFarmData((prev) => ({
        ...prev,
        inventory: prev.inventory.filter((i) => i.id !== id)
      }));
      addToast('Inventory item removed.');
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Fish Feed', 'Medicines & Probiotics', 'Equipment'].map((c) => (
              <button
                key={c}
                onClick={() => setCatFilter(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  catFilter === c ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setForm({
                name: '',
                category: 'Fish Feed',
                quantity: '',
                unit: 'kg',
                reorderLevel: '100',
                unitCost: '',
                supplier: ''
              });
              setModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:opacity-95 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Inventory Item
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                  <th className="py-3.5 px-4">Item Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-right">Available Stock</th>
                  <th className="py-3.5 px-4 text-right">Reorder Threshold</th>
                  <th className="py-3.5 px-4 text-right">Unit Cost</th>
                  <th className="py-3.5 px-4">Supplier</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredItems.map((item) => {
                  const isLow = Number(item.quantity) <= Number(item.reorderLevel);
                  return (
                    <tr key={item.id} className={isLow ? 'bg-amber-50/40' : 'hover:bg-sky-50/30'}>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {item.name}
                        {isLow && (
                          <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            <AlertTriangle className="w-3 h-3" /> Low Stock
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{item.category}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-800">
                        {formatNumber(item.quantity)} {item.unit}
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-500">
                        {formatNumber(item.reorderLevel)} {item.unit}
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-700">{formatCurrency(item.unitCost)}</td>
                      <td className="py-3.5 px-4 text-xs text-slate-500">{item.supplier}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setRestockItem(item);
                              setRestockQty(100);
                            }}
                            className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100"
                          >
                            + Restock
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Item Modal */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Inventory Item">
          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Item Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  <option value="Fish Feed">Fish Feed</option>
                  <option value="Medicines & Probiotics">Medicines & Probiotics</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Unit</label>
                <select
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  <option value="kg">kg</option>
                  <option value="liters">liters</option>
                  <option value="bags">bags</option>
                  <option value="units">units</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Qty *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reorder Alert</label>
                <input
                  type="number"
                  min="0"
                  value={form.reorderLevel}
                  onChange={(e) => setForm({ ...form, reorderLevel: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Unit Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.unitCost}
                  onChange={(e) => setForm({ ...form, unitCost: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Supplier</label>
              <input
                type="text"
                value={form.supplier}
                onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700"
              >
                Save Item
              </button>
            </div>
          </form>
        </Modal>

        {/* Quick Restock Modal */}
        <Modal
          isOpen={!!restockItem}
          onClose={() => setRestockItem(null)}
          title={`Restock: ${restockItem?.name}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleRestockSubmit} className="space-y-4">
            <p className="text-xs text-slate-500">
              Current available stock:{' '}
              <strong className="text-slate-800">
                {restockItem?.quantity} {restockItem?.unit}
              </strong>
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quantity to Add ({restockItem?.unit}) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={restockQty}
                onChange={(e) => setRestockQty(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRestockItem(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700"
              >
                Confirm Restock
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  // ============================================================================
  // MODULE 8: HARVEST MANAGEMENT
  // ============================================================================
  const HarvestManagementView = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [deductFromBatch, setDeductFromBatch] = useState(true);
    const [form, setForm] = useState({
      date: '2026-11-18',
      pondId: farmData.ponds[0]?.id || '',
      batchId: farmData.batches[0]?.id || '',
      harvestType: 'Partial',
      quantityFish: 400,
      totalWeightKg: 320,
      destination: 'Wholesale Cold Chain'
    });

    const totalHarvestedKg = farmData.harvests.reduce((s, h) => s + Number(h.totalWeightKg || 0), 0);

    const handleAddHarvest = (e) => {
      e.preventDefault();
      const qtyFish = Number(form.quantityFish);
      const weightKg = Number(form.totalWeightKg);
      if (qtyFish <= 0 || weightKg <= 0) {
        addToast('Enter valid fish count and total harvest weight.', 'error');
        return;
      }

      const selectedBatch = farmData.batches.find((b) => b.id === form.batchId);
      const avgWeightGrams = Math.round((weightKg * 1000) / qtyFish);

      const newHarvest = {
        id: `HV-${Date.now()}`,
        date: form.date,
        pondId: form.pondId,
        batchId: form.batchId,
        species: selectedBatch ? selectedBatch.species : 'Mixed Carp',
        harvestType: form.harvestType,
        quantityFish: qtyFish,
        totalWeightKg: weightKg,
        avgWeightGrams,
        destination: form.destination
      };

      setFarmData((prev) => {
        let updatedBatches = prev.batches;
        if (deductFromBatch && selectedBatch) {
          updatedBatches = prev.batches.map((b) =>
            b.id === selectedBatch.id
              ? { ...b, currentQty: Math.max(0, Number(b.currentQty) - qtyFish) }
              : b
          );
        }
        return {
          ...prev,
          harvests: [newHarvest, ...prev.harvests],
          batches: updatedBatches
        };
      });

      addToast(`Recorded ${weightKg} kg harvest (${qtyFish} fish).`);
      setModalOpen(false);
    };

    const handleDelete = (id) => {
      setFarmData((prev) => ({
        ...prev,
        harvests: prev.harvests.filter((h) => h.id !== id)
      }));
      addToast('Harvest record removed.');
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div>
            <span className="text-xs text-slate-400 block">Total Recorded Harvest Biomass</span>
            <span className="text-2xl font-bold text-emerald-700">{formatNumber(totalHarvestedKg)} kg</span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:opacity-95 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Record New Harvest
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                  <th className="py-3.5 px-4">Harvest Date</th>
                  <th className="py-3.5 px-4">Pond & Species</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4 text-right">Fish Count</th>
                  <th className="py-3.5 px-4 text-right">Total Weight</th>
                  <th className="py-3.5 px-4 text-right">Avg Fish Size</th>
                  <th className="py-3.5 px-4">Destination</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {farmData.harvests.map((hv) => {
                  const pond = farmData.ponds.find((p) => p.id === hv.pondId);
                  return (
                    <tr key={hv.id} className="hover:bg-sky-50/30">
                      <td className="py-3.5 px-4 font-medium text-slate-700">{hv.date}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 block">{hv.species}</span>
                        <span className="text-xs text-slate-500">{pond ? pond.name : hv.pondId}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={hv.harvestType} />
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-slate-700">
                        {formatNumber(hv.quantityFish)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-700">
                        {formatNumber(hv.totalWeightKg)} kg
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-600">{hv.avgWeightGrams} g</td>
                      <td className="py-3.5 px-4 text-xs text-slate-600">{hv.destination}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(hv.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Record Fish Harvest">
          <form onSubmit={handleAddHarvest} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Harvest Date *</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Harvest Type</label>
                <select
                  value={form.harvestType}
                  onChange={(e) => setForm({ ...form, harvestType: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  <option value="Partial">Partial Harvest</option>
                  <option value="Full">Full Harvest</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Source Pond *</label>
                <select
                  value={form.pondId}
                  onChange={(e) => setForm({ ...form, pondId: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  {farmData.ponds.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fish Batch *</label>
                <select
                  value={form.batchId}
                  onChange={(e) => setForm({ ...form, batchId: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  {farmData.batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.batchCode} ({b.species.split(' (')[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity Harvested (Fish) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={form.quantityFish}
                  onChange={(e) => setForm({ ...form, quantityFish: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Biomass Weight (kg) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.1"
                  value={form.totalWeightKg}
                  onChange={(e) => setForm({ ...form, totalWeightKg: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Buyer / Cold Storage Destination</label>
              <input
                type="text"
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={deductFromBatch}
                onChange={(e) => setDeductFromBatch(e.target.checked)}
                className="rounded text-sky-600"
              />
              Deduct harvested fish count from live batch inventory
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700"
              >
                Record Harvest
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  // ============================================================================
  // MODULE 9: SALES & CUSTOMERS
  // ============================================================================
  const SalesAndCustomersView = () => {
    const [subTab, setSubTab] = useState('sales'); // 'sales' | 'customers'
    const [saleModalOpen, setSaleModalOpen] = useState(false);
    const [custModalOpen, setCustModalOpen] = useState(false);

    const [saleForm, setSaleForm] = useState({
      date: '2026-11-18',
      customerId: farmData.customers[0]?.id || '',
      species: 'Rohu (Labeo rohita)',
      quantityKg: 250,
      pricePerKg: 3.60,
      paymentStatus: 'Paid',
      paymentMethod: 'Bank Transfer (NEFT)'
    });

    const [custForm, setCustForm] = useState({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      type: 'Wholesale Distributor'
    });

    const handleAddSale = (e) => {
      e.preventDefault();
      const qty = Number(saleForm.quantityKg);
      const price = Number(saleForm.pricePerKg);
      if (qty <= 0 || price <= 0) {
        addToast('Enter valid sale weight and price per kg.', 'error');
        return;
      }
      const newSale = {
        ...saleForm,
        id: `SL-2026-${100 + farmData.sales.length + 1}`,
        quantityKg: qty,
        pricePerKg: price,
        totalAmount: Number((qty * price).toFixed(2))
      };
      setFarmData((prev) => ({
        ...prev,
        sales: [newSale, ...prev.sales]
      }));
      addToast(`Sale invoice ${newSale.id} recorded (${formatCurrency(newSale.totalAmount)}).`);
      setSaleModalOpen(false);
    };

    const handleAddCustomer = (e) => {
      e.preventDefault();
      if (!custForm.name.trim()) {
        addToast('Customer or business name is required.', 'error');
        return;
      }
      const newCust = {
        ...custForm,
        id: `CUST-${Date.now()}`
      };
      setFarmData((prev) => ({
        ...prev,
        customers: [newCust, ...prev.customers]
      }));
      addToast(`Customer "${newCust.name}" added to directory.`);
      setCustModalOpen(false);
    };

    const togglePaymentStatus = (id) => {
      setFarmData((prev) => ({
        ...prev,
        sales: prev.sales.map((s) =>
          s.id === id ? { ...s, paymentStatus: s.paymentStatus === 'Paid' ? 'Pending' : 'Paid' } : s
        )
      }));
      addToast('Payment status updated.');
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSubTab('sales')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                subTab === 'sales' ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Sales Invoices ({farmData.sales.length})
            </button>
            <button
              onClick={() => setSubTab('customers')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                subTab === 'customers'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Customer Directory ({farmData.customers.length})
            </button>
          </div>

          {subTab === 'sales' ? (
            <button
              onClick={() => setSaleModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:opacity-95 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Record New Sale
            </button>
          ) : (
            <button
              onClick={() => {
                setCustForm({
                  name: '',
                  contactPerson: '',
                  phone: '',
                  email: '',
                  address: '',
                  type: 'Wholesale Distributor'
                });
                setCustModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:opacity-95 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Customer
            </button>
          )}
        </div>

        {subTab === 'sales' ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                    <th className="py-3.5 px-4">Invoice ID</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Species</th>
                    <th className="py-3.5 px-4 text-right">Qty (kg)</th>
                    <th className="py-3.5 px-4 text-right">Rate/kg</th>
                    <th className="py-3.5 px-4 text-right">Total</th>
                    <th className="py-3.5 px-4">Payment</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {farmData.sales.map((sale) => {
                    const cust = farmData.customers.find((c) => c.id === sale.customerId);
                    return (
                      <tr key={sale.id} className="hover:bg-sky-50/30">
                        <td className="py-3.5 px-4 font-bold text-sky-700">{sale.id}</td>
                        <td className="py-3.5 px-4 text-slate-600">{sale.date}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {cust ? cust.name : sale.customerId}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">{sale.species}</td>
                        <td className="py-3.5 px-4 text-right">{formatNumber(sale.quantityKg)} kg</td>
                        <td className="py-3.5 px-4 text-right text-slate-500">{formatCurrency(sale.pricePerKg)}</td>
                        <td className="py-3.5 px-4 text-right font-bold text-emerald-700">
                          {formatCurrency(sale.totalAmount)}
                        </td>
                        <td className="py-3.5 px-4">
                          <StatusBadge status={sale.paymentStatus} />
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => togglePaymentStatus(sale.id)}
                            className="text-xs font-semibold text-sky-600 hover:underline"
                          >
                            Toggle Paid
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {farmData.customers.map((cust) => {
              const custSales = farmData.sales
                .filter((s) => s.customerId === cust.id)
                .reduce((acc, s) => acc + Number(s.totalAmount), 0);

              return (
                <div key={cust.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full">
                        {cust.type}
                      </span>
                      <h3 className="text-base font-bold text-slate-800 mt-2">{cust.name}</h3>
                      <p className="text-xs text-slate-500">Contact: {cust.contactPerson}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Lifetime Orders</span>
                      <span className="text-base font-bold text-emerald-700">{formatCurrency(custSales)}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                    <p>Phone: {cust.phone}</p>
                    <p>Email: {cust.email}</p>
                    <p>Address: {cust.address}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* New Sale Modal */}
        <Modal isOpen={saleModalOpen} onClose={() => setSaleModalOpen(false)} title="Record Fish Sale">
          <form onSubmit={handleAddSale} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sale Date *</label>
                <input
                  type="date"
                  required
                  value={saleForm.date}
                  onChange={(e) => setSaleForm({ ...saleForm, date: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer *</label>
                <select
                  value={saleForm.customerId}
                  onChange={(e) => setSaleForm({ ...saleForm, customerId: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  {farmData.customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fish Species *</label>
              <select
                value={saleForm.species}
                onChange={(e) => setSaleForm({ ...saleForm, species: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
              >
                <option value="Rohu (Labeo rohita)">Rohu (Labeo rohita)</option>
                <option value="Catla (Catla catla)">Catla (Catla catla)</option>
                <option value="GIFT Tilapia">GIFT Tilapia</option>
                <option value="Common Carp">Common Carp</option>
                <option value="Pangasius">Pangasius</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity (kg) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.1"
                  value={saleForm.quantityKg}
                  onChange={(e) => setSaleForm({ ...saleForm, quantityKg: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Price per kg ($) *</label>
                <input
                  type="number"
                  required
                  min="0.1"
                  step="0.05"
                  value={saleForm.pricePerKg}
                  onChange={(e) => setSaleForm({ ...saleForm, pricePerKg: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-sm">
              <span className="font-medium text-emerald-900">Calculated Total Invoice:</span>
              <span className="text-lg font-bold text-emerald-700">
                {formatCurrency(Number(saleForm.quantityKg || 0) * Number(saleForm.pricePerKg || 0))}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Status</label>
                <select
                  value={saleForm.paymentStatus}
                  onChange={(e) => setSaleForm({ ...saleForm, paymentStatus: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  <option value="Paid">Paid</option>
                  <option value="Partial">Partial</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Method</label>
                <input
                  type="text"
                  value={saleForm.paymentMethod}
                  onChange={(e) => setSaleForm({ ...saleForm, paymentMethod: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSaleModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700"
              >
                Save Sale Invoice
              </button>
            </div>
          </form>
        </Modal>

        {/* New Customer Modal */}
        <Modal isOpen={custModalOpen} onClose={() => setCustModalOpen(false)} title="Add Customer">
          <form onSubmit={handleAddCustomer} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business / Customer Name *</label>
              <input
                type="text"
                required
                value={custForm.name}
                onChange={(e) => setCustForm({ ...custForm, name: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={custForm.contactPerson}
                  onChange={(e) => setCustForm({ ...custForm, contactPerson: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Buyer Type</label>
                <select
                  value={custForm.type}
                  onChange={(e) => setCustForm({ ...custForm, type: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  <option value="Wholesale Distributor">Wholesale Distributor</option>
                  <option value="Processor & Exporter">Processor & Exporter</option>
                  <option value="Retail Chain">Retail Chain</option>
                  <option value="HoReCa">HoReCa</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone *</label>
                <input
                  type="text"
                  required
                  value={custForm.phone}
                  onChange={(e) => setCustForm({ ...custForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={custForm.email}
                  onChange={(e) => setCustForm({ ...custForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Address</label>
              <input
                type="text"
                value={custForm.address}
                onChange={(e) => setCustForm({ ...custForm, address: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCustModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700"
              >
                Save Customer
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  // ============================================================================
  // MODULE 10: EXPENSE MANAGEMENT
  // ============================================================================
  const ExpenseManagementView = () => {
    const [catFilter, setCatFilter] = useState('All');
    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({
      date: '2026-11-18',
      category: 'Fish Feed',
      description: '',
      amount: '',
      vendor: '',
      paymentMethod: 'Bank Transfer'
    });

    const filteredExpenses = farmData.expenses.filter(
      (e) => catFilter === 'All' || e.category === catFilter
    );

    const profitMargin =
      metrics.totalSales > 0 ? ((metrics.netProfit / metrics.totalSales) * 100).toFixed(1) : '0.0';

    const handleAddExpense = (e) => {
      e.preventDefault();
      if (!form.description.trim() || Number(form.amount) <= 0) {
        addToast('Enter valid expense description and amount.', 'error');
        return;
      }
      const newExp = {
        ...form,
        id: `EXP-${Date.now()}`,
        amount: Number(form.amount)
      };
      setFarmData((prev) => ({
        ...prev,
        expenses: [newExp, ...prev.expenses]
      }));
      addToast(`Expense of ${formatCurrency(newExp.amount)} recorded.`);
      setModalOpen(false);
    };

    const handleDelete = (id) => {
      setFarmData((prev) => ({
        ...prev,
        expenses: prev.expenses.filter((e) => e.id !== id)
      }));
      addToast('Expense entry deleted.');
    };

    return (
      <div className="space-y-6">
        {/* Financial Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-semibold uppercase text-slate-400">Total Revenue</span>
            <p className="text-2xl font-bold text-sky-700 mt-1">{formatCurrency(metrics.totalSales)}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-semibold uppercase text-slate-400">Total Expenses</span>
            <p className="text-2xl font-bold text-rose-600 mt-1">{formatCurrency(metrics.totalExpenses)}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-semibold uppercase text-slate-400">Net Farm Profit</span>
            <p className={`text-2xl font-bold mt-1 ${metrics.netProfit >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {formatCurrency(metrics.netProfit)}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-semibold uppercase text-slate-400">Net Profit Margin</span>
            <p className="text-2xl font-bold text-slate-800 mt-1">{profitMargin}%</p>
          </div>
        </div>

        {/* Filter & Add Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none max-w-xs"
          >
            <option value="All">All Expense Categories</option>
            <option value="Fish Feed">Fish Feed</option>
            <option value="Labor & Wages">Labor & Wages</option>
            <option value="Medicines & Chemicals">Medicines & Chemicals</option>
            <option value="Fingerlings & Seed">Fingerlings & Seed</option>
            <option value="Electricity & Fuel">Electricity & Fuel</option>
            <option value="Equipment & Maintenance">Equipment & Maintenance</option>
          </select>
          <button
            onClick={() => {
              setForm({
                date: new Date().toISOString().split('T')[0],
                category: 'Fish Feed',
                description: '',
                amount: '',
                vendor: '',
                paymentMethod: 'Bank Transfer'
              });
              setModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:opacity-95 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Record Expense
          </button>
        </div>

        {/* Expenses Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4">Vendor</th>
                  <th className="py-3.5 px-4 text-right">Amount</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-sky-50/30">
                    <td className="py-3.5 px-4 text-slate-600">{exp.date}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        {exp.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{exp.description}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{exp.vendor}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-rose-600">{formatCurrency(exp.amount)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Log Farm Operating Expense">
          <form onSubmit={handleAddExpense} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date *</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl bg-white outline-none"
                >
                  <option value="Fish Feed">Fish Feed</option>
                  <option value="Labor & Wages">Labor & Wages</option>
                  <option value="Medicines & Chemicals">Medicines & Chemicals</option>
                  <option value="Fingerlings & Seed">Fingerlings & Seed</option>
                  <option value="Electricity & Fuel">Electricity & Fuel</option>
                  <option value="Equipment & Maintenance">Equipment & Maintenance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Expense Description *</label>
              <input
                type="text"
                required
                placeholder="e.g., 1.5 Tons Floating Feed Pellets"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Amount ($) *</label>
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Vendor / Payee</label>
                <input
                  type="text"
                  value={form.vendor}
                  onChange={(e) => setForm({ ...form, vendor: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-semibold text-white bg-sky-600 rounded-xl hover:bg-sky-700"
              >
                Save Expense
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  };

  // ============================================================================
  // MODULE 11: REPORTS & ANALYTICS
  // ============================================================================
  const ReportsAnalyticsView = () => {
    const expenseBreakdown = useMemo(() => {
      const map = {};
      farmData.expenses.forEach((e) => {
        map[e.category] = (map[e.category] || 0) + Number(e.amount || 0);
      });
      return Object.entries(map).map(([label, value]) => ({ label, value }));
    }, []);

    const salesBySpecies = useMemo(() => {
      const map = {};
      farmData.sales.forEach((s) => {
        const name = s.species.split(' (')[0];
        map[name] = (map[name] || 0) + Number(s.totalAmount || 0);
      });
      return Object.entries(map).map(([label, value]) => ({ label, value }));
    }, []);

    const exportCSV = (reportType) => {
      let csvContent = '';
      let fileName = `aquapulse_${reportType}_report.csv`;

      if (reportType === 'production') {
        csvContent = 'Batch Code,Species,Pond ID,Initial Qty,Current Qty,Avg Weight (g),Biomass (kg),Status\n';
        farmData.batches.forEach((b) => {
          const bio = ((b.currentQty * b.avgWeightGrams) / 1000).toFixed(1);
          csvContent += `"${b.batchCode}","${b.species}","${b.pondId}",${b.initialQty},${b.currentQty},${b.avgWeightGrams},${bio},"${b.status}"\n`;
        });
      } else if (reportType === 'sales') {
        csvContent = 'Invoice ID,Date,Species,Quantity (kg),Price/kg ($),Total ($),Status\n';
        farmData.sales.forEach((s) => {
          csvContent += `"${s.id}","${s.date}","${s.species}",${s.quantityKg},${s.pricePerKg},${s.totalAmount},"${s.paymentStatus}"\n`;
        });
      } else if (reportType === 'expenses') {
        csvContent = 'ID,Date,Category,Description,Vendor,Amount ($)\n';
        farmData.expenses.forEach((e) => {
          csvContent += `"${e.id}","${e.date}","${e.category}","${e.description}","${e.vendor}",${e.amount}\n`;
        });
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addToast(`Exported ${fileName} successfully.`);
    };

    return (
      <div className="space-y-6">
        {/* Export Action Banner */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">Executive Farm Performance & CSV Exports</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Download structured CSV statements for accounting, pond yield audits, and revenue tracking.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => exportCSV('production')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 rounded-xl hover:bg-sky-100"
            >
              <Download className="w-3.5 h-3.5" /> Production CSV
            </button>
            <button
              onClick={() => exportCSV('sales')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl hover:bg-emerald-100"
            >
              <Download className="w-3.5 h-3.5" /> Sales CSV
            </button>
            <button
              onClick={() => exportCSV('expenses')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-200"
            >
              <Download className="w-3.5 h-3.5" /> Expenses CSV
            </button>
          </div>
        </div>

        {/* Breakdown Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-slate-800 mb-1">Revenue by Fish Species</h3>
            <p className="text-xs text-slate-500 mb-5">Cumulative commercial sales breakdown</p>
            <DonutChart items={salesBySpecies} valueSuffix="$" />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-slate-800 mb-1">Operating Expense Distribution</h3>
            <p className="text-xs text-slate-500 mb-5">Cost allocation across feed, labor, and utilities</p>
            <DonutChart items={expenseBreakdown} valueSuffix="$" />
          </div>
        </div>

        {/* Pond Performance Matrix */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">Pond-by-Pond Biomass & Survival Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500">
                  <th className="py-3.5 px-4">Pond Name</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Current Stock</th>
                  <th className="py-3.5 px-4 text-right">Standing Biomass</th>
                  <th className="py-3.5 px-4 text-right">Avg Survival</th>
                  <th className="py-3.5 px-4 text-right">Density (fish/sq.m)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {farmData.ponds.map((pond) => {
                  const batches = farmData.batches.filter((b) => b.pondId === pond.id);
                  const currentStock = batches.reduce((s, b) => s + Number(b.currentQty), 0);
                  const initialStock = batches.reduce((s, b) => s + Number(b.initialQty), 0);
                  const biomass = batches.reduce((s, b) => s + (b.currentQty * b.avgWeightGrams) / 1000, 0);
                  const survival = initialStock > 0 ? ((currentStock / initialStock) * 100).toFixed(1) : '—';
                  const density = pond.size > 0 ? (currentStock / pond.size).toFixed(2) : '0.00';

                  return (
                    <tr key={pond.id} className="hover:bg-sky-50/30">
                      <td className="py-3.5 px-4 font-bold text-slate-800">{pond.name}</td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={pond.status} />
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium">{formatNumber(currentStock)}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-700">
                        {formatNumber(Math.round(biomass))} kg
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-700">
                        {survival === '—' ? '—' : `${survival}%`}
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-500">{density}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // RENDER ACTIVE MODULE CONTENT
  // ============================================================================
  const [authUser, setAuthUser] = useState(() => {
    try {
      const savedAuth = localStorage.getItem('aquapulse_auth_user_v1');
      if (savedAuth) return JSON.parse(savedAuth);
    } catch (e) {
      console.error('Failed to read auth state', e);
    }
    return null;
  });

  const [loginEmail, setLoginEmail] = useState('manager@aquapulse.farm');
  const [loginPassword, setLoginPassword] = useState('farm1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both your email/username and password.');
      return;
    }
    if (loginPassword.length < 4) {
      setLoginError('Password must be at least 4 characters long.');
      return;
    }

    const userObj = {
      name: 'Farm Manager',
      role: 'Farm Manager',
      email: loginEmail.trim()
    };
    setAuthUser(userObj);
    if (rememberMe) {
      try {
        localStorage.setItem('aquapulse_auth_user_v1', JSON.stringify(userObj));
      } catch (err) {
        console.error('Failed to persist auth state', err);
      }
    }
    addToast('Welcome back, Farm Manager!');
  };

  const handleQuickDemoLogin = () => {
    const userObj = {
      name: 'Farm Manager',
      role: 'Farm Manager',
      email: 'manager@aquapulse.farm'
    };
    setLoginEmail('manager@aquapulse.farm');
    setLoginPassword('farm1234');
    setLoginError('');
    setAuthUser(userObj);
    try {
      localStorage.setItem('aquapulse_auth_user_v1', JSON.stringify(userObj));
    } catch (err) {
      console.error('Failed to persist auth state', err);
    }
    addToast('Signed in to Demo Workspace as Farm Manager.');
  };

  const handleSignOut = () => {
    setAuthUser(null);
    setMobileMenuOpen(false);
    try {
      localStorage.removeItem('aquapulse_auth_user_v1');
    } catch (err) {
      console.error('Failed to clear auth state', err);
    }
    addToast('You have been signed out safely.', 'success');
  };

  const activeNavObj = navItems.find((item) => item.id === activeTab) || navItems[0];

  const renderModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'ponds':
        return <PondManagementView />;
      case 'fish':
        return <FishManagementView />;
      case 'feeding':
        return <FeedingManagementView />;
      case 'water':
        return <WaterQualityView />;
      case 'health':
        return <FishHealthView />;
      case 'inventory':
        return <InventoryManagementView />;
      case 'harvest':
        return <HarvestManagementView />;
      case 'sales':
        return <SalesAndCustomersView />;
      case 'expenses':
        return <ExpenseManagementView />;
      case 'reports':
        return <ReportsAnalyticsView />;
      default:
        return <DashboardView />;
    }
  };

  if (!authUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-sky-200">
              <Fish className="w-8 h-8" />
            </div>
          </div>
          <h1 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            AquaPulse
          </h1>
          <p className="mt-1 text-center text-sm font-medium text-slate-500">
            Fish Farm Management System • Farm Manager Portal
          </p>
        </div>

        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-slate-200/60 rounded-3xl border border-slate-200/80">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-800">Sign in to your workspace</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Access pond telemetry, feeding schedules, water quality & financials.
              </p>
            </div>

            {loginError && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs font-semibold text-rose-700">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email or Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="manager@aquapulse.farm"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                  />
                  Remember me on this device
                </label>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Role: Farm Manager
                </span>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-sky-600 to-emerald-600 text-white text-sm font-bold rounded-xl hover:opacity-95 shadow-md shadow-sky-200/60 transition-all"
              >
                Sign In as Farm Manager <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-slate-400 font-medium">Instant Access</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-200 text-xs font-bold rounded-xl transition-all"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Quick Demo Sign In (Farm Manager)
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Demo Credentials: <span className="font-semibold text-slate-600">manager@aquapulse.farm</span> /{' '}
            <span className="font-semibold text-slate-600">farm1234</span>
          </p>
        </div>

        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row font-sans">
      {/* Mobile Sidebar Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Navigation Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-68 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-sky-600 to-emerald-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/15 rounded-xl backdrop-blur-xs">
              <Fish className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight block leading-none">AquaPulse</span>
              <span className="text-[11px] text-sky-100 font-medium">Fish Farm OS</span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-50 to-emerald-50 text-sky-700 border border-sky-200/70 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / Reset Demo & Sign Out */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-2">
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Demo Data
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50/70 border border-rose-200/80 rounded-xl hover:bg-rose-100 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-800">{activeNavObj.label}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="relative p-2 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-colors"
              title="View System Alerts"
            >
              <Bell className="w-5 h-5" />
              {metrics.alerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>
            <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-600 to-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                FM
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-800 leading-tight">Farm Manager</p>
                <p className="text-slate-400">{authUser?.email || 'Operations Lead'}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-xl transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Active Module Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{renderModule()}</main>
      </div>

      {/* Reset Demo Confirmation Modal */}
      <Modal
        isOpen={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        title="Reset Sample Farm Data?"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            This will restore all ponds, fish batches, feeding schedules, water logs, inventory, and financial records back
            to the initial demo dataset.
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setResetConfirmOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleResetDemoData}
              className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-700"
            >
              Yes, Reset Data
            </button>
          </div>
        </div>
      </Modal>

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}