const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');
const ejsLayouts = require('express-ejs-layouts');
const { BASE_URI } = require('./const');
const shortsRouter = require('./routes/shortsRouter');
const adminRouter = require('./routes/adminRouter');
const mainRouter = require('./routes/mainRouter');
const authRouter = require('./routes/authRouter');
const dashboardRouter = require('./routes/dashboardRouter');
const { getDataFromToken } = require('./controller/authController');
const { getDashboardData } = require('./controller/dashboardController');

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', async (socket) => {
  let timer = 0;
  if (typeof socket.handshake.headers.cookie === 'string') {
    const session = cookie.parse(socket.handshake.headers.cookie);
    const data = await getDataFromToken(session?.SESSION_TOKEN);

    if (data.error) {
      socket.emit('error', data.error);
    } else {
      socket.join(data.email);
      timer = setInterval(async () => {
        const rez = await getDashboardData(data.id);
        io.to(data.email).emit('statisticData', rez);
      }, 3000);
    }
  }

  socket.on('disconnecting', () => {
    clearInterval(timer);
    console.log('disconnecting');
  });
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
app.use(ejsLayouts);
app.set('layout', './layout');
app.set('view engine', 'ejs');

app.use(`${BASE_URI}`, mainRouter);
app.use(`${BASE_URI}/auth`, authRouter);
app.use(`${BASE_URI}/shorts`, shortsRouter);
app.use(`${BASE_URI}/admin`, adminRouter);
app.use(`${BASE_URI}/dashboard`, dashboardRouter);

module.exports = server;
