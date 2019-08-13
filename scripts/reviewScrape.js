const axios = require('axios')
const cheerio = require('cheerio')

// scrape reviews from yelp
function scrape(url) {
  return new Promise(resolve => {
    axios.get(url).then(res => {
      let $ = cheerio.load(res.data)
  
      let reviews = []
      $('.review').each(function(i, elem) {
        if (i > 0) {
          let content = $(elem).find('.review-content').find('p').text()
  
          // eliminate newline characters
          content = content.replace(/\n/g, '')
          reviews.push(content)
        }
      })
  
      resolve(reviews)
    })
    .catch(err => console.log(err))
  })
}

module.exports = scrape