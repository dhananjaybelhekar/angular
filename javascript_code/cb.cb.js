function show1(cb){
   console.log("show1 end");
   cb();
}
function show2(cb){
   console.log("show2 end");
   cb();
}
function show3(cb){
   console.log("show3 end");
   cb();
}
function main(cb){

    show1(function(){
        show2(function(){
            show3(cb);
        })
    })
}
main(function(){ console.log("all DONE")})