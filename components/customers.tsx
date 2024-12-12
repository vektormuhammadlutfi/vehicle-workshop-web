'use client';

import { useEffect, useState } from 'react';
import { CustomersResponse, Customer } from '../types/CustomerTypes';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          'https://vehicle-workshop-api.onrender.com/api/customers'
        );
        if (!response.ok) throw new Error('Network response was not ok');

        const data: CustomersResponse = await response.json();
        // Ensure data structure is as expected
        if (data?.data?.customers) {
          setCustomers(data.data.customers);
        } else {
          throw new Error('Unexpected data structure');
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>List of Customers</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">First name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.firstName}</TableCell>
              <TableCell>{customer.lastName}</TableCell>
              <TableCell>{customer.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Customers;
