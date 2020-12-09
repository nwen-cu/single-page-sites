data0 = {
  labels: ['dp0', 'dp1'], 
  datasets: [
    {
      label: 'Temperature(°C)',
      data: [5, 10],
      yAxisID: 'temp-axis-0',
      fill: false,
      borderColor: 'rgba(255,69,0,0.5)',
      backgroundColor: 'rgba(255,69,0,0.5)'
    },
    {
      label: 'Humidity(%RH)',
      data: [65, 50],
      yAxisID: 'humi-axis-0',
      fill: false,
      borderColor: 'rgba(65,105,225,0.5)',
      backgroundColor: 'rgba(65,105,225,0.5)'
    }
  ]
};

data1 = {
  labels: ['dp0', 'dp1'], 
  datasets: [
    {
      label: 'Temperature(°C)',
      data: [5, 10],
      yAxisID: 'temp-axis-1',
      fill: false,
      borderColor: 'rgba(255,69,0,0.5)',
      backgroundColor: 'rgba(255,69,0,0.5)'
    },
    {
      label: 'Humidity(%RH)',
      data: [65, 50],
      yAxisID: 'humi-axis-1',
      fill: false,
      borderColor: 'rgba(65,105,225,0.5)',
      backgroundColor: 'rgba(65,105,225,0.5)'
    }
  ]
};

chart_options0 = {
  type: 'line',
  data: data0,
  options: {
    responsive: true,
    hoverMode: 'index',
    stacked: false,
    title: {
      display: true,
      text: 'Lora sensor 0'
    },
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'temp-axis-0',
          ticks: {
            min: 0,
            max: 100
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'humi-axis-0',
          ticks: {
            min: 0,
            max: 100
          },
          gridLines: {
            drawOnChartArea: false
          }
        }
      ]
    }
  }
};

chart_options1 = {
  type: 'line',
  data: data1,
  options: {
    responsive: true,
    hoverMode: 'index',
    stacked: false,
    title: {
      display: true,
      text: 'Lora sensor 1'
    },
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'temp-axis-1',
          ticks: {
            min: 0,
            max: 100
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'humi-axis-1',
          ticks: {
            min: 0,
            max: 100
          },
          gridLines: {
            drawOnChartArea: false
          }
        }
      ]
    }
  }
};



data_index0 = 0
data_index1 = 0

data_ready0 = false
data_ready1 = false

endpoint0 = "https://7ndf9o8tca.execute-api.us-east-2.amazonaws.com/dev/sensor-data/lora0"
endpoint1 = "https://7ndf9o8tca.execute-api.us-east-2.amazonaws.com/dev/sensor-data/lora1"

function init()
{
  init_data();
  init_chart();
  activate_timer();
}

function activate_timer()
{
  setInterval(fetch_new_data, 1500);
}

function init_data()
{
  head_init = {
    mode: 'cors',
    method: 'GET',
    headers: new Headers({'Content-Type': 'application/json'})
  };
  fetch(endpoint0, head_init)
  .catch(error => console.error('Error:', error))  
  .then(response => response.json())
  .then(function(data){
    data_index0 = parseInt(data['record-id-latest'], 16);
    data_ready0 = true;
  });
  fetch(endpoint1, head_init)
  .catch(error => console.error('Error:', error))  
  .then(response => response.json())
  .then(function(data){
    data_index1 = parseInt(data['record-id-latest'], 16);
    data_ready1 = true;
  });
}

fetch_init = {
  mode: 'cors',
  method: 'GET',
  headers: new Headers({'Content-Type': 'application/json'})
};

function fetch_new_data()
{
  if(data_ready0)
  {
    fetch(endpoint0 + '/' + data_index0.toString(16).padStart(8, 0), fetch_init)
    .catch(error => console.error('Error:', error))  
    .then(function(response){
      if(response.ok)
      {
        data_index0++;
        response.json().then(add_data0);
      }
    });
  }
  if(data_ready1)
  {
    fetch(endpoint1 + '/' + data_index1.toString(16).padStart(8, 0), fetch_init)
    .catch(error => console.error('Error:', error))  
    .then(function(response){
      if(response.ok)
      {
        data_index1++;
        response.json().then(add_data1);
      }
    });
  }
}
          
function add_data0(data)
{
  dt = new Date(data['timestamp']);
  label = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
  value = data['value'].replaceAll('\"', '').split('/');
  data0.labels.push(label);
  data0.datasets[0].data.push(value[0]);
  data0.datasets[1].data.push(value[1]);
  if(data0.labels.length > 30)
  {
    data0.labels.shift();
    data0.datasets[0].data.shift();
    data0.datasets[1].data.shift();
  }
  window.chart0.update();
}

function add_data1(data)
{
  dt = new Date(data['timestamp']);
  label = dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
  value = data['value'].replaceAll('\"', '').split('/');
  data1.labels.push(label);
  data1.datasets[0].data.push(value[0]);
  data1.datasets[1].data.push(value[1]);
  if(data1.labels.length > 30)
  {
    data1.labels.shift();
    data1.datasets[0].data.shift();
    data1.datasets[1].data.shift();
  }
  window.chart1.update();
}
    
    

function init_chart()
{
  var ct0 = document.getElementById("chart0").getContext("2d");
  window.chart0 = new Chart(ct0, chart_options0);
  
  var ct1 = document.getElementById("chart1").getContext("2d");
  window.chart1 = new Chart(ct1, chart_options1);
}
