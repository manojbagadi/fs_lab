document.addEventListener('DOMContentLoaded', () => {
    const data = [
        { qNo: "Q1", topic: "HTML5 Semantic Forms", marks: 10, status: "Solved" },
        { qNo: "Q2", topic: "CSS3 Flexbox Layout", marks: 10, status: "Solved" },
        { qNo: "Q3", topic: "JavaScript DOM Event Handling", marks: 10, status: "Solved" }
    ];

    const container = document.getElementById('tableContainer');
    let html = '<table><thead><tr><th>Question</th><th>Topic</th><th>Marks</th><th>Status</th></tr></thead><tbody>';
    data.forEach(item => {
        html += `<tr><td>${item.qNo}</td><td>${item.topic}</td><td>${item.marks}</td><td><strong style="color:green;">${item.status}</strong></td></tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
});
