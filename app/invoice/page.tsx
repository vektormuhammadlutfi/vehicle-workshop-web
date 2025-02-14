"use client";

import { AdminLayout } from "@/components/layout/admin-layout";
import { InvoiceList } from "@/components/modules/invoice/invoice-list";

export default function InvoicePage() {
  return (
    <AdminLayout>
      <InvoiceList />
    </AdminLayout>
  );
}
