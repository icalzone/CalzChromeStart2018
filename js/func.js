/*eslint no-undef: 0*/

function randImage() {
  $("#bg").css("background-image", "");
  $("#bg").css("background-color", "");
  var imageInteger = "";
  if (!navigator.onLine) {
    $("#bg").css("background-image", "url(../bkgnd/image_0.jpg)");
  } else {
    chrome.storage.sync.get({ imageInteger: 0 }, function(result) {
      imageInteger = result.imageInteger;
      // eslint-disable-next-line no-console
      console.log(imageInteger);
      if (imageInteger == 0) {
        $("#bg").css("background-image", "url(images/image_0.jpg)");
        $("#altBg").css("background-image", "url(http://stuff.ellzzoo.com/bkgnds/image_1.jpg)");
        chrome.storage.sync.set({ imageInteger: imageInteger + 1 });
      } else if (imageInteger == 329) {
        $("#bg").css(
          "background-image",
          "url(http://stuff.ellzzoo.com/bkgnds/image_" + imageInteger + ".jpg)"
        );
        var nextImage = 0;
        $("#altBg").css("background-image", "url(../bkgnd/images/image_0.jpg");
        chrome.storage.sync.set({ imageInteger: nextImage });
      } else {
        $("#bg").css(
          "background-image",
          "url(http://stuff.ellzzoo.com/bkgnds/image_" + imageInteger + ".jpg)"
        );
        var nextImage = imageInteger + 1;
        $("#altBg").css(
          "background-image",
          "url(http://stuff.ellzzoo.com/bkgnds/image_" + nextImage + ".jpg)"
        );
        chrome.storage.sync.set({ imageInteger: nextImage });
      }
    });
  }
  $("#bg").animate({ opacity: 1 }, { duration: 700 });
}

function setColor() {
  $("#bg").css("background-image", "");
  $("#bg").css("background-color", "");
  $("#bg").css("background-color", document.getElementById("bgColor").value);
  //$('#bg').animate({ opacity: 1 }, { duration: 700 });
}

function setImage() {
  $("#bg").css("background-image", "");
  $("#bg").css("background-color", "");
  $("#bg").css(
    "background-image",
    "url(" + document.getElementById("customImageTextbox").value + ")"
  );
  //$('#bg').animate({ opacity: 1 }, { duration: 700 });
}

function randColor() {
  $("#bg").css("background-image", "");
  $("#bg").css("background-color", "");
  var randomColor = Math.random()
    .toString(16)
    .slice(2, 8);
  console.log(randomColor);
  $("#bg").css("background-color", "#" + randomColor);
  //$('#bg').animate({ opacity: 1 }, { duration: 700 });
}

function randImageAlbum() {
  $("#bg").css("background-image", "");
  $("#bg").css("background-color", "");
  albumText = $("#optionsAlbumImageTextarea").val();
  var imageLines = albumText.split("\n");
  console.log(imageLines);
  imageLines = imageLines.filter(Boolean);
  console.log(imageLines);
  var outputImage = imageLines[Math.floor(Math.random() * imageLines.length)];
  console.log(outputImage);
  $("#bg").css("background-image", "url(" + outputImage + ")");
  //$('#bg').animate({ opacity: 1 }, { duration: 700 });
}

function saveBackground() {
  var boolCustomImageChecked = document.getElementById("optionsCustomImage").checked;
  var boolBGColor = document.getElementById("optionsBackgroundColor").checked;
  var boolRandColor = document.getElementById("optionsRandomColor").checked;
  var boolRandImage = document.getElementById("optionsRandomImage").checked;
  var boolRandImageAlbum = document.getElementById("optionsAlbumImage").checked;

  chrome.storage.sync.set({
    customImage: boolCustomImageChecked,
    customColor: boolBGColor,
    customRandColor: boolRandColor,
    customRandImage: boolRandImage,
    customRandImageAlbum: boolRandImageAlbum
  });
}

function onInstall() {
  // $('#welcome_newInstaller').show();
  $("#time").show();
  $("#welcome_confirm").click(function() {
    $("#welcome_newInstaller").hide();
    $("#time").show();
  });
  // chrome.storage.sync.set({ getValidUpdate: true });
  // chrome.storage.sync.set({ showReviews: moment().add(1, 'days').format('YYYY-MM-DD') });
  // chrome.storage.sync.set({ showSocial: moment().add(3, 'days').format('YYYY-MM-DD') });
  // fetch('https://leoh.io/dashboard/action.php?action=new_user').then(() => {
  // console.log('sent new user');
  // }).catch((e) => {
  // console.log('failed to send new user', e);
  // });
}

chrome.storage.sync.get(
  {
    showSocial: moment()
      .add(3, "days")
      .format("YYYY-MM-DD")
  },
  function(result) {
    var curr = moment().format("YYYY-MM-DD");
    if (
      moment(curr).isAfter(moment(result.showSocial)) ||
      moment(curr).isSame(moment(result.showSocial))
    ) {
      $("#contactNotification").show();
      $("#contactNotification .actionBtn").click(function() {
        $("#contactNotification").hide();
        chrome.storage.sync.set({
          showSocial: moment()
            .add(99999999, "days")
            .format("YYYY-MM-DD")
        });
      });
      console.log("Show Social Options");
      ga("send", "event", "social panel shown", "click", "button");
    }
  }
);

function getVersion() {
  var thisVersion = chrome.runtime.getManifest().version;
  return thisVersion;
}

function taskCheckedSaving() {
  var taskChecked = document.getElementById("taskSaved").checked;
  chrome.storage.sync.set({ taskCheckedSaved: taskChecked });
  console.log("Checking Saved");
}

function taskInnerLabel() {
  var nameTextbox = $("#nameTextbox").val();
  console.log(nameTextbox);
  document.getElementById("task").innerHTML = nameTextbox;

  $("#doneCheck").click(function() {
    $("#taskSaved").trigger("click");
    if (document.getElementById("taskSaved").checked != false) {
      document.getElementById("taskDoneCheckmark").style.visibility = "visible";
      taskCheckedSaving();
    } else {
      document.getElementById("taskDoneCheckmark").style.visibility = "hidden";
      taskCheckedSaving();
    }
  });
  $("#removeCross").click(function() {
    document.getElementById("nameTextbox").value = "";
    $("#greeting").hide();
    document.getElementById("taskSaved").checked = false;
    taskCheckedSaving();

    var nameTextboxSave = document.getElementById("nameTextbox").value;
    chrome.storage.sync.set({ taskTextbox: nameTextboxSave });
  });
}

function taskClicked() {
  $("#taskAtHand i").click(function(e) {
    console.log(
      $(this)
        .parent("div")
        .text()
    );
    var parentDiv = $(this).parent("div");
    var name = parentDiv.text();
    var textarea = document.getElementById("todoListSave"); //intead of "input"
    var data = textarea.value;
    name = name + "\n";
    textarea.value = textarea.value.replace(name, "");
    e.stopPropagation();
    $(this)
      .parent("div")
      .remove();
    var todotextarea = document.querySelector("#todoListSave").value;
    var todoListSave = {};
    todoListSave["todoListSave"] = todotextarea;

    var mainDiv = document.getElementById("listOfTodos");
    var countOfDiv = mainDiv.getElementsByTagName("div").length;
    if ($("#listOfTodos").is(":empty")) {
      $("#todoGreeting").show();
      document.getElementById("todoGreeting").innerHTML = "Nothing Todo!";
      $(".todoListNotification").hide();
    } else {
      $("#todoGreeting").hide();
      $(".todoListNotification").show();
      document.getElementById("notificationTodo").innerHTML = countOfDiv;
    }
    // Save data using the Chrome extension storage API.
    chrome.storage.sync.set(todoListSave, function() {
      console.log("List Saved");
    });
  });
}

function getNews() {
  chrome.storage.sync.get({ newsOption: "worldnews" }, function(result) {
    $(".newsOption").val(result.newsOption);
    newsOutlet(result.newsOption, false);
  });
}

$(".facebook").click(function() {
  window.open(
    "https://www.facebook.com/sharer/sharer.php?u=https%3A//chrome.google.com/webstore/detail/ijhhakihjccpanbibbcceofpjnebokcb",
    "_blank"
  );
  ga("send", "event", "shared on facebook", "click", "button");
});

$(".twitter").click(function() {
  window.open(
    "https://twitter.com/home?status=Check%20out%20the%20Leoh%20Chrome%20extension!%20It%20replaces%20your%20boring%20new%20tab%20with%20a%20fantastic%20new%20design. https://leoh.io/chrome",
    "_blank"
  );
  ga("send", "event", "shared on twitter", "click", "button");
});

$(".socialNo").click(function() {
  ga("send", "event", "ignored social", "click", "button");
});

function getQuotes() {
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/",
    jsonp: "jsonp",
    dataType: "jsonp",
    data: {
      method: "getQuote",
      lang: "en",
      format: "jsonp"
    }
  }).done(quoteUpdate);
}

function quoteUpdate(response) {
  console.log(response);
  var author = response.quoteAuthor;
  if (author == "") {
    author = "Unknown";
  }
  $("#quote").html(response.quoteText + " - <span class='noitalics'>" + author + "</span>");
  $("#quote").fadeIn(400);
}

function quoteError(jqxhr, textStatus, err) {
  console.log("Request Failed: " + textStatus + ", " + err);
}
