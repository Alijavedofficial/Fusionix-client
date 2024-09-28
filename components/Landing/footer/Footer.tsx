import { FC } from 'react';
import { Icon } from '@iconify/react';
import FooterLinkGroup from './FooterLinks';

const Footer: FC = () => {
  const linkGroups = [
    {
      title: 'Fusionix',
      links: [
        { label: 'Home', href: '#' },
        { label: 'About Us', href: '#' },
        { label: 'Services', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Project Management', href: '#' },
        { label: 'Workspaces', href: '#' },
        { label: 'Editors', href: '#' },
        { label: 'Automate', href: '#' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Blogs', href: '#' },
        { label: 'Articles', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'News', href: '#' },
      ],
    },
    {
      title: 'Fusionix for',
      links: [
        { label: 'Commercial', href: '#' },
      ],
    },
    {
      title: 'Follow Us',
      links: [
        { label: 'Linked In', href: '#' },
        { label: 'Twitter', href: '#' },
        { label: 'Instagram', href: '#' },
        { label: 'Webinar', href: '#' },
      ],
    },
  ];

  return (
    <footer className="flex flex-col text-white space-y-8 w-full p-16 py-12 back shadow-md rounded-xl border border-gray-300">
      <div className="flex w-full justify-between border-b border-gray-800 pb-6 px-6">
        {linkGroups.map((group) => (
          <FooterLinkGroup key={group.title} title={group.title} links={group.links} />
        ))}
      </div>

      <div className="text-sm mx-4 text-end text-gray-400 flex justify-between">
        <div className="flex items-center gap-2 font-medium text-xl text-white">
          <Icon icon="bi:box" style={{ fontSize: '20px' }} />
          <p>Fusionix</p>
        </div>
        © 2024 Fusionix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
