"use client";

import Link from "next/link";
import {
  MdCheckCircleOutline,
  MdCalendarToday,
  MdNotificationsActive,
} from "react-icons/md";

const features = [
  {
    icon: <MdCheckCircleOutline className="text-primary-500 text-3xl" />,
    title: "Effortless Organization",
    description: "Keep track of all your tasks in one intuitive place.",
  },
  {
    icon: <MdCalendarToday className="text-primary-500 text-3xl" />,
    title: "Timely Reminders",
    description: "Never miss a deadline with smart notification features.",
  },
  {
    icon: <MdNotificationsActive className="text-primary-500 text-3xl" />,
    title: "Boost Productivity",
    description: "Streamline your workflow and achieve more, every day.",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      {/* Hero Section */}
      <section className="text-center mb-16 max-w-4xl">
        <h1
          className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight"
        >
          Welcome to <span className="text-primary-600">TaskMaster!</span>
        </h1>
        <p
          className="text-xl md:text-2xl text-gray-400 mb-8"
        >
          Organize, track, and complete your tasks effortlessly.
        </p>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link href="/register" passHref>
            <button
              className="bg-primary-600 hover:bg-primary-700 text-black font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300 cursor-pointer"
            >
              Sign Up
            </button>
          </Link>
          <Link href="/login" passHref>
            <button
              className="bg-secondary-600 hover:bg-secondary-700 text-black font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all duration-300 cursor-pointer"
            >
              Login
            </button>
          </Link>
        </div>
      </section>

      {/* Feature List */}
      <section className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 p-8 rounded-xl shadow-custom-dark flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              {feature.title}
            </h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;