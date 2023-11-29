var typed = new Typed("#lbl-welcome", {
  strings: ["Hi, welcome to Metroland"],
  typeSpeed: 50
});

// Class definition
var form;
const submitButton = document.getElementById("kt_sign_in_submit");
var validator;

var KTSigninGeneral = (function () {
  // Elements

  // Handle form
  var handleForm = function (e) {
    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
    validator = FormValidation.formValidation(form, {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: "Email is required",
            },
            emailAddress: {
              message: "Incorrect e-mail format",
            },
          },
        },
        password: {
          validators: {
            notEmpty: {
              message: "Password is required",
            },
          },
        },
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap: new FormValidation.plugins.Bootstrap5({
          rowSelector: ".fv-row",
        }),
      },
    });
  };

  // Public functions
  return {
    // Initialization
    init: function () {
      form = document.querySelector("#kt_sign_in_form");
      // submitButton = document.querySelector("#kt_sign_in_submit");

      handleForm();
    },
  };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
  KTSigninGeneral.init();
});
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

submitButton.addEventListener("click", function () {


  validator.validate().then(function (status) {
    if (status == "Valid") {
      submitButton.setAttribute("data-kt-indicator", "on");
      submitButton.disabled = true;
      let email_ = document.getElementById('email').value;
      let password_ = document.getElementById('password').value;

      var email = CryptoJS.AES.encrypt(email_, key());
      var password = CryptoJS.AES.encrypt(password_, key());

      setTimeout(function () {
        submitButton.removeAttribute("data-kt-indicator");
        submitButton.disabled = false;

        document.getElementById('e').value = email;
        document.getElementById('p').value = password;
        document.getElementById("login_form").submit();

        // document.getElementById("kt_sign_in_form").submit();
      }, 500);
    } else {
      Swal.fire({
        text: "there was an error in the login process, make sure the email and password you entered are correct.",
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok !",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      }).then((result) => {
        location.reload();
      });
    }
  });


  // Disable indicator after 3 seconds
  setTimeout(function () {
    button.removeAttribute("data-kt-indicator");
  }, 3000);
});

var showHidePwd = document.querySelector("#show_hide_pwd");
showHidePwd.addEventListener("click", function (e) {
  var x = document.getElementById("password");
  var show_eye = document.getElementById("show_eye");
  var hide_eye = document.getElementById("hide_eye");
  hide_eye.classList.remove("d-none");
  if (x.type === "password") {
    x.type = "text";
    show_eye.style.display = "none";
    hide_eye.style.display = "block";
  } else {
    x.type = "password";
    show_eye.style.display = "block";
    hide_eye.style.display = "none";
  }
})