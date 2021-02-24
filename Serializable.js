
let Serializable = function (clazz) {
    clazz.prototype.toJSON = function () {
        this.$__type = this.__proto__.constructor.name;
        return this;
    }
    Serializable.SerializableClasses[clazz.name] = clazz;
};
Serializable.SerializableClasses = {};
let Deserializer = function (k, v) {
    if (v['$__type']) {
        let className = v['$__type'];
        let constructor = Serializable.SerializableClasses[className];
        if(!constructor){
            throw Error('class "'+className +'" can\'t be deserialized.' );
        }
        let self = new constructor();
        return Object.assign(self, v);
    }
    return v;
}