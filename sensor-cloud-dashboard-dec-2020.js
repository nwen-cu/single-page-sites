var data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: 
  [
    {
      label: "My First dataset",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: "My Second dataset",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: [28, 48, 40, 19, 86, 27, 90]
    }
  ]
};

endpoint0 = "https://7ndf9o8tca.execute-api.us-east-2.amazonaws.com/dev/sensor-data/lora0"
endpoint1 = "https://7ndf9o8tca.execute-api.us-east-2.amazonaws.com/dev/sensor-data/lora1"

data_index0 = 0
data_index1 = 0

function init()
{
  init_data()
  init_chart()
}

function active_timer()
{

}

function init_data()
{
  head_init = {
    method: 'HEAD',
    headers: new Headers({'Content-Type': 'application/json'})
  }
  fetch(endpoint0, head_init).then(function(response) {
    console.log(response.headers);
  });
  fetch(endpoint1, head_init).then(function(response) {
    console.log(response.headers);
  });
}

function fetch_new_data()
{
            
}

function init_chart()
{
  var ct0 = document.getElementById("chart0").getContext("2d");
  var myNewChart = new Chart(ct0, {type: "line", data: data});
  
  var ct1 = document.getElementById("chart1").getContext("2d");
  var myNewChart = new Chart(ct1, {type: "line", data: data});
}
