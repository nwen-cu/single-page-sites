var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
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

function load_chart()
{
  var ct0 = document.getElementById("chart0").getContext("2d");
  var myNewChart = new Chart(ct0).Line(data);
  
  var ct1 = document.getElementById("chart1").getContext("2d");
  var myNewChart = new Chart(ct1).Line(data);
}
