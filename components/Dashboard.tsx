import React from 'react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap,
  LayoutDashboard,
  BrainCircuit,
  Target,
  FileText,
  Users,
  Globe,
  MessageSquare,
  Menu
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
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col justify-between min-w-[100px] flex-1 hover:border-slate-700 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        {name === 'TikTok' && <div className="w-2 h-2 rounded-full bg-pink-500"></div>}
        {name === 'Reddit' && <div className="w-2 h-2 rounded-full bg-orange-500"></div>}
        {name === 'Twitter' && <div className="w-2 h-2 rounded-full bg-blue-400"></div>}
        {name === 'Google' && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
        <div className="text-xs text-slate-400 font-medium">{name}</div>
      </div>
      <div className="flex items-end justify-between mb-2">
        <div className="text-xl font-bold text-white">{percentage}%</div>
        <div className={`text-xs flex items-center font-medium ${isUp ? 'text-emerald-400' : 'text-brand-red'}`}>
          {isUp ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
          {Math.abs(data[data.length - 1] - data[0])}%
        </div>
      </div>
      <div className="h-8 w-full opacity-60">
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
  <div className={`mb-3 p-3 rounded-lg border backdrop-blur-sm transition-all hover:scale-[1.01] group ${
    alert.type === 'CRITICAL' ? 'bg-red-950/10 border-red-900/30 hover:bg-red-950/20' : 
    alert.type === 'WARNING' ? 'bg-amber-950/10 border-amber-900/30 hover:bg-amber-950/20' : 
    'bg-emerald-950/10 border-emerald-900/30 hover:bg-emerald-950/20'
  }`}>
    <div className="flex justify-between items-start mb-1.5">
      <div className="flex items-center gap-2">
        {alert.type === 'CRITICAL' && <AlertTriangle size={14} className="text-red-500 animate-pulse" />}
        {alert.type === 'WARNING' && <Activity size={14} className="text-amber-500" />}
        {alert.type === 'SUCCESS' && <CheckCircle2 size={14} className="text-emerald-500" />}
        <span className={`text-[10px] font-bold tracking-wider ${
           alert.type === 'CRITICAL' ? 'text-red-500' : 
           alert.type === 'WARNING' ? 'text-amber-500' : 
           'text-emerald-500'
        }`}>{alert.type}</span>
      </div>
      <span className="text-[10px] text-slate-500 font-mono group-hover:text-slate-400">{alert.time}</span>
    </div>
    <p className="text-xs text-slate-200 leading-relaxed mb-2.5 font-medium">{alert.message}</p>
    <div className="flex justify-between items-center border-t border-white/5 pt-2">
      <span className={`text-[10px] font-medium ${
         alert.type === 'CRITICAL' ? 'text-red-400' : 
         alert.type === 'WARNING' ? 'text-amber-400' : 
         'text-emerald-400'
      }`}>{alert.impact}</span>
      {alert.xp && (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-brand-purple/10 rounded text-[9px] text-brand-pink font-medium border border-brand-purple/20">
          <Zap size={8} /> +{alert.xp} XP
        </span>
      )}
    </div>
  </div>
);

const NavItem: React.FC<{ icon: React.ElementType; label: string; active?: boolean }> = ({ icon: Icon, label, active }) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
    active 
    ? 'bg-slate-800 text-white shadow-sm' 
    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
  }`}>
    <Icon size={14} className={active ? 'text-brand-purple' : 'text-slate-500'} />
    <span>{label}</span>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ data, loading }) => {
  const getScoreStatus = (score: number) => {
    if (score >= 80) return { label: 'EXCELLENT', color: 'text-emerald-400', desc: 'Brand sentiment is overwhelmingly positive. Continue current strategy.' };
    if (score >= 60) return { label: 'HEALTHY', color: 'text-blue-400', desc: 'Stable reputation with minor fluctuations. No immediate threats.' };
    if (score >= 40) return { label: 'AT RISK', color: 'text-amber-400', desc: 'Negative trends detected in key demographics. Monitoring required.' };
    return { label: 'CRITICAL', color: 'text-red-500', desc: 'Immediate crisis intervention recommended. Sentiment is plummeting.' };
  };

  const status = getScoreStatus(data.vibeScore);

  if (loading) {
    return (
      <div className="w-full h-[680px] flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-t-2 border-brand-pink rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-2 border-brand-purple/30 rounded-full"></div>
          </div>
          <p className="text-slate-400 text-sm animate-pulse">Syncing live data streams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[680px] bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col text-white transform transition-all duration-500">
      
      {/* Window Header */}
      <div className="h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2 shrink-0 z-20 justify-between">
        <div className="flex items-center gap-4">
            <div className="flex gap-1.5 group">
              <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50 group-hover:bg-red-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/50 group-hover:bg-amber-500 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/50 group-hover:bg-emerald-500 transition-colors"></div>
            </div>
            <div className="h-4 w-px bg-slate-800 mx-2"></div>
            <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
                <Shield size={12} className="text-brand-purple" />
                <span className="hidden sm:inline">VibeScore Enterprise</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">Dashboard</span>
            </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                <Globe size={10} className="text-slate-400" />
                <span className="text-slate-400">Global Monitor</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold bg-emerald-950/30 px-2.5 py-1 rounded-full border border-emerald-900/50 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                LIVE
            </div>
        </div>
      </div>

      {/* Horizontal Navigation Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center justify-between shrink-0 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1">
              <NavItem icon={LayoutDashboard} label="Command Center" active />
              <NavItem icon={BrainCircuit} label="Predictive Intel" />
              <NavItem icon={Target} label="Competitive Tracking" />
              <NavItem icon={FileText} label="Reports" />
          </div>

          <div className="flex items-center gap-4 pl-6 border-l border-slate-800 ml-4 shrink-0">
                <div className="flex flex-col items-end min-w-[80px]">
                    <div className="flex items-center gap-1.5">
                         <Trophy size={12} className="text-amber-400" />
                         <span className="text-xs font-bold text-slate-200">Level {data.level}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                         <div className="bg-gradient-to-r from-brand-purple to-brand-pink h-full rounded-full" style={{ width: `${(data.currentXP / data.maxXP) * 100}%` }}></div>
                    </div>
                </div>
          </div>
      </div>

      {/* Dashboard Content */}
      <main className="flex-1 overflow-y-auto bg-slate-950/50 p-6 scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
            
            {/* Header Section */}
            <div className="col-span-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Brand Health Overview</h2>
                    <p className="text-sm text-slate-400">Real-time sentiment analysis across key channels.</p>
                </div>
                <div className="flex items-center gap-6 bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2">
                     <div className="text-right">
                         <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Mentions (24h)</div>
                         <div className="text-lg font-bold text-white font-mono leading-none mt-1">{data.totalMentions.toLocaleString()}</div>
                     </div>
                     <div className="h-8 w-px bg-slate-800"></div>
                     <div className="text-right">
                         <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Est. Reach</div>
                         <div className="text-lg font-bold text-white font-mono leading-none mt-1">{data.reach}</div>
                     </div>
                </div>
            </div>

            {/* Left Column (Main Stats) */}
            <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
                
                {/* VibeScore & Stats Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* VibeScore Card */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-slate-700 transition-colors">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="flex items-start gap-5 relative z-10">
                            <div className="shrink-0">
                                <GaugeChart score={data.vibeScore} />
                            </div>
                            <div className="flex flex-col pt-2">
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Overall Score</span>
                                <div className={`text-3xl font-bold ${status.color} mb-2`}>{status.label}</div>
                                
                                {/* Summary Statement */}
                                <div className="bg-slate-800/50 rounded-lg p-2.5 border border-slate-700/50 mt-1">
                                    <div className="flex items-start gap-2">
                                        <BrainCircuit size={14} className="text-brand-purple mt-0.5 shrink-0" />
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            <span className="font-semibold text-white">Analysis:</span> {status.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sentiment Stats Card */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Sentiment Momentum</div>
                                <div className="flex items-baseline gap-3">
                                    <div className="text-3xl font-bold text-white">
                                        {data.vibeScore > 50 ? '+' : ''}{((data.vibeScore - 65) / 2).toFixed(1)}%
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 font-medium ${data.vibeScore > 60 ? 'text-emerald-400' : 'text-brand-red'}`}>
                                        Past 24h
                                    </span>
                                </div>
                            </div>
                            <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                                <Activity size={20} />
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>Positive Streak</span>
                                <span className="text-white font-bold">{data.streak} Days</span>
                            </div>
                            <div className="flex gap-1 h-2">
                                {[1,2,3,4,5,6,7].map(i => (
                                    <div key={i} className={`flex-1 rounded-full transition-all ${i <= data.streak ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-slate-800'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 flex-1 min-h-[200px] flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                         <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                             <TrendingUp size={16} className="text-brand-pink" />
                             Sentiment Velocity
                         </h3>
                         <div className="flex bg-slate-800 rounded-lg p-0.5">
                             {['1H', '24H', '7D'].map(tf => (
                                 <button key={tf} className={`text-[10px] px-3 py-1 rounded-md font-medium transition-all ${tf === '24H' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
                                     {tf}
                                 </button>
                             ))}
                         </div>
                    </div>
                    <div className="flex-1 w-full min-h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.sentimentHistory}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis 
                                    dataKey="time" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 10, fill: '#64748b'}} 
                                    dy={10}
                                />
                                <YAxis 
                                    hide 
                                    domain={[0, 100]} 
                                />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', padding: '8px'}}
                                    itemStyle={{color: '#d946ef', fontWeight: 'bold'}}
                                    cursor={{stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 4'}}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="#d946ef" 
                                    strokeWidth={3} 
                                    fillOpacity={1} 
                                    fill="url(#colorScore)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Platforms Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {data.platforms.map((p, i) => <PlatformCard key={i} {...p} />)}
                </div>
            </div>

            {/* Right Column (Alert Feed) */}
            <div className="col-span-12 md:col-span-4 h-full">
                <div className="bg-slate-900/40 border border-slate-800 rounded-xl flex flex-col h-full overflow-hidden">
                    <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex justify-between items-center sticky top-0 z-10">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping absolute inset-0 opacity-75"></div>
                                <div className="w-2 h-2 bg-red-500 rounded-full relative"></div>
                            </div>
                            <h3 className="text-sm font-bold text-white">Live Alert Feed</h3>
                        </div>
                        <button className="text-xs text-slate-500 hover:text-white transition-colors bg-slate-800 px-2 py-1 rounded border border-slate-700">
                            Filter
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
                        <div className="space-y-1">
                            {data.alerts.map(alert => (
                                <AlertItem key={alert.id} alert={alert} />
                            ))}
                            
                            {/* Mock older alerts for fullness */}
                            <div className="opacity-50 pointer-events-none grayscale-[0.3]">
                                 <AlertItem alert={{
                                     id: 'old1',
                                     type: 'SUCCESS',
                                     message: 'Influencer mention: @techdaily (250k followers)',
                                     time: '2h ago',
                                     impact: '+2% sentiment',
                                     xp: 50
                                 }} />
                                 <AlertItem alert={{
                                     id: 'old2',
                                     type: 'WARNING',
                                     message: 'Competitor launched new campaign on Twitter',
                                     time: '4h ago',
                                     impact: 'Monitoring'
                                 }} />
                                 <AlertItem alert={{
                                     id: 'old3',
                                     type: 'SUCCESS',
                                     message: 'Product launch press release picked up by TechCrunch',
                                     time: '5h ago',
                                     impact: '+8% Reach',
                                     xp: 75
                                 }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};