
export enum OrderStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  HIGH_PRIORITY = 'High Priority'
}

export interface Material {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

export interface LaborLog {
  id: string;
  technician: string;
  initials: string;
  time: string;
  duration: string;
}

export interface WorkOrder {
  id: string;
  title: string;
  subtitle: string;
  status: OrderStatus;
  assignee: string;
  location: string;
  description: string;
  imageUrl: string;
  dueDate: string;
  materials: Material[];
  laborLogs: LaborLog[];
}
