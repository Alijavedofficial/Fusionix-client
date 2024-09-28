import { FC } from 'react';
import { Icon } from '@iconify/react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonLabel: string;
  isHighlighted?: boolean;
}

const PricingCard: FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  buttonLabel,
  isHighlighted = false,
}) => {
  return (
    <div
      className={`border border-gray-700 rounded-xl p-4 px-10 flex flex-col justify-between text-sm ${
        isHighlighted ? 'bg-[#212529] text-white' : 'bg-white text-black'
      }`}
    >
      <p className={`text-lg ${isHighlighted ? 'text-gray-400' : ''}`}>{title}</p>
      <div className="pricing-border py-4">
        <h1 className="text-4xl font-semibold">
          {price} <span className="text-[16px] font-normal">{`per month`}</span>
        </h1>
        <p className={`font-light ${isHighlighted ? 'text-gray-400' : ''}`}>{description}</p>
      </div>
      <h6 className={`py-4 ${isHighlighted ? 'text-gray-400' : 'text-black'}`}>This Plan Includes:</h6>
      <div className="space-y-4 pb-8">
        {features.map((feature) => (
          <div className="flex items-center gap-3" key={feature}>
            <Icon icon="teenyicons:tick-circle-solid" style={{ fontSize: '15px' }} />
            <p className={`font-normal ${isHighlighted ? 'text-gray-400' : 'text-black'}`}>{feature}</p>
          </div>
        ))}
      </div>
      <button className={`px-6 py-2 rounded-xl border border-gray-700 text-lg ${isHighlighted ? 'bg-[#343a40]' : 'bg-black text-white'}`}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default PricingCard;
