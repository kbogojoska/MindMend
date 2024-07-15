import React from "react";
import '../css/Home.css';
import SmokingTrackerDisclosure from "./HabitDisclosures/SmokingTrackerDisclosure";
import ActiveMoveDisclosure from "./HabitDisclosures/ActiveMoveDisclosure";
import DrinkingTrackerDisclosure from "./HabitDisclosures/DrinkingTrackerDisclosure";
import HydroTrackerDisclosure from "./HabitDisclosures/HydroTrackerDisclosure";
import MealPlannerDisclosure from "./HabitDisclosures/MealPlannerDisclosure";
import ScreenTimeDisclosure from "./HabitDisclosures/ScreenTimeDisclosure";
import SleepTrackerDisclosure from "./HabitDisclosures/SleepTrackerDisclosure";
import MindfulMomentDisclosure from "./HabitDisclosures/MindfulMomentDisclosure";
import SocialSphereDisclosure from "./HabitDisclosures/SocialSphereDisclosure";
import { Disclosure } from '@headlessui/react';

const Home = () => {
  return (
    <div className="bg-white rounded-xl">
      {/* Home Section */}
      <section className="py-8 md:py-16">
        <div className="container max-w-screen-xl mx-auto px-4">
          <header className="flex flex-col xl:flex-row justify-between items-center">
            <div className="text-center xl:text-left mb-10 xl:mb-0">
              <h1 className="font-bold text-gray-700 text-3xl md:text-6xl leading-tight mb-5">
                MindMend - Healthy Habits Tracker
              </h1>
              <p className="font-normal text-gray-500 text-sm md:text-lg mb-5">
                Track and improve your daily habits for a healthier lifestyle.
              </p>
            </div>
            <div className="mx-auto xl:mx-0">
              <img src="/images/home-img.svg" alt="Image" />
            </div>
          </header>
        </div>
      </section>

      <section className="py-6 md:py-4">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <ActiveMoveDisclosure />
            <DrinkingTrackerDisclosure />
            <HydroTrackerDisclosure />
            <MealPlannerDisclosure />
            <MindfulMomentDisclosure />
            <ScreenTimeDisclosure />
            <SleepTrackerDisclosure />
            <SmokingTrackerDisclosure />
            <SocialSphereDisclosure />
          </div>
        </div>
      </section>

      <div className="py-4 md:py-6"></div>
    </div>
  );
};

export default Home;
