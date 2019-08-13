const axios = require('axios')
const cheerio = require('cheerio')

// scrape reviews from yelp
function scrape(url) {
  return new Promise(resolve => {
    axios.get(url).then(res => {
      let $ = cheerio.load(res.data)
  
      let reviews = []
      $('.review').each(function(i, elem) {

        // only return the first three reviews
        // if (i === 4) return false
  
        let content = $(elem).find('.review-content').find('p').text()

        // eliminate newline characters
        content = content.replace(/\n/g, '')
        reviews.push(content)
      })
  
      resolve(reviews)
    })
    .catch(err => console.log(err))
  })
}

let url = `https://www.yelp.com/biz/the-hangry-bison-winter-park-2?adjust_creative=v2_EXvUPsMoVptrqMxFIQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=v2_EXvUPsMoVptrqMxFIQg`

scrape(url).then(res => {
  res.forEach(item => console.log(item + '\n\n'))
})

module.exports = scrape