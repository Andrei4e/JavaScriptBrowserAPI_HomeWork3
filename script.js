const urlGetRandomPhoto = "https://api.unsplash.com/photos/random/?client_id=4tnOawZmaoHCWSMk5MBqrnv-HbDId2cTPjTrYXkG3yQ";
const contentEl = document.querySelector(".content");
let currentFoto;
let likeList = JSON.parse(localStorage.getItem("likeImg"));

const getImg = () => {
    return fetch(urlGetRandomPhoto)
        .then(data => data.json())
        .then(foto => {return foto})
};

const showImg = (img) => {
    const imgString =
    `
    <div class="photo">
        <img src="${img.urls.small}">
    </div>
    <div class="autor">
        <div>Фотограф: ${img.user.name}</div>
        ${img.user.location ?
            `<div>Страна: ${img.user.location}</div>` : ""}        
        ${img.user.instagram_username ?
            `<div>Instagram: ${img.user.instagram_username}</div>` : ""}
    </div>
    <button class="likeButton">Лайк</button>
    <span class="likes">${img.likes}</span>
    `
    return imgString
};

const init = async () => {
    try {
        currentFoto = await getImg();
        const html = await showImg(currentFoto);
        contentEl.insertAdjacentHTML("beforebegin", html);
        if (localStorage.getItem("likes")) {
            let likes = JSON.parse(localStorage.getItem("likes"));
            if (likes.includes(currentFoto.id)) {
                localStorage.setItem("likes", JSON.stringify([...likes, currentFoto.id]));
                const likeEl = document.querySelector(".likes");
                likeEl.style.color = "blue";
                likeEl.textContent = Number(likeEl.textContent) + 1;
            }
        }

        if (localStorage.getItem("fotos")){
            let fotos = JSON.parse(localStorage.getItem("fotos"));
            localStorage.setItem("fotos", JSON.stringify([...fotos, currentFoto]));
        } else {
            localStorage.setItem("fotos", JSON.stringify([currentFoto]));
        }
        
    } catch (error) {
        alert(error);
    }
};

init();

document.addEventListener('click', async function (e) {
    if (e.target.className === "likeButton") {
        if (!localStorage.getItem("likes"))
            localStorage.setItem("likes", JSON.stringify([]));
        let likes = JSON.parse(localStorage.getItem("likes"));
        if (!likes.includes(currentFoto.id)) {
            localStorage.setItem("likes", JSON.stringify([...likes, currentFoto.id]));
            const likeEl = document.querySelector(".likes");
            likeEl.style.color = "blue";
            likeEl.textContent = Number(likeEl.textContent) + 1;
        } else {
            localStorage.setItem("likes", JSON.stringify([...likes.filter(l => l !== currentFoto.id)]));
            const likeEl = document.querySelector(".likes");
            likeEl.style.color = "";
            likeEl.textContent = Number(likeEl.textContent) - 1;
        }
    }
});

