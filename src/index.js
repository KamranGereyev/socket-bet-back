const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let resultData = 
    {
        id: 1,
        programCode: 1206,
        sportId: 1, // Futbol
        teams: 
            {
                home: 'FK Fakel-M Voronej',
                away: 'Saturn Ramonskoye',
            },
        liveStatistics: {
            period: '2H',
            eventTime: 75,
            homeScore: 0,
            awayScore: 1,
        },
        mbn: 1, 
        outcomes: [
            {
                id: 1,
                odd: 4.85,
            },
            {
                id: 2,
                odd: 4.39,
            },
            {
                id: 3,
                odd: 1.01,
            },
        ],
    };

const changeBet = (resultData) => {
    resultData.mbn  = Math.floor(Math.random() * 2);
    resultData.liveStatistics.homeScore = Math.floor(Math.random() * 3);
    resultData.liveStatistics.awayScore = Math.floor(Math.random() * 3);
    resultData.liveStatistics.eventTime = Math.floor(Math.random() * 90);
    resultData.liveStatistics.eventTime > 45 
    ? 
    resultData.liveStatistics.period = '2H' 
    : 
    resultData.liveStatistics.period = '1H';
    resultData.outcomes[0].odd = (Math.random() * 50).toFixed(2);
    resultData.outcomes[1].odd = (Math.random() * 50).toFixed(2);
    resultData.outcomes[2].odd = (Math.random() * 50).toFixed(2);

    return resultData;
};

wss.on('connection', (ws) => {
    ws.send(JSON.stringify(changeBet(resultData)))
    setInterval(() => {
        ws.send(JSON.stringify(changeBet(resultData)))
    }, 3000);
});

server.listen(process.env.PORT || 3002, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});