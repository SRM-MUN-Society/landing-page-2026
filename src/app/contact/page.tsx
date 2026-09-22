import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';
import DarkPageWrapper from '@/components/DarkPageWrapper';

export const metadata: Metadata = {
  title: 'Contact — SRM MUN 2026',
  description: 'Reach the Secretariat of SRM MUN 2026.',
};

export default function ContactPage() {
  return (
    <DarkPageWrapper>
      <main id="main" style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
        <ContactSection />
      </main>
    </DarkPageWrapper>
  );
}
