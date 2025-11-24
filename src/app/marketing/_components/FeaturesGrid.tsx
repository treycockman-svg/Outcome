"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Panel3D from "./Panel3D";

type Feature = {
  icon: string;
  title: string;
  desc: string;
};

const features: Feature[] = [
  {
    icon: "/next.svg",
    title: "Fast Simulation Engine",
    desc: "Outcome processes your dream vs reality inputs instantly.",
  },
  {
    icon: "/file.svg",
    title: "Daily Tasks",
    desc: "AI assigns you the highest-leverage actions each day.",
  },
  {
    icon: "/globe.svg",
    title: "Probability Tracking",
    desc: "Your percentage updates live as you take action.",
  },
];

export default function FeaturesGrid() {
  return (
    <Panel3D className="p-6">
      <div className="grid gap-6 sm:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-start"
          >
            <div className="rounded-2xl bg-slate-900/80 p-3 flex items-center justify-center">
              <Image
                src={feature.icon}
                alt={`${feature.title} icon`}
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </div>

            <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
              {feature.title}
            </h3>

            <p className="mt-2 text-slate-600 dark:text-slate-300">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </Panel3D>
  );
}
