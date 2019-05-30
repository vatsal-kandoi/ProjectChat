
var findMatch = (data, keys) => {
    let key = "None";
    keys.forEach(element => {
        let arr1=element.split(" ");
        let arr2=data.split(" ");
        let i=0;
        arr1.forEach(elem => {
            arr2.forEach(elem2 => {
                if(elem == elem2) i+=1;
            });
        });
        if(i==arr1.length){
            key = element;
        }
    });
    return key;
}

module.exports = { findMatch }