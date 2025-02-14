"use client";

import { AdminLayout } from "@/components/layout/admin-layout";
import { WorkOrderList } from "@/components/modules/work-order/work-order-list";

export default function WorkOrderPage() {
  return (
    <AdminLayout>
      <WorkOrderList />
    </AdminLayout>
  );
}
