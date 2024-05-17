import React from 'react'
import Chart from 'react-apexcharts';

function PieChart() {

    const chartOptions = {
        options: {
            labels: ['Logo Making', 'Business Card', 'Posters', 'Invitation Card', 'Banners','Social Media Advertising','Business Marketing'],
        },
        series: [10000, 12000, 25000, 40000, 50000,45000,40000],
    };

    return (
        <div>

            <Chart options={chartOptions.options} 
            series={chartOptions.series} 
            type="pie"
            height={250}
            />
        </div>
    );
}

export default PieChart