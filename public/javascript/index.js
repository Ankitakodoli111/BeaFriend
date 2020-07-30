$(document).ready(function() {

  $.validator.addMethod('gmailId', function(value, element) {
    return this.optional(element) || /^\w+([-+.']\w+)*@gmail.com$/.test(value);
  }, 'Please enter a gmail id email');

  $.validator.addMethod('validnum', function(value, element) {
    return this.optional(element) || /^[6-9]\d{9}$/.test(value);
  }, 'Please enter a valid number');

  $.validator.addMethod('validcode', function(value, element) {
    return this.optional(element) || value.length == 6 && /^[5]\d{5}$/.test(value);
  }, 'Please enter a six digit code');



  $("#form-section").validate({
    rules: {
      fName: {
        required: true,
        nowhitespace: true,
        lettersonly: true,
        minlength: "3"
      },
      lName: {
        nowhitespace: true,
        lettersonly: true
      },
      email: {
        required: true,
        gmailId: true
      },
      mobileNumber: {
        required: true,
        validnum: true
      },
      address: {
        required: true,
        minlength: "10"
      },
      cityName: {
        required: true,
        minlength: "4"
      },
      state: {
        required: true
      },
      zipCode: {
        required: true,
        validcode: true
      },
      item: {
        required: true
      }
    },
    messages: {
      fName: {
        required: "Please enter your First Name",
        nowhitespace: "No space Allowed",
        lettersonly: "Only letters are Allowed",
        minlength: "Please enter your First Name"
      },
      lName: {
        nowhitespace: "No space Allowed",
        lettersonly: "Only letters are Allowed"
      },
      email: {
        required: "Please enter a gmail account mail id"
      },
      mobileNumber: {
        required: "Please enter a valid number(10 digit)"
      },
      address: {
        required: "Please enter a valid address from where our volunteer can pickup the things",
        minlength: "Please enter a valid address from where our volunteer can pickup the things"
      },
      cityName: {
        required: "Please enter your city",
        minlength: "Please enter your city"
      },
      state: {
        required: "Please Choose a State from the dropdown list"
      },
      zipCode: {
        required: "Please enter a valid area PinCode"
      },
      item: {
        required: "(Select atleast one item that you wish to donate)"
      }

    },
    errorPlacement: function(error, element) {
      if (element.is(":checkbox")) {
        var displaymsg = $("#errormsgs");
        error.appendTo(displaymsg);
      } else {
        error.insertAfter(element);
        element.css("border", "1px solid red");
      }
    }
  });

});
