rect = {
    area: (x,y) => (x*y),
    perimeter: (x,y) => (2*(x*y))
}

function solveRect(l,b) {
    console.log("Solving for the rectangle with l: " + l + "b:" + b);

    if(l <= 0 || b <= 0){
        console.log("Invalid input");
    }else

    console.log("Area of rectangle is" + rect.area(l, b));
    console.log("perimeter of rectangle is" + rect.perimeter(l, b));
}

solveRect(3,4);
