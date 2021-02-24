function SObject(){
}
SObject.$__classes = {};
SObject.prototype.$__type = 'SObject';
SObject.$__classes['SObject'] = SObject;

SObject.ObjectReviver = function(k,v){
    if(v['$__type']){
        let self = new SObject.$__classes[v['$__type']]();
        return Object.assign(self,v);
    }
    return v;
}
SObject.prototype.toJSON = function(){
    let add = {
        $__type:this.__proto__.$__type
    };
    
    return Object.assign(this,add);
}
SObject.define = function(name,parent,constructor,staticFields){
    if(!parent){
        parent = SObject;
    }
    let SOConstructor = function(){
        parent.call(this);
        constructor.call(this);
    }
    SOConstructor.prototype = Object.create(parent.prototype);
    if(staticFields){
        Object.assign(SOConstructor.prototype,staticFields);
    }
    SOConstructor.prototype.$__type = name;
    SOConstructor.prototype.constructor = SOConstructor;
    SObject.$__classes[name] = SOConstructor;
    return SOConstructor;
}