function show(s,b,cb)
{
   return cb(s,b);
}
var add =function(d1,d2){
    return d1+d2;
};

x= show(8,5,add);
console.log(x)