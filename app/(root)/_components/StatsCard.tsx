// File: components/ui/StatsCard.jsx
export const StatsCard = ({ icon: Icon, label, value, color = "green" }) => {
    const colorClasses = {
        green: 'bg-green-50 text-green-600',
        blue: 'bg-blue-100 text-blue-600',
        purple: 'bg-purple-100 text-purple-600',
        orange: 'bg-orange-100 text-orange-600'
    };

    return (
        <div className="flex items-center gap-4 bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
                <Icon className="w-7 h-7" />
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
};
