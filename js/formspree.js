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
});