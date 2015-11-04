Snap.plugin(function (Snap, Element, Paper) {
  Paper.prototype.multitext = function (x, y, txt, maxWidth, attributes) {

    var charWidth = function (c) {
      var svg = Snap();
      var temp = svg.text(0, 0, c).attr(attributes);
      var result = temp.getBBox().width;
      svg.remove();
      return result;
    };

    var splitLine = function (line) {
      var space_width = charWidth('a b') - charWidth('ab');
      var words = line.split(' ');
      var width_so_far = 0,
        current_line = 0,
        lines = [''];

      for (var i = 0; i < words.length; i++) {
        //console.log(words[i]);
        var word_width = 0;
        words[i].split('').forEach(function (c) {
          word_width += charWidth(c);
        });

        // console.log((width_so_far + word_width) + ' > ' + max_width);
        if (width_so_far + word_width >= maxWidth) {
          lines.push(words[i] + ' ');
          lines[current_line] = lines[current_line].trim();
          current_line++;
          width_so_far = word_width + space_width;
          continue;
        }

        width_so_far += word_width + space_width;
        lines[current_line] += words[i] + ' ';
      }

      lines[current_line] = lines[current_line].trim();
      return lines;
    };

    var lineHeight = 1.2;
    var lines = [];
    var tempLines = txt.split("\n");
    for (var i = 0; i < tempLines.length; i++) {
      lines = lines.concat(splitLine(tempLines[i]));
    }

    //console.log(lines);
    var multitext = this.text(x, y, lines).attr(attributes);
    multitext.selectAll("tspan:nth-child(n+2)").attr({
      dy: `${lineHeight}em`,
      x: x
    });
    multitext.selectAll("tspan").attr({
      dominantBaseline: 'text-before-edge'
    });
    multitext.node.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");

    var xTranslate = 0;

    if (attributes['text-anchor'] == 'middle') {
      xTranslate = maxWidth / 2;
    } else if (attributes['text-anchor'] == 'end') {
      xTranslate = maxWidth;
    }

    var fontSize = parseInt(attributes['font-size'].replace('px', ''));
    multitext.transform(`t${xTranslate},0`);

    return multitext;
  };
});