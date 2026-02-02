export default function Overview() {
  return (
     <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 mb:grid-cols-3 gap-6">
            <StatCard title="Total Users" value="1,248"/>
            <StatCard title="Active Users" value="932" />
            <StatCard title="Revenue" value="₹84,320" />
        </div>
     </div>
    
  );
}
 function StatCard({title,value}){
        return(
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-500">{title}</p>
                <h2 className="text-2xl font-bold mt-2">{value}</h2>
            </div>
        );
     }