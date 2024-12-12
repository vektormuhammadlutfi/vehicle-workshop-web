import { Payment, columns } from './columns';
import { DataTable } from './data-table';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com'
    },
    {
      id: '4',
      amount: 50.75,
      status: 'failed',
      email: 'customer4@example.com'
    },
    {
      id: '5',
      amount: 1200.0,
      status: 'success',
      email: 'customer5@example.com'
    },
    {
      id: '6',
      amount: 230.99,
      status: 'pending',
      email: 'customer6@example.com'
    }
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-col pt-4">
        <div className="container mx-auto">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </SidebarInset>
  );
}
