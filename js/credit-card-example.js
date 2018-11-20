const f = SecureForm.create('development', function(state) {
    document.getElementById('preview').innerText = JSON.stringify(state, null, '  ');
  });
  
  const field = f.field('#cc-name .fake-input', {
    type: 'text',
    name: 'card.name',
    placeholder: 'Joe Business',
    validations: ['required'],
  });
  
  f.field('#cc-number .fake-input', {
    type: 'card-number',
    name: 'card.number',
    successColor: '#4F8A10',
    errorColor: '#D8000C',
    placeholder: '4111 1111 1111 1111',
    validations: ['required', 'validCardNumber'],
  });
  
  f.field('#cc-cvc .fake-input', {
    type: 'card-security-code',
    name: 'card.cvc',
    placeholder: '344',
    validations: ['required', 'validCardSecurityCode'],
  });
  
  f.field('#cc-expiration-date .fake-input', {
    type: 'card-expiration-date',
    name: 'card.expirationDate',
    placeholder: '01 / 2016',
    validations: ['required', 'validCardExpirationDate']
  });
  
  document.querySelectorAll('label')
    .forEach(function(el) {
      el.addEventListener('click', function(t) {
        field.focus();
      });
    });
  
  document.getElementById('cc-form')
    .addEventListener('submit', function(e) {
      e.preventDefault();
      f.submit('/post', {
        headers: {
          'x-custom-header': 'Oh yes. I am a custom header',
        },
        data: {
          type: 'card',
        },
      }, function(status, data) {
        document.getElementById('response').innerText = JSON.stringify(data, null, '  ');
      });
    }, false);
  