const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "./src/preload.js"),
			nodeIntegration: true,
			//隔离上下文，隔离了就是用 contextBridge 处理数据
			// （在隔离的上下文中创建一个安全的、双向的、同步的桥梁）
			contextIsolation: true,
		},
	});

	win.loadFile("index.html");
	win.webContents.openDevTools();
}

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
