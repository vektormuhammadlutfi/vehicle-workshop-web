'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Truck,
  LayoutDashboard,
  FileText,
  ClipboardList,
  FileOutput,
  Clock,
  Tag,
  ShoppingCart,
  Package,
  CreditCard,
  Box,
  Car,
  Wallet,
  ChevronDown
} from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onToggle?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

interface NavItemProps {
  icon: React.ElementType;
  title: string;
  collapsed?: boolean;
  active?: boolean;
}

interface MenuSectionProps {
  title: string;
  menuId: string;
  items: NavItemProps[];
  expandedMenus: string[];
  toggleMenu: (menuId: string) => void;
  isOpen: boolean;
}

const NavItem = ({ icon: Icon, title, collapsed, active }: NavItemProps) => (
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

const MenuSection = ({
  title,
  menuId,
  items,
  expandedMenus,
  toggleMenu,
  isOpen
}: MenuSectionProps) => (
  <div>
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-between',
        expandedMenus.includes(menuId) && 'bg-gray-100'
      )}
      onClick={() => toggleMenu(menuId)}
    >
      <div className="flex items-center">
        <Box className="h-4 w-4 mr-2" />
        {isOpen && <span>{title}</span>}
      </div>
      {isOpen && (
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform',
            expandedMenus.includes(menuId) && 'rotate-180'
          )}
        />
      )}
    </Button>

    {expandedMenus.includes(menuId) && isOpen && (
      <div className="pl-6 space-y-1 mt-1">
        {items.map((item) => (
          <NavItem key={item.title} {...item} collapsed={!isOpen} />
        ))}
      </div>
    )}
  </div>
);

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
    <div className="space-y-1">
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

          <MenuSection
            title="Work Order"
            menuId="workOrder"
            items={[
              { icon: Clock, title: 'Work in Process' },
              { icon: Tag, title: 'Work Order Estimation' },
              { icon: FileOutput, title: 'Work Order Cancel' },
              { icon: Clock, title: 'Work Order Log' },
              { icon: Tag, title: 'Label Sent' },
              { icon: ClipboardList, title: 'Follow Up' },
              { icon: ShoppingCart, title: 'Job Order' },
              { icon: Package, title: 'Warranty Claim' },
              { icon: CreditCard, title: 'Credit Note' }
            ]}
            expandedMenus={expandedMenus}
            toggleMenu={toggleMenu}
            isOpen={isOpen}
          />

          <MenuSection
            title="Parts"
            menuId="parts"
            items={[
              { icon: Box, title: 'Part Receiving' },
              { icon: ShoppingCart, title: 'Part Order' },
              { icon: Package, title: 'Part Sales' },
              { icon: Box, title: 'Part Sales V2' },
              { icon: Package, title: 'Part Stock Part' }
            ]}
            expandedMenus={expandedMenus}
            toggleMenu={toggleMenu}
            isOpen={isOpen}
          />

          <MenuSection
            title="Services"
            menuId="services"
            items={[
              { icon: Car, title: 'Washing' },
              { icon: Wallet, title: 'Stock Card' }
            ]}
            expandedMenus={expandedMenus}
            toggleMenu={toggleMenu}
            isOpen={isOpen}
          />
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
