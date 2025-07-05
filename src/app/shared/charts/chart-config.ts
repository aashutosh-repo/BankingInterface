import { ChartOptions } from "chart.js";

  export const PieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw as number;
            return `${label}: ₹${value.toLocaleString()}`;
          },
        },
      },
    },
    animation: {
      duration: 0,
    },
    hover: {
      mode: undefined, // ✅ fixed
    },
    elements: {
      arc: {
        hoverOffset: 0, // no pop on hover
        borderWidth: 0, // no border increase on hover
      },
    },
  };

    export const BarChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
        ticks: {
          color: '#333',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (in Lakhs)',
        },
        ticks: {
          color: '#333',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#000',
        font: {
          weight: 'normal',
        },
        formatter: (value: number) => `${value}L`,
      },
    },
  };