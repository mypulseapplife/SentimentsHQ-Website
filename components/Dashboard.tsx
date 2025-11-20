import React from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap 
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { DashboardState, Alert } from '../types';
import { GaugeChart } from './GaugeChart';

interface DashboardProps {
  data: DashboardState;
  loading?: boolean;
}

const PlatformCard: React.FC<{ name: string; percentage: number; trend: 'up' | 'down'; data: number[] }> = ({ name, percentage, trend, data }) => {
  const chartData = data.map((val, i) => ({ i, val }));
  const isUp = trend === 'up';
  
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex flex-col justify-between min-w-[80px]">
      <div className="text-xs text-slate-400 mb-1">{name}</div>
      <div className="flex items-end justify-between">
        <div className="text-xl font-bold text-white">{percentage}%</div>
        <div className={`text-xs flex items-center ${isUp ? 'text-emerald-400' : 'text-brand-red'}`}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        </div>
      </div>
      <div className="h-8 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="val" 
              stroke={isUp ? "#34d399" : "#ef4444"} 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => (
  <div className={`mb-3 p-3 rounded-lg border ${
    alert.type === 'CRITICAL' ? 'bg-red-950/30 border-red-900/50' : 
    alert.type === 'WARNING' ? 'bg-amber-950/30 border-amber-900/50' : 
    'bg-emerald-950/30 border-emerald-900/50'
  }`}>
    <div className="flex justify-between items-start mb-1">
      <div className="flex items-center gap-2">
        {alert.type === 'CRITICAL' && <AlertTriangle size={14} className="text-red-500" />}
        {alert.type === 'WARNING' && <Activity size={14} className="text-amber-500" />}
        {alert.type === 'SUCCESS' && <CheckCircle2 size={14} className="text-emerald-500" />}
        <span className={`text-xs font-bold ${
           alert.type === 'CRITICAL' ? 'text-red-500' : 
           alert.type === 'WARNING' ? 'text-amber-500' : 
           'text-emerald-500'
        }`}>{alert.type}</span>
      </div>
      <span className="text-[10px] text-slate-500">{alert.time}</span>
    </div>
    <p className="text-sm text-slate-200 leading-tight mb-2">{alert.message}</p>
    {alert.xp && (
      <span className="inline-block px-2 py-0.5 bg-white/5 rounded text-[10px] text-brand-pink font-medium">
        +{alert.xp} XP
      </span>
    )}
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900 rounded-xl border border-slate-800">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-t-2 border-brand-pink rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm animate-pulse">Analyzing sentiment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col text-white transform transition-all duration-500 hover:scale-[1.01]">
      {/* Window Header */}
      <div className="h-8 bg-slate-950 border-b border-slate-800 flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <div className="ml-4 text-xs text-slate-400 font-medium flex-1 text-center mr-12">VibeScore Dashboard</div>
        <div className="flex items-center gap-2 text-[10px] text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          LIVE
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
        
        {/* Header Row: XP Bar */}
        <div className="col-span-12 flex items-center justify-between mb-2">
          <div className="flex flex-col w-full max-w-md">
            <div className="flex items-center gap-3 mb-1">
                <div className="p-1.5 bg-brand-purple rounded-lg">
                    <Shield size={16} className="text-white" />
                </div>
                <h3 className="font-bold text-lg">Brand Guardian Level {data.level}</h3>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-brand-purple transition-all duration-1000" 
                    style={{ width: `${(data.currentXP / data.maxXP) * 100}%` }}
                ></div>
            </div>
            <div className="text-xs text-slate-500 mt-1 text-right">{data.currentXP.toLocaleString()} / {data.maxXP.toLocaleString()} XP</div>
          </div>
          <div className="flex items-center gap-1 text-amber-400 bg-amber-950/30 px-3 py-1 rounded-full border border-amber-900/50">
             <Trophy size={14} />
             <span className="text-sm font-bold">{data.streak}</span>
          </div>
        </div>

        {/* Left Column: Score */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
            {/* Score Card */}
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-pink to-transparent opacity-50"></div>
                <h4 className="text-slate-300 font-medium mb-4">VibeScore</h4>
                <GaugeChart score={data.vibeScore} />
                
                {/* Achievement Toast in Card */}
                <div className="mt-6 w-full bg-amber-900/20 border border-amber-500/30 rounded-lg p-3 flex items-center gap-3">
                    <Trophy className="text-amber-400 shrink-0" size={20} />
                    <div>
                        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Achievement Unlocked!</div>
                        <div className="text-sm text-slate-300">Crisis Defender</div>
                    </div>
                </div>

                <div className="mt-4 text-center">
                     <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Positive Streak</div>
                     <div className="flex gap-1 justify-center mb-1">
                         {[1,2,3,4,5].map(i => (
                             <div key={i} className={`w-2 h-2 rounded-full ${i <= data.streak ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
                         ))}
                     </div>
                     <div className="text-emerald-400 text-sm font-bold">{data.streak}x Combo!</div>
                </div>
            </div>
        </div>

        {/* Right Column: Feed */}
        <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-slate-300 font-medium flex items-center gap-2">
                        <Activity size={16} className="text-brand-pink" />
                        Live Alert Feed
                    </h4>
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[200px] pr-2">
                    {data.alerts.map(alert => (
                        <AlertItem key={alert.id} alert={alert} />
                    ))}
                </div>
            </div>
        </div>

        {/* Bottom Row: Stats & Achievements */}
        <div className="col-span-12 grid grid-cols-4 gap-2 mt-2">
             {data.platforms.map((platform, idx) => (
                 <PlatformCard key={idx} {...platform} />
             ))}
        </div>

        {/* Bottom Left Overlay for Recent Achievements (Visual Match) */}
        <div className="col-span-12 bg-slate-950/50 border border-slate-800 rounded-xl p-4 mt-2">
             <h5 className="text-xs font-bold text-white mb-3">Recent Achievements</h5>
             <div className="space-y-2">
                 {data.achievements.map((ach, i) => (
                     <div key={i} className="flex justify-between items-center">
                         <div className="flex items-center gap-2 text-sm text-slate-300">
                             <Shield size={14} className="text-blue-400" />
                             {ach.name}
                         </div>
                         <div className="text-xs font-bold text-blue-400">+{ach.xp} XP</div>
                     </div>
                 ))}
                 <div className="flex justify-between items-center">
                     <div className="flex items-center gap-2 text-sm text-slate-300">
                         <Zap size={14} className="text-yellow-400" />
                         Quick Responder
                     </div>
                     <div className="text-xs font-bold text-yellow-400">+75 XP</div>
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};