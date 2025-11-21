import React from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap,
  LayoutDashboard,
  BrainCircuit,
  Target,
  FileText,
  Globe,
  AtSign
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, CartesianGrid } from 'recharts';
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
    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 flex flex-col justify-between min-w-[100px] flex-1 hover:bg-white/[0.05] transition-colors duration-300 group">
      <div className="flex items-center gap-2 mb-2">
        {name === 'TikTok' && <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)]"></div>}
        {name === 'Reddit' && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>}
        {name === 'Twitter' && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>}
        {name === 'Google' && <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>}
        <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{name}</div>
      </div>
      <div className="flex items-end justify-between mb-2">
        <div className="text-xl font-bold text-white leading-none tracking-tight">{percentage}%</div>
        <div className={`text-[10px] flex items-center font-bold ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
          {isUp ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
          {Math.abs(data[data.length - 1] - data[0])}%
        </div>
      </div>
      <div className="h-8 w-full opacity-50 mix-blend-screen group-hover:opacity-80 transition-opacity">
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
  <div className={`p-3 rounded-lg border backdrop-blur-sm transition-all hover:translate-x-1 group flex items-start gap-3 ${
    alert.type === 'CRITICAL' ? 'bg-red-500/[0.03] border-red-500/10 hover:bg-red-500/[0.06]' : 
    alert.type === 'WARNING' ? 'bg-amber-500/[0.03] border-amber-500/10 hover:bg-amber-500/[0.06]' : 
    'bg-emerald-500/[0.03] border-emerald-500/10 hover:bg-emerald-500/[0.06]'
  }`}>
    {/* Icon Column */}
    <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
         alert.type === 'CRITICAL' ? 'bg-red-500/10 text-red-500' : 
         alert.type === 'WARNING' ? 'bg-amber-500/10 text-amber-500' : 
         'bg-emerald-500/10 text-emerald-500'
    }`}>
        {alert.type === 'CRITICAL' && <AlertTriangle size={12} />}
        {alert.type === 'WARNING' && <Activity size={12} />}
        {alert.type === 'SUCCESS' && <CheckCircle2 size={12} />}
    </div>

    {/* Content Column */}
    <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start mb-1">
            <span className={`text-[10px] font-bold tracking-wider ${
               alert.type === 'CRITICAL' ? 'text-red-400' : 
               alert.type === 'WARNING' ? 'text-amber-400' : 
               'text-emerald-400'
            }`}>{alert.type} ALERT</span>
            <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">{alert.time}</span>
        </div>
        
        <p className="text-xs text-slate-200 font-medium leading-relaxed mb-2">{alert.message}</p>
        
        <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-1">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-slate-400">
                    <AtSign size={8} />
                </div>
                <span className="text-[10px] text-slate-400 font-medium truncate max-w-[120px]">{alert.source || 'System'}</span>
            </div>
            <span className={`text-[10px] font-bold ${
                alert.type === 'CRITICAL' ? 'text-red-400' : 
                alert.type === 'WARNING' ? 'text-amber-400' : 
                'text-emerald-400'
            }`}>{alert.impact}</span>
        </div>
    </div>
  </div>
);

const NavItem: React.FC<{ icon: React.ElementType; label: string; active?: boolean }> = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all cursor-pointer whitespace-nowrap ${
    active 
    ? 'bg-white/10 text-white' 
    : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
  }`}>
    <Icon size={12} className={active ? 'text-brand-purple' : 'text-slate-500'} />
    <span>{label}</span>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ data, loading }) => {
  const getScoreStatus = (score: number) => {
    if (score >= 80) return { label: 'EXCELLENT', color: 'text-emerald-400', desc: 'Positive sentiment.' };
    if (score >= 60) return { label: 'STABLE', color: 'text-blue-400', desc: 'Normal fluctuations.' };
    if (score >= 40) return { label: 'WARNING', color: 'text-amber-400', desc: 'Negative trend detected.' };
    return { label: 'CRITICAL', color: 'text-red-500', desc: 'Immediate action required.' };
  };

  const status = getScoreStatus(data.vibeScore);

  return (
    <div className="flex flex-col h-[640px] p-6 bg-[#0B0F17] text-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-3">
           <div className="p-2 rounded-lg bg-brand-purple/10 border border-brand-purple/20">
             <Shield size={16} className="text-brand-purple" />
           </div>
           <span className="text-sm font-bold tracking-wide text-slate-200">COMMAND CENTER</span>
        </div>
        
        <div className="flex items-center gap-1 bg-white/[0.03] border border-white/5 p-1 rounded-lg">
           <NavItem icon={LayoutDashboard} label="Overview" active />
           <NavItem icon={BrainCircuit} label="Intel" />
           <NavItem icon={Target} label="Tracking" />
           <NavItem icon={FileText} label="Reports" />
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-xs font-medium text-slate-400">
           <Globe size={12} />
           <span>Global</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6 flex-grow min-h-0">
        
        {/* Left Column: VibeScore & Sentiment Trend */}
        <div className="col-span-4 flex flex-col gap-4 min-h-0">
            {/* VibeScore Card */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/5 to-transparent opacity-50"></div>
                
                <h3 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4 z-10">VIBESCORE</h3>
                <div className="scale-90 z-10">
                   <GaugeChart score={data.vibeScore} />
                </div>
                
                <div className="text-center mt-2 z-10">
                    <div className={`text-xl font-bold ${status.color} tracking-tight`}>{status.label}</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-1 max-w-[140px] mx-auto leading-tight opacity-80">
                        {status.desc}
                    </div>
                </div>
            </div>

            {/* Sentiment Velocity Chart (Moved Here) */}
            <div className="flex-grow bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-4 shrink-0">
                   <div className="flex items-center gap-2">
                       <Activity size={14} className="text-brand-purple" />
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">VELOCITY</span>
                   </div>
                   <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-slate-500">24H</span>
                </div>
                
                <div className="flex-grow w-full min-h-0">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.sentimentHistory}>
                        <defs>
                          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis 
                           dataKey="time" 
                           axisLine={false} 
                           tickLine={false} 
                           tick={{fill: '#64748b', fontSize: 9}} 
                           dy={5}
                           interval="preserveStartEnd"
                        />
                        <Area 
                           type="monotone" 
                           dataKey="score" 
                           stroke="#a855f7" 
                           strokeWidth={2}
                           fillOpacity={1} 
                           fill="url(#colorScore)" 
                        />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Right Column: Platforms & Alerts */}
        <div className="col-span-8 flex flex-col gap-4 min-h-0">
            {/* Platforms Row */}
            <div className="grid grid-cols-4 gap-3 h-[100px] shrink-0">
               {data.platforms.map(p => (
                   <PlatformCard key={p.name} {...p} />
               ))}
            </div>

            {/* Live Alerts Feed (Moved Here & Expanded) */}
            <div className="flex-grow bg-white/[0.02] border border-white/5 rounded-2xl p-5 flex flex-col min-h-0 relative overflow-hidden">
                {/* Subtle Alert Background Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full pointer-events-none"></div>

                <div className="flex items-center justify-between mb-4 shrink-0 z-10">
                   <div className="flex items-center gap-2">
                       <div className="relative">
                           <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                           <Zap size={14} className="text-slate-200" />
                       </div>
                       <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">LIVE INTEL FEED</span>
                   </div>
                   <div className="text-[10px] font-mono text-slate-500">REAL-TIME</div>
                </div>

                <div className="flex-grow overflow-y-auto pr-1 space-y-2 scrollbar-hide z-10">
                    {data.alerts.map((alert) => (
                        <AlertItem key={alert.id} alert={alert} />
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};