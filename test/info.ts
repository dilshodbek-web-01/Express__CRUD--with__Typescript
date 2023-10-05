/*

TypeScript Special Types
    - any
    - unknown
    - never
    - void

Generic


readonly



any vs unknown
    const a: any = 'a'; // OK
    const b: unknown = 'b' // OK
    const v1: string = a; // OK
    const v2: string = b; // ERROR
    const v3: string = b as string; 


never vs void
    let x: string|never = undefined; // error: Type 'undefined' is not assignable to type 'string'.(2322)
    let y: string|void = undefined;  // ok




*/