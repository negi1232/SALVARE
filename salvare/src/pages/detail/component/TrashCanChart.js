import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const TrashCanChart = ({ amount, max_amount }) => {

  const initialData = {
    labels: ['Filled', 'Empty'],
    datasets: [
      {
        data: [0, 100],
        backgroundColor: ['#FF6384', '#eaeaea'],
        hoverBackgroundColor: ['#FF6384', '#eaeaea'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const [fillLevel, setFillLevel] = useState(0);

    useEffect(() => {
    const fillAnimation = setInterval(() => {
        // Generate a random fill level between 1 and 100
        // const newFillLevel = Math.floor(Math.random() * 100) + 1;
        const newFillLevel = Math.floor( amount / max_amount * 100);
        setFillLevel(newFillLevel);
    });

    return () => clearInterval(fillAnimation);
  }, [ amount, max_amount ]);

  const generateChartData = () => {
    const filledPercentage = fillLevel;
    const emptyPercentage = 100 - filledPercentage;

    const updatedData = {
      ...initialData,
      datasets: [
        {
          ...initialData.datasets[0],
          data: [filledPercentage, emptyPercentage],
        },
      ],
    };

    return updatedData;
  };



  const renderEmotionIcon = () => {
    if (fillLevel >= 50) {
        return <span role="img" aria-label="Sad"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <SentimentVeryDissatisfiedIcon sx={{ color: "red", fontSize: 45 }} />
        </span>;
    } else {
        return <span role="img" aria-label="Happy"
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <InsertEmoticonIcon sx={{ color: "blue", fontSize: 45 }} />
        </span>;
    }
  };

  return (
    <div>
        <Doughnut data={generateChartData()} options={options} />
        <div style={{ position: 'absolute', bottom: '17.5%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            {renderEmotionIcon()}
        </div>
    </div>
  );
};

export default TrashCanChart;
