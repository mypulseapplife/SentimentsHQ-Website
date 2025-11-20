import React from 'react';

interface GaugeChartProps {
  score: number;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ score }) => {
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // We only want a semi-circle (50%), so offset is based on half circumference
  const strokeDashoffset = circumference - (score / 100) * (circumference / 2);
  
  // Determine color based on score
  let colorClass = "stroke-brand-purple";
  if (score < 40) colorClass = "stroke-brand-red";
  else if (score > 75) colorClass = "stroke-emerald-500";

  return (
    <div className="relative flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="rotate-[135deg]" // Rotate to start from bottom left
      >
        {/* Background Circle (Track) */}
        <circle
          className="stroke-slate-800"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ strokeDasharray: `${circumference / 2} ${circumference}` }}
        />
        {/* Progress Circle */}
        <circle
          className={`${colorClass} transition-all duration-1000 ease-out`}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            strokeDasharray: `${circumference / 2} ${circumference}`,
            strokeDashoffset: strokeDashoffset // Use calculated offset
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
        <span className="text-4xl font-bold text-white animate-pulse-slow drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            {score}
        </span>
      </div>
    </div>
  );
};