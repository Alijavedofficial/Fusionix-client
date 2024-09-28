import { FC } from 'react';
import PricingCard from './PricingCard';
import { Icon } from '@iconify/react';

const PricingSection: FC = () => {
  const pricingPlans = [
    {
      title: 'Starter',
      price: '$0',
      description: 'For individuals with one YouTube channel and 1 editor',
      features: [
        'Auto Upload',
        'Collaborations',
        'Permissions',
        '1 Workspace',
        '1 Editor',
      ],
      buttonLabel: 'Get started',
      isHighlighted: true,
    },
    {
      title: 'Personal',
      price: '$10',
      description: 'For individuals with one YouTube channel and 1 editor',
      features: [
        'Auto Upload',
        'Collaborations',
        'Permissions',
        '3 Workspaces',
        '5 Editors',
      ],
      buttonLabel: 'Get started',
      isHighlighted: false,
    },
    {
      title: 'Professional',
      price: '$25',
      description: 'For individuals with one YouTube channel and 1 editor',
      features: [
        'Auto Upload',
        'Collaborations',
        'Permissions',
        'Unlimited Workspaces',
        'Unlimited Editors',
      ],
      buttonLabel: 'Get started',
      isHighlighted: true,
    },
  ];

  return (
    <section className="flex flex-col gap-10 text-white space-y-8 items-start justify-center flex-1 w-full p-20 back shadow-md rounded-xl border border-gray-300">
      <div className="flex flex-col gap-4">
        <p className="border flex gap-2 p-2 px-3 w-24 h-auto text-sm border-gray-700 rounded-xl items-center bg-[#212529]">
          <span>
            <Icon icon="fluent:wallet-credit-card-16-regular" style={{ fontSize: '15px' }} />
          </span>
          Pricing
        </p>
        <h1 className="text-5xl font-semibold">Simple and Flexible <br /> Pricing</h1>
      </div>
      <div className="flex justify-between w-full">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.title}
            title={plan.title}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            buttonLabel={plan.buttonLabel}
            isHighlighted={plan.isHighlighted}
          />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
