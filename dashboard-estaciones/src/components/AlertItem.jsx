import { CheckCircle2, AlertTriangle, Info, Lightbulb } from 'lucide-react';

const config = {
  condiciones: {
    bg: 'bg-[#285C4D]/10',
    border: 'border-[#285C4D]/20',
    color: 'text-[#285C4D]',
    Icon: CheckCircle2,
    label: 'Condiciones',
  },
  alerta: {
    bg: 'bg-[#9F2241]/20',
    border: 'border-[#9F2241]/40',
    color: 'text-[#9F2241]',
    Icon: AlertTriangle,
    label: 'Alerta',
  },
  anuncio: {
    bg: 'bg-[#285C4D]/10',
    border: 'border-[#285C4D]/20',
    color: 'text-[#285C4D]',
    Icon: Info,
    label: 'Anuncio',
  },
  recomendacion: {
    bg: 'bg-[#D4C19C]/10',
    border: 'border-[#D4C19C]/20',
    color: 'text-[#D4C19C]',
    Icon: Lightbulb,
    label: 'Recomendación',
  },
};

const AlertItem = ({ type, message }) => {
  const { bg, border, color, Icon, label } = config[type] ?? config.anuncio;

  return (
    <div className={`${bg} border ${border} rounded-xl p-2 flex gap-3 my-2`}>
      <Icon className={`${color} shrink-0 mt-0.5`} size={15} />
      <div>
        <p className={`text-xs font-bold ${color} uppercase tracking-wider mb-1 text-left`}>
          {label}
        </p>
        <p className="text-sm text-[#10312B] leading-relaxed text-left">{message}</p>
      </div>
    </div>
  );
};

export default AlertItem;
