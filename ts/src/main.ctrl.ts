import { default as User } from "./sub";
export let save =()=> {
	var kitty = new User({ name: 'Zildjian' });
	kitty.save(function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log('meow');
	  }
	});	
}