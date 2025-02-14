'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Menu,
  Truck,
  LayoutDashboard,
  FileText,
  ClipboardList,
  FileOutput,
  FileInput,
  Clock,
  Tag,
  ShoppingCart,
  Package,
  Receipt,
  CreditCard,
  DollarSign,
  Box,
  Car,
  Wallet,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onToggle?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({
  className,
  isOpen = true,
  onToggle,
  mobileOpen,
  onMobileClose
}: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['workOrder']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((current) =>
      current.includes(menuId)
        ? current.filter((id) => id !== menuId)
        : [...current, menuId]
    );
  };

  const SidebarContent = (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 mb-8">
          <Truck className="h-8 w-8 text-green-700" />
          {isOpen && (
            <span className="text-xl font-bold text-green-700">App</span>
          )}
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-gray-400">
          {isOpen && 'TRANSACTION'}
        </h2>
        <div className="space-y-1">
          <NavItem
            icon={LayoutDashboard}
            title="Dashboard"
            collapsed={!isOpen}
          />
          <NavItem icon={FileText} title="Summary" collapsed={!isOpen} />

          {/* Work Order Section */}
          <div>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-between',
                expandedMenus.includes('workOrder') && 'bg-gray-100'
              )}
              onClick={() => toggleMenu('workOrder')}
            >
              <div className="flex items-center">
                <FileInput className="h-4 w-4 mr-2" />
                {isOpen && <span>Work Order</span>}
              </div>
              {isOpen && (
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    expandedMenus.includes('workOrder') && 'rotate-180'
                  )}
                />
              )}
            </Button>

            {expandedMenus.includes('workOrder') && isOpen && (
              <div className="pl-6 space-y-1 mt-1">
                <NavItem
                  icon={Clock}
                  title="Work in Process"
                  collapsed={!isOpen}
                />
                <NavItem
                  icon={Tag}
                  title="Work Order Estimation"
                  collapsed={!isOpen}
                />
                <NavItem
                  icon={FileOutput}
                  title="Work Order Cancel"
                  collapsed={!isOpen}
                />
                <NavItem
                  icon={Clock}
                  title="Work Order Log"
                  collapsed={!isOpen}
                />
                <NavItem icon={Tag} title="Label Sent" collapsed={!isOpen} />
                <NavItem
                  icon={ClipboardList}
                  title="Follow Up"
                  collapsed={!isOpen}
                />
                <NavItem
                  icon={ShoppingCart}
                  title="Job Order"
                  collapsed={!isOpen}
                />
                <NavItem
                  icon={Package}
                  title="Warranty Claim"
                  collapsed={!isOpen}
                />
                <NavItem icon={Receipt} title="Invoice" collapsed={!isOpen} />
                <NavItem
                  icon={CreditCard}
                  title="Credit Note"
                  collapsed={!isOpen}
                />
              </div>
            )}
          </div>

          {/* Parts Section */}
          <div>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-between',
                expandedMenus.includes('parts') && 'bg-gray-100'
              )}
              onClick={() => toggleMenu('parts')}
            >
              <div className="flex items-center">
                <Box className="h-4 w-4 mr-2" />
                {isOpen && <span>Parts</span>}
              </div>
              {isOpen && (
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    expandedMenus.includes('parts') && 'rotate-180'
                  )}
                />
              )}
            </Button>

            {expandedMenus.includes('parts') && isOpen && (
              <div className="pl-6 space-y-1 mt-1">
                <NavItem
                  icon={Box}
                  title="Part Receiving"
                  collapsed={!isOpen}
                />
                <NavItem
                  icon={ShoppingCart}
                  title="Part Order"
                  collapsed={!isOpen}
                />
                <NavItem
                  icon={Package}
                  title="Part Sales"
                  collapsed={!isOpen}
                />
                <NavItem icon={Box} title="Part Sales V2" collapsed={!isOpen} />
                <NavItem
                  icon={Package}
                  title="Part Stock Part"
                  collapsed={!isOpen}
                />
              </div>
            )}
          </div>

          {/* Services Section */}
          <div>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-between',
                expandedMenus.includes('services') && 'bg-gray-100'
              )}
              onClick={() => toggleMenu('services')}
            >
              <div className="flex items-center">
                <Car className="h-4 w-4 mr-2" />
                {isOpen && <span>Services</span>}
              </div>
              {isOpen && (
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    expandedMenus.includes('services') && 'rotate-180'
                  )}
                />
              )}
            </Button>

            {expandedMenus.includes('services') && isOpen && (
              <div className="pl-6 space-y-1 mt-1">
                <NavItem icon={Car} title="Washing" collapsed={!isOpen} />
                <NavItem icon={Wallet} title="Stock Card" collapsed={!isOpen} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block',
          isOpen ? 'w-[240px]' : 'w-[80px]',
          className
        )}
      >
        <ScrollArea className="h-full py-6">{SidebarContent}</ScrollArea>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="w-[240px] p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  title: string;
  collapsed?: boolean;
  active?: boolean;
}

function NavItem({ icon: Icon, title, collapsed, active }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start',
        active && 'bg-gray-100 text-green-700',
        collapsed ? 'px-2' : 'px-4'
      )}
    >
      <Icon
        className={cn(
          'h-4 w-4',
          active && 'text-green-700',
          collapsed ? 'mx-auto' : 'mr-2'
        )}
      />
      {!collapsed && <span>{title}</span>}
    </Button>
  );
}
