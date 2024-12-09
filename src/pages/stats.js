import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from '@mui/material';
import axios from 'axios';
import Chart from 'react-apexcharts';

const StatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          'http://localhost/Citywatch/CityWatch-Backend/stats.php',
          { params: { action: 'getStatistics' } }
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
  }, []);

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

      <Grid container spacing={3}>
        {/* Total Reports by Status */}
        <Grid item xs={12} md={4}>
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
                Total Reports by Status
              </Typography>
              {stats.reportsByStatus.map((status) => (
                <Typography key={status.status} sx={{ color: '#6941C6' }}>
                  {status.status}: {status.total}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Average Time to Close */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: '#e8f5e9',
              boxShadow: 3,
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', marginBottom: 2 }}
              >
                Average Time to Close
              </Typography>
              <Typography sx={{ color: '#388e3c' }}>
                {stats.avgTimeToClose.avg_days_to_close || 'N/A'} Days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Report Categories */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              backgroundColor: '#e3f2fd',
              boxShadow: 3,
              borderRadius: 4,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', marginBottom: 2 }}
              >
                Top Report Categories
              </Typography>
              {stats.topCategories.map((category) => (
                <Typography key={category.category} sx={{ color: '#1976d2' }}>
                  {category.category}: {category.report_count}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Report Submissions */}
      <Box sx={{ marginTop: 6 }}>
  <Typography
    variant="h6"
    sx={{ fontWeight: 'bold', marginBottom: 2, color: '#4f378a' }}
  >
    Monthly Report Submissions
  </Typography>
  <Chart
    options={{
      chart: {
        id: 'monthlyReports',
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
        categories: stats.monthlyReports.map((m) => m.month),
        title: {
          text: 'Months',
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
        x: {
          format: 'MM/yyyy',
        },
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
        data: stats.monthlyReports.map((m) => m.report_count),
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
