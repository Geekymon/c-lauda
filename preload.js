window.addEventListener('DOMContentLoaded', () => {
  // Add custom CSS to make the app more compact
  const style = document.createElement('style')
  style.textContent = `
    body { 
      zoom: 0.8;
      background-color: rgba(0, 0, 0, 0.8) !important;
    }
  `
  document.head.appendChild(style)
})