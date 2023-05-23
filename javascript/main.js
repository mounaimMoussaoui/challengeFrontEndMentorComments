function thePlusReaction(e) {
  let theLastRec = +e.target.nextSibling.textContent;
  e.target.parentElement.childNodes[1].textContent = `${theLastRec + 1}`;
  // console.log(e.target.parentElement.childNodes[1].textContent, theLastRec);
}

function theMinusReaction(e) {
  let theLastRec = +e.target.previousSibling.textContent;
  e.target.parentElement.childNodes[1].textContent = `${theLastRec - 1}`;
  // console.log(e.target.parentElement.childNodes[1].textContent, theLastRec);
}

//create replies Comments 
function addRepliesComment(arrReplies = [], idOwner, currentUser) {
  //create container for replies 
  let theContainerReplies = document.createElement("div");
    theContainerReplies.className = "container-replies";
    theContainerReplies.classList.add(`container-replies-${idOwner}`);
    document.getElementById(idOwner).after(theContainerReplies);
    arrReplies.forEach((el) => {
       //create the Parent of the all elements commenter
        let theBoxComment = document.createElement("div");
        theBoxComment.className = "box-comment";
        theBoxComment.setAttribute("id", `${el.id}`);
        
        if(el.user.username === currentUser.username)
          theBoxComment.classList.add("currentUser");

        // create the reaction parte of the box
        let theSpan = document.createElement("span");
        theSpan.className = "comment-reaction";

        //create text node for the span
        let textSpan = document.createTextNode(`${el.score}`);

        let plusImg = document.createElement("img");
        plusImg.src = "images/icon-plus.svg";
        plusImg.alt = "img plus";
        plusImg.id = `imgPlus${el.id}`;
        let minusImg = document.createElement("img");
        minusImg.src = "images/icon-minus.svg";
        minusImg.alt = "img minus";
        minusImg.id = `imgMinus${el.id}`;

        //add all the elements to the Parent
        theSpan.append(plusImg, textSpan, minusImg);

        //create the content for box commenter
          ///header
          let ownerImg = document.createElement("img");
          ownerImg.src = `${el.user.image.webp}`;
          ownerImg.alt = "owner Comment";
          ownerImg.className = "ownerImg";
          let ownerName = document.createElement("span");
          ownerName.className = "name";
          ownerName.innerHTML = `${el.user.username}`;
          let dateSpan = document.createElement("span");
          dateSpan.className = "dateComment";
          dateSpan.innerHTML = `${el.createdAt}`;
        
        //create parent of content header
        let headComment = document.createElement("div");
        headComment.className = "headComment";
        
        if(el.user.username === currentUser.username) {
          let current = document.createElement("span");
          current.className = "current";
          current.innerHTML = "you";
          headComment.append(ownerImg, ownerName, current, dateSpan);
        } else {
          ///add elements header to parent
          headComment.append(ownerImg, ownerName, dateSpan);
        }
          ///Content
          let textContent = document.createElement("p");
          textContent.id ="ReplyComment";
          textContent.innerHTML = `<span class="replyTo">@${el.replyingTo}</span>,  ${el.content}`;
        
        //parent of the elements the content
        let contentComment = document.createElement("div");
        contentComment.className ="content-Comment";
        contentComment.append(headComment, textContent);

        if(el.user.username === currentUser.username) {
          //Create buttons DELETE & EDIT 
          let theBtnContainer = document.createElement("div");
          theBtnContainer.className = "controls-btn";
            ///icon DELETE
            let imgDelete = document.createElement("img");
            imgDelete.src = "images/icon-delete.svg";
            imgDelete.alt = "img Delete";
            ///icon EDIT
            let imgEdit = document.createElement("img");
            imgEdit.src = "../images/icon-edit.svg";
            imgEdit.alt = "img Edit";
          //create Buttons elements and add to him our content
          let btnDelete = document.createElement("button");
            btnDelete.type = "button";
            btnDelete.className = "btn-delete";
          let btnEdit = document.createElement("button");
            btnEdit.type = "button";
            btnEdit.className = "btn-edit";
          //Create text buttons 
          let textBtnDel = document.createTextNode("Delete");
          btnDelete.append(imgDelete, textBtnDel);
          //Create text buttons 
          let textBtnEdit = document.createTextNode("Edit");
          btnEdit.append(imgEdit, textBtnEdit);
          //Add buttons to him parent
          theBtnContainer.append(btnDelete, btnEdit);

          //add all elements of Comments to the his parent
          theBoxComment.append(theSpan, contentComment, theBtnContainer);
        } else {
          //create button Reply and him content
          let btnReply = document.createElement("button");
          btnReply.type = "button";
            ///icon reply
            let imgReply = document.createElement("img");
            imgReply.src = "images/icon-reply.svg";
            imgReply.alt = "img Reply";
            ///text node the button
            let textBtn = document.createTextNode("Reply");

          btnReply.append(imgReply, textBtn);
          //add all elements of Comments to the his parent
          theBoxComment.append(theSpan, contentComment, btnReply);
        }
        document.querySelector(`.container-replies-${idOwner}`).appendChild(theBoxComment);
        document.getElementById(`imgPlus${el.id}`).onclick = (e) => thePlusReaction(e);
        document.getElementById(`imgMinus${el.id}`).addEventListener("click", (e) => theMinusReaction(e));
    });
}

function removeOrCancel(boxDelete) {
  document.querySelectorAll("#boxDeleteComment button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      if(e.currentTarget.classList.contains("btn-delete")) {
        document.getElementById("boxDeleteComment").classList.remove("show");
        boxDelete.remove();
      } else if(e.currentTarget.classList.contains("btn-cancel")) {
        document.getElementById("boxDeleteComment").classList.remove("show");
      }
    })
  });;
}

//button remove owner comments or Replies
function deleteButtons(arrBtn) {
  arrBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.getElementById("boxDeleteComment").classList.add("show");
      removeOrCancel(e.currentTarget.parentElement.parentElement);
      // e.currentTarget.parentElement.parentElement.remove();
    });
  });
}

/*gets the edited content and put him in the paragraph and remove
  the form edit and give the access to owner for edit another times*/
function updateContentComment(e) {
  let theContentComment = document.getElementById("textContentEdit");
  let replyingTo = theContentComment.getAttribute("data-replyingTo");
  e.currentTarget.parentElement.children[1].innerHTML = `<span class="replyTo">${replyingTo}</span> ${theContentComment.value.slice(replyingTo.length)}`;
  e.currentTarget.parentElement.children[1].style.display = "block";
  e.currentTarget.parentElement.classList.remove("inTheEditing");
  theContentComment.remove();
  e.target.remove();
}
//prepare the form for editing comment the owner user
function editButtons(arrBtnEdit) {
  arrBtnEdit.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const theEleContent = e.currentTarget.parentElement.previousElementSibling;

      if(theEleContent.classList.contains("inTheEditing")) 
        return 0;

      const theEleContentComment = theEleContent.children[1];
      let replyingTo = theEleContentComment.children[0].textContent;
      const textArea = document.createElement("textarea");
            textArea.name = "contentEdit";
            textArea.width = "100%";
            textArea.height = "100%";
            textArea.cols = "80";
            textArea.rows = "6";
            textArea.setAttribute("data-replyingTo", `${replyingTo}`);
            textArea.value = theEleContentComment.textContent;
            textArea.className = "text-edit";
            textArea.id = "textContentEdit";
      const theUpdateBtn = document.createElement("button");
            theUpdateBtn.className = "btn-update";
            theUpdateBtn.type ="button";
            theUpdateBtn.textContent = "UPDATE";
            theUpdateBtn.id = "btnUpdateComment";
      theEleContentComment.style.display = "none";
      theEleContent.append(textArea, theUpdateBtn);
      theEleContent.classList.add("inTheEditing");
      document.getElementById("btnUpdateComment").onclick = (e) => updateContentComment(e);
    });
  });
}

//create comments add them to the container 
function createComment(arrComments = [], currentUser) {
  arrComments.forEach((el) => {
    //create the Parent of the all elements commenter
    let theBoxComment = document.createElement("div");
    theBoxComment.className = "box-comment";
    theBoxComment.setAttribute("id", `${el.id}`);

    // create the reaction parte of the box
    let theSpan = document.createElement("span");
    theSpan.className = "comment-reaction";

    //create text node for the span
    let textSpan = document.createTextNode(`${el.score}`);

    let plusImg = document.createElement("img");
    plusImg.src = "images/icon-plus.svg";
    plusImg.alt = "img plus";
    plusImg.id = `plusImg${el.id}`;
    let minusImg = document.createElement("img");
    minusImg.src = "images/icon-minus.svg";
    minusImg.alt = "img minus";
    minusImg.id = `minusImg${el.id}`;
    //add all the elements to the Parent
    theSpan.append(plusImg, textSpan, minusImg);

    //create the content for box commenter
      ///header
      let ownerImg = document.createElement("img");
      ownerImg.src = `${el.user.image.webp}`;
      ownerImg.alt = "owner Comment";
      ownerImg.className = "ownerImg";
      let ownerName = document.createElement("span");
      ownerName.className = "name";
      ownerName.innerHTML = `${el.user.username}`;
      let dateSpan = document.createElement("span");
      dateSpan.className = "dateComment";
      dateSpan.innerHTML = `${el.createdAt}`;
    //create parent of content header
      let headComment = document.createElement("div");
      headComment.className = "headComment";
      ///add elements header to parent
      headComment.append(ownerImg, ownerName, dateSpan);
      ///Content
      let txtareaContent = document.createElement("p");
      txtareaContent.id ="ReplyComment";
      txtareaContent.innerHTML = `${el.content}`;
    
    //parent of the elements the content
    let contentComment = document.createElement("div");
    contentComment.className ="content-Comment";
    contentComment.append(headComment, txtareaContent);

    //create button Reply and him content
    let btnReply = document.createElement("button");
    btnReply.type = "button";
      ///icon reply
      let imgReply = document.createElement("img");
      imgReply.src = "images/icon-reply.svg";
      imgReply.alt = "img Reply";
      ///text node the button
      let textBtn = document.createTextNode("Reply");

    btnReply.append(imgReply, textBtn);
    //add all elements of Comments to the him parent
      theBoxComment.append(theSpan, contentComment, btnReply);
      ///add all box Comment to the parent Container
      document.querySelector(".owner-form-reply").before(theBoxComment);
      document.getElementById(`plusImg${el.id}`).onclick = (e) => thePlusReaction(e);
      document.getElementById(`minusImg${el.id}`).addEventListener("click", (e) => theMinusReaction(e));
      ///add replies it's exists
      if(el.replies.length > 0) {
        addRepliesComment(el.replies, el.id, currentUser);
      // add Event click to the buttons Delete And Edit
        ////get all buttons Edit exist
        const arrBtnDeletes = document.querySelectorAll(".box-comment .controls-btn .btn-delete");
        ///Invoked func Delete
        deleteButtons(arrBtnDeletes);
        ////get all buttons Edit exist
        const arrBtnEdit = document.querySelectorAll(".box-comment .controls-btn .btn-edit");
        ///Invoked func Edit
        editButtons(arrBtnEdit);
    }
  });
}

//create new Comments for the current user 
function currentAddComment(newComment = {}) {
    //create the Parent of the all elements commenter
    let theBoxComment = document.createElement("div");
    theBoxComment.className = "box-comment";
    theBoxComment.classList.add("currentUser");
    // create the reaction parte of the box
    let theSpan = document.createElement("span");
    theSpan.className = "comment-reaction";
    //create text node for the span
    let textSpan = document.createTextNode("0");
    let plusImg = document.createElement("img");
    plusImg.src = "images/icon-plus.svg";
    plusImg.alt = "img plus";
    plusImg.id = `imgPlus${newComment.id}`;
    let minusImg = document.createElement("img");
    minusImg.src = "images/icon-minus.svg";
    minusImg.alt = "img minus";
    minusImg.id = `imgMinus${newComment.id}`
    //add all the elements to the Parent
    theSpan.append(plusImg, textSpan, minusImg);
    //create the content for box commenter
      ///header
      let ownerImg = document.createElement("img");
      ownerImg.src = `${newComment.img}`;
      ownerImg.alt = "owner Comment";
      ownerImg.className = "ownerImg";
      let ownerName = document.createElement("span");
      ownerName.className = "name";
      ownerName.innerHTML = `${newComment.username}`;
      let dateSpan = document.createElement("span");
      dateSpan.className = "dateComment";
      dateSpan.innerHTML = `${newComment.createdAt}`;
    //create parent of content header
    let headComment = document.createElement("div");
    headComment.className = "headComment";
    let current = document.createElement("span");
    current.className = "current";
    current.innerHTML = "you";
    headComment.append(ownerImg, ownerName, current, dateSpan);
      ///Content
      let textContent = document.createElement("p");
      textContent.id ="ReplyComment";
      textContent.innerHTML = `<span class="replyTo">${newComment.replyTo}</span> ${newComment.content}`;
    //parent of the elements the content
    let contentComment = document.createElement("div");
    contentComment.className ="content-Comment";
    contentComment.append(headComment, textContent);
    //Create buttons DELETE & EDIT 
    let theBtnContainer = document.createElement("div");
    theBtnContainer.className = "controls-btn";
      ///icon DELETE
      let imgDelete = document.createElement("img");
      imgDelete.src = "images/icon-delete.svg";
      imgDelete.alt = "img Delete";
      ///icon EDIT
      let imgEdit = document.createElement("img");
      imgEdit.src = "../images/icon-edit.svg";
      imgEdit.alt = "img Edit";
    //create Buttons elements and add to him our content
    let btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.className = "btn-delete";
    let btnEdit = document.createElement("button");
    btnEdit.type = "button";
    btnEdit.className = "btn-edit";
    //Create text buttons 
    let textBtnDel = document.createTextNode("Delete");
    btnDelete.append(imgDelete, textBtnDel);
    //Create text buttons 
    let textBtnEdit = document.createTextNode("Edit");
    btnEdit.append(imgEdit, textBtnEdit);
    //Add buttons to him parent
    theBtnContainer.append(btnDelete, btnEdit);
    //add all elements of Comments to the his parent
    theBoxComment.append(theSpan, contentComment, theBtnContainer);

    document.querySelector(".owner-form-reply").before(theBoxComment);
    document.getElementById(`imgPlus${newComment.id}`).onclick = (e) => thePlusReaction(e);
    document.getElementById(`imgMinus${newComment.id}`).addEventListener("click", (e) => theMinusReaction(e));
    // add Event click to the buttons Delete And Edit
      ////get all buttons delete exist
      const arrBtnDeletes = document.querySelectorAll(".box-comment .controls-btn .btn-delete");
      ///Invoked func Delete
      deleteButtons(arrBtnDeletes);
      ////get all buttons Edit exist
      const arrBtnEdit = document.querySelectorAll(".box-comment .controls-btn .btn-edit");
      ///Invoked func Edit
      editButtons(arrBtnEdit);
}

//calc the time passed before created the comments
// function calcDateCreated() {
//   let dateCreates = new Date();
//   let milDateCreates = Date.parse(dateCreates);
//   let date = 0;
//   let createdAT = "";
//   let countDateOfComment = setInterval(() => {
//     let dateNow = Date.now();
//     date = dateNow - milDateCreates;
//     let leftTime = Math.round(date / 1000);

//     if(leftTime < 60) {
//       createdAT = `${leftTime} s`;
//     } else if((leftTime / 60) < 60 ) {
//       createdAT = `${Math.trunc(leftTime / 60)} M`;
//     }  else if((leftTime / 120) < 24 ) {
//       createdAT = `do have ${Math.trunc(leftTime / 120)} Hour`;
//     }

//   }, 1000);
//   return createdAT;
// }

function AddContentCommentReply(e) {
  //get the text Area next to the button Clicked
  let textContentComment = e.currentTarget.previousElementSibling.children[0];
  let replyingTo = textContentComment.getAttribute("data-replyingTo");
  if(textContentComment.value.trim() === "" || textContentComment.value === replyingTo)
    return 0;

  let theCountCommentBox = document.querySelectorAll(".box-comment").length;
  const newComment = {
    id:  theCountCommentBox + 1,
    img:"images/avatars/image-juliusomo.webp",
    username: "juliusomo",
    createdAt: "now",
    content: textContentComment.value.slice(replyingTo.length),
    replyTo: replyingTo,
  }

  currentAddComment(newComment);
  textContentComment.value = "";
  //get value the box comment if below him exist a box reply
  if(textContentComment.getAttribute("id").startsWith("contentReplyComment")) {
    //remove the box reply
    textContentComment.parentElement.parentElement.remove();
    //remove the class for give to the user add new reply box if him want
    const theCommentBox = document.querySelector("div.box-comment.have-replayBox");
    theCommentBox.classList.remove("have-replayBox");
  }
}

let btnSend = document.getElementById("btnSend");
btnSend.onclick = (e) => AddContentCommentReply(e);

//Add Reply Form gave to an owner permission to put his reply on they comment 
function createReplay(listBtn) {
  listBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
      //get the parent => (box comment) of the clicked button
      const theParentBtn = e.currentTarget.parentElement;
      /* search in the list class the comment-box if has it this 
      class the reply box is exist under the comment box */ 
      if(theParentBtn.classList.contains("have-replayBox")) 
        return 0;
      
      const replyTo = `@${theParentBtn.children[1].children[0].children[1].textContent}`;
      const thIdParent = theParentBtn.getAttribute("id");
      const theReplyBox = document.querySelector(".owner-form-reply").cloneNode(true);
      theReplyBox.classList.add(`comment-reply-${thIdParent}`);
      theReplyBox.children[1].children[0].id = `contentReplyComment${thIdParent}`;
      theReplyBox.children[1].children[0].value = replyTo;
      theReplyBox.children[1].children[0].setAttribute("data-replyingTo", replyTo);
      theReplyBox.children[2].value = "REPLY";
      theReplyBox.children[2].id = `btnReplyComment${thIdParent}`;
      theParentBtn.after(theReplyBox);
      theParentBtn.classList.add("have-replayBox");
      document.getElementById(`btnReplyComment${thIdParent}`).onclick = (e) => AddContentCommentReply(e);
    });
  });
}

// get data with fetch Method
fetch("./data.json")
.then((res) => {
  return res.json();
})
.then((data) => {
  // console.log(data);
  createComment(data.comments, data.currentUser);
  //after create the box comment get all buttons reply 
  const listBtnReplies = document.querySelectorAll("div.box-comment > button");
  createReplay(listBtnReplies);
});