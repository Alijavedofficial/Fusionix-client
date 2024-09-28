import { FC } from 'react';
import { Icon } from '@iconify/react';

const WhyUs: FC = () => {
  return (
    <section className="p-20 bg-white shadow-md rounded-xl border border-gray-300 items-start w-full">
      <div className="flex flex-col gap-10">
        <p className="border border-gray-300 flex gap-2 items-center rounded-xl p-2 px-3 w-36 h-auto text-gray-600 text-sm">
          <span>
            <Icon icon="bi:box" className="" style={{ fontSize: "15px" }} />
          </span>
          Why Fusionix
        </p>
        <h1 className="text-4xl font-semibold">
          Increase Productivity <br /> and Save Time
        </h1>
        <p className="text-gray-600">
          SuperCharge Productivity. Streamline work by doing it under one platform.
        </p>
        <div className="flex gap-5 justify-between">
          <div className="flex flex-col gap-2 p-8 rounded-xl border border-gray-300 items-start flex-1">
            <div className="p-3 bg-purple-500 rounded-xl">
              <Icon icon="mdi:account-multiple-plus" className="text-white" style={{ fontSize: "26px" }} />
            </div>
            <h1 className="font-medium text-xl pt-4">Add Editors</h1>
            <p className="text-gray-600 text-sm">
              Easily add editors to your workspace and manage their roles to collaborate on video projects.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-8 rounded-xl border border-gray-300 items-start flex-1">
            <div className="p-3 bg-blue-400 rounded-xl">
              <Icon icon="mdi:youtube" className="text-white" style={{ fontSize: "26px" }} />
            </div>
            <h1 className="font-medium text-xl pt-4">Upload & Review</h1>
            <p className="text-gray-600 text-sm">
              Upload videos, collaborate with editors, and review content before it goes live on YouTube.
            </p>
          </div>
          <div className="flex flex-col gap-2 p-8 rounded-xl border border-gray-300 items-start flex-1">
            <div className="p-3 bg-green-400 rounded-xl">
              <Icon icon="mdi:approve" className="text-white" style={{ fontSize: "26px" }} />
            </div>
            <h1 className="font-medium text-xl pt-4">Approval & Publish</h1>
            <p className="text-gray-600 text-sm">
              Approve finalized videos and let our platform automatically publish them to your YouTube channel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
