const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:country', async (req, res) => {

    try {

        const country = req.params.country.toLowerCase();

        const validCountries = [
            'us', 'pk', 'in', 'gb', 'ca',
            'au', 'fr', 'de', 'jp', 'cn'
        ];

        // Validate country code manually
        if (!validCountries.includes(country)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid country code'
            });
        }

        const apiKey = process.env.NEWS_API_KEY;

        const url =
            `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;

        const response = await axios.get(url);

        const articles = response.data.articles.slice(0, 5);

        // Check empty articles
        if (articles.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No news found'
            });
        }

        const formattedNews = articles.map(article => ({
            title: article.title,
            source: article.source.name,
            url: article.url,
            publishedAt: article.publishedAt
        }));

        res.status(200).json({
            success: true,
            totalArticles: formattedNews.length,
            articles: formattedNews
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'News service unavailable'
        });
    }
});

module.exports = router;