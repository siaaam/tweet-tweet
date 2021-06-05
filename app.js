// selector
const  postInputUI = document.querySelector('#tweet-text')
const itemGroup = document.querySelector('.collection')
const submitBtn = document.querySelector('.btn-submit')
const searchInput = document.querySelector('#search')
const errorMsg = document.querySelector('.error-msg')

let char = document.querySelector('.char-counter')

postInputUI.addEventListener('keydown',charCounter)
// if i use keypress then backspace won't work.
function charCounter(e){
  let len = postInputUI.value.length
  char.textContent = len
  if(len <  250){
    char.textContent = len
  }
  if(len >= 250){
    e.preventDefault()
  }
}



// postInputUI.addEventListener('keyup',counterTracker)
// function counterTracker(e){
//   if(e.keyCode !== 8){
//   counter++
//   char.textContent = counter
//   }

//   if(e.keyCode === 8){
//     counter--
//     char.textContent = counter
//     }
//   e.preventDefault()
// }



let tweetData = getDataFromLS()

// display data
displayData()
function displayData(){
  tweetData.forEach(tweet => {
    const {id,text} = tweet
    let li = document.createElement('li')
  li.className = 'list-group-item collection-item'
  li.id = `tweet-${id}`
  let p = document.createElement('p')
  p.textContent = text
  li.append(p)
  let button = document.createElement('button')
  button.className = 'btn btn-danger dlt-tweet float-right'
  button.textContent = 'Delete'
  li.append(button)
  itemGroup.append(li)
  postInputUI.value = ''
  })
}

// add tweet
submitBtn.addEventListener('click',addTweet)
function addTweet(){
    let data = {}
    let id;
    if(tweetData.length === 0){
      id = 0
    } else {
      id = tweetData[tweetData.length - 1].id + 1
    }
    data.id = id
    data.text = postInputUI.value

    if(data.text.length>0 && data.text.length < 250){
      tweetData.push(data)
      saveDataToLocalStorage(data)
    }

  if(postInputUI.value.length <= 0 || postInputUI.value.length > 250){
    showErrorMsg('Enter Text Between 1-250')
    postInputUI.value = '';
    setTimeout(function(){
      location.reload();
    }, 3000);
  } else {
    itemGroup.innerHTML = ''
    displayData()
    document.querySelector('.error-msg').style.display = 'none'
  }
}

// delete tweet
itemGroup.addEventListener('click',deleteTweet)
function deleteTweet(e){
  if(e.target.classList.contains('dlt-tweet')){
    let target = e.target.parentElement
    target.remove()
    let id = parseInt(target.id.split('-')[1])
    

  deleteDataFromLS(id)
  }
}

// search tweet
searchInput.addEventListener('keyup',searchTweet)
function searchTweet(e){
let items = Array.from(itemGroup.children)
items.forEach(item => {
  if(item.firstElementChild.textContent.indexOf(e.target.value) !== -1){
    item.style.display = 'block'
  }
  else{
    item.style.display = 'none'
  }
})
}

// x.forEach(y => console.log(y.firstElementChild.textContent


// get data from local storage
function getDataFromLS(){
  let items = ''
  if(localStorage.getItem('tweetDataLS') === null){
    items = []
  } else {  
  items = JSON.parse(localStorage.getItem('tweetDataLS'))
  }
  return items
}


// save data to local storage
function saveDataToLocalStorage(item){
let items = ''
if(localStorage.getItem('tweetDataLS') === null){
  items = []
  items.push(item)
  localStorage.setItem('tweetDataLS',JSON.stringify(items))
} else{
  items = JSON.parse(localStorage.getItem('tweetDataLS'))
  items.push(item)
  localStorage.setItem('tweetDataLS',JSON.stringify(items))
}
}

//  delete data from local storage
function deleteDataFromLS(id){
  let items = JSON.parse(localStorage.getItem('tweetDataLS'))
  let result = items.filter((product)=>{
    return product.id !== id  
  })
    localStorage.setItem('tweetDataLS',JSON.stringify(result))
}

function showErrorMsg(text){
  // <div class="alert alert-danger error-msg" role="alert">enter text between 1-250 characters!
  //   </div>
  let div = document.createElement('div')
  div.className  = "alert alert-danger error-msg"
  div.setAttribute('role','alert')
  div.textContent = text

  document.querySelector('.search-tweet').appendChild(div)

}
