const path = require("path");
const fs = require("fs");
const { contextBridge } = require("electron");

function batchRename(imgPath, preName, cnt) {
	console.log(imgPath, preName, cnt);
	let outputPath = path.join(__dirname, "../imgs");
	let extname = path.extname(imgPath);
	for (let i = 1; i <= cnt; i++) {
		fs.copyFileSync(imgPath, path.join(outputPath, preName + i + extname));
	}
	console.log(`====批量命名完成====`);
}

function showErrorDialog(content) {
	// console.log(dialog);
	// dialog.showMessageBox(
	// 	{
	// 		type: "info",
	// 		title: "message",
	// 		message: "hello",
	// 		buttons: ["ok", "cancel"],
	// 	},
	// 	(index) => {
	// 		if (index == 0) {
	// 			console.log("You click ok.");
	// 		} else {
	// 			console.log("You click cancel");
	// 		}
	// 	}
	// );
}

// module.exports.batchRename = batchRename;
// 隔离上下文的桥梁
contextBridge.exposeInMainWorld("main", {
	batchRename: batchRename,
	showErrorDialog: showErrorDialog,
});
