var rect = require('./rectangle');
function solveRect(l,b) {
    console.log("Solving for the rectangle with l: " + l + "b:" + b);

    rect(l,b,(err,rectangle) => {
        if (err) {
            console.log(err);
        } else
        {
            console.log("Ther area and perimeter is " + rectangle.area() + "  " + rectangle.perimeter());
        }
    });
    console.log("After the call to rect");
}

solveRect(3,4);

