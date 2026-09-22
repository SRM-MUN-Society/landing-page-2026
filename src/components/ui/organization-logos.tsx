'use client';

import Image from 'next/image';
import { CloudOrbit, OrbitingImage } from './cloud-orbit';

export function OrganizationLogos() {
  const centerLogo = [
    {
      url: '/img/opt/symbol-black.png',
      name: 'SRMMUN Symbol',
    },
  ];

  const logo1 = [
    {
      url: '/img/opt/srmist-blue-logo.png',
      name: 'SRM Institute of Science and Technology',
    },
  ];

  const logo2 = [
    {
      url: '/img/opt/UNAI_Logo.png',
      name: 'United Nations Academic Impact',
    },
  ];

  const logo3 = [
    {
      url: '/img/opt/SDSN_Logo.png',
      name: 'Sustainable Development Solutions Network',
    },
  ];

  const logo4 = [
    {
      url: '/img/opt/dsa-logo.png',
      name: 'DSA',
    },
  ];

  return (
    <div style={{ 
      position: 'relative', 
      display: 'flex', 
      height: '650px', 
      width: '100%', 
      maxWidth: '650px', 
      margin: '0 auto',
      alignItems: 'center', 
      justifyContent: 'center',
      overflow: 'visible'
    }}>
      <CloudOrbit images={centerLogo} size={200} duration={4}>
        <OrbitingImage
          images={logo1}
          radius={220}
          size={120}
          speed={40}
          duration={4}
          startAt={0}
        />
        <OrbitingImage
          images={logo2}
          radius={220}
          size={120}
          speed={40}
          duration={4}
          startAt={0.25}
        />
        <OrbitingImage
          images={logo3}
          radius={220}
          size={120}
          speed={40}
          duration={4}
          startAt={0.5}
        />
        <OrbitingImage
          images={logo4}
          radius={220}
          size={120}
          speed={40}
          duration={4}
          startAt={0.75}
        />
      </CloudOrbit>
    </div>
  );
}
