const container = document.getElementById("barsContainer");
let array = [];
const numBars = 50;

// Generate initial random array
function generateArray() {
  array = [];
  container.innerHTML = "";
  for (let i = 0; i < numBars; i++) {
    let value = Math.floor(Math.random() * 100) + 1;
    array.push(value);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value * 3}px`;
    container.appendChild(bar);
  }
}

// Randomize the array
function randomizeArray() {
  array.sort(() => Math.random() - 0.5);
  updateBars();
}

// Update bars based on array values
function updateBars() {
  const bars = document.querySelectorAll(".bar");
  bars.forEach((bar, index) => {
    bar.style.height = `${array[index] * 3}px`;
    bar.style.backgroundColor = "lightblue";
  });
}

// Sorting Algorithms

async function insertionSort() {
  let bars = document.querySelectorAll(".bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
    updateBars();
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

// Selection Sort
async function selectionSort() {
  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    updateBars();
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

// Bubble Sort
async function bubbleSort() {
  let bars = document.querySelectorAll(".bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
    updateBars();
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

// Quick Sort
async function quickSort(left = 0, right = array.length - 1) {
  if (left >= right) return;
  let pivot = array[right];
  let partitionIndex = left;
  for (let i = left; i < right; i++) {
    if (array[i] < pivot) {
      [array[i], array[partitionIndex]] = [array[partitionIndex], array[i]];
      partitionIndex++;
    }
  }
  [array[partitionIndex], array[right]] = [array[right], array[partitionIndex]];
  updateBars();
  await new Promise((resolve) => setTimeout(resolve, 50));

  await quickSort(left, partitionIndex - 1);
  await quickSort(partitionIndex + 1, right);
}

// Merge Sort
async function mergeSort(start = 0, end = array.length - 1) {
  if (start >= end) return;
  let mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  merge(start, mid, end);
}

function merge(start, mid, end) {
  let left = array.slice(start, mid + 1);
  let right = array.slice(mid + 1, end + 1);
  let i = 0,
    j = 0,
    k = start;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
  }
  while (i < left.length) array[k++] = left[i++];
  while (j < right.length) array[k++] = right[j++];
  updateBars();
}

// Shell Sort
async function shellSort() {
  let gap = Math.floor(array.length / 2);
  while (gap > 0) {
    for (let i = gap; i < array.length; i++) {
      let temp = array[i];
      let j = i;
      while (j >= gap && array[j - gap] > temp) {
        array[j] = array[j - gap];
        j -= gap;
      }
      array[j] = temp;
    }
    gap = Math.floor(gap / 2);
    updateBars();
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}

// Change Bar Size
function changeSize() {
  document.querySelectorAll(".bar").forEach((bar) => {
    bar.style.width = "5px";
  });
}


let states = []; // Stores sorting states for navigation
let currentStep = 0;
let sorting = false;
let speed = 100;
let intervalId;

// Generate initial array
function generateArray(size = 50) {
  array = [];
  states = [];
  container.innerHTML = "";

  for (let i = 0; i < size; i++) {
    let value = Math.floor(Math.random() * 100) + 1;
    array.push(value);
    createBar(value);
  }
  states.push([...array]); // Save initial state
}

// Create bar elements
function createBar(value) {
  const barContainer = document.createElement("div");
  barContainer.style.display = "flex";
  barContainer.style.flexDirection = "column";
  barContainer.style.alignItems = "center";

  const bar = document.createElement("div");
  bar.classList.add("bar");
  bar.style.height = `${value * getBarHeight()}px`;
  bar.style.width = `${getBarWidth()}px`;
  bar.style.backgroundColor = "lightblue";

  const label = document.createElement("span");
  label.textContent = value;
  label.style.color = "white";
  label.style.fontSize = "12px";
  label.style.marginTop = "5px"; // Space between bar and value

  barContainer.appendChild(bar);
  barContainer.appendChild(label);
  container.appendChild(barContainer);
}

// Update bars based on array
function updateBars() {
  const bars = document.querySelectorAll(".bar");
  const labels = container.querySelectorAll("span");

  bars.forEach((bar, index) => {
    bar.style.height = `${array[index] * getBarHeight()}px`;
    labels[index].textContent = array[index]; // Update value below each bar
  });
}

// Sorting Algorithm (Bubble Sort with states tracking)
async function bubbleSort() {
  sorting = true;
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        states.push([...array]); // Store state
        updateBars();
        await delay();
      }
    }
  }
  sorting = false;
}

// Delay function for animation
function delay() {
  return new Promise((resolve) => setTimeout(resolve, speed));
}

// Skip Back (Reset to Initial)
function skipBack() {
  if (!sorting) {
    currentStep = 0;
    array = [...states[0]];
    updateBars();
  }
}

// Step Back (Previous Sorting Step)
function stepBack() {
  if (!sorting && currentStep > 0) {
    currentStep--;
    array = [...states[currentStep]];
    updateBars();
  }
}

// Play/Pause Sorting Animation
function togglePlayPause() {
  if (sorting) {
    clearInterval(intervalId);
    sorting = false;
  } else {
    sorting = true;
    intervalId = setInterval(() => {
      if (currentStep < states.length - 1) {
        currentStep++;
        array = [...states[currentStep]];
        updateBars();
      } else {
        clearInterval(intervalId);
        sorting = false;
      }
    }, speed);
  }
}

// Step Forward
function stepForward() {
  if (!sorting && currentStep < states.length - 1) {
    currentStep++;
    array = [...states[currentStep]];
    updateBars();
  }
}

// Skip Forward (Jump to Sorted)
function skipForward() {
  if (!sorting) {
    currentStep = states.length - 1;
    array = [...states[currentStep]];
    updateBars();
  }
}

// Change Animation Speed
function changeSpeed() {
  speed = document.getElementById("speedControl").value;
}

// Get Bar Width & Height
function getBarWidth() {
  return document.getElementById("barWidth").value || 10;
}

function getBarHeight() {
  return document.getElementById("barHeight").value || 3;
}

// Apply Width & Height Changes
function applyBarSettings() {
  updateBars();
}

// Change Canvas Size
function applyCanvasSize() {
  const newSize = document.getElementById("canvasWidth").value;
  container.style.width = `${newSize}%`;
}

// Move Controls
function moveControls() {
  const controls = document.querySelector(".controls");
  if (controls.style.position === "absolute") {
    controls.style.position = "static";
  } else {
    controls.style.position = "absolute";
    controls.style.top = "10px";
    controls.style.left = "50%";
    controls.style.transform = "translateX(-50%)";
  }
}



// Initialize array on load
generateArray();
