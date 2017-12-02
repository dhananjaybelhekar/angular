function show1(data,cb){
   //console.log("show1 end");
   return cb(data);
}
function show2(data,cb){
   //console.log("show2 end");
   return  cb(data);
}
function show3(data,cb){
   data.show1.show2.show3 = 301;
   return data;
   //console.log("show3 end",data);
  // return cb(data);
}
function main(data,cb){
    return show1(data,function(data){
        data.show1 = {};
       return  show2(data,function(data){
        data.show1.show2 = {};
           return  show3(data,cb);
        })
    })
}
var arr=[];
for(var i=0;i<1000;i++)
arr.push(main({number:i},function(){ console.log("all DONE")})) 
console.log(arr);