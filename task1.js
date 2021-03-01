const axios = require('axios');
const customLog = require('./task3');

let get_msg = "";
let delete_msg = "";
let post_msg = "";
let put_msg = "";
let patch_msg = "";

let logging = "";

class fetcher {
	async Get(url) {
		await axios.get(url)
			.then(response => {
				get_msg = response.data;
				console.log(get_msg);
			})
			.catch(error => {
				get_msg = "Get Error : " + error;
				console.log("Get Error : " + error);
			});
	}

	async Delete(url) {
		await axios.delete(url)
			.then(response => {
				delete_msg = "Data sudah terhapus";
				console.log(delete_msg);
			})
			.catch(error => {
				delete_msg = "Delete Error : " + error; 
				console.log("Delete Error : " + error);
			});
	}

	async Post(url, data) {
		await axios.post(url, data)
			.then(response => {
				post_msg = "Data sudah dipost";
				console.log(post_msg);
			})
			.catch(error => {
				post_msg = "Post Error : " + error;
				console.log("Post Error : " + error);
			});
	}

	async Put(url, data) {
		await axios.put(url, data)
			.then(response => {
				put_msg = "Data sudah diupdate";
				console.log(put_msg);
			})
			.catch(error => {
				put_msg = "Put Error : " + error;
				console.log("Put Error : " + error);
			});
	}

	async Patch(url, data) {
		await axios.patch(url, data)
			.then(response => {
				patch_msg = "Data sudah dipatch";
				console.log(patch_msg);
			})
			.catch(error => {
				patch_msg = "Patch Error : " + error;
				console.log("Patch Error : " + error);
			});
	}

	async WriteLog() {
		logging = JSON.stringify(get_msg) + "\n" + delete_msg + "\n" + post_msg + "\n" + put_msg + "\n" + patch_msg;
		customLog.setLogTask1(logging);
	}
}

const Fetcher = new fetcher();

const JsonResponse = async () => {
	var getJsonResponse = await Fetcher.Get("https://httpbin.org/get");
	var deleteJsonResponse = await Fetcher.Delete("https://httpbin.org/delete");

	var jsonData ={
		"id": 30,
		"name": "Someone"
	  };

	var postJsonResponse = await Fetcher.Post("https://httpbin.org/post", jsonData);
	var putJsonResponse = await Fetcher.Put("https://httpbin.org/put", jsonData);
	var patchJsonResponse = await Fetcher.Patch("https://httpbin.org/put", jsonData);

	var write_log = await Fetcher.WriteLog();
};

JsonResponse();