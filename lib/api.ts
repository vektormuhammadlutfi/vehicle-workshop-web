import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002'
});

export interface WorkOrder {
  id: number;
  branch: string;
  workOrderNo: string;
  workOrderDate: string;
  serviceInvoice: string;
  invoiceDate: string;
  vehicleUnit: string;
  status: string;
  serviceAdvisor: string;
  technician: string;
  frameSerialNo: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export const fetchWorkOrders = async (
  page: number = 1,
  limit: number = 10,
  branch?: string,
  startDate?: string,
  endDate?: string
): Promise<PaginatedResponse<WorkOrder>> => {
  let url = `/workorders?_page=${page}&_limit=${limit}`;

  if (branch) {
    url += `&branch=${encodeURIComponent(branch)}`;
  }
  if (startDate) {
    url += `&workOrderDate_gte=${startDate}`;
  }
  if (endDate) {
    url += `&workOrderDate_lte=${endDate}`;
  }

  const response = await api.get(url);

  return {
    data: response.data,
    total: parseInt(response.headers['x-total-count'] || '0'),
    page,
    limit
  };
};
