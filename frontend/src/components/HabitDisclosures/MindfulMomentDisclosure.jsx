import React, { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import { GiPeaceDove } from "react-icons/gi";

function MindfulMomentDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-lg">
      <Disclosure as="div" className="bg-white rounded-xl shadow-md hover:shadow-lg">
        <DisclosureButton
          className="group flex items-center justify-between w-full px-6 py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-50 rounded-t-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-base flex font-medium">
          <GiPeaceDove size={20} className='mr-2' />Mindful Moment
          </span>
          <ChevronDownIcon
            className={`w-5 h-5 ml-2 text-gray-600 transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </DisclosureButton>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-200 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DisclosurePanel className="text-sm text-gray-700 bg-white border-t border-l border-r border-gray-400 rounded-b-lg p-4">
            <p className="mb-2">The Mindful Moment feature encourages mindfulness practices.</p>
            <div className="flex justify-center">
              <Link to="/mindful-moment" className="inline-block px-4 py-2 text-white bg-gradient-to-r from-pink-300 to-blue-300 rounded-md shadow-md hover:bg-gradient-to-r hover:from-pink-400 hover:to-blue-400">
                Visit Tracker Info
              </Link>
            </div>
          </DisclosurePanel>
        </Transition>
      </Disclosure>
    </div>
  );
}

export default MindfulMomentDisclosure;
