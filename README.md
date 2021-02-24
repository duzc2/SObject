# SObject
a very simple OOP for JavaScript with serialization/deserialization ablity.

## define class
SObject.define(className,parentClassConstructor,initFunction,staticFieldOrMethod);
return constructor
#### example
```
let AClass = SObject.define("AClass");

let BClass = SObject.define("BClass",AClass);

let CClass = SObject.define("CClass",BClass,
    function(){
      this.name = 'Anyone';
    });
let DClass = SObject.define("DClass",CClass,
    function(){},{
        sayHello(){
            console.log('hello '+this.name);
        }
    })


    let d = new DClass();
    d.sayHello();// hello Anyone


        let json = JSON.stringify(d);
        let d1 = JSON.parse(json,SObject.ObjectReviver);
        d1.sayHello();// hello Anyone
        d1.name = 'Petter';
        d1.sayHello();//hello Petter
        d.sayHello();// hello Anyone

```