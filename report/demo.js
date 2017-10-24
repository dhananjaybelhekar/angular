var add = function(a,b){
    return a+b;
}
var sub = function(a,b){
    return a-b;
}
var mul = function(a,b){
    return a*b;
}
function show(a,b,cb)
{
   return  cb(a,b);
}

console.log(show(5,10,add));
console.log(show(5,10,sub));
console.log(show(5,10,mul));

var x=function(){
    this.data=0;
    this.show=function(){
        console.log(this.data);
    }
}
console.log(new x().show());
var x={
    data:10,
    show:function (d){
        console.log("show",d*this.data);
    }
    
}


console.log('d', x.show(45));;



function dis(val,cb){
    cb(val,cb);
}
var cb= function(val,cb){ 
    console.log(val);
    val = val +1;
    if(val  < 10 )
        cb(val,cb); 
};
dis(0,cb);


function showasd(cb){
    cb(cb);
}

showasd(function(d){ 
    d(d);
});