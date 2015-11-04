function draw(node, width, height, text) {
  var margin = width * 20 / 513;
  var snap = Snap(node).attr({
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: 'xMidYMid',
    space: "preserve",
    fill: "#F00F00"
  });

    var url = 'http://res.cloudinary.com/team9canvas/image/upload/022_picture_tqljq2';
    var image = snap.image(url, 0, 0, width, height).attr({
      id: 'image',
      preserveAspectRatio: 'xMidYMid slice'
    });


    var group = snap.g();
    var textBox = group.multitext(0, 0, 'lots of FOG: ' + text, width - margin * 2, {
      fill: "#FFFFFF",
      "font-size": `${Math.round(width * 60 / 513)}px`,
      "font-family": "gothamrnd-medium",
      "text-anchor": "start"
    });


    group.transform(`t${margin},${margin}`);

};