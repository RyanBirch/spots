export default {

  // show map for directions
  initDirectionsMap: function(results) {
    const google = window.google
    let directionsDisplay = new google.maps.DirectionsRenderer
    let directionsService = new google.maps.DirectionsService
    let map = new google.maps.Map(document.getElementById('directions-map'), {
      zoom: 10,
      center: { lat: results.coordinates.latitude, lng: results.coordinates.longitude },
      mapTypeControl: false,
      streetViewControl: false
    })
    directionsDisplay.setMap(map)
    directionsDisplay.setPanel(document.getElementById('right-panel'))

    let control = document.getElementById('floating-panel')
    control.style.display = 'block'
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(control)

    let onChangeHandler = function() {
      let start = document.getElementById('start').value
      let end = sessionStorage['end']
      directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response)
        } else {
          window.alert('Directions request failed due to ' + status)
        }
      })
    }
    document.getElementById('submit').addEventListener('click', onChangeHandler)
  },



  // show map and markers on search
  initMarkers: function(results) {
    // initiate map
    const google = window.google
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {
        lat: results[0].coordinates.latitude, 
        lng: results[0].coordinates.longitude 
      },
      mapTypeControl: false,
      streetViewControl: false
    })

    // add markers
    let newMarkers = []
    results.forEach(item => {
      map.setCenter({ lat: item.coordinates.latitude, lng: item.coordinates.longitude })

      let marker = new google.maps.Marker({
        map: map,
        position: map.center,
        id: item.id,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      })

      newMarkers.push(marker)

      let infowindow = new google.maps.InfoWindow({
        content: `<strong>${item.name}</strong>`,
        maxWidth: 300
      })

      marker.addListener('mouseover', () => infowindow.open(map, marker))
      marker.addListener('mouseout', () => infowindow.close(map, marker))
      marker.addListener('click', () => {
        let markerID = marker.get('id')
        document.getElementById(markerID).scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center'
        })
      })
    })

    return newMarkers
  }
}