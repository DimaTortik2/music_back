const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const {
	errorHandler,
	notFoundHandler,
} = require('./middlewares/error.middleware');
const { requestLogger } = require('./middlewares/logger.middleware');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(requestLogger);

app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Это Music Tree',
		version: '1.0.0',
		docs: '/api/v1',
		status: 'active',
	});
});

app.use('/api/v1', routes);

app.get('/health', (req, res) =>
	res.status(200).json({ status: 'healthy', timestamp: new Date() }),
);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
