import React from "react";

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip
} from "recharts";


function ChartCard(){


const data=[

{
name:"Mon",
messages:20
},

{
name:"Tue",
messages:40
},

{
name:"Wed",
messages:30
},

{
name:"Thu",
messages:60
}

];


return(

<div className="chart-card">


<h2>
AI Usage
</h2>


<LineChart
width={500}
height={250}
data={data}
>


<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>


<Line
type="monotone"
dataKey="messages"
/>


</LineChart>


</div>

)


}


export default ChartCard;