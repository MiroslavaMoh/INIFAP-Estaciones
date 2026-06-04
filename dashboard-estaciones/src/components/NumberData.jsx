const NumberData = ({ Number, Value }) => {
    return(
        <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold text-[#10312B]">{Number}</span>
                <span className="text-xl font-medium text-gray-500">{Value}</span>
        </div>
    )
}

export default NumberData