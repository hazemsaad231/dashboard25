import { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer as PieResponsiveContainer } from 'recharts';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, ResponsiveContainer as BarResponsiveContainer } from 'recharts';
import { AreaChart, Area, ResponsiveContainer as AreaResponsiveContainer } from 'recharts';
import { Data } from './data';
import style from './home.module.css'

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }:any) => {
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle"  dominantBaseline="central" fontSize={14}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const barChartData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
];

const areaChartData = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
];

const Home = class home extends PureComponent {
  render() {
    return (
      <div className=" lg:mr-60 min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6 py-16">
        <h1 className="text-3xl font-bold mb-4 text-center">Dashboard Home</h1>

        <div className="flex gap-4 text-md sm:text-md md:text-md lg:text-xl xl:text-xl p-4">

          {Data.map((item, index) => (
             <div key={index} className=" p-4 rounded-lg shadow-md w-full text-center bg-white">
           <h2 className="font-semibold mb-2">{item.title}</h2>
            <h1>{item.count}</h1>
            <item.icon className="text-3xl mt-2 m-auto" />
          </div> 
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 w-full">

          <div className={style.area}>
            <h2 className="text-xl font-semibold mb-2">Total views</h2>
            <AreaResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </AreaResponsiveContainer>
          </div>

          <div className={style.area}>
            <h2 className="text-xl font-semibold mb-2">Total visit</h2>
            <BarResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
              </BarChart>
            </BarResponsiveContainer>
          </div>

          <div className={style.area}>
            <h2 className="text-xl font-semibold">Leads by source</h2>
            <PieResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </PieResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
