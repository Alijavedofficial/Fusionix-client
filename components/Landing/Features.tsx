import { FC } from 'react';
import { Icon } from '@iconify/react'; // Ensure correct library
import Image from 'next/image'; // Import next/image for images

// Import your images
import image1 from '../../public/image1.svg';
import image2 from '../../public/image2.svg';
import image3 from '../../public/image3.svg';
import image4 from '../../public/image4.svg';

const FeaturesSection: FC = () => {
  return (
    <section className="p-20 bg-white shadow-md rounded-xl border border-gray-300 items-start w-full">
      <div className="flex flex-col gap-10">
        <p className="border border-gray-300 flex gap-2 items-center rounded-xl p-2 px-3 w-28 h-auto text-gray-600 text-sm">
          <span>
            <Icon icon="bi:box" style={{ fontSize: '15px' }} />
          </span>
          Features
        </p>
        <h1 className="text-4xl font-semibold">Everything Your Team Looking For</h1>
        <p className="text-gray-600">
          Supercharge productivity. Streamline work by doing it under one platform.
        </p>
        <div className="grid grid-cols-2">
          <div className="flex items-start gap-5 flex-col pb-10">
            <div className="p-4 bg-white border border-gray-300 rounded-xl">
              <Image
                alt="dashboard"
                width={500}
                height={200}
                src={image1} // Make sure the image paths are correct
                className="rounded-xl h-[250px] w-[500px] object-fill"
              />
            </div>
            <span className="flex gap-2 items-center font-semibold text-xl">
              <Icon icon="bi:box" style={{ fontSize: '18px' }} />
              <h2>Project Management</h2>
            </span>
            <p className="pr-20 text-gray-500">
              Manage your projects from start to finish. With your workspaces, you can add your editors in the workspace.
            </p>
          </div>
          <div className="flex items-start gap-5 flex-col">
            <div className="p-4 bg-white border border-gray-300 rounded-xl">
              <Image
                alt="dashboard"
                width={500}
                height={200}
                src={image2}
                className="rounded-xl h-[250px] w-[500px] object-fill"
              />
            </div>
            <span className="flex gap-2 items-center font-semibold text-xl">
              <Icon icon="bi:box" style={{ fontSize: '18px' }} />
              <h2>Project Management</h2>
            </span>
            <p className="pr-20 text-gray-500">
              Manage your projects from start to finish. With your workspaces, you can add your editors in the workspace.
            </p>
          </div>
          <div className="flex items-start gap-5 flex-col">
            <div className="p-4 bg-white border border-gray-300 rounded-xl">
              <Image
                alt="dashboard"
                width={500}
                height={200}
                src={image3}
                className="rounded-xl h-[250px] w-[500px] object-fill"
              />
            </div>
            <span className="flex gap-2 items-center font-semibold text-xl">
              <Icon icon="bi:box" style={{ fontSize: '18px' }} />
              <h2>Project Management</h2>
            </span>
            <p className="pr-20 text-gray-500">
              Manage your projects from start to finish. With your workspaces, you can add your editors in the workspace.
            </p>
          </div>
          <div className="flex items-start gap-5 flex-col">
            <div className="p-4 bg-white border border-gray-300 rounded-xl">
              <Image
                alt="dashboard"
                width={500}
                height={200}
                src={image4}
                className="rounded-xl h-[250px] w-[500px] object-fill"
              />
            </div>
            <span className="flex gap-2 items-center font-semibold text-xl">
              <Icon icon="bi:box" style={{ fontSize: '18px' }} />
              <h2>Project Management</h2>
            </span>
            <p className="pr-20 text-gray-500">
              Manage your projects from start to finish. With your workspaces, you can add your editors in the workspace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
