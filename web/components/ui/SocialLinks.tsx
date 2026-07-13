import React from 'react';
import Image from 'next/image';

interface SocialLinksProps {
  variant?: 'footer' | 'contact';
}

export default function SocialLinks({ variant = 'contact' }: SocialLinksProps) {
  const socials = [
    { name: 'LinkedIn', icon: '/icons/linkedin.png', href: 'https://www.linkedin.com/in/theauto-mate', width: 40, height: 40 },
    { name: 'Instagram', icon: '/icons/instagram.png', href: 'https://www.instagram.com/the.auto_mate', width: 40, height: 40 },
    { name: 'YouTube', icon: '/icons/utube.png', href: 'https://www.youtube.com/@the.auto-mate', width: 50, height: 50 },
    { name: 'Telegram', icon: '/icons/telegram.png', href: 'https://t.me/theautomate', width: 40, height: 40 },
    { name: 'WhatsApp', icon: '/icons/whatsapp.png', href: 'https://wa.me/919361142819', width: 40, height: 40 },
  ];

  if (variant === 'footer') {
    return (
      <div className="flex flex-wrap items-start gap-2">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
            title={social.name}
          >
            <Image
              src={social.icon}
              alt={social.name}
              width={20}
              height={20}
              className={social.name === 'YouTube' ? 'invert brightness-0' : ''}
            />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {socials.slice(0, 3).map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
          title={social.name}
        >
          <Image src={social.icon} alt={social.name} width={social.width} height={social.height} />
        </a>
      ))}
    </div>
  );
}
