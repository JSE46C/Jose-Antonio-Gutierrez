
export enum OrderStatus {
  PENDING = 'Pendiente de firma',
  IN_PROGRESS = 'En curso',
  COMPLETED = 'Completada',
  HIGH_PRIORITY = 'Urgente'
}

export interface Material {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  comment?: string;
}

export interface LaborLog {
  id: string;
  technician: string;
  initials: string;
  time: string;
  duration: string;
  type: 'HN' | 'Extra' | 'Travel';
}

export interface WorkOrder {
  id: string;
  title: string;
  subtitle: string;
  status: OrderStatus;
  assignee: string;
  clientName: string;
  clientId: string;
  location: string;
  description: string;
  imageUrl: string;
  dueDate: string;
  materials: Material[];
  laborLogs: LaborLog[];
}
