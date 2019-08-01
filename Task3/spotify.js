/*const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)*/


	var distance=0;
	var total;
	var queue=[];
	
function start()
{
	distance=0;
	total=0;
	var name1=document.getElementById("artist1").value;
	var search1=name1.replace(/ /g, '+');
	var name2=document.getElementById("artist2").value;
	var search2=name2.replace(/ /g, '+');
	
	var id1=artist_id(search1);
	var id2=artist_id(search2);
	//console.log("id1",id1);
	//console.log("id2",id2);
	related(id1,id2);
	
}
function artist_id(name)
{

var result;
var data;
var request = new XMLHttpRequest();
request.open('GET', 'https://api.spotify.com/v1/search?q='+name+'&type=artist&limit=1', false)
request.onreadystatechange = function() {
  // Begin accessing JSON data here

  if (this.readyState==4 && this.status==200) {
	    data = JSON.parse(this.responseText);
		//console.log("data",data);
		result=data.artists.items[0].id;
		//console.log("result",result);
  }
}


request.setRequestHeader("Authorization", "Bearer BQBCsQCW4v58p8Nk8YL5CtR8xlP9hX2pvPzF-LH905iMP7fl7mEacEZ_BqlsldFRdnaxVOOjZJnXhnsKBkAewz76dyzNoJNJY1QFaCLmlplbZEew2XUwJkNRyOG78cR52tzVLp_J07fYhPxh0JVWfK26gOGkcCr63A");
request.send();
  //console.log("result2",data.artists.items[0].id);
  return result;

}

function related(id,reqId)
{
//console.log("related");
var request = new XMLHttpRequest()
request.open('GET', 'https://api.spotify.com/v1/artists/'+id+'/related-artists', true)
request.onreadystatechange = function() {
  // Begin accessing JSON data here

  if (this.readyState==4 && this.status==200) {
	    var data = JSON.parse(this.response);
		check(data,reqId);
  }
}


request.setRequestHeader("Authorization", "Bearer BQBCsQCW4v58p8Nk8YL5CtR8xlP9hX2pvPzF-LH905iMP7fl7mEacEZ_BqlsldFRdnaxVOOjZJnXhnsKBkAewz76dyzNoJNJY1QFaCLmlplbZEew2XUwJkNRyOG78cR52tzVLp_J07fYhPxh0JVWfK26gOGkcCr63A");
request.send();


}

function check(data,reqId)
{
	
//console.log("check");
	distance++;
	for(var i=0;i<data.artists.length;i++)
	{
		total++;
		//console.log(i,total);
		if(data.artists[i].id ==reqId)
		{
			console.log("minimum distance: ",distance);
			return distance;
		}
		else queue.push(data.artists[i].id);
	}
	
	var artistsId=queue.shift();
	if((total)!=20&&(total)!=400&&(total)!=8000&&(total)!=160000)
	{
	distance--;
	}
	console.log("current",distance);
	related(artistsId,reqId);
}


				  
			
