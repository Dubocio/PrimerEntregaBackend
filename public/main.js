const socket = io();

socket.on('CONNECTION_SUCCESS', data => {
    console.log(data.message)
})