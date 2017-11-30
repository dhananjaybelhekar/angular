arr=[{foo:4545},{foo:121},{foo:1},{foo:3,bar:'sdf'},{foo:2,bar:'sdf'},{foo:9,bar:'sdf'}]
arr.sort(function(a,b){ return a.foo - b.foo; });
arr.filter(function(d){ if(d.bar != undefined && d.bar=="sdf") return d }).sort(function(a,b){ return a.foo - b.foo; });
console.log('Z',arr)
