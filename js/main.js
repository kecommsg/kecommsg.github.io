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

$(function () {
  'use strict'

  $.ajax({
    url: 'https://api.flickr.com/services/rest/',
    data: {
      format:  'json',
      method:  'flickr.photosets.getPhotos',
      api_key: 'caaa2b7d4ee3d994e10415a9e454100a',
      photoset_id: '72157697855270404',
      nojsoncallback: '1',
      per_page: '500'
    },
    dataType: 'jsonp',
    jsonp: 'jsoncallback'
  }).done(function (result) {
    var carouselLinks = [];
    var linksContainer = $('#links');
    var photo, baseUrl;
    var photos = result.photoset.photo;
    for (i = 0; i < Math.min(photos.length); i++){
      photo = photos[i];
      baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' +
      photo.server + '/' + photo.id + '_' + photo.secret
      if (i < 50) {
        $('<a/>')
          .append($('<img>').prop('src', baseUrl + '_s.jpg'))
          .prop('href', baseUrl + '_b.jpg')
          .prop('title', photo.title)
          .attr('data-gallery', '')
          .appendTo(linksContainer)
      } else {
        $('<a/>')
          .append($('<img>').prop('src', baseUrl + '_s.jpg'))
          .prop('href', baseUrl + '_b.jpg')
          .prop('title', photo.title)
          .prop('style', 'display: none;')
          .attr('data-gallery', '')
          .appendTo(linksContainer)
      }
    }
  })


  $.ajax({
    url: 'https://api.flickr.com/services/rest/',
    data: {
      format:  'json',
      method:  'flickr.photosets.getPhotos',
      api_key: 'caaa2b7d4ee3d994e10415a9e454100a',
      photoset_id: '72157698360317935',
      nojsoncallback: '1',
      per_page: '500'
    },
    dataType: 'jsonp',
    jsonp: 'jsoncallback'
  }).done(function (result) {
    var carouselLinks = [];
    var baseUrl;
    $.each(result.photoset.photo, function (index, photo) {
      baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' +
      photo.server + '/' + photo.id + '_' + photo.secret
      carouselLinks.push({
        href: baseUrl + '_b.jpg',
        title: photo.title
      });
    });
    // blueimp.Gallery(carouselLinks, {
    //   container: 'blueimp-gallery-carousel',
    //   carousel: true,
    //   titleElement: 'h3',
    //   titleProperty: 'title',
    //   prevClass: 'prev',
    //   nextClass: 'next',
    //   closeClass: 'close',
    //   closeOnEscape: false,
    //   closeOnSlideClick: true,
    //   closeOnSwipeUpOrDown: true,
    //   playPauseClass: 'play-pause'
    // });
    blueimp.Gallery(carouselLinks, {
      container: '#blueimp-image-carousel',
      carousel: true,
      stretchImages: true,
      toggleControlsOnSlideClick: true
    });
  });

})

// Create language switcher instance
var lang = new Lang();
lang.init({
  /**
   * The default language of the page / app.
   * @type String
   * @required
   */
  defaultLang: 'en',

  /**
   * The current language to set the page to.
   * @type String
   * @optional
   */
  currentLang: 'bg',

  /**
   * This object is only required if you want to override the default
   * settings for cookies.
   */
  cookie: {
    /**
     * Overrides the default cookie name to something else. The default
     * is "langCookie".
     * @type String
     * @optional
     */
    name: 'langCookie',

    expiry: 365,
    path: '/'
  },

  /**
   * If true, cookies will override the "currentLang" option if the
   * cookie is set. You usually shouldn't need to specify this option
   * at all unless your JavaScript lang.init() method is being
   * dynamically generated by PHP or other server-side processor.
   * @type Boolean
   * @optional
   */
  allowCookieOverride: true
});
