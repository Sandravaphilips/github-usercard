/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardComponent(user) {
  const [div, img, div1, h3, p, p1, p2, p3, p4, p5, a] = ['div', 'img', 'div', 'h3', 'p', 'p', 'p', 'p', 'p', 'p', 'a' ]
  .map(element => document.createElement(element));

  div.classList.add('card');
  div1.classList.add('card-info');
  h3.classList.add('name');
  p.classList.add('username');

  img.setAttribute('src', user['avatar_url']);
  a.setAttribute('href', user.url);

  a.textContent = `${user.url}`;
  h3.textContent = `${user.login}`;
  p.textContent = user.login;
  p1.textContent = `Location: ${user.location}`;
  p2.innerHTML = `Profile: `;
  p3.textContent = `Followers: ${user.followers}`;
  p4.textContent = `Following: ${user.following}`;
  p5.textContent = `Bio: ${user.bio}`;
  

  p2.appendChild(a);
  div1.appendChild(h3);
  div1.appendChild(p);
  div1.appendChild(p1);
  div1.appendChild(p2);
  div1.appendChild(p3);
  div1.appendChild(p4);
  div1.appendChild(p5);
  div.appendChild(img);
  div.appendChild(div1);

  return div;

}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

axios.get('https://api.github.com/users/Sandravaphilips')
.then(response => {
  // debugger
  
  document.querySelector('.cards').appendChild(
    cardComponent(response.data)
  )
})
.catch(err => {
  // debugger
  console.log(err)
})

function followers(myApi) {
  axios.get(myApi)
  .then(response => {
    axios.get(response.data['followers_url'])
    .then(response => {
      response.data.forEach(follower => {
        document.querySelector('.cards').appendChild(
          cardComponent(follower))
      })
    }
      
    )
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}
// followersArray.forEach(follower => {
//   axios.get('https://api.github.com/users/' + follower)
//   .then(response => {
//   document.querySelector('.cards').appendChild(
//     cardComponent(response.data)
//   )
//   })
//   .catch(err => console.log(err))
// })

followers('https://api.github.com/users/Sandravaphilips');
