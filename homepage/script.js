fetch('./assets/json/data.json')
    .then((response) => response.json())
    .then((json) => {
        const list = json.data;
        console.log( list)
        list.map((item)=>{
            document.getElementById("games").innerHTML+= `
            <div class="card">
            <a href="${item.link}">
            <div class="developer">
              <div class="avatar">
                <img
                  src="${item.developer_avatar}"
                />
              </div>
              <div class="name">${item.developer_name}</div>
            </div>
            <div class="thumbnail">
              <img src="${item.thumbnail}"/>
            </div>
            <div class="game_heading">${item.name}</div>
            <div class="about">
            ${item.about}
            </div>
            </a>
          </div>`
        })
       
    });