import React, { useState, useEffect } from 'react'
import Chart from 'react-apexcharts'

const categories = [ '0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100' ]

const chartOptions = {
  chart: {
    id: 'vote-chart-bar',
  },
  tooltip: {
    y: {
      formatter: function(val) {
        return val
      }
    }
  },
  yaxis: {
    labels: {
      formatter: function(val) {
        return val.toFixed(0)
      }
    }
  },
  xaxis: {
    categories,
  },
}

const VoteChart = (props) => {
  const { votes } = props
  const [data, setData] = useState([])

  useEffect(() => {
    function getVoteData() {
      const hashedVotes = votes.reduce((acc, vote) => ({ ...acc, [vote.value]: (acc[vote.value] || 0) + 1 }), [])
      return categories.map(value => hashedVotes[value] || 0)
    }

    setData(getVoteData())
  }, [votes])

  return (
    <Chart
      options={chartOptions}
      series={[
        {
          name: 'Votes',
          data,
        },
      ]}
      type="bar"
    />
  )
}

export default VoteChart
