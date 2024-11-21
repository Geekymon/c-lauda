// main.js
const { app, BrowserWindow, screen } = require('electron')

let mainWindow;

function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    mainWindow = new BrowserWindow({
        width: width,  // Full screen width
        height: 80,    // Small height
        x: 0,         // Left edge of screen
        y: height - 80, // Bottom of screen
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        transparent: true,
        backgroundColor: '#00000000',
        alwaysOnTop: true,
        hasShadow: false,
        // These settings ensure it stays visible across spaces and windows
        visibleOnAllWorkspaces: true,
        skipTaskbar: true,
        // Make it a utility window which helps with overlay behavior
        type: 'dock',
        // Ensure it works with macOS spaces and mission control
        fullscreenable: false
    });

    mainWindow.loadURL('https://claude.ai/new');

    // Make it slightly see-through by default
    mainWindow.setOpacity(0.3);

    mainWindow.on('mouse-enter', () => {
        mainWindow.setOpacity(0.95);
    });

    mainWindow.on('mouse-leave', () => {
        mainWindow.setOpacity(0.3);
    });

    // Enable dragging up/down
    mainWindow.setMovable(true);

    // Ensure it stays at full width even after dragging
    mainWindow.on('move', () => {
        const [x, y] = mainWindow.getPosition();
        if (x !== 0) {
            mainWindow.setPosition(0, y);
        }
    });

    // Prevent horizontal resizing, allow vertical
    mainWindow.setResizable(true);
    mainWindow.on('resize', () => {
        const [width] = mainWindow.getSize();
        if (width !== primaryDisplay.workAreaSize.width) {
            mainWindow.setSize(primaryDisplay.workAreaSize.width, mainWindow.getSize()[1]);
        }
    });
}

// Handle macOS secure restoration policy warning
if (process.platform === 'darwin' && app.setSecureRestorationPolicy) {
    app.setSecureRestorationPolicy('disabled');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});