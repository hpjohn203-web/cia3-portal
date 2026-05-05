/* CIA Part 3 — Inline diagram components. No external image URLs. */

function COSOFramework() {
  const components = ['Control Environment', 'Risk Assessment', 'Control Activities', 'Information & Communication', 'Monitoring Activities'];
  const colors = ['#f59e0b','#3b82f6','#10b981','#8b5cf6','#ef4444'];
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full" style={{minHeight:180}}>
      <rect width="400" height="260" fill="#1e293b" rx="8"/>
      <text x="200" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">COSO Internal Control Framework</text>
      {/* Three entity levels */}
      {['Entity Level','Division Level','Function Level'].map((lvl,i) => (
        <text key={i} x={68+i*110} y={245} textAnchor="middle" fill="#94a3b8" fontSize="8">{lvl}</text>
      ))}
      {components.map((comp, i) => (
        <g key={i}>
          <rect x={20} y={35+i*40} width={360} height={32} rx="4" fill={colors[i]} opacity="0.2"/>
          <rect x={20} y={35+i*40} width={6} height={32} rx="2" fill={colors[i]}/>
          <text x={36} y={56+i*40} fill={colors[i]} fontSize="9" fontWeight="600">{comp}</text>
          {[0,1,2].map(j => (
            <rect key={j} x={285+j*32} y={39+i*40} width={24} height={24} rx="3" fill={colors[i]} opacity="0.3"/>
          ))}
        </g>
      ))}
    </svg>
  );
}

function ThreeLinesModel() {
  const lines = [
    { label: '1st Line', sub: 'Operations', color: '#10b981', desc: 'Owns & manages risk' },
    { label: '2nd Line', sub: 'Risk / Compliance', color: '#f59e0b', desc: 'Oversees & advises' },
    { label: '3rd Line', sub: 'Internal Audit', color: '#3b82f6', desc: 'Independent assurance' },
  ];
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full" style={{minHeight:180}}>
      <rect width="400" height="240" fill="#1e293b" rx="8"/>
      <text x="200" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Three Lines Model (IIA)</text>
      <rect x="100" y="30" width="200" height="28" rx="6" fill="#475569" opacity="0.6"/>
      <text x="200" y="48" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">GOVERNING BODY / BOARD</text>
      {/* Arrow down */}
      <line x1="200" y1="58" x2="200" y2="74" stroke="#64748b" strokeWidth="1.5"/>
      <polygon points="196,74 204,74 200,80" fill="#64748b"/>
      {lines.map((l, i) => (
        <g key={i}>
          <rect x={18+i*124} y={85} width={110} height={100} rx="8" fill={l.color} opacity="0.15" stroke={l.color} strokeWidth="1" strokeOpacity="0.4"/>
          <text x={73+i*124} y={106} textAnchor="middle" fill={l.color} fontSize="11" fontWeight="bold">{l.label}</text>
          <text x={73+i*124} y={122} textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="600">{l.sub}</text>
          <text x={73+i*124} y={155} textAnchor="middle" fill="#94a3b8" fontSize="7.5">{l.desc}</text>
          <line x1={73+i*124} y1={200} x2={73+i*124} y2={215} stroke={l.color} strokeWidth="1.5" strokeDasharray="3,2"/>
        </g>
      ))}
      <rect x="18" y="215" width="364" height="20" rx="4" fill="#1e40af" opacity="0.4"/>
      <text x="200" y="229" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="600">SENIOR MANAGEMENT</text>
    </svg>
  );
}

function RiskMatrix() {
  const levels = [
    [3,4,5,5,5],[2,3,4,5,5],[1,2,3,4,5],[1,1,2,3,4],[1,1,1,2,3]
  ];
  const colors = { 1:'#10b981',2:'#84cc16',3:'#f59e0b',4:'#f97316',5:'#ef4444' };
  const labels = { 1:'Low',2:'Mod-Low',3:'Medium',4:'High',5:'Critical' };
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full" style={{minHeight:180}}>
      <rect width="400" height="260" fill="#1e293b" rx="8"/>
      <text x="200" y="20" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Risk Assessment Matrix</text>
      <text x="200" y="250" textAnchor="middle" fill="#94a3b8" fontSize="9">Likelihood →</text>
      <text x="12" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9" transform="rotate(-90,12,145)">Impact ↑</text>
      {['V.Low','Low','Med','High','V.High'].map((l,i) => (
        <text key={i} x={78+i*60} y={238} textAnchor="middle" fill="#64748b" fontSize="7.5">{l}</text>
      ))}
      {[5,4,3,2,1].map((row,ri) => (
        <text key={ri} x={52} y={77+ri*38} textAnchor="end" fill="#64748b" fontSize="7.5">{['V.High','High','Med','Low','V.Low'][ri]}</text>
      ))}
      {levels.map((row, ri) => row.map((val, ci) => (
        <g key={`${ri}-${ci}`}>
          <rect x={57+ci*60} y={55+ri*38} width={52} height={32} rx="3" fill={colors[val]} opacity="0.6"/>
          <text x={83+ci*60} y={75+ri*38} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">{labels[val]}</text>
        </g>
      )))}
    </svg>
  );
}

function AuditProcessFlow() {
  const phases = [
    { label: 'Planning', color: '#3b82f6', items: ['Risk assessment','Audit program','Resource allocation'] },
    { label: 'Fieldwork', color: '#10b981', items: ['Evidence gathering','Testing controls','Interviews'] },
    { label: 'Reporting', color: '#f59e0b', items: ['Draft findings','Management response','Final report'] },
    { label: 'Follow-Up', color: '#8b5cf6', items: ['Verify remediation','Close observations','Update risk register'] },
  ];
  return (
    <svg viewBox="0 0 420 230" className="w-full h-full" style={{minHeight:180}}>
      <rect width="420" height="230" fill="#1e293b" rx="8"/>
      <text x="210" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Audit Process Flow</text>
      {phases.map((p, i) => (
        <g key={i}>
          <rect x={10+i*102} y={35} width={90} height={170} rx="8" fill={p.color} opacity="0.15" stroke={p.color} strokeWidth="1" strokeOpacity="0.5"/>
          <rect x={10+i*102} y={35} width={90} height={26} rx="6" fill={p.color} opacity="0.5"/>
          <text x={55+i*102} y={52} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{p.label}</text>
          {p.items.map((item, j) => (
            <text key={j} x={55+i*102} y={80+j*28} textAnchor="middle" fill="#cbd5e1" fontSize="8">{item}</text>
          ))}
          {i < 3 && <polygon points={`${103+i*102},120 ${109+i*102},114 ${109+i*102},126`} fill={p.color} opacity="0.8"/>}
        </g>
      ))}
    </svg>
  );
}

function FinancialStatements() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full" style={{minHeight:180}}>
      <rect width="400" height="240" fill="#1e293b" rx="8"/>
      <text x="200" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Financial Statement Relationships</text>
      {/* Income Statement */}
      <rect x="140" y="35" width="120" height="60" rx="6" fill="#3b82f6" opacity="0.2" stroke="#3b82f6" strokeWidth="1.2"/>
      <text x="200" y="53" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">INCOME STATEMENT</text>
      <text x="200" y="68" textAnchor="middle" fill="#cbd5e1" fontSize="7.5">Revenue − Expenses</text>
      <text x="200" y="83" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold">= Net Income</text>
      {/* Arrow to Retained Earnings */}
      <line x1="200" y1="95" x2="200" y2="112" stroke="#10b981" strokeWidth="1.5"/>
      <polygon points="196,112 204,112 200,118" fill="#10b981"/>
      <text x="215" y="108" fill="#10b981" fontSize="7">Net Income flows</text>
      {/* Balance Sheet */}
      <rect x="60" y="125" width="140" height="85" rx="6" fill="#10b981" opacity="0.15" stroke="#10b981" strokeWidth="1.2"/>
      <text x="130" y="143" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">BALANCE SHEET</text>
      <text x="130" y="158" textAnchor="middle" fill="#94a3b8" fontSize="7.5">Assets = Liabilities</text>
      <text x="130" y="172" textAnchor="middle" fill="#94a3b8" fontSize="7.5">+ Shareholders' Equity</text>
      <text x="130" y="188" textAnchor="middle" fill="#6ee7b7" fontSize="7">(incl. Retained Earnings)</text>
      {/* Cash Flow Statement */}
      <rect x="215" y="125" width="140" height="85" rx="6" fill="#8b5cf6" opacity="0.15" stroke="#8b5cf6" strokeWidth="1.2"/>
      <text x="285" y="143" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="bold">CASH FLOW STMT</text>
      <text x="285" y="158" textAnchor="middle" fill="#94a3b8" fontSize="7.5">Operating Activities</text>
      <text x="285" y="172" textAnchor="middle" fill="#94a3b8" fontSize="7.5">Investing Activities</text>
      <text x="285" y="188" textAnchor="middle" fill="#94a3b8" fontSize="7.5">Financing Activities</text>
      <text x="200" y="226" textAnchor="middle" fill="#64748b" fontSize="7">Ending cash ties to Cash on Balance Sheet</text>
    </svg>
  );
}

function BreakEvenChart() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full" style={{minHeight:180}}>
      <rect width="400" height="250" fill="#1e293b" rx="8"/>
      <text x="200" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Break-Even Analysis</text>
      {/* Axes */}
      <line x1="50" y1="200" x2="370" y2="200" stroke="#475569" strokeWidth="1.5"/>
      <line x1="50" y1="40" x2="50" y2="200" stroke="#475569" strokeWidth="1.5"/>
      <text x="210" y="220" textAnchor="middle" fill="#94a3b8" fontSize="8">Units Sold →</text>
      <text x="15" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8" transform="rotate(-90,15,125)">$ Amount</text>
      {/* Fixed Cost line (horizontal) */}
      <line x1="50" y1="155" x2="370" y2="155" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3"/>
      <text x="375" y="158" fill="#ef4444" fontSize="8">Fixed Costs</text>
      {/* Total Cost line (diagonal from fixed cost level) */}
      <line x1="50" y1="155" x2="370" y2="85" stroke="#f97316" strokeWidth="2"/>
      <text x="375" y="90" fill="#f97316" fontSize="8">Total Cost</text>
      {/* Revenue line */}
      <line x1="50" y1="200" x2="370" y2="60" stroke="#10b981" strokeWidth="2"/>
      <text x="375" y="63" fill="#10b981" fontSize="8">Revenue</text>
      {/* Break-even point (intersection ~at x=195, y=133) */}
      <circle cx="195" cy="133" r="5" fill="#f59e0b"/>
      <line x1="195" y1="133" x2="195" y2="200" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,2"/>
      <text x="195" y="213" textAnchor="middle" fill="#f59e0b" fontSize="8">BEP</text>
      {/* Labels */}
      <text x="100" y="185" fill="#ef4444" fontSize="7.5" opacity="0.8">Loss Zone</text>
      <text x="280" y="100" fill="#10b981" fontSize="7.5">Profit Zone</text>
    </svg>
  );
}

function PDCACycle() {
  const steps = [
    { label: 'PLAN', sub: 'Identify opportunity\n& plan change', color: '#3b82f6', x: 200, y: 65 },
    { label: 'DO', sub: 'Implement\nthe change', color: '#10b981', x: 310, y: 145 },
    { label: 'CHECK', sub: 'Measure results\nagainst plan', color: '#f59e0b', x: 200, y: 195 },
    { label: 'ACT', sub: 'Standardize\nor adjust', color: '#8b5cf6', x: 90, y: 145 },
  ];
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full" style={{minHeight:180}}>
      <rect width="400" height="260" fill="#1e293b" rx="8"/>
      <text x="200" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">PDCA Continuous Improvement Cycle</text>
      <circle cx="200" cy="140" r="65" fill="none" stroke="#334155" strokeWidth="1.5"/>
      {steps.map((s, i) => {
        const angle = i * 90 - 90;
        const rad = angle * Math.PI / 180;
        const ax = 200 + 82 * Math.cos(rad);
        const ay = 140 + 82 * Math.sin(rad);
        const nangle = (angle + 90) * Math.PI / 180;
        const arx = 200 + 65 * Math.cos(nangle - 0.4);
        const ary = 140 + 65 * Math.sin(nangle - 0.4);
        return (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r="28" fill={s.color} opacity="0.25" stroke={s.color} strokeWidth="1.5"/>
            <text x={s.x} y={s.y - 4} textAnchor="middle" fill={s.color} fontSize="11" fontWeight="bold">{s.label}</text>
            <polygon points={`${arx-4},${ary} ${arx+4},${ary} ${arx},${ary+6}`} fill={s.color} opacity="0.8" transform={`rotate(${angle+90},${arx},${ary})`}/>
          </g>
        );
      })}
      <text x="200" y="136" textAnchor="middle" fill="#64748b" fontSize="7">Continuous</text>
      <text x="200" y="148" textAnchor="middle" fill="#64748b" fontSize="7">Improvement</text>
    </svg>
  );
}

function ITControlsHierarchy() {
  const layers = [
    { label: 'APPLICATION CONTROLS', color: '#8b5cf6', items: 'Input • Processing • Output • Error handling', y: 48, h: 44 },
    { label: 'IT GENERAL CONTROLS (ITGC)', color: '#3b82f6', items: 'Access Mgmt • Change Mgmt • Computer Operations • Data Backup', y: 106, h: 44 },
    { label: 'INFRASTRUCTURE & PHYSICAL CONTROLS', color: '#10b981', items: 'Servers • Networks • Data Centers • Physical Security', y: 164, h: 44 },
  ];
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full" style={{minHeight:180}}>
      <rect width="400" height="240" fill="#1e293b" rx="8"/>
      <text x="200" y="25" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">IT Controls Hierarchy</text>
      {layers.map((l, i) => {
        const width = 340 - i * 40;
        const x = 30 + i * 20;
        return (
          <g key={i}>
            <rect x={x} y={l.y} width={width} height={l.h} rx="6" fill={l.color} opacity="0.2" stroke={l.color} strokeWidth="1.2"/>
            <text x="200" y={l.y + 17} textAnchor="middle" fill={l.color} fontSize="9" fontWeight="bold">{l.label}</text>
            <text x="200" y={l.y + 33} textAnchor="middle" fill="#94a3b8" fontSize="7.5">{l.items}</text>
          </g>
        );
      })}
      <text x="200" y="228" textAnchor="middle" fill="#64748b" fontSize="7.5">Application controls depend on the integrity of ITGCs below them</text>
    </svg>
  );
}

function PortersFiveForces() {
  const forces = [
    { label: 'Competitive\nRivalry', color: '#f59e0b', cx: 200, cy: 130, r: 38, main: true },
    { label: 'Supplier\nPower', color: '#3b82f6', cx: 70, cy: 130, r: 30 },
    { label: 'Buyer\nPower', color: '#10b981', cx: 330, cy: 130, r: 30 },
    { label: 'Threat of\nNew Entrants', color: '#8b5cf6', cx: 200, cy: 52, r: 30 },
    { label: 'Threat of\nSubstitutes', color: '#ef4444', cx: 200, cy: 208, r: 30 },
  ];
  return (
    <svg viewBox="0 0 400 265" className="w-full h-full" style={{minHeight:180}}>
      <rect width="400" height="265" fill="#1e293b" rx="8"/>
      <text x="200" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Porter's Five Forces</text>
      <line x1="100" y1="130" x2="162" y2="130" stroke="#475569" strokeWidth="1.5"/>
      <line x1="238" y1="130" x2="300" y2="130" stroke="#475569" strokeWidth="1.5"/>
      <line x1="200" y1="82" x2="200" y2="92" stroke="#475569" strokeWidth="1.5"/>
      <line x1="200" y1="168" x2="200" y2="178" stroke="#475569" strokeWidth="1.5"/>
      {forces.map((f, i) => (
        <g key={i}>
          <circle cx={f.cx} cy={f.cy} r={f.r} fill={f.color} opacity={f.main ? 0.3 : 0.2} stroke={f.color} strokeWidth="1.5"/>
          {f.label.split('\n').map((line, li) => (
            <text key={li} x={f.cx} y={f.cy - 4 + li * 12} textAnchor="middle" fill={f.color} fontSize={f.main ? 8 : 7.5} fontWeight="600">{line}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

function BalancedScorecard() {
  const perspectives = [
    { label: 'Financial', question: 'How do we look to shareholders?', color: '#10b981', x: 170, y: 35 },
    { label: 'Customer', question: 'How do customers see us?', color: '#3b82f6', x: 270, y: 115 },
    { label: 'Internal Process', question: 'What must we excel at?', color: '#f59e0b', x: 170, y: 185 },
    { label: 'Learning & Growth', question: 'Can we continue to improve?', color: '#8b5cf6', x: 60, y: 115 },
  ];
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full" style={{minHeight:180}}>
      <rect width="400" height="250" fill="#1e293b" rx="8"/>
      <text x="200" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Balanced Scorecard</text>
      <rect x="155" y="105" width="90" height="40" rx="6" fill="#334155"/>
      <text x="200" y="122" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">VISION &</text>
      <text x="200" y="136" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">STRATEGY</text>
      {[{from:[200,105],to:[200,78]},{from:[245,125],to:[270,130]},{from:[200,145],to:[200,175]},{from:[155,125],to:[130,130]}].map((l,i) => (
        <line key={i} x1={l.from[0]} y1={l.from[1]} x2={l.to[0]} y2={l.to[1]} stroke="#475569" strokeWidth="1.5"/>
      ))}
      {perspectives.map((p, i) => (
        <g key={i}>
          <rect x={p.x} y={p.y} width={90} height={55} rx="6" fill={p.color} opacity="0.2" stroke={p.color} strokeWidth="1.2"/>
          <text x={p.x+45} y={p.y+18} textAnchor="middle" fill={p.color} fontSize="9" fontWeight="bold">{p.label}</text>
          <foreignObject x={p.x+4} y={p.y+24} width={82} height={26}>
            <div xmlns="http://www.w3.org/1999/xhtml" style={{fontSize:'7px',color:'#94a3b8',textAlign:'center'}}>{p.question}</div>
          </foreignObject>
        </g>
      ))}
    </svg>
  );
}

function ERMFramework() {
  const components = [
    { label: 'Governance & Culture', color: '#3b82f6' },
    { label: 'Strategy & Objective-Setting', color: '#8b5cf6' },
    { label: 'Performance', color: '#f59e0b' },
    { label: 'Review & Revision', color: '#10b981' },
    { label: 'Information, Communication & Reporting', color: '#ef4444' },
  ];
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full" style={{minHeight:180}}>
      <rect width="400" height="250" fill="#1e293b" rx="8"/>
      <text x="200" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Enterprise Risk Management (COSO ERM)</text>
      {components.map((c, i) => (
        <g key={i}>
          <rect x={20} y={38+i*38} width={360} height={30} rx="5" fill={c.color} opacity="0.18" stroke={c.color} strokeWidth="1" strokeOpacity="0.5"/>
          <rect x={20} y={38+i*38} width={7} height={30} rx="2" fill={c.color}/>
          <text x={36} y={58+i*38} fill={c.color} fontSize="9" fontWeight="600">{c.label}</text>
          <text x={370} y={58+i*38} textAnchor="end" fill="#475569" fontSize="7.5">{['Culture','Strategy','Risk ID & Response','Monitor','Communicate'][i]}</text>
        </g>
      ))}
      <text x="200" y="238" textAnchor="middle" fill="#64748b" fontSize="7.5">Applied across entity objectives: Operations · Reporting · Compliance</text>
    </svg>
  );
}

function DataAnalyticsProcess() {
  const steps = [
    { label: 'Define\nObjective', color: '#3b82f6' },
    { label: 'Obtain\nData', color: '#8b5cf6' },
    { label: 'Prepare &\nClean', color: '#f59e0b' },
    { label: 'Analyze', color: '#f97316' },
    { label: 'Interpret\nResults', color: '#10b981' },
    { label: 'Communicate\nFindings', color: '#ef4444' },
  ];
  const xStep = 60;
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" style={{minHeight:160}}>
      <rect width="400" height="200" fill="#1e293b" rx="8"/>
      <text x="200" y="22" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">Data Analytics Process (Audit)</text>
      {steps.map((s, i) => {
        const cx = 32 + i * xStep;
        return (
          <g key={i}>
            <circle cx={cx} cy={100} r={22} fill={s.color} opacity="0.25" stroke={s.color} strokeWidth="1.5"/>
            {s.label.split('\n').map((ln, li) => (
              <text key={li} x={cx} y={96 + li * 12} textAnchor="middle" fill={s.color} fontSize="7.5" fontWeight="600">{ln}</text>
            ))}
            {i < steps.length - 1 && (
              <polygon points={`${cx+24},100 ${cx+32},96 ${cx+32},104`} fill={s.color} opacity="0.7"/>
            )}
          </g>
        );
      })}
      <text x="200" y="155" textAnchor="middle" fill="#64748b" fontSize="7.5">Supports risk-based internal auditing and continuous monitoring</text>
    </svg>
  );
}

export const DIAGRAM_VISUALS = {
  COSOFramework,
  ThreeLinesModel,
  RiskMatrix,
  AuditProcessFlow,
  FinancialStatements,
  BreakEvenChart,
  PDCACycle,
  ITControlsHierarchy,
  PortersFiveForces,
  BalancedScorecard,
  ERMFramework,
  DataAnalyticsProcess,
};
