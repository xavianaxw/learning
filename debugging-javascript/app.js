function getData() {
  // Get value of input
  var data = document.getElementById('name').value;

  // Get dataSpan DOM element
  var out = document.getElementById('dataSpan');

  // Assign the value of data into dataSpan html
  out.innerHTML = data;
}