const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/Register'
async function connectWithDB() {
	try {
		await mongoose.connect(DB_URL);
		console.log("connect with DataBase");
		const fetchData= await mongoose.connection.db.collection("price");
		const data =await fetchData.find({}).toArray();
		global.price = data;
		// console.log(global.price);
		let fetchRequest= await mongoose.connection.db.collection("requests");
		let request =await fetchRequest.find({}).toArray();
		global.request = request
	} catch(err) {
		console.log("Not connected with DataBase");
	}
}
 
 connectWithDB(); 