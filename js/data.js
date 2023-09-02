let arr = [];
const handleButton = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await response.json();
  console.log(data.data);

  const btnContainer = document.getElementById("btn-container");

  data.data.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <a onclick ="loadData('${category.category_id}')"   class="btn active:bg-[#FF1F3D] ">${category.category}</a>
        
        `;
    btnContainer.appendChild(div);
  });
  
};

function secondsToHoursMinutes(seconds) {
  const hours = Math.floor(seconds / 3600); 
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60); 

  return `${hours} hours ${minutes} minutes`+' ago';
}

const loadData = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await response.json();
  arr = data.data;
  handleCategory(arr);
};

const sortData = () => {
  const sorted = arr.sort((a, b) => {
    return (
      parseFloat(b.others.views.split("K")[0]) -
      parseFloat(a.others.views.split("K")[0])
    );
  });
  handleCategory(sorted);
};

const handleCategory = async (data) => {
  

  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (data.length === 0) {
    cardContainer.innerHTML = `
        <div class="justify-center items-center">
        
           <div class="flex justify-center items-center">
            <img src="images/Icon.png" alt="">
           </div>
           <h1 class="text-2xl text-center">Oops!! Sorry, There is no content here.</h1>
        
       </div>
        `;
    return;
  }

  data.forEach((news) => {
    
    const div = document.createElement("div");
    div.classList = `card w-80 bg-gray-100 shadow-xl`;
    div.innerHTML = `
            <div class="relative mt-5">
             <figure> <img class="rounded h-[200px] w-[300px]" src="${
               news?.thumbnail
             }"/>
            
             </figure>
             ${
               news?.others?.posted_date &&
               `<h5 class=" absolute mr-5 mb-3 bottom-0 right-0 bg-black text-white">${secondsToHoursMinutes(
                 news?.others?.posted_date
               )}</h5>`
             }

            </div>
            
 
            <div class="card-body flex-row">
                    
                <div>
                    <img class="h-12 w-12 rounded-full" src="${
                      news?.authors[0]?.profile_picture
                    }"/>
                </div>    
                
                    
                <div class="">

                                <h1 class="font-semibold text-[20px]">${
                                  news?.title
                                }</h1>
                            <div class="flex items-center gap-2"> 
                            <p class=" text-[16px] font-normal ">${
                              news?.authors[0]?.profile_name
                            }</p>

                            <p>${
                              news?.authors[0]?.verified
                                ? '<img class="flex-1" src="images/fi_10629607.svg ">'
                                : ""
                            }</p>

                            </div>
                                
                            <p class="text-[16px]">${
                              news?.others?.views
                            } views</p>
  
                </div>

            </div> `;

    cardContainer.appendChild(div);
  });
};

handleButton();
loadData("1000");