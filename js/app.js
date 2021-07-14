const gallery = document.getElementById('gallery');


const users = fetch('https://randomuser.me/api?results=12')  //
    .then(res => res.json())
    .then(data => data.results)
    .then(users => addMembers(users))

function addMembers(users){
console.log(users);
 const html = users.map (user => `
    <div class="card">

        <div class="card-img-container">
            <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
        </div>

        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>

    </div>`)

   // console.log(user.name.first);

    return gallery.insertAdjacentHTML('beforeend', html);
 
}

/*
use the response data to display 12 users, along with some basic information for each:
Image
First and Last Name
Email
City or location*/

