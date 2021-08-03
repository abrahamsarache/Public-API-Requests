const gallery = document.getElementById('gallery');
const body = document.querySelector('body');

//Retrieves data from API
const data = fetch('https://randomuser.me/api?results=12')
    .then(res => res.json())
    .then(data => data.results)
    .then((users) => {return users})
    .catch((error) => {
        console.error('Error:', error)});

const loadUsers = data.then(user => addMembers(user));

//Creates the members
function addMembers(users){

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

    </div>`).join('');

    return gallery.insertAdjacentHTML('beforeend', html);
}

//Helper function to format the modal window
function formatBirthday(birthdayData){
     //Regex for birthday
     const birthdayRegex = /^(\d{4})-(\d+)-(\d+)(\w\d+\W\d+\W\d+\W\d+\w)$/;
     const birthday = birthdayData.replace(birthdayRegex, '$2/$3/$1');
     return birthday;
}

function formatCell(cellData){
    //Regex for cell phone
    const cellRegex = /[^0-9]/g;
    const removeNoNumbers = cellData.replace(cellRegex, '');
    const onlyNumbersRegex = /(\d{3})(\d{3})(\d+)/;//(XXX) XXX-XXXX
    const newCell = removeNoNumbers.replace(onlyNumbersRegex, '($1) $2-$3');
    return newCell;
}

//Event listener to detect any clicks on gallery
gallery.addEventListener('click', (event)=>{
        
    const divCards = document.querySelectorAll('.card')

        for (let i=0; i<divCards.length; i++){
            const card = divCards[i];
            const cardData = card.querySelectorAll('div, img, p, h3');
            
            if(event.target !== gallery){
                
                //Retrieve data for Modal window
                const modalWindow = () =>{ data.then(user => showModal(user))};
                
                //Create HTML for Modal window
                function showModal(users){
                    const birthdayData = users.map(user => user.dob.date)[i];
                    const birthday = formatBirthday(birthdayData);

                    const cellData = users.map(user => user.cell)[i];
                    const newCell = formatCell(cellData);
                    
                    const html = users.map (user =>
                        `<div class="modal-container">
                            <div class="modal">
                                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                                <div class="modal-info-container">
                                    <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                                    <p class="modal-text">${user.email}</p>
                                    <p class="modal-text cap">${user.location.city}</p>
                                    <hr>
                                    <p class="modal-text">${newCell}</p>
                                    <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}</p>
                                    <p class="modal-text">Birthday: ${birthday}</p>
                            </div>
                        </div>`)[i];

                    return body.insertAdjacentHTML('beforeend', html);
                }
              
                
                for(let i=0; i<cardData.length; i++){

                    if(event.target === cardData[i]){
                        
                    //Creates the modal window
                    async function generateModal(){
                        await modalWindow(); 
                        
                        const closeButton = await document.getElementById('modal-close-btn');
                        const modalContainer = await document.querySelector('.modal-container');
                    
                        //Remove modal window
                        closeButton.addEventListener('click', (e) => {
                            modalContainer.remove();
                        });   
                    }

                    generateModal(); 
                    }
                }
        }
    }
})