var langs = [];
var options = $('.lang-select').find("option");
for (var i = 0; i < options.length; i++){
  langs.push(options[i].value);
}

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


  $('.lang-select').select2({
    minimumResultsForSearch: -1,
    width: "100%",
    templateSelection: iformat,
    templateResult: iformat,
    allowHtml: true
  });

  var url, prevLang, params;
  $('.lang-select').on('change', function(e){
      window.lang.change(this.value);
      url = $(location).prop("href");
      if (url.includes('lang')) {
        params = window.location.search;
        url = url.split('?')[0] + params.replace(prevLang, this.value);
      } else {
        url = url + '?lang=' + this.value;
      }
      prevLang = this.value;
      history.pushState(null, null, url);
  });

  var propSplited = $(location).attr('href').split('?');
  for (var i = 0; i < propSplited.length; i++){
    if (propSplited[i].includes('lang')) {
      param = propSplited[i].split('=');
      if (param.length > 1) {
        if (langs.indexOf(param[1].substring(0,2)) > -1){
          $(".lang-select").val(param[1].substring(0,2)).trigger("change");
        } else {
          $(".lang-select").val('en').trigger("change");
        }
      }
    }
  }

});

function iformat(icon) {
    var originalOption = icon.element;
    return $('<span><i class="flag-icon ' + $(originalOption).data('icon') + '"></i> ' + icon.text + '</span>');
}

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
