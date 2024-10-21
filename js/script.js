// Global variables
const canvas = document.querySelector('canvas'),
  toolBtns = document.querySelectorAll('.tool'),
  fillColor = document.querySelector('#fill-color'),
  sizeSlider = document.querySelector('#size-slider'),
  colorBtns = document.querySelectorAll('.colors .option'),
  colorPicker = document.querySelector('#color-picker'),
  clearCanvasBtn = document.querySelector('.clear-canvas'),
  saveImageBtn = document.querySelector('.save-img')

//  Variable with default value
let ctx = canvas.getContext('2d'),
isDrawing = false,
brushWidth = 5,
selectedTool = 'brush',
selectedColor = "#000",
prevMouseX,
prevMouseY,
snapshot


// Set canvas background

const setCanvasBackground = () => {
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = selectedColor
}
// Set canvas width and height
window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  setCanvasBackground()
})

// Start drawing
const startDraw = e => {
isDrawing = true
prevMouseX = e.offsetX
prevMouseY = e.offsetY
ctx.beginPath()
ctx.lineWidth = brushWidth
ctx.strokeStyle = selectedColor
ctx.fillStyle = selectedColor
snapshot= ctx.getImageData(0, 0, canvas.width, canvas.height)
console.log(snapshot);
}

// draw rectangle
const drawRectangle = e => {
 fillColor.checked
    ? ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    : ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

// Draw circle
const drawCircle = e => {
  ctx.beginPath()
  const radius =
  Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) + Math.pow(prevMouseY - e.offsetY, 2)
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
  fillColor.checked ? ctx.fill() : ctx.stroke()
}

// draw triangle
const drawTriangle = e => {
  ctx.beginPath()
  ctx.moveTo(prevMouseX, prevMouseY)
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
  ctx.closePath()
  ctx.stroke()
  fillColor.checked ? ctx.fill() : ctx.stroke()

}
// drawing
const drawing = e => {
  if(!isDrawing) return
  ctx.putImageData(snapshot, 0, 0)



  switch (selectedTool) {
    case 'brush':
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
      break
    case 'rectangle':
      drawRectangle(e)
      break
    case 'circle':
      drawCircle(e) 
      break
    case 'triangle':
      drawTriangle(e)
      break
    case 'eraser':
      ctx.strokeStyle = '#FFF'
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
      break
      default:
      break
  }


  
}

// tolls btn and set to variables selected tool
toolBtns.forEach (btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.options .active').classList.remove('active')
    btn.classList.add('active')
    selectedTool = btn.id
    console.log(`Selected tool ${selectedTool}`);
  })
})

// change brush with
sizeSlider.addEventListener( 'change' , () => brushWidth = sizeSlider.value)

// set color to shepes
colorBtns.forEach(btn => {
  btn.addEventListener( 'click', e => { 
  document.querySelector('.options .selected').classList.remove('selected')
  btn.classList.add('selected')
  const bgColor = window.getComputedStyle(btn).getPropertyValue('background-color')
  selectedColor = bgColor
  })
});
// set color from color picker
colorPicker.addEventListener('change', () => {
colorPicker.parentElement.style.background = colorPicker.value
colorPicker.parentElement.click()
})

// clear canvas button
clearCanvasBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  setCanvasBackground()
})

// Save like image our paint
saveImageBtn.addEventListener('click', () => {
  const link = document.createElement('a')
  link.download = `Sammi-paint${Date.now()}.jpg`
  link.href = canvas.toDataURL()
  link.click()
})


// stop drawing
const stopDraw = () => {
  isDrawing = false
}

canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)

