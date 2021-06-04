// selector
const postInputUI = document.querySelector('#tweet-text')
const itemGroup = document.querySelector('.collection')
const submitBtn = document.querySelector('.btn-submit')
const searchInput = document.querySelector('#search')
const errorMsg = document.querySelector('.error-msg')

let tweetData = []

// add tweet
submitBtn.addEventListener('click', addTweet)
function addTweet() {
  let data = {}
  let id
  if (tweetData.length === 0) {
    id = 0
  } else {
    id = tweetData[tweetData.length - 1].id + 1
  }
  data.id = id
  data.text = postInputUI.value

  if (data.text.length > 0 && data.text.length < 250) {
    tweetData.push(data)
  }

  if (postInputUI.value.length <= 0 || postInputUI.value.length > 250) {
    errorMsg.style.display = 'block'
    postInputUI.value = ''
  } else {
    itemGroup.innerHTML = ''
    displayData()
    errorMsg.style.display = 'none'
  }
}

// delete tweet
itemGroup.addEventListener('click', deleteTweet)
function deleteTweet(e) {
  if (e.target.classList.contains('dlt-tweet')) {
    let target = e.target.parentElement
    target.remove()
    let id = parseInt(target.id.split('-')[1])

    let filteredTweetData = tweetData.filter(elem => {
      return elem.id !== id
    })
    tweetData = filteredTweetData
  }
}

// search tweet
searchInput.addEventListener('keyup', searchTweet)
function searchTweet(e) {
  let items = Array.from(itemGroup.children)
  items.forEach(item => {
    if (item.firstElementChild.textContent.indexOf(e.target.value) !== -1) {
      item.style.display = 'block'
    } else {
      item.style.display = 'none'
    }
  })
}

// x.forEach(y => console.log(y.firstElementChild.textContent))

// display data
function displayData() {
  tweetData.forEach(tweet => {
    const { id, text } = tweet
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

//some modification from Live class

// function saveDataToLocalStorage(item){
// let items = ''
// if(localStorage.getItem('tweetData') === null){
//   items = []
// } else{
//   let items = JSON.parse(localStorage.getItem('tweetData'))
// }
// }
