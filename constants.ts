
import { OrderStatus, WorkOrder } from './types';

export const MOCK_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'WO-4829',
    title: 'Genie GS-1930 (Scissor Lift)',
    subtitle: 'Battery Maintenance',
    status: OrderStatus.HIGH_PRIORITY,
    assignee: 'Roberto Sanchez',
    location: 'Logistics Center - Zone B',
    description: 'Platform does not elevate to full height. Battery indicator shows full charge but lift motor sounds weak.',
    imageUrl: 'https://img.directindustry.com/images_di/photo-g/16478-16168863.jpg',
    dueDate: 'Today, 2:00 PM',
    materials: [
      { id: '1', name: 'Hydraulic Seal Kit', sku: 'HSK-9920', quantity: 1, price: 45.00 }
    ],
    laborLogs: [
      { id: 'L1', technician: 'John Doe', initials: 'JD', time: 'Today, 10:00 AM', duration: '2.5 hrs' }
    ]
  },
  {
    id: 'WO-4880',
    title: 'Toyota 8FGU25 (Forklift)',
    subtitle: 'Mast Hydraulic Inspection',
    status: OrderStatus.IN_PROGRESS,
    assignee: 'Maria Garcia',
    location: 'Main Warehouse - Aisle 4',
    description: 'Slow leak detected in the primary mast hydraulic cylinder. Requires pressure testing and potential seal replacement.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_x1y1cKwbVd6G4j0M3tQ6rGZ4oKq6_aKq7w&s',
    dueDate: 'Tomorrow, 9:00 AM',
    materials: [],
    laborLogs: []
  }
];

export const CLIENT_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuC-ZB7kE6pexSJXNOd1joCztBshAgzfCj8EMxwioyi-Ncx0YSL80S6KqMEK1P9OfR2_ATNtIzb_N7JEvgeWfterCEpwEGMGLd-9uxafkFAQxh0INIigTt6MlZvaZus7G-6XLwnRlZUfZ_xoLeq7G4DgLkKKVy4g44NchjG8p6WqT6DuYjVRBpMLDxeVjtNtERcbUiDdx98Ex-yP4aLDOxx8I5u9ZcDG2lHj5FmnHR8tGE4pg_gIkrnYLI8WeedOymLfgHxPX0kyp20";
