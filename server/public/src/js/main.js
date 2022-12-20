var socket = io(window.location.hostname + ':3000');
var form = document.getElementById('form');
var inputMsg = document.getElementById('msg');
var inputUsername = document.getElementById('username');
var messages = document.getElementById('messages');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('🚀 ~ file: main.js:15 ~ e', inputMsg.value);

  if (!inputUsername.value) {
    alert('Please enter a username');
    return;
  }
  if (!inputMsg.value) {
    alert('Please enter a message');
  } else {
    socket.emit('chat message to server', { id: inputUsername.value, msg: inputMsg.value });
    inputMsg.value = '';
  }
});

socket.on('chat message to client', function ({ id, msg }) {
  var item = document.createElement('li');
  item.textContent = id + ': ' + msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
