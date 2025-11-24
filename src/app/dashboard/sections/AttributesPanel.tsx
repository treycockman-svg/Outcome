"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Attribute {
  name: string;
  level: number;
  max: number;
}

const defaultAttributes: Attribute[] = [
  { name: "Discipline", level: 68, max: 100 },
  { name: "Focus", level: 72, max: 100 },
  { name: "Confidence", level: 64, max: 100 },
  { name: "Energy", level: 59, max: 100 },
  { name: "Consistency", level: 71, max: 100 },
];

export default function AttributesPanel() {
  const [attributes] = useState(defaultAttributes);

  return (
    <div className="w-full rounded-xl bg-black/20 dark:bg-white/5 p-6 backdrop-blur-md border border-white/10">
      <h2 className="text-xl font-semibold mb-4 text-white dark:text-white tracking-tight">
        Attributes
      </h2>

      <div className="space-y-4">
        {attributes.map((attr, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-white/80 text-sm">{attr.name}</span>
              <span className="text-white/50 text-sm">
                {attr.level}/{attr.max}
              </span>
            </div>

            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(attr.level / attr.max) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-blue-300 dark:from-orange-500 dark:to-yellow-400 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
