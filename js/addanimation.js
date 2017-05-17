function AnimCreator() {
    this.blankSquare = $(".reusable>.square-green").clone();
    this.blankLine = $(".reusable>.animate-line").clone();

/*
    function createPlainAnimation(target, distance, sideLength) {

    }
*/

}

AnimCreator.prototype.run = function () {
    var animations = this.getAnimations();
    this.addAnimatedObjectsToPage(animations)
};


/*Here we defining coordinates and size for each animated square and line*/
AnimCreator.prototype.getAnimations = function () {
    var animations = [];

    //for main
    animations.push(
        this.createPlainAnimation(
            $("#main"),
            56,
            10,
            200,
            null,
            true,
            "y"
        )
    );

    //for features
    $("#features-list>li").each(function (index) {
        animations.push(
        creator.createPlainAnimation(
            $(this),
            35,
            8,
            null,
            20,
            false,
            "y"
        )
        )
    });

    //for details
    animations.push(
        this.createPlainAnimation(
            $("#details-header"),
            145,
            21,
            95,
            250,
            true,
            "x"
        )
    );
    animations.push(
        this.createDoubleLinedFigure(
            $("#reminders"),
            113,
            130,
            "right",
            135
        )
    );
    animations.push(
        this.createDoubleLinedFigure(
            $("#filemanager"),
            113,
            340,
            "left",
            110
        )
    );
    animations.push(
        this.createDoubleLinedFigure(
            $("#emailaccounts"),
            113,
            100,
            "right",
            110
        )
    );

    //for gallery
    animations.push(
        this.createPlainAnimation(
            $("#gallery-header"),
            145,
            21,
            95,
            250,
            true,
            "x"
        )
    );

    return animations;
};

AnimCreator.prototype.addAnimatedObjectsToPage = function (animations) {
    animations.forEach(function (entry) {
        var target = entry.target;
        target.prepend(entry.square);
        var lines = entry.lines;
        for (var i = 0; i < lines.length; i++) {
            target.prepend(lines[i]);
        }

    });
};

AnimCreator.prototype.createPlainAnimation = function (target, distance, sideLength, top, left, selfScrollable, axis) {

    var square = this.createSquare(axis, distance, top, left, sideLength);
    var line = this.createLine(square, axis, distance);

    if(!selfScrollable) {
        square.removeClass("scrollme");
        line.removeClass("scrollme");

        square.attr("data-when", "span");
        line.attr("data-when", "span");
    }

    var lines = [line];
    return new Animation(lines, square, target);

};

AnimCreator.prototype.createDoubleLinedFigure = function (target, top, left, position, hlength) {
    var square = this.blankSquare.clone();
    square.removeClass("animateme", "scrollme");
    square.css("width", 10);
    square.css("height", 10);
    square.css("top", top);
    square.css("left", left);

    var hlineDist = hlength;
    var mleft;
    var mtop = 25;
    if (position == "right") {
        hlineDist = -hlength;
        mleft = -20;
    } else mleft = 20;
    var hline = this.createLine(square, "x", hlineDist);
    var vline = this.createLine(square, "y", 40);

    mleft += parseFloat(hline.css("left"));
    hline.css("left", mleft);
    mtop += parseFloat(vline.css("top"));
    vline.css("top", mtop);
    var centeringCorrection = parseFloat(vline.css("left"));
    vline.css("left", centeringCorrection + 1);

    return new Animation([hline,vline], square, target);
};

AnimCreator.prototype.createLine = function (square, axis, distance) {
    var line = this.blankLine.clone();
    var marginLeft = parseFloat(square.css("left"));
    var sideLength = parseFloat(square.css("width"));
    line.attr("data-scale" + axis, distance);
    line.attr("data-translate" + axis, distance/2);


    if (marginLeft > 0) marginLeft  -= sideLength/4;
    else marginLeft += sideLength/4;
    line.css("left", marginLeft);

    var marginTop = parseFloat(square.css("top"));
    if (axis == "x") marginTop += sideLength/2;
    line.css("top", marginTop);

    return line;
};

AnimCreator.prototype.createSquare = function (axis, distance, top, left, sideLength) {
    var square = this.blankSquare.clone();
    square.attr("data-translate" + axis, distance);
    square.css("width", sideLength);
    square.css("height", sideLength);

    if (top == null) {
        square.css("top", "auto");
    }
    else {
        square.css("top", top);
    }

    if (left == null) {
        square.css("left", "auto");
    }
    else {
        square.css("left", left);
    }

    return square;
};

AnimCreator.prototype

function Animation(lines, square, target) {
    this.lines = lines;
    this.square = square;
    this.target = target;
}

    var creator = new AnimCreator();
    creator.run();
