// Simple content script to help the popup read selected text
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSelectedText') {
        const selectedText = window.getSelection()?.toString() || '';
        sendResponse({ text: selectedText });
    }
    return true;
});
