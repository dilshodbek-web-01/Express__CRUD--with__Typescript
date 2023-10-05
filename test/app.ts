
// function add(a:number, b:number):number{
//     return a + b 

// }

// console.log(a);
/*
let a:any = 12

a = true
a = 'text'



// type vs interface

type Ttext = string

let text:Ttext = 'text'


interface Itext2  {
    
}
let text2:Ttext = 'text'

console.log(user);
console.log(user2);

*/




/* readonly
interface IUser{
   readonly name: string;
    surname: string;
    age: number
}


let user: IUser= {
    name: 'Eshmat',
    surname: 'Toshmatov',
    age: 12
}

user.age = 34

*/
/*
const a: any = 'a'; // OK
    const b: unknown = 'b' // OK
    const v1: string = a; // OK
    const v2: string = b; // ERROR
    const v3: string = b as string; 

    */

/*
    let b:any = 'text'

    b = 12

    let a:number = b


    let x: string | never = 'text'; // error: Type 'undefined' is not assignable to type 'string'.(2322)
    let y: string | void = undefined;  // ok

*/

/*

let a:any = 'text';



let b = (a as string)
 let s = <number>a

console.log((<string>a).length);


*/



/*generic

type a<T> = T


let b:a<number> = 12
let c:a<string> = 'text'


let isBool: a<boolean> = true

*/


/*
Omit
interface Person {
    name: string;
    age: number;
    location?: string;
  }
  
  const bob: Omit<Person,  'location'> = {
    name: 'Bob',
    age: 12
};

console.log(bob);
*/


/* Pick
interface Person {
    name: string;
    age: number;
    location?: string;
  }
  
  const bob: Pick<Person, 'name' | 'age'> = {
    name: 'Bob',
    age: 12
    // `Pick` has only kept name, so age and location were removed from the type and they can't be defined here
  };

  console.log(bob);

  */

  /*

  type Primitive = string | number | boolean
let value: Exclude<Primitive, string> = true;

value = 12
value = 'text'

*/

/*
type PointGenerator = () => { x: number; y: number; };
const point: ReturnType<PointGenerator> = {
  x: 10,
  y: 20
};
*/


/*
type PointPrinter = (p: { x: number; y: number; }) => void;
const point: Parameters<PointPrinter>[0] = {
  x: 10,
  y: 20
};

console.log(point);

*/

interface Person {
    name: string;
    age: number;
  }
 
  function printPersonProperty(person: Person, property: keyof Person) {
    console.log(person);
    console.log(property);
    
  }
  let person = {
    name: "Max",
    age: 27
  };
  printPersonProperty(person, "name");


  








