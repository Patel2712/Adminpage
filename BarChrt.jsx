import React from 'react'
import Chart from 'react-apexcharts';

function MyBarChart() {

    const chartOptions = {
        options: {
            xaxis: {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            },
            colors: ['#DE3163'],
        },
        series: [
            {
                name: 'Sample Data',
                data: [65, 59, 80, 81, 56, 75, 68, 92, 80, 95, 72, 88],
            },
        ],
    };

    return (
        <div>

            <Chart options={chartOptions.options} series={chartOptions.series} type="bar" />
        </div>
    );
}

export default MyBarChart;