const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:city', async (req, res) => {

    try {

        const city = req.params.city;

        const apiKey = process.env.WEATHER_API_KEY;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);

        const data = response.data;

        const weatherData = {
            city: data.name,
            temperature: `${data.main.temp} °C`,
            condition: data.weather[0].description,
            humidity: `${data.main.humidity}%`
        };

        res.status(200).json({
            success: true,
            data: weatherData
        });

    } catch (error) {

        if (error.response) {
            return res.status(404).json({
                success: false,
                message: 'City not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Weather service error'
        });
    }
});

module.exports = router;