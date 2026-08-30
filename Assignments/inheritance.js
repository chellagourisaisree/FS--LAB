
//SINGLE inhertiance

class Animal{
    constructor(){
        this.sound="~animal sound~";
    }
    print_sound(){
        console.log(this.sound);
    }
}

class Cat extends Animal{
    constructor(){
        super();
        this.sound="~meow~";
    }
}

const c= new Cat();
c.print_sound();



//MULTI-LEVEL inheritance

class Animal{
    constructor(){
        this.sound="~animal sound~";
    }
    print_sound(){
        console.log(this.sound);
    }
}

class Cat extends Animal{
    constructor(){
        super();
        this.sound="~meow~";
    }
}

class Dog extends Cat{
    constructor(){
        super();
    }
}

const c= new Cat();
c.print_sound();
const d=new Dog();
d.print_sound();



//Hierarchical inheritance

class Animal{
    constructor(){
        this.sound="~animal sound~";
    }
    print_sound(){
        console.log(this.sound);
    }
}

class Cat extends Animal{
    constructor(){
        super();
        this.sound="~meow~";
    }
}

class Dog extends Animal{
    constructor(){
        super();
	this.sound="~bow bow~";
    }
}

const c= new Cat();
c.print_sound();
const d=new Dog();
d.print_sound();


//multiple inheritance

class Animal {
    print_sound() {
        console.log(this.sound);
    }
}

class Cat {
    meow() {
        this.sound = "~meow~";
    }
}

class Dog {
    bark() {
        this.sound = "~bow bow~";
    }
}

Object.assign(CatDog.prototype, Cat.prototype, Dog.prototype); //use of mixin

class CatDog extends Animal {
}

const c = new CatDog();

c.meow();
c.print_sound();

c.bark();
c.print_sound();





