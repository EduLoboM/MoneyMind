import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import './SpendingChart.css';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip">
      <p className="tooltip-date">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="tooltip-entry" style={{ color: entry.color }}>
          {entry.name}: <strong>R$ {entry.value}</strong>
        </p>
      ))}
    </div>
  );
}

export default function SpendingChart({ data }) {
  return (
    <div className="spending-chart glass-card" id="spending-chart">
      <div className="chart-header">
        <h3 className="chart-title">Gastos vs. Projeção IA</h3>
        <div className="chart-legend">
          <span className="legend-item">
            <span className="legend-dot" style={{ background: '#0038A8' }}></span>
            Real
          </span>
          <span className="legend-item">
            <span className="legend-dot dashed" style={{ background: '#ef4444' }}></span>
            Projeção
          </span>
          <span className="legend-item">
            <span className="legend-dot" style={{ background: '#F9DD16' }}></span>
            Orçamento
          </span>
        </div>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 15, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-danger)" stopOpacity={0.22}/>
                <stop offset="95%" stopColor="var(--accent-danger)" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: 'var(--text-secondary)', fontSize: 11, fontWeight: 500 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
              interval={4}
            />
            <YAxis
              tick={{ fill: 'var(--text-secondary)', fontSize: 11, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `R$${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={180}
              stroke="#ca8a04"
              strokeDasharray="6 4"
              strokeWidth={2}
              label={{
                value: 'Limite de Orçamento',
                position: 'top',
                fill: '#ca8a04',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.05em',
              }}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="var(--accent-primary)"
              strokeWidth={3}
              fill="url(#colorReal)"
              name="Gasto Real"
              connectNulls={false}
              dot={false}
              activeDot={{ r: 6, fill: 'var(--accent-primary)', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="projected"
              stroke="var(--accent-danger)"
              strokeWidth={3}
              strokeDasharray="6 4"
              fill="url(#colorProjected)"
              name="Projeção IA"
              connectNulls={false}
              dot={false}
              activeDot={{ r: 6, fill: 'var(--accent-danger)', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
