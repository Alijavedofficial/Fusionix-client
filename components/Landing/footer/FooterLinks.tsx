import { FC } from 'react';

interface FooterLinkGroupProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterLinkGroup: FC<FooterLinkGroupProps> = ({ title, links }) => {
  return (
    <div className="flex flex-col items-start mb-4 mx-4 text-gray-400">
      <h3 className="font-bold text-white pb-5">{title}</h3>
      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <a href={link.href} key={link.label}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterLinkGroup;
