import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const httpServer = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK\n');
});

const wsServer = new WebSocketServer({
    server: httpServer
});

wsServer.on('connection',(ws,req)=>{
    ws.on('message',(rawData)=>{
        const data = rawData.toString()
        try {
            const parsedData = JSON.parse(data);
            if (parsedData.type === 'ping') {
                ws.send(JSON.stringify({ type: 'pong', timestamp: new Date().toISOString() }));
            }
        } catch (error) {
            console.log(data);
        }
    })

    let seconds = 1;
    const intervalId = setInterval(() => {
        ws.send(JSON.stringify({ type: 'seconds', count: seconds++ }));
        if (seconds > 5) {
            clearInterval(intervalId);
            ws.close();
        }
    }, 1000);

    ws.on('close', () => {
        console.log('WebSocket server closed');
    });
})

httpServer.listen(8000, () => {
    console.log('Server is listening on port 8000');
});
