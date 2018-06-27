$(document).on('ready', function () {

  var $contactForm = $('#contact_form');

  $contactForm.submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: '//formspree.io/bellanails.vn@gmail.com',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      beforeSend: function() {
        $contactForm.append('<div class="alert alert--loading">Sending message…</div>');
      },
      success: function(data) {
        $contactForm.find('.alert--loading').hide();
        $contactForm.append('<div class="alert alert--success">Thank you for your message!</div>');
        $contactForm[0].reset();
      },
      error: function(err) {
        $contactForm.find('.alert--loading').hide();
        $contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
      }
    });
  });

  //$('.selectpicker').selectpicker();


  $('.selectpicker').on('change', function(e){
    if (this.selectedIndex == 0){
      window.lang.change('bg');
    }
    if (this.selectedIndex == 1){
      window.lang.change('ru');
    }
    if (this.selectedIndex == 2){
      window.lang.change('en');
    }
  });
});


function initMap() {
  // 43.202348,27.9096177,17z
  var uluru = {lat: 43.202348, lng: 27.9096177};
  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 17,
  center: uluru
  });
  var marker = new google.maps.Marker({
  position: uluru,
  map: map
  });
}


