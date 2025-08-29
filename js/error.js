
window.onerror = (message, source, lineno, colno, error) => {
    let instruction = "Stack trace has been copied to your clipboard. Please contact the developer.";
    if (error instanceof ReferenceError) instruction = 
            "The game is being updated! Your browser probably are still keeping some old scripts."
        + "\nIf you still see this message after a hard reload (Ctrl+F5) please contact the developer.";

    let stack = error && error.stack ? error.stack : "";
    let info = message + "\n" + source + ":" + lineno + ":" + colno + "\n\n" + stack;
    // If 'Script error.' (cross-origin or unknown), add a hint
    if (message === 'Script error.') {
        info += "\n\nNote: 'Script error.' usually means a cross-origin script error or a browser security restriction. Try running the game from a local server, not file://, or check your browser's console for more details.";
    }
    // Always try to copy something
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(info).catch(() => {});
    }
    alert(
        "An error has occurred:\n" + message + "\n" + source + ":" + lineno + ":" + colno
        + "\n\n" + instruction
    );
};