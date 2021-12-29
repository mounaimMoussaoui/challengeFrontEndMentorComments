let content = JSON.parse(`{
    "currentUser": {
      "image": { 
        "png": "./images/avatars/image-juliusomo.png",
        "webp": "./images/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo"
    },
    "comments": [
      {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "user": {
          "image": { 
            "png": "./images/avatars/image-amyrobson.png",
            "webp": "./images/avatars/image-amyrobson.webp"
          },
          "username": "amyrobson"
        },
        "replies": [
          {
            "id": 15,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "2 week ago",
            "score": 4,
            "replyingTo": "amyrobson",
            "user": {
              "image": { 
                "png": "./images/avatars/image-ramsesmiron.png",
                "webp": "./images/avatars/image-ramsesmiron.webp"
              },
              "username": "mounaim"
            }
          }
        ]
      },
      {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "user": {
          "image": { 
            "png": "./images/avatars/image-maxblagun.png",
            "webp": "./images/avatars/image-maxblagun.webp"
          },
          "username": "maxblagun"
        },
        "replies": [
          {
            "id": 3,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "user": {
              "image": { 
                "png": "./images/avatars/image-ramsesmiron.png",
                "webp": "./images/avatars/image-ramsesmiron.webp"
              },
              "username": "ramsesmiron"
            }
          },
          {
            "id": 4,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": { 
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
              },
              "username": "juliusomo"
            }
          }
        ]
      }
    ]
  }
`);

function setInform(array) {
  if(array[5] == 1 && array.length == 6) {
    document.getElementById("comment1").id = array[5];
    document.querySelector('p.para').textContent = array[0]
    document.querySelector('img.user').src = array[4];
    document.querySelector('form input[type="text"]').value = array[1];
    document.querySelector('span.name').textContent = array[3];
    document.querySelector('span.nbr-jour-comment').textContent = array[2];
    updateScore((array[5]));
  } else {
      let comnt = document.getElementById('1').cloneNode(true);
      comnt.children[0].children[1].value = array[1];
      if(array.length === 10) {
        array[6].length ? comnt.classList.add("replying") : comnt.classList.add("user");
        if(array[6].includes("@") || array[6] == "") {
          comnt.children[1].children[1].innerHTML = `<span class="replying">${array[6]}</span> ${array[0]}`;
        } else {
          comnt.children[1].children[1].innerHTML = `<span class="replying">@${array[6]}</span> ${array[0]}`;
        }
      } else {
          comnt.children[1].children[1].textContent = array[0];
      }
      comnt.children[1].children[0].children[0].src = array[4];
      if(array[3] == content["currentUser"]["username"]) {
          comnt.classList.add("current");
          comnt.children[1].children[0].children[1].innerHTML = `${array[3]} <span class="current">you</span>`;
          comnt.children[1].children[0].children[3].innerHTML = `<img src=${array[7]} alt="icon"> Delete`;
          comnt.children[1].children[0].children[3].className = "delete";
          comnt.children[1].children[0].innerHTML += `<span class="edit"><img src=${array[8]} alt="icon"> Edit</span>`;     
      } else {
          comnt.children[1].children[0].children[1].textContent = array[3];
      }
      comnt.children[1].children[0].children[2].textContent = array[2];
      if(comnt.classList.contains("replying")) {
        comnt.id = array[5] + '-' +(`reply`);
      } else {
        comnt.id = array[5];
      }
      if(array[1] != 0) {
        if(comnt.classList.contains("replying")) {
          let ownerReplying = document.getElementById(array[9]);
          if(ownerReplying.nextElementSibling == null) {
            let divConatReplying = document.createElement("div");
            divConatReplying.className = "containerReplying";
            divConatReplying.append(comnt)
            ownerReplying.after(divConatReplying);
            updateScore(array[5] + '-' +(`reply`));
          }
          else {
            ownerReplying.nextElementSibling.append(comnt);
            updateScore(array[5] + '-' +(`reply`));
          }
        } else {
          document.querySelector("div.container div.containerReplying").after(comnt);
          updateScore((array[5]));
        }
      } else if(array[5] == ("userReplying-"+array[9])) {
        document.querySelector("div.container .userReplying").before(comnt);
        edit(-1,(array[5]));
        deleteUserComment();
        updateScore(array[5]);
      } else {
        !isNaN(array[9]) ? document.getElementById(array[5]).nextElementSibling.append(comnt) : document.getElementById(array[5]).after(comnt);
      }
  }
}

content.comments.forEach(el => {
    setInform([el.content, el.score, el.createdAt, el.user.username, el.user.image.webp, el.id]);
    if(el.replies.length > 0) {
        el.replies.forEach(e => {
            let arrUser = [e.content, e.score, e.createdAt, e.user.username, e.user.image.webp, e.id, e.replyingTo,"../images/icon-delete.svg","../images/icon-edit.svg",el.id];
            setInform(arrUser);
            if(arrUser[3] == content["currentUser"]["username"]) {
              editCurrent(-1, (e.id+ '-' +(`reply`)));
            }
        })
    }
});

function updateScore(id) {
  let btnsPuls = document.querySelectorAll(".comment form img[alt='+']");
  let btnsMins = document.querySelectorAll(".comment form img[alt='-']");
  for(let j = 0; j < btnsPuls.length; j++) {
    console.log(btnsPuls[j].parentElement.parentElement.id);
    if(id == btnsPuls[j].parentElement.parentElement.id) {
      btnsPuls[j].addEventListener("click", function(event) {
        event.currentTarget.parentElement.children[1].value = `${parseInt(event.currentTarget.parentElement.children[1].value) + 1}`;
      });
      break;
    }
}
  for(let j = 0; j < btnsMins.length; j++) {
      console.log(btnsMins[j].parentElement.parentElement.id);
      if(id == btnsMins[j].parentElement.parentElement.id) {
        btnsMins[j].addEventListener("click", function(event) {
          if(parseInt(event.currentTarget.parentElement.children[1].value) > 0) {
            event.currentTarget.parentElement.children[1].value = `${parseInt(event.currentTarget.parentElement.children[1].value) - 1}`;
          }
        });
        break;
      }
  }
}

function addReplyComment(box, id, userName) {
  let btn = box.children[1].children[1];
  btn.addEventListener("click", function(event) {
    let text = box.children[1].children[0].value;
    let arrUser = [text.slice(text.indexOf(',',0) + 1), 0, "1 second ago", userName, box.children[0].src, id, text.slice(0,text.indexOf(',',0) + 1),"../images/icon-delete.svg","../images/icon-edit.svg",id];
    setInform(arrUser);
    box.remove();
    edit(-1,(id+ '-' +(`reply`)));
    deleteUserComment();
    updateScore((id+ '-' +(`reply`)));
    event.preventDefault();
  });
}

function addUserComments(reply, id) {
  let src = [content["currentUser"].image.webp];
  let cont = document.createElement("div");
  let form = document.createElement("form");
  let textarea = document.createElement("textarea");
  let inputSend = document.createElement("input");
  let img = document.createElement("img");
  textarea.setAttribute("placeholder","Add a comment...");
  inputSend.setAttribute("type","submit");
  inputSend.setAttribute("value","send");
  form.append(textarea,inputSend);
  img.setAttribute("src",src);
  img.setAttribute("alt","photo user");
  cont.className = "userReplying";
  cont.append(img,form);
  if(reply == "" && id == 0) {
    document.querySelector("div.container").append(cont);
  } else {
    let divComment = document.getElementById(id);
    cont.children[1].children[1].value = `REPLY`;
    cont.children[1].children[0].value = `@${divComment.children[1].children[0].children[1].textContent}, `;
    if(!isNaN(id)) {
      cont.classList.add("min-div-comment");
      divComment.nextElementSibling.append(cont);
    } else {
      cont.classList.add("min-div-comment");
      divComment.after(cont);
    }
    addReplyComment(cont, id, content["currentUser"]["username"]);
  }
}

addUserComments("",0);

let btnSend = document.querySelector(".container .userReplying form input[type='submit']"), compt = 0;
btnSend.addEventListener("click", function(event) {
  let text = document.querySelector(".container .userReplying form textarea").value;
  document.querySelector(".container .userReplying form textarea").value = "";
  user = content["currentUser"]["username"];
  compt++;
  let arrSend  = [text.slice(text.indexOf(',',0) + 1), 0, "1 second ago", user, event.currentTarget.parentElement.parentElement.children[0].src, `${event.currentTarget.parentElement.parentElement.classList[0]}-${compt}`, "", "../images/icon-delete.svg","../images/icon-edit.svg",compt];
  setInform(arrSend);
  event.preventDefault();
});

let commentRep = document.querySelectorAll("div.header-comment span.Reply");
commentRep.forEach((el) => {
  let cpt = -1;
  el.addEventListener("click", function(event) {
      cpt++;
      if(cpt == 0) {
        addUserComments("Replay", el.parentElement.parentElement.parentElement.id);
      } else {
        event.preventDefault();
      }
    });
});

function updateComment(comment) {
  let updatebtn = comment.children[1].children[1].children[1];
  updatebtn.addEventListener("click", function(event) {
    let text = comment.children[1].children[1].children[0].value;
    comment.children[1].children[2].innerHTML = `${text}`;
    comment.children[1].children[2].style.display = `block`;
    event.currentTarget.parentElement.style.display = 'none';
    event.preventDefault();
  });
}

function editComment(compt, parent) {
  let commntCurrent = parent;
  if(compt == 0 ) {
    let para = commntCurrent.children[1].children[1];
    let form = document.createElement("form");
    let updatebtn = document.createElement("input");
    let textArea = document.createElement("textarea");
    updatebtn.setAttribute("type","submit");
    updatebtn.setAttribute("value","UPDATE");
    textArea.value = `${para.textContent}`;
    form.append(textArea,updatebtn);
    commntCurrent.children[1].children[0].after(form);
    para.style.display = "none";
    updateComment(commntCurrent);
  } else if(compt > 0) {
    let para = commntCurrent.children[1].children[2];
    commntCurrent.children[1].children[1].style.display = "";
    commntCurrent.children[1].children[1].children[0].value = `${para.textContent}`;
    para.style.display = "none";
    updateComment(commntCurrent);
  }
}

function editCurrent(cptCurrent, id) {
  let editBtn = document.querySelectorAll("div.current div.header-comment span.edit");
  for(let i = 0; i < editBtn.length; i++) {
    if(editBtn[i].parentElement.parentElement.parentElement.id == id && editBtn[i] == editBtn[editBtn.length - 1]) {
      editBtn[i].addEventListener("click", function(event) {
        cptCurrent += 1;
        editComment(cptCurrent, event.currentTarget.parentElement.parentElement.parentElement);
        // console.log(id, editBtn[i].parentElement.parentElement.parentElement, cptCurrent);
      });
      break;
    }
  }
}

function edit(cptRepFun, id) {
  let editBtn = document.querySelectorAll("div.current div.header-comment span.edit");
    console.log(editBtn, false);
    for(let i = 0; i < editBtn.length; i++) {
    if(editBtn[i].parentElement.parentElement.parentElement.id == id) {
      editBtn[i].addEventListener("click", function(event) {
          cptRepFun += 1;
          editComment(cptRepFun, event.currentTarget.parentElement.parentElement.parentElement);
          // console.log(id, editBtn[i].parentElement.parentElement.parentElement, cptRepFun);
      });
      break;
    } 
  }
}

function deleteComment(boxDel,boxComment) {
  boxDel.children[2].children[0].addEventListener("click", function(ev) {
    boxDel.classList.remove("show");
    boxDel.previousElementSibling.style.opacity = 1;
    ev.preventDefault();
  });
  boxDel.children[2].children[1].addEventListener("click", function(ev) {
      boxDel.previousElementSibling.style.opacity = 1;
      boxDel.classList.remove("show");
      boxComment.remove();
      ev.preventDefault();
  });
}

function deleteUserComment() {
let deleteBtn = document.querySelectorAll("div.current div.header-comment span.delete");
let boxDelete = document.querySelector("div.deleteBox");
  deleteBtn.forEach((delBtn) => {
      delBtn.addEventListener("click", function() {
        boxDelete.classList.add("show");
        boxDelete.previousElementSibling.style.opacity = 0.2;
        deleteComment(boxDelete,delBtn.parentElement.parentElement.parentElement);
    });
  });
}

deleteUserComment();