// script.js
function checkEnter(event) {
    if (event.key === "Enter") {
        checkPassword();
    }
}

function checkPassword() {
    var password = document.getElementById('password').value;
    if (password === 'sasi') {
        document.getElementById('login-wrapper').style.display = 'none';
        document.getElementById('wrapper').style.display = 'block';
        loadStatus();
    } else {
        alert('Incorrect Password');
    }
}

function hien() {
    var x = document.getElementById('hide');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

function submitStatus() {
    var status = document.getElementById('status').value;
    var content = 'Trạng thái mới của máy: ' + status + '\nThời gian cập nhật: ' + new Date().toLocaleString();
    
    // Lưu trạng thái vào localStorage
    localStorage.setItem('machineStatus', status);
    
    // Cập nhật trạng thái trên HTML
    updateStatus(status);
    
    // Gửi email với nội dung file TXT
    sendEmail(content);
    
    alert('Trạng thái của máy đã được cập nhật thành: ' + status);
}

function updateStatus(status) {
    var statusElement = document.getElementById('current-status');
    statusElement.innerText = 'Trạng thái hiện tại: ' + status;
    statusElement.style.display = 'block';
}

function loadStatus() {
    var savedStatus = localStorage.getItem('machineStatus');
    if (savedStatus) {
        document.getElementById('status').value = savedStatus;
        updateStatus(savedStatus);
    }
}

function sendEmail(content) {
    fetch('https://your-app-name.vercel.app/api/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: content }),
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function createAndSendFile() {
    var status = localStorage.getItem('machineStatus') || 'Chưa có trạng thái';
    var content = 'Trạng thái máy hiện tại: ' + status + '\nThời gian gửi: ' + new Date().toLocaleString();

    // Gửi email định kỳ với trạng thái hiện tại
    sendEmail(content);
}

function setScheduleForFileSend() {
    var now = new Date();
    var nextSendTime = new Date();
    nextSendTime.setHours(21, 30, 0, 0);

    if (now > nextSendTime) {
        nextSendTime.setDate(now.getDate() + 1);
    }

    var timeToNextSend = nextSendTime - now;
    setTimeout(function() {
        createAndSendFile();
        setInterval(createAndSendFile, 24 * 60 * 60 * 1000); // 24 giờ
    }, timeToNextSend);
}

window.onload = function() {
    setScheduleForFileSend();
    loadStatus();
};

// Chặn tổ hợp phím Developer Tools
document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || 
        (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J' || event.key === 'C'))) {
        event.preventDefault();
    }
});

// Chặn chuột phải
document.addEventListener('contextmenu', event => event.preventDefault());
