import {React, useRef} from 'react'
import { BarChart } from "../Barchart/BarChart";


export const DashboardSimples = () => {
    const chartRef = useRef(null);

    return (
      <div style={{width: '400px'}}>
        <BarChart chartRef={chartRef} />
      </div>
    );
  };
  