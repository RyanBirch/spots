export default {
  initMap: function(lat ,lng) {
    const google = window.google
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {
          lat: lat, 
          lng: lng
      },
      mapTypeControl: false,
      streetViewControl: false
    })
  }
}