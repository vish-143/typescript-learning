// Type Assertion:

// let color
// color="Red"
// let result=(color as string).endsWith("d")
// console.log(result)

//Interface:

// interface Points {
//   x: number;
//   y: number;
//   z: number;
// }
// const graph = (points: Points) => {
//   console.log(points.x);
// };
// graph({ x: 1, y: 3, z: 7 });

//Class

// class Point {
//   x: number;
//   y: number;
//   z: number;
//   draw = (): any => {
//     console.log("X", this.x, "Y", this.y, "Z", this.z);
//   };
//   drawRectangle: () => {
//     draw();
//   };
// }

// let object = new Point();
// object.x = 5;
// object.y = 10;
// object.draw();

// let object2 = new Point();
// object2.x = 15;
// object2.y = 20;
// object2.draw();


//Constructor

class Point{
    private x:number
    y:number
    z:number
    constructor(x:number,y:number,z:number){
        this.x=x
        this.y=y
        this.z=z
    }
    draw=():any=>{
        console.log("X", this.x, "Y", this.y, "Z", this.z);
    }
}
const object=new Point(2,3,4)
// object.x=200
object.draw()