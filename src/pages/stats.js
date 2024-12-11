import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import Chart from 'react-apexcharts';

const StatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('category'); // Default filter is 'category'

  // Fetch statistics based on the selected filter
  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://localhost/Citywatch/CityWatch-Backend/stats.php',
          { params: { action: 'getStatistics', filter } }
        );
        if (response.data.success) {
          setStats(response.data.statistics);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, [filter]);

  if (loading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#4f378a' }}
      >
        City Report Statistics
      </Typography>

      {/* Filter Dropdown */}
      <FormControl sx={{ minWidth: 200, marginBottom: 4 }}>
        <InputLabel id="filter-label"></InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="status">Status</MenuItem>
          <MenuItem value="zipcode">Zipcode</MenuItem>
        </Select>
      </FormControl>

      {/* Statistics Grid */}
      <Grid container spacing={3}>
        {/* Statistics Summary */}
        <Grid item xs={12}>
          <Card
            sx={{
              backgroundColor: '#f4e6ff',
              boxShadow: 3,
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', marginBottom: 2 }}
              >
                Total Reports by {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Typography>
              {stats.map((stat) => (
                <Typography key={stat.name} sx={{ color: '#6941C6' }}>
                  {stat.name}: {stat.total}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Graph */}
      <Box sx={{ marginTop: 6 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', marginBottom: 2, color: '#4f378a' }}
        >
          Reports by {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </Typography>
        <Chart
          options={{
            chart: {
              id: 'reportsByFilter',
              type: 'bar',
              animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
              },
              toolbar: {
                show: true,
                tools: {
                  download: true,
                  zoom: true,
                  pan: true,
                },
              },
            },
            plotOptions: {
              bar: {
                borderRadius: 8,
                horizontal: false,
                columnWidth: '60%',
              },
            },
            colors: ['#6941C6'],
            dataLabels: {
              enabled: true,
              style: {
                colors: ['#fff'],
              },
            },
            fill: {
              opacity: 0.85,
              type: 'gradient',
              gradient: {
                shade: 'dark',
                type: 'vertical',
                shadeIntensity: 0.4,
                gradientToColors: ['#9c27b0'],
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100],
              },
            },
            xaxis: {
              categories: stats.map((stat) => stat.name),
              title: {
                text: filter.charAt(0).toUpperCase() + filter.slice(1),
                style: {
                  color: '#4f378a',
                  fontSize: '14px',
                  fontWeight: 'bold',
                },
              },
            },
            yaxis: {
              title: {
                text: 'Reports Submitted',
                style: {
                  color: '#4f378a',
                  fontSize: '14px',
                  fontWeight: 'bold',
                },
              },
            },
            tooltip: {
              theme: 'dark',
              y: {
                formatter: (val) => `${val} Reports`,
              },
            },
            legend: {
              show: true,
              position: 'top',
              horizontalAlign: 'right',
              markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                radius: 12,
              },
            },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f8f8f8', 'transparent'], // Alternate rows color
                opacity: 0.5,
              },
            },
          }}
          series={[
            {
              name: 'Reports',
              data: stats.map((stat) => stat.total),
            },
          ]}
          type="bar"
          height={350}
        />
      </Box>
    </Box>
  );
};

export default StatisticsPage;
