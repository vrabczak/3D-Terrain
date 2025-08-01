const { exec } = require('child_process');
const path = require('path');

// Path to the built HTML file
const htmlPath = path.join(__dirname, '..', 'dist', 'index.html');
const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

console.log('🚀 Opening Windsurf Browser...');
console.log(`📁 URL: ${fileUrl}`);

// Use the correct VS Code command to open in Simple Browser
// This should work since we're running within the VS Code/Windsurf environment
const command = `code --command workbench.action.webview.openDeveloperTools`;

// First, let's try to open the simple browser directly
exec(`code --new-window "${fileUrl}"`, (error, stdout, stderr) => {
    if (error) {
        console.log('💡 Automatic opening failed. Please use one of these methods:');
        console.log('');
        console.log('🔹 Method 1 (Recommended):');
        console.log('   1. Press Ctrl+Shift+P');
        console.log('   2. Type: "Simple Browser: Show"');
        console.log('   3. Paste this URL: ' + fileUrl);
        console.log('');
        console.log('🔹 Method 2:');
        console.log('   1. Press Ctrl+Shift+P');
        console.log('   2. Type: "Open URL in Browser"');
        console.log('   3. Paste the same URL');
        
        // Try to copy URL to clipboard
        const clipCmd = `echo ${fileUrl} | clip`;
        exec(clipCmd, (clipError) => {
            if (!clipError) {
                console.log('');
                console.log('✅ URL copied to clipboard - you can paste it directly!');
            }
        });
    } else {
        console.log('✅ Browser opened successfully!');
    }
});

console.log('');
console.log('🎯 Build completed! Your 3D Terrain app is ready to use.');
