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
  Globe
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
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
    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col justify-between min-w-[100px] flex-1 hover:bg-white/[0.05] transition-colors duration-300">
      <div className="flex items-center gap-2 mb-2">
        {name === 'TikTok' && <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>}
        {name === 'Reddit' && <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>}
        {name === 'Twitter' && <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>}
        {name === 'Google' && <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>}
        <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">{name}</div>
      </div>
      <div className="flex items-end justify-between mb-2">
        <div className="text-xl font-bold text-white">{percentage}%</div>
        <div className={`text-xs flex items-center font-medium ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
          {isUp ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
          {Math.abs(data[data.length - 1] - data[0])}%
        </div>
      </div>
      <div className="h-8 w-full opacity-60 mix-blend-screen">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="val" 
              stroke={isUp ? "#34d399" : "#ef4444"} 
              strokeWidth={1.5} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => (
  <div className={`mb-2 p-3 rounded-lg border backdrop-blur-sm transition-all hover:translate-x-1 group ${
    alert.type === 'CRITICAL' ? 'bg-red-500/[0.05] border-red-500/20 hover:bg-red-500/[0.08]' : 
    alert.type === 'WARNING' ? 'bg-amber-500/[0.05] border-amber-500/20 hover:bg-amber-500/[0.08]' : 
    'bg-emerald-500/[0.05] border-emerald-500/20 hover:bg-emerald-500/[0.08]'
  }`}>
    <div className="flex justify-between items-start mb-1">
      <div className="flex items-center gap-2">
        {alert.type === 'CRITICAL' && <AlertTriangle size={12} className="text-red-500 animate-pulse" />}
        {alert.type === 'WARNING' && <Activity size={12} className="text-amber-500" />}
        {alert.type === 'SUCCESS' && <CheckCircle2 size={12} className="text-emerald-500" />}
        <span className={`text-[9px] font-bold tracking-wider ${
           alert.type === 'CRITICAL' ? 'text-red-500' : 
           alert.type === 'WARNING' ? 'text-amber-500' : 
           'text-emerald-500'
        }`}>{alert.type}</span>
      </div>
      <span className="text-[9px] text-slate-500 font-mono">{alert.time}</span>
    </div>
    <p className="text-[11px] text-slate-200 leading-relaxed mb-2 font-medium">{alert.message}</p>
    <div className="flex justify-between items-center border-t border-white/5 pt-2">
      <span className={`text-[9px] font-medium ${
         alert.type === 'CRITICAL' ? 'text-red-400' : 
         alert.type === 'WARNING' ? 'text-amber-400' : 
         'text-emerald-400'
      }`}>{alert.impact}</span>
    </div>
  </div>
);

const NavItem: React.FC<{ icon: React.ElementType; label: string; active?: boolean }> = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
    active 
    ? 'bg-white/10 text-white' 
    : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
  }`}>
    <Icon size={14} className={active ? 'text-brand-purple' : 'text-slate-500'} />
    <span>{label}</span>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ data, loading }) => {
  const getScoreStatus = (score: number) => {
    if (score >= 80) return { label: 'EXCELLENT', color: 'text-emerald-400', desc: 'Sentiment is overwhelmingly positive.' };
    if (score >= 60) return { label: 'HEALTHY', color: 'text-blue-400', desc: 'Stable reputation. No immediate threats.' };
    if (score >= 40) return { label: 'AT RISK', color: 'text-amber-400', desc: 'Negative trends detected. Monitoring required.' };
    return { label: 'CRITICAL', color: 'text-red-500', desc: 'Immediate crisis intervention recommended.' };
  };

  const status = getScoreStatus(data.vibeScore);

  if (loading) {
    return (
      <div className="w-full h-[540px] flex items-center justify-center bg-[#0B0F17] rounded-xl border border-white/10">
        <div className="w-8 h-8 border-t-2 border-brand-purple rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[540px] bg-[#0B0F17] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col text-white">
      
      {/* Window Header */}
      <div className="h-10 bg-[#0B0F17] border-b border-white/5 flex items-center px-4 gap-2 shrink-0 z-20 justify-between">
        <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
            </div>
            <div className="h-4 w-px bg-white/5 mx-2"></div>
            <div className="text-[10px] text-slate-500 font-medium flex items-center gap-2 tracking-wide uppercase">
                <Shield size={10} className="text-brand-purple" />
                <span>Command Center</span>
            </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                <Globe size={10} className="text-slate-400" />
                <span className="text-slate-400">Global</span>
            </div>
        </div>
      </div>

      {/* Horizontal Navigation Bar */}
      <div className="bg-[#0B0F17] border-b border-white/5 px-4 py-1 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1">
              <NavItem icon={LayoutDashboard} label="Overview" active />
              <NavItem icon={BrainCircuit} label="Intel" />
              <NavItem icon={Target} label="Tracking" />
              <NavItem icon={FileText} label="Reports" />
          </div>
      </div>

      {/* Dashboard Content - Compact Grid */}
      <main className="flex-1 overflow-hidden bg-[#0B0F17] p-4">
        <div className="grid grid-cols-12 gap-4 h-full">
            
            {/* Left Column (Score) - 3 Columns */}
            <div className="col-span-3 flex flex-col gap-4">
                {/* VibeScore Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex-1 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/5 to-transparent opacity-50"></div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4 z-10">VibeScore</span>
                    <div className="scale-90 z-10">
                         <GaugeChart score={data.vibeScore} />
                    </div>
                    <div className={`text-2xl font-bold ${status.color} mt-2 z-10`}>{status.label}</div>
                    <p className="text-[10px] text-slate-400 mt-2 leading-snug px-2 z-10">{status.desc}</p>
                </div>

                {/* Streak Mini Card */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 h-20 flex flex-col justify-center">
                    <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                        <span>Streak</span>
                        <span className="text-white font-bold">{data.streak} Days</span>
                    </div>
                    <div className="flex gap-1 h-1.5 mt-1">
                        {[1,2,3,4,5].map(i => (
                            <div key={i} className={`flex-1 rounded-full ${i <= data.streak ? 'bg-emerald-500' : 'bg-white/10'}`}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Center Column (Platforms & Trend) - 6 Columns */}
            <div className="col-span-6 flex flex-col gap-4">
                {/* Platforms Row */}
                <div className="grid grid-cols-4 gap-2 h-24">
                     {data.platforms.map((p, i) => <PlatformCard key={i} {...p} />)}
                </div>

                {/* Chart Area */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                         <h3 className="text-[11px] font-bold text-slate-300 flex items-center gap-2 uppercase tracking-wider">
                             <Activity size={12} className="text-brand-purple" />
                             Sentiment Velocity
                         </h3>
                         <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-slate-400">24H View</span>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.sentimentHistory}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#d946ef" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} vertical={false} />
                                <XAxis 
                                    dataKey="time" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 9, fill: '#475569'}} 
                                    dy={5}
                                />
                                <YAxis hide domain={[0, 100]} />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '4px', fontSize: '10px'}}
                                    itemStyle={{color: '#d946ef'}}
                                    cursor={{stroke: '#334155', strokeWidth: 1}}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="#d946ef" 
                                    strokeWidth={2} 
                                    fillOpacity={1} 
                                    fill="url(#colorScore)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Right Column (Alerts) - 3 Columns */}
            <div className="col-span-3 h-full">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl flex flex-col h-full overflow-hidden">
                    <div className="p-3 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                            <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Live Alerts</h3>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                        {data.alerts.map(alert => (
                            <AlertItem key={alert.id} alert={alert} />
                        ))}
                         <AlertItem alert={{
                             id: 'old1',
                             type: 'SUCCESS',
                             message: 'Influencer mention: @techdaily',
                             time: '2h ago',
                             impact: '+2%'
                         }} />
                    </div>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};