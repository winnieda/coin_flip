// coin_flip.js

// Default value for the variable
let control_status = "Awaiting first input";
let play_pause = "Play"; // Describes state of button, not of simulation
let play_pause_status = "Pause"; // Describes state of simulation, defaults to pause
let num_coins = 20; // Number of coins per simulation
let num_heads = 20; // Initial number of heads
let heads_ratio = 0.5; // Initial ratio of heads to tails (50%)
let num_flips = 1;

// New Variables
let coinStates = []; // true for heads, false for tails
let currentHeads = 0;
let currentInterval = 0;
let currentlyPlaying = false;

let data1 = []; // Data/Options for line chart
let options1 = [];
let data2 = []; // Data/Options for bar chart
let options2 = [];

// Variables for whether charts are visible
let headsVsTimeVisible = true;
let headsHistogramVisible = true;
let coinDisplayVisible = true;

// Function to update the control_status variable
function buttonStepForward() {
  console.log("buttonStepForward");
  play_pause = "Play"; // Using skip or reset pauses, make the button say play
  currentlyPlaying = true;
  simulateCoinFlip();
  currentlyPlaying = false;
  control_status = "Step Forward";
  displayStatus();
  displayPlayPause();
}

function buttonReset() {
  console.log("buttonReset");
  resetChart();
  control_status = "Reset";
  displayStatus();
  displayPlayPause();
}

function buttonPlayPause() {
  console.log("buttonPlayPause");
  if (play_pause === "Play") {
    play_pause = "Pause";
    control_status = "Play (status)";
    currentlyPlaying = true;
  } else {
    play_pause = "Play";
    control_status = "Pause (status)";
    currentlyPlaying = false;
  }
  displayStatus();
  displayPlayPause();
}

// Function to update num_coins when the input changes
function updateNumCoins(newNumCoins) {
  console.log("updateNumCoins");
  num_coins = parseInt(newNumCoins) || 0;
  console.log("Updated coins to " + num_coins);
  resetChart();
}

// Function to update num_coins when the input changes
function updateNumHeads(newNumHeads) {
  console.log("updateNumHeads");
  num_heads = parseInt(newNumHeads) || 0;
  console.log("Updated heads to " + num_heads);
  resetChart();
}

// Function to update num_coins when the input changes
function updateNumFlips(newNumFlips) {
  console.log("updateNumFlips");
  num_flips = parseInt(newNumFlips) || 0;
  console.log("Updated heads to " + num_flips);
  resetChart();
}

// Function to update num_coins when the input changes
function updateHeadsRatio(newHeadsRatio) {
  console.log("updateHeadsRatio");
  heads_ratio = parseFloat(newHeadsRatio) || 0;
  console.log("Updated heads to " + heads_ratio);
  resetChart();
}

// Function to display the current value of control_status
function displayStatus() {
  console.log("displayStatus");
}

// Function to display the current value of play *button*
function displayPlayPause() {
  console.log("displayPlayPause");
  // Get the <img> element
  let playPauseIcon = document.getElementById("play_pause_icon");
  let isPlaying = play_pause === "Play" ? false : true;
  // Update the src attribute based on the state
  playPauseIcon.src = isPlaying
    ? "buttons/icons8-pause-32.png"
    : "buttons/icons8-play-32.png";
  // Update the alt attribute for accessibility
  playPauseIcon.alt = isPlaying ? "Pause Icon" : "Play Icon";
}

function makeChart() {
  console.log("makeChart");
  // Get the canvas elements
  const ctx = document.getElementById("myChart").getContext("2d");
  const ctx2 = document.getElementById("myChart2").getContext("2d");

  // Data for the chart (replace this with your data)
  data1 = {
    labels: [],
    datasets: [
      {
        type: "line",
        data: [], // Replace with your dataset values
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Color for the bars
        borderColor: "rgba(75, 192, 192, 1)", // Border color for the bars
        borderWidth: 1, // Border width for the bars
      },
    ],
  };

  // Data for the chart (replace this with your data)
  data2 = {
    labels: [],
    datasets: [
      {
        barPercentage: 1,
        categoryPercentage: 1,
        type: "bar",
        data: [], // Replace with your dataset values
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Color for the bars
        borderColor: "rgba(75, 192, 192, 1)", // Border color for the bars
        borderWidth: 1, // Border width for the bars
      },
    ],
  };

  // Configuration options for the chart
  const options1 = {
    responsive: false, // Make the chart non-responsive
    maintainAspectRatio: true, // Maintain aspect ratio
    scales: {
      y: {
        type: "linear",
        position: "left",
        min: 0,
        max: num_coins,
        title: {
          display: true,
          text: "Heads",
        },
      },
    },
    animation: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  // Configuration options for the chart
  const options2 = {
    responsive: false, // Make the chart non-responsive
    maintainAspectRatio: true, // Maintain aspect ratio
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Intervals",
        },
      },
      x: {
        type: "linear",
        position: "bottom",
        min: 0,
        max: num_coins,
        title: {
          display: true,
          text: "Heads",
        },
      },
    },
    animation: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  // Create a new Chart instance
  const myChart = new Chart(ctx, {
    type: "line", // Specify the chart type (bar, line, pie, etc.)
    data: data1,
    options: options1,
  });

  // Create a new Chart instance
  const myChart2 = new Chart(ctx2, {
    type: "bar", // Specify the chart type (bar, line, pie, etc.)
    data: data2,
    options: options2,
  });
}

function showCoins() {
  console.log("showCoins");
  document.addEventListener("DOMContentLoaded", function () {
    let coinsInput = document.getElementById("coinsInput");
    let headsInput = document.getElementById("headsInput");
    coinsInput.value = "20";
    headsInput.value = "20";
    setUpCoins();
    // Call simulateCoinFlip every second for demonstration purposes
    updateCoinDisplay();
    updateChart();
    setInterval(simulateCoinFlip, 300);
  });
}

function setUpCoins() {
  // Initialize with num_heads heads
  coinStates = [];
  for (let i = 0; i < num_heads; i++) {
    coinStates.push(true);
    currentHeads++;
  }
  for (let i = 0; i < num_coins - num_heads; i++) {
    coinStates.push(false);
  }
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to simulate a coin flip and update the display
function simulateCoinFlip() {
  console.log("simulateCoinFlip");
  if (!currentlyPlaying) {
    return;
  }
  // Generate an array of unique coin indices
  let uniqueIndices = Array.from(
    { length: coinStates.length },
    (_, index) => index
  );

  // Shuffle the array to ensure a random order
  shuffleArray(uniqueIndices);

  // Simulate the coin flips
  for (let i = 0; i < num_flips; i++) {
    const indexToFlip = uniqueIndices[i];

    // Simulate the coin flip
    let flipOutcome = Math.floor(Math.random() * 100);
    if (flipOutcome < 100 * heads_ratio) {
      // Coin is heads
      if (!coinStates[indexToFlip]) {
        // Coin wasn't already heads
        currentHeads++;
      }
      coinStates[indexToFlip] = true;
    } else {
      // Coin is tails
      if (coinStates[indexToFlip]) {
        // Coin wasn't already tails
        currentHeads--;
      }
      coinStates[indexToFlip] = false;
    }
  }

  // Update the display
  currentInterval++;
  updateCoinDisplay();
  updateChart();
}

function updateChart() {
  console.log("updateChart");
  // Get the chart instances
  const chart = Chart.getChart("myChart");
  const chart2 = Chart.getChart("myChart2");

  if (chart.data.labels.length >= 100) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }

  if (!chart2.data.labels.includes(currentHeads)) {
    // If the label doesn't exist, add a new label and set the data to 1
    chart2.data.labels.push(currentHeads);
    chart2.data.datasets[0].data.push(1);
  } else {
    // If the label already exists, update the corresponding data
    const index = chart2.data.labels.indexOf(currentHeads);
    chart2.data.datasets[0].data[index]++;
  }

  // Sort the labels and corresponding data for myChart2
  const sortedData = chart2.data.labels
    .map((label, index) => ({
      label,
      data: chart2.data.datasets[0].data[index],
    }))
    .sort((a, b) => a.label - b.label);

  chart2.data.labels = sortedData.map((item) => item.label);
  chart2.data.datasets[0].data = sortedData.map((item) => item.data);

  // Add the new data point to the line chart (myChart)
  chart.data.labels.push(currentInterval);
  chart.data.datasets[0].data.push(currentHeads);

  // Update both charts
  chart.update();
  chart2.update();
}

function showHideHeadsVsTime() {
  // Toggle button logic
  const lineChart = document.getElementById("myChart");

  headsVsTimeVisible = !headsVsTimeVisible;

  if (headsVsTimeVisible) {
    lineChart.style.display = "block";
  } else {
    lineChart.style.display = "none";
  }
}

function showHideHeadsHistogram() {
  // Toggle button logic
  const barChart = document.getElementById("myChart2");

  headsHistogramVisible = !headsHistogramVisible;

  if (headsHistogramVisible) {
    barChart.style.display = "block";
  } else {
    barChart.style.display = "none";
  }
}

function showHideCoinDisplay() {
  // Toggle button logic
  const coinContainer = document.getElementById("coinContainer");

  coinDisplayVisible = !coinDisplayVisible;

  if (coinDisplayVisible) {
    coinContainer.style.display = "block";
  } else {
    coinContainer.style.display = "none";
  }
}

function resetChart() {
  console.log("resetChart");
  play_pause = "Play"; // Using skip or reset pauses, make the button say play
  currentlyPlaying = false;
  setUpCoins();
  displayStatus();
  displayPlayPause();
  // Get the chart instances
  const chart = Chart.getChart("myChart");
  const chart2 = Chart.getChart("myChart2");

  // Set labels and data to blank
  chart.data.labels = [];
  chart.data.datasets[0].data = [];
  chart.options.scales.y.max = num_coins;
  // Set labels and data to blank
  chart2.data.labels = [];
  chart2.data.datasets[0].data = [];
  chart2.options.scales.x.max = num_coins;

  currentHeads = num_heads;
  currentInterval = 0;

  updateCoinDisplay();

  // Add starting data point
  // If this function is called because of a parameter
  // change, this will be the new data
  chart.data.labels.push(currentInterval);
  chart.data.datasets[0].data.push(num_heads);

  chart2.data.labels.push(num_heads);
  chart2.data.datasets[0].data.push(1);

  // Update both charts
  chart.update();
  chart2.update();
}

// Function to update the display based on coin states
function updateCoinDisplay() {
  console.log("updateCoinDisplay");
  let coinContainer = document.getElementById("coinContainer");
  let currentHeadsDisplay = document.getElementById("currentHeadsDisplay");
  let currentIntervalDisplay = document.getElementById(
    "currentIntervalDisplay"
  );
  coinContainer.innerHTML = ""; // Clear previous content

  const coinsPerRow = 22; // Adjust this number based on your requirement

  for (let i = 0; i < coinStates.length; i += coinsPerRow) {
    // Create a row div
    let row = document.createElement("div");
    row.className = "coin-row";

    for (let j = i; j < i + coinsPerRow && j < coinStates.length; j++) {
      // Create a coin div
      let coin = document.createElement("div");
      coin.className = "coin";

      if (coinStates[j]) {
        coin.style.backgroundColor = "blue"; // Heads is blue
      } else {
        coin.style.backgroundColor = "red"; // Tails is red
      }

      // Append the coin to the row
      row.appendChild(coin);
    }

    // Append the row to the container
    coinContainer.appendChild(row);
  }

  currentHeadsDisplay.innerHTML =
    "<div>Current Heads: " + currentHeads + "</div>";
  currentIntervalDisplay.innerHTML =
    "<div>Current Interval: " + currentInterval + "</div>";
}

// Functions that should only be available once the page has loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded Listener");
  // Advanced options toggle button
  const toggleBtn = document.getElementById("toggle-btn");
  const advancedOptions = document.getElementById("advanced-options");
  toggleBtn.addEventListener("click", function () {
    if (
      advancedOptions.style.display === "none" ||
      advancedOptions.style.display === ""
    ) {
      advancedOptions.style.display = "block";
      toggleBtn.textContent = "Hide Advanced Options";
    } else {
      advancedOptions.style.display = "none";
      toggleBtn.textContent = "Show Advanced Options";
    }
  });
  // Sidebar open/close controls
  const controlSidebar = document.getElementById("controlSidebar");
  const openCloseOptions = document.getElementById("openCloseOptions");
  const mainBlock = document.getElementById("mainBlock");

  // Initially open the sidebar
  console.log("Hide Sidebar");
  controlSidebar.classList.remove("sidebar-closed");

  openCloseOptions.addEventListener("click", function () {
    console.log("Toggle Sidebar");
    // Toggle the sidebar by adding/removing the sidebar-closed class
    controlSidebar.classList.toggle("sidebar-closed");

    // Update the left margin of the main section based on the sidebar state
    if (controlSidebar.classList.contains("sidebar-closed")) {
      // Sidebar is closed, set left margin to 10px
      console.log("Set left margin to 10px");
      mainBlock.style.marginLeft = "10px";
    } else {
      // Sidebar is open, set left margin to 260px
      console.log("Set left margin to 250px");
      mainBlock.style.marginLeft = "250px";
    }
  });
});
