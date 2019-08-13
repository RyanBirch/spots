const axios = require('axios')
const cheerio = require('cheerio')

function scrape(url) {
  return new Promise(resolve => {
    axios.get(url).then(res => {
      let $ = cheerio.load(res.data)
  
      let reviews = []
      $('.review').each(function(i, elem) {
        if (i === 4) return false
  
        let content = $(elem).find('.review-content').text()
        content = content.replace(/\n/g, '')
        reviews.push(content)
        if (i >= 4 ) return reviews
      })
  
      // reviews.forEach(item => console.log(item + '\n\n'))
      resolve(reviews)
    })
    .catch(err => console.log(err))
  })
}

module.exports = scrape