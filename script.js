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
    
    // Tạo file TXT
    var blob = new Blob([content], { type: 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'machine_status.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cập nhật trạng thái trên HTML
    var statusElement = document.getElementById('current-status');
    statusElement.innerText = 'Trạng thái hiện tại: ' + status;
    statusElement.style.display = 'block';
    
    alert('Trạng thái của máy đã được cập nhật thành: ' + status);
}

function createAndSendFile() {
    var status = document.getElementById('status').value || 'Chưa có trạng thái';
    var content = 'Trạng thái máy hiện tại: ' + status + '\nThời gian gửi: ' + new Date().toLocaleString();

    var blob = new Blob([content], { type: 'text/plain' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'scheduled_machine_status.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
};
