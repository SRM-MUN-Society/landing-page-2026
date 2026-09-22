import type { Metadata } from 'next';
import { CommitteesCarousel } from '@/components/ui/committees-carousel';
import DarkPageWrapper from '@/components/DarkPageWrapper';

export const metadata: Metadata = {
  title: 'Committees — SRM MUN 2026',
  description: 'The slate for the 14th Edition is being finalised by the Secretariat. Committees, agendas, country matrices and background guides.',
};

export default function CommitteesPage() {
  return (
    <DarkPageWrapper>
      <main id="main" className="is-invert" style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
        <section>
          <CommitteesCarousel />
        </section>
      </main>
    </DarkPageWrapper>
  );
}
