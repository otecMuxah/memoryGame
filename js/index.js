function buildTable() {
  var inImages = [],
    index, result, timer,
    choises = [],
    html = "",
    counter = 0;

  $.getJSON('https://kde.link/test/get_field_size.php', function (data) {
    var imagesNum = data.width * data.height;

    for (index = 0; index < imagesNum / 2; index++) {
      var item = {};
      var secItem = {};
      if (index % 10 === 0) {
        counter = 0;
      }
      item.url = "https://kde.link/test/" + counter + ".png";
      secItem.url = "https://kde.link/test/" + counter + ".png";
      inImages.push(item);
      inImages.push(secItem);
      counter++;
    }
    inImages.shuffle = function () {
      return this.sort(function () {
        return 0.5 - Math.random();
      });
    };
    inImages.shuffle(); // randomize input images

    counter = 0;
    for (var i = 0; i < data.height; i++) { // build table with images
      html += "<tr>";
      for (var j = 0; j < data.width; j++) {
        html += "<td><img src=" + inImages[counter].url + "></td>";
        counter++;
      }
      html += "</tr>";
    }
    $(".grid").html(html);
    $("td").append("<div>?</div>");

    counter = 0;
    $(".grid").on("click", "td", function (e) {

      if (timer || e.target.tagName === "IMG") { // prevent more than two open images
        return;
      }; 
      
      if (e.target.tagName === "DIV") {
        var td = e.target.parentNode;
        choises.push(td);
        $(td.lastElementChild).hide();
        if (choises.length === 2) {
          timer = true;
          result = choises[0].childNodes[0].currentSrc === choises[1].childNodes[0].currentSrc;
          console.log(result);
          if (!result) {
            setTimeout(function () {
              $(choises[0].lastElementChild).show();
              $(choises[1].lastElementChild).show();
              choises = [];
              timer = false;
            }, 1000);
          } else {
            choises = [];
            timer = false;
            counter += 2;
          }
        }
        console.log(counter);
        if (counter === imagesNum) { //play again ?
          var playAgain = confirm("Victory !!! Play again ?");
          if (playAgain) {
            counter = 0;
            buildTable();
          }
        }
      }

    });
  });
}
buildTable();
