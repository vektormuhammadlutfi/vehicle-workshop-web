'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  Download,
  ChevronLeft,
  ChevronRight,
  Search,
  FileText,
  Loader2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { fetchWorkOrders, type WorkOrder } from '@/lib/api';

export function WorkOrderList() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedBranch, setSelectedBranch] = useState<string>();
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(totalItems / pageSize);

  const loadWorkOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchWorkOrders(
        currentPage,
        pageSize,
        selectedBranch,
        startDate?.toISOString().split('T')[0],
        endDate?.toISOString().split('T')[0]
      );

      setWorkOrders(response.data);
      setTotalItems(response.total);
    } catch (err) {
      setError('Failed to load work orders. Please try again later.');
      console.error('Error loading work orders:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWorkOrders();
  }, [currentPage, pageSize, selectedBranch]);

  const handleSearch = () => {
    setCurrentPage(1);
    loadWorkOrders();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize: string) => {
    setPageSize(parseInt(newSize));
    setCurrentPage(1);
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-green-700 p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="h-5 w-5 text-white" />
          <h1 className="text-white text-xl font-semibold">
            Work Order Report
          </h1>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Branch
                </label>
                <Select
                  value={selectedBranch}
                  onValueChange={setSelectedBranch}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SERUI GENERAL REPAIR">
                      SERUI GENERAL REPAIR
                    </SelectItem>
                    <SelectItem value="JAKARTA SERVICE CENTER">
                      JAKARTA SERVICE CENTER
                    </SelectItem>
                    <SelectItem value="BANDUNG WORKSHOP">
                      BANDUNG WORKSHOP
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Start Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !startDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? (
                        format(startDate, 'MM/dd/yyyy')
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !endDate && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? (
                        format(endDate, 'MM/dd/yyyy')
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">
                  Transaction Type
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Invoice Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invoice">Invoice Date</SelectItem>
                    <SelectItem value="other">Other Types</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="mr-2 h-4 w-4" />
                  )}
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Display</span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={handlePageSizeChange}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder={pageSize.toString()} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                className="text-green-700 border-green-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Report Work Order Download here
              </Button>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[50px]">No</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Work Order No</TableHead>
                    <TableHead>Work Order Date</TableHead>
                    <TableHead>Service Invoice</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Vehicle Unit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Service Advisor</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Frame Serial No</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={11} className="h-24 text-center">
                        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      </TableCell>
                    </TableRow>
                  ) : workOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} className="h-24 text-center">
                        No work orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    workOrders.map((order, index) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {(currentPage - 1) * pageSize + index + 1}
                        </TableCell>
                        <TableCell>{order.branch}</TableCell>
                        <TableCell>{order.workOrderNo}</TableCell>
                        <TableCell>{order.workOrderDate}</TableCell>
                        <TableCell>{order.serviceInvoice}</TableCell>
                        <TableCell>{order.invoiceDate}</TableCell>
                        <TableCell>{order.vehicleUnit}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              order.status === 'Invoice'
                                ? 'default'
                                : 'secondary'
                            }
                            className={cn(
                              order.status === 'Invoice' &&
                                'bg-green-100 text-green-800 hover:bg-green-100',
                              order.status === 'Settlement' &&
                                'bg-blue-100 text-blue-800 hover:bg-blue-100',
                              order.status === 'In Progress' &&
                                'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
                              order.status === 'Pending' &&
                                'bg-gray-100 text-gray-800 hover:bg-gray-100'
                            )}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.serviceAdvisor}</TableCell>
                        <TableCell>{order.technician}</TableCell>
                        <TableCell>
                          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                            {order.frameSerialNo}
                          </code>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {(currentPage - 1) * pageSize + 1} to{' '}
                {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{' '}
                entries
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isLoading}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant="outline"
                      size="sm"
                      className={cn(
                        pageNum === currentPage && 'bg-green-700 text-white'
                      )}
                      onClick={() => handlePageChange(pageNum)}
                      disabled={isLoading}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isLoading}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
