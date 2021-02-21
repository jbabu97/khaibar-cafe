const warningMessage = document.getElementById('warning_message');
const findFood = document.getElementById('find_btn');
findFood.addEventListener('click', () => {
    const searchField = document.getElementById('search_input').value;

    if (searchField === '') {
        warningMessage.style.display = 'block';
    } else {
        getFood(searchField);
        document.getElementById('search_input').value = '';
        warningMessage.style.display = 'none';
    }      
});

document.getElementById('search_input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        findFood.click();
    }
});

const getFood = (name) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayFood (data.meals);
    })
};

const displayFood = foods => {
    const foodContainer = document.getElementById('food_container');
    foodContainer.innerHTML = ''
    foods.map(food => {
        const foodDiv = document.createElement('div');
        foodDiv.className ="col-md-6 col-lg-3";
        foodDiv.innerHTML = `
                    <div onclick="getIngredients(${food.idMeal})" class="single_food h-100"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid food_img" src="${food.strMealThumb}" alt="">
                        <h2>${food.strMeal}</h2>
                    </div>
            `;
            foodContainer.appendChild(foodDiv);
    })
};

const getIngredients = foodInfo => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodInfo}`;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayDetails(data.meals[0]);
    })
    
}

const displayDetails = ingredients => {
    const foodDetails = document.getElementById('food_details');
    foodDetails.innerHTML = `
            <div class="mx-auto mt-5">
                <div class="single_food food_details">
                    <img class="img-fluid food_img single_img" src="${ingredients.strMealThumb}" alt="">
                    <h2>${ingredients.strMeal}</h2>
                    <div class="ingredients">
                    <h2>Ingredients</h2>
                    <ul>
                          <li>${ingredients.strIngredient1}</li>                          
                          <li>${ingredients.strIngredient2}</li>                          
                          <li>${ingredients.strIngredient3}</li>                          
                          <li>${ingredients.strIngredient4}</li>                          
                          <li>${ingredients.strIngredient5}</li>                          
                          <li>${ingredients.strIngredient6}</li>                          
                          <li>${ingredients.strIngredient7}</li>                          
                          <li>${ingredients.strIngredient8}</li>                          
                          <li>${ingredients.strIngredient9}</li>                          
                          <li>${ingredients.strIngredient10}</li>                          
                    </ul>
                    </div>
                </div>
            </div>
        `;
}