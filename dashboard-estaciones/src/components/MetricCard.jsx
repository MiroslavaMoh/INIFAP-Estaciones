const MetricCard = ({ color = '#9F2241', Icon, title, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 relative overflow-hidden h-full">
      <div
        className="absolute left-0 top-6 bottom-6 w-2 rounded-r-md"
        style={{ backgroundColor: color }}
      />
      <div className="pl-4">
        <div className="flex justify-between items-start mb-2">
          <h5 className="text-gray-500 font-semibold text-lg text-left">{title}</h5>
          {Icon && <Icon style={{ color }} size={25} className="p-1"/>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default MetricCard;
