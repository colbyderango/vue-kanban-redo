var client = io.connect('http://localhost:3001');

client.on('message', function(data){
    console.log(data);
});