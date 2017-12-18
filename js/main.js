$.ajax({
	Url: 'https://randomuser.me/api/',
	dataType: 'json',
	Success: function(data){
		Console.log(data);
	}
});
