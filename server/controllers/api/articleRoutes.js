const router = require('express').Router();
const NewsAPI = require('newsapi');
require('dotenv').config();
const newsApi = new NewsAPI(process.env.NEWS_API)

router.get('/news', function (req, res) {
    let lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() -1);
    var dd = String(lastMonth.getDate()).padStart(2, '0');
    var mm = String(lastMonth.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = lastMonth.getFullYear();

    lastMonth = mm + '-' + dd + '-' + yyyy;
    newsApi.v2.everything({
        sources: 'nbc-news, cbs-news abc-news',
        qInTitle: 'climate AND (change OR disaster)',
        from: lastMonth,
        language: 'en',
        sortBy: 'popularity',
        pageSize: '6' 
    }).then(response => {
        if (response.status === 'ok') {
            res.json(response.articles);
            return;
        }
        res.status(500).json({message: 'Internal Server Error Occurred, please try again'});
    });
    
});

module.exports = router;