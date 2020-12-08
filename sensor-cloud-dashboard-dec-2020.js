function load_chart()
{
  var ct0 = document.getElementById("chart0").getContext("2d");
  var myNewChart = new Chart(ct0).PolarArea(data);
  
  var ct1 = document.getElementById("chart1").getContext("2d");
  var myNewChart = new Chart(ct1).PolarArea(data);
}
