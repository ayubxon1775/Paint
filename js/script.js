// Global variables
const canvas = document.querySelector('canvas'),
  toolBtns = document.querySelectorAll('.tool'),
  fillColor = document.querySelector('#fill-color')

//  Variable
let ctx = canvas.getContext('2d'),
isDrawing = false,
brushWidth = 5,
selectedTool = 'brush',
prevMouseX,
prevMouseY,
snapshot


// Set canvas width and height
window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
})

// Start drawing
const startDraw = e => {
isDrawing = true
prevMouseX = e.offsetX
prevMouseY = e.offsetY
ctx.beginPath()
ctx.lineWidth = brushWidth
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

// stop 
const stopDraw = () => {
  isDrawing = false
}

canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)

