import React, {useState,useEffect} from 'react'


interface MetricProps {
  name: string;
  value: number;
  unit: string;  
}


function MetricCard(props:MetricProps)
{
    return(
        <div className='metric-card'>
            <h3>{props.name}</h3>
            <h2>{props.value} {props.unit}</h2>
        </div>
    )

}

function Dashboard()
{
const [metrics, setMetrics] = useState<MetricProps[]>([])

useEffect(
    () =>{
        const fetchHardwareData = async () =>{
            const response = await fetch('http://127.0.0.1:8000/metric')
            const data= await response.json()
            setMetrics(data)
        };
        fetchHardwareData();
        const intervalId = setInterval(fetchHardwareData,2000);

        return ()  =>clearInterval(intervalId)
    }, []);


    return(
<>
<div>
    <h1>Windows Hardware Dashboard </h1>
    <div className='bubble-metrics'>
        {metrics.map((metric) =>
             <MetricCard key={metric.name} name = {metric.name} value = {metric.value} unit = {metric.unit}  />
        )}
    </div>   
        
        

</div>

</>

    )

}

export default Dashboard;