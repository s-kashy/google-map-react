export default class SingletonClass {
    static position = 0
    static createInstance() {
        var object = new SingletonClass();
        return object;
    }
    static savePosition = (tempPosition) => {
        if (!SingletonClass.instance) {
     
            SingletonClass.position = SingletonClass.createInstance();
        }
        SingletonClass.position = tempPosition
    }

    static getPosition() {
        return SingletonClass.position
    }
}
