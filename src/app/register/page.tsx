import type { Metadata } from 'next';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Register — SRM MUN 2026',
  description: 'Register for SRM MUN 2026, 14th Edition.',
};

export default function RegisterPage() {
  return (
    <main id="main">
      <ComingSoon
        crumb="Register"
        eyebrow="Registration"
        description="The registration window has not opened. Fees, inclusions and the form are announced here and on @srm_munsoc. Open Register Now for every link in one place."
      />
    </main>
  );
}
