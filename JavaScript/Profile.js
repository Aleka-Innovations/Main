document.getElementById('copyButton').addEventListener('click', function() {
    // Get the text to copy
    const text = document.getElementById('loggedUserID').innerText;

    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(text)
        .then(() => {
            alert('Text copied to clipboard: ' + text);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
});