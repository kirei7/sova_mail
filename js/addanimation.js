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
        target.prepend(entry.line);

    });
};

AnimCreator.prototype.createPlainAnimation = function (target, distance, sideLength, top, left, selfScrollable, axis) {

    var square = this.createSquare(axis, distance, top, left, sideLength);
    var line = this.createLine(square, axis, distance, left, sideLength);

    if(!selfScrollable) {
        square.removeClass("scrollme");
        line.removeClass("scrollme");

        square.attr("data-when", "span");
        line.attr("data-when", "span");
    }
    return new Animation(line, square, target);

};

AnimCreator.prototype.createLine = function (square, axis, distance, left, sideLength) {
    var line = this.blankLine.clone();
    line.attr("data-scale" + axis, distance);
    line.attr("data-translate" + axis, distance/2);
    var marginLeft;

    if (left > 0) marginLeft = parseFloat(square.css("left")) - sideLength/4;
    else marginLeft = parseFloat(square.css("left")) + sideLength/4;
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

function Animation(line, square, target) {
    this.line = line;
    this.square = square;
    this.target = target;
}

    var creator = new AnimCreator();
    creator.run();
