function run(cb)
{
    var data={
  a1:(cb)=>{
    console.log("end a1");
    cb();
  },
  a2:(cb)=>{
    console.log("end a2");
    cb();
  },
  a3:(cb)=>{
    console.log("end a3");
      cb();
    }
};

data.a1(()=>{
  data.a2(()=>{
    data.a3(cb)
  })
});

}

run(()=>{ 
  console.log("all DONE")
})