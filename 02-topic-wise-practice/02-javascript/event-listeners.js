// DOM Event Listeners Practice
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('clickBtn');
    const input = document.getElementById('inputBox');
    const output = document.getElementById('output');

    if (btn) {
        btn.addEventListener('click', (e) => {
            output.textContent = `Button clicked at ${new Date().toLocaleTimeString()}`;
        });
    }

    if (input) {
        input.addEventListener('input', (e) => {
            output.textContent = `Typing: ${e.target.value}`;
        });
    }
});
