import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="p-4">
      <Button asChild>
        <Link href="/workorder">Work Order Project</Link>
      </Button>
    </div>
  );
}
