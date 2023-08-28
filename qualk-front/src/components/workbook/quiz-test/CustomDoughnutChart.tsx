import React from 'react';
import styles from './CustomDoughnutChart.module.css';
import {Doughnut} from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend)

function CustomDoughnutChart({correctPercent, isPass, isPerfect}: {correctPercent: number, isPass: boolean, isPerfect: boolean}){
  const data = {
    datasets: [{
      label: '',
      data: [correctPercent, 100-correctPercent],
      backgroundColor: [
        `${isPerfect ? 'rgb(70, 204, 121)' : isPass ? 'rgb(255, 167, 0)' : 'rgb(91, 91, 91)'}`,
        `${isPerfect ? 'rgb(70, 204, 121)' : isPass ? 'rgb(253, 250, 242)' : 'rgb(249, 249, 249)'}`
      ],
      hoverOffset: 4
    }]
  };

    return(
        <div className={styles.chart_root}>
            <Doughnut data={data} width="160px" height="160px" />
            <div className={styles.answer_container}><span className={isPerfect ? styles.perfect : isPass ? styles.passed : styles.failed}>{correctPercent}%</span></div>
        </div>
    )
}

export default CustomDoughnutChart;