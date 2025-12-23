
import { OrderStatus, WorkOrder } from './types';

export const MOCK_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'WO-4829',
    title: 'Genie GS-1930 (Scissor Lift)',
    subtitle: 'Battery Maintenance',
    status: OrderStatus.HIGH_PRIORITY,
    assignee: 'Roberto Sanchez',
    clientName: 'Logistics Center Inc.',
    clientId: 'CL-990',
    location: 'Logistics Center - Zone B',
    description: 'Platform does not elevate to full height. Battery indicator shows full charge but lift motor sounds weak.',
    imageUrl: 'https://img.directindustry.com/images_di/photo-g/16478-16168863.jpg',
    dueDate: 'Today, 2:00 PM',
    materials: [
      { id: '1', name: 'Hydraulic Seal Kit', sku: 'HSK-9920', quantity: 1, price: 45.00 }
    ],
    laborLogs: [
      { id: 'L1', technician: 'John Doe', initials: 'JD', time: 'Today, 10:00 AM', duration: '2.5 hrs', type: 'HN' }
    ]
  },
  {
    id: 'WO-4880',
    title: 'Toyota 8FGU25 (Forklift)',
    subtitle: 'Mast Hydraulic Inspection',
    status: OrderStatus.IN_PROGRESS,
    assignee: 'Maria Garcia',
    clientName: 'Main Warehouse Ltd.',
    clientId: 'CL-552',
    location: 'Main Warehouse - Aisle 4',
    description: 'Slow leak detected in the primary mast hydraulic cylinder. Requires pressure testing and potential seal replacement.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_x1y1cKwbVd6G4j0M3tQ6rGZ4oKq6_aKq7w&s',
    dueDate: 'Tomorrow, 9:00 AM',
    materials: [],
    laborLogs: []
  },
  {
    id: 'WO-5012',
    title: 'Haulotte HA16 RTJ',
    subtitle: 'Engine Service',
    status: OrderStatus.PENDING,
    assignee: 'Sergio Gutierrez',
    clientName: 'Construction Site X',
    clientId: 'CL-122',
    location: 'Sector 7 - West Gate',
    description: 'Scheduled 500h service. Oil change, filters replacement, and general safety inspection.',
    imageUrl: 'https://www.haulotte.es/sites/haulotte/files/styles/product_detail_main/public/products/main-images/HA16%20RTJ%20PRO_0.jpg?itok=3z6S1U2o',
    dueDate: 'Today, 4:00 PM',
    materials: [],
    laborLogs: []
  },
  {
    id: 'WO-5120',
    title: 'JLG 450AJ Articulated Boom',
    subtitle: 'Hydraulic Leak',
    status: OrderStatus.IN_PROGRESS,
    assignee: 'Ivan Gutierrez',
    clientName: 'Industrial Park South',
    clientId: 'CL-880',
    location: 'Building 4 - Maintenance Dock',
    description: 'Client reports hydraulic fluid on the floor under the main turntable area.',
    imageUrl: 'https://www.jlg.com/-/media/jlg/images/products/engine-powered-boom-lifts/articulating/450aj/450aj-articulating-boom-lift-large.jpg',
    dueDate: 'Today, 5:30 PM',
    materials: [],
    laborLogs: []
  },
  {
    id: 'WO-5244',
    title: 'Still RX 20-20 (Electric Forklift)',
    subtitle: 'Display Error E244',
    status: OrderStatus.PENDING,
    assignee: 'Roberto Sanchez',
    clientName: 'Cold Storage Co.',
    clientId: 'CL-440',
    location: 'Freezer Area 1',
    description: 'Error E244 appearing intermittently. Traction motor stops responding when turning sharply.',
    imageUrl: 'https://www.still.co.uk/fileadmin/_processed_/9/c/csm_RX_20_14-20_HighRes_07_7531778f6f.jpg',
    dueDate: 'Wednesday, 8:00 AM',
    materials: [],
    laborLogs: []
  },
  {
    id: 'WO-5301',
    title: 'Manitou MT 625 H',
    subtitle: 'Forks Adjustment',
    status: OrderStatus.HIGH_PRIORITY,
    assignee: 'Maria Garcia',
    clientName: 'Urban Builders',
    clientId: 'CL-211',
    location: 'City Center Project',
    description: 'Hydraulic fork positioner is stuck on the left side. Urgent for unloading materials arriving at 3 PM.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8Xf9wL-M7Z1_H_fKk-2-S6v0o8-qCq-FfQg&s',
    dueDate: 'Today, 1:00 PM',
    materials: [],
    laborLogs: []
  },
  {
    id: 'WO-5400',
    title: 'Linde H35T (LPG Forklift)',
    subtitle: 'Cooling System Check',
    status: OrderStatus.IN_PROGRESS,
    assignee: 'Sergio Gutierrez',
    clientName: 'Main Warehouse Ltd.',
    clientId: 'CL-552',
    location: 'Loading Bay 3',
    description: 'Engine temperature rising above normal limits during heavy duty cycles.',
    imageUrl: 'https://www.linde-mh.es/es/Media/Contenido/Product-Images/Product-Images-16-9/IC-Trucks-H20-H35-Linde-MH-16-9.jpg',
    dueDate: 'Tomorrow, 11:00 AM',
    materials: [],
    laborLogs: []
  },
  {
    id: 'WO-5589',
    title: 'Hyster H2.5XT',
    subtitle: 'Chain Lubrication',
    status: OrderStatus.PENDING,
    assignee: 'Ivan Gutierrez',
    clientName: 'Agro Industrial SA',
    clientId: 'CL-099',
    location: 'Packaging Line A',
    description: 'Mast chains are making excessive noise. Requires cleaning and high-viscosity lubrication.',
    imageUrl: 'https://www.hyster.com/globalassets/hyster-images/h2.0-3.0xt_hero.jpg',
    dueDate: 'Friday, 10:00 AM',
    materials: [],
    laborLogs: []
  },
  {
    id: 'WO-5612',
    title: 'Komatsu FB25-12',
    subtitle: 'Brake Pad Replacement',
    status: OrderStatus.PENDING,
    assignee: 'Roberto Sanchez',
    clientName: 'Steel Mill North',
    clientId: 'CL-333',
    location: 'Dispatch Area',
    description: 'Braking distance is increasing. Check wear on front discs and replace pads if necessary.',
    imageUrl: 'https://www.komatsu.jp/en/products/forklift/-/media/project/komatsuglobal/komatsuglobal/products/forklift/electric/fb20-30-12/fb25-12.jpg',
    dueDate: 'Monday, 9:00 AM',
    materials: [],
    laborLogs: []
  }
];

export const CLIENT_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuC-ZB7kE6pexSJXNOd1joCztBshAgzfCj8EMxwioyi-Ncx0YSL80S6KqMEK1P9OfR2_ATNtIzb_N7JEvgeWfterCEpwEGMGLd-9uxafkFAQxh0INIigTt6MlZvaZus7G-6XLwnRlZUfZ_xoLeq7G4DgLkKKVy4g44NchjG8p6WqT6DuYjVRBpMLDxeVjtNtERcbUiDdx98Ex-yP4aLDOxx8I5u9ZcDG2lHj5FmnHR8tGE4pg_gIkrnYLI8WeedOymLfgHxPX0kyp20";
