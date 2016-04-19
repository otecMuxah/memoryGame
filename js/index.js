function buildTable() {
  var inImages = [],
    index, tableSize, result,
    choises = [],
    html = "",
    counter = 0;

  $.getJSON('https://kde.link/test/get_field_size.php', function (data) {
    tableSize = data;
    console.log(tableSize);
    var imagesNum = tableSize.width * tableSize.height;

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
    inImages.shuffle();

    counter = 0;
    for (var i = 0; i < tableSize.height; i++) { // build table with images
      html += "<tr>";
      for (var j = 0; j < tableSize.width; j++) {
        html += "<td><img src=" + inImages[counter].url + "></td>";
        counter++;
      }
      html += "</tr>";
    }
    $(".grid").html(html);
    $("td").append("<div calss='hider'>?</div>");

    
    $(".grid td").click(function (e) {
      $(this).addClass("selected");
      choises.push(e.currentTarget);
      console.log(choises);
      $(e.currentTarget.lastElementChild).hide();
      setTimeout (function (){
        if (choises.length === 2) {
          result = choises[0].childNodes[0].currentSrc === choises[1].childNodes[0].currentSrc;
          console.log(result);
          if (!result) {
            $(choises[0].lastElementChild).show();
            $(choises[1].lastElementChild).show();
            choises = [];
          } else {
            $(choises[0]).off("click");
            $(choises[1]).off("click");
            choises = [];
          }
        }
      }, 1000);
    });
  });
}
buildTable();