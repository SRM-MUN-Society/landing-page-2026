import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';
import DarkPageWrapper from '@/components/DarkPageWrapper';

export const metadata: Metadata = {
  title: 'Schedule — SRM MUN 2026',
  description: 'The three-day programme for SRM MUN 2026. 30, 31 October and 1 November 2026.',
};

export default function SchedulePage() {
  return (
    <DarkPageWrapper>
      <main id="main">
        <ComingSoon
          crumb="Schedule"
          eyebrow="Schedule"
          description="The three-day programme is being set. Session times, ceremonies and room allocations are published here once the Secretariat confirms them, and circulated to registered delegates by email."
        />
      </main>
    </DarkPageWrapper>
  );
}
