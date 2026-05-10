const DetailsIconLeft = ({ IconDetail, TitleDetail, TextDetail }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex items-center gap-3">
            {IconDetail && <IconDetail className="text-gray-400" size={20} />}
            <div>
                <div className="text-xs font-bold text-gray-400 text-left">{TitleDetail}</div>
                <div className="font-semibold text-md text-left">{TextDetail}</div>
            </div>
        </div>
    );
};

export default DetailsIconLeft;
