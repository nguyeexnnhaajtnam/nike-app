async function getDataFromSV(Url) {
	let res = await fetch(Url);
	let data = await res.json();
	return data;
}
// SHOW DATA
window.onload = async function showData() {
	let data = await getDataFromSV('https://raw.githubusercontent.com/GoldenOwlAsia/webdev-intern-assignment/main/app/data/shoes.json');
	const cardBodyContent = document.getElementById('body-content');
	// mấy chổ dùng index ửo đây thì thay bằng item.id thôi
	data.shoes.map((item, index) => {
		cardBodyContent.innerHTML += `
            <div class="item-detail">
                <div class="item-img" style="background-color: ${item.color}">
                    <img src="${item.image}" alt="">
                </div>
                <div class="item-name">
                    <p class="h5">${item.name}</p>
                </div>
                <div class="item-describe">${item.description}</div>
                <div class="item-bottom d-flex justify-content-between align-items-center">
                    <p class="h5">$${item.price}</p>
                    <button onclick="handleAdd(${item.id},${index})" id="add-btn${item.id}" type="button" class="btn btn-warning box-shadow-hover">
                        <p>ADD TO CART</p>
                    </button>
                    <div id="check-btn${item.id}" class="rounded-circle bg-warning p-2 d-none"><img src="assets/img/check.png" alt="" style="width: 30px;"></div>
                </div>
            </div>
`;
	});
};
// Giả bộ hàm này: handleAdd. đang truyền vô index nè, thay index = item.id là dc
// RENDER DATA
function renderData(data) {
	let content = '';

	data.forEach((item, index) => {
		// mấy chổ dùng index ửo đây thì thay bằng item.id thôi
		content += `
            <div class="cart-item d-flex">
                <div class="cart-item-left">
                    <div class="cart-item-img" style="background-color: ${item.color}">
                        <img src="${item.image}" alt="">
                    </div>
                </div>
                <div class="cart-item-right">
                    <div class="cart-item-name">
                        <p class="h5">${item.name}</p>
                    </div>
                        <div class="cart-item-price">
                            <p class="h5">$${item.price}</p>
                    </div>
                    <div class="cart-item-bottom d-flex align-items-center justify-content-between">
                        <div class="cart-item-count d-flex align-items-center">
                            	<button type="button" class="minus-btn${item.id} btn btn-light rounded-circle">-</button>
                                <div class="cart-item-countnumber count-field${item.id}">1</div>
                                <button type="button" class="plus-btn${item.id} btn btn-light rounded-circle">+</button>
                        </div>
                        <div class="cart-item-remove">
                            <button onclick="handleDelete(${item.id})" id="remove-btn${item.id}" type="button" class="btn btn-warning rounded-circle"><img
                                src="assets/img/download.png" alt="" style="width: 15px;"></button>
                        </div>
                    </div>
                </div>
            </div>
`;
	});
	cartBodyContent.innerHTML = content;
}

// ADD TO CART FUNCTION
const cartBodyContent = document.getElementById('cart-content');

let shoppingCart = [];
let total = [];

async function handleAdd(id) {
	let data = await getDataFromSV('https://raw.githubusercontent.com/GoldenOwlAsia/webdev-intern-assignment/main/app/data/shoes.json');
	//active button variables + action
	let addToCartBtn = document.getElementById('add-btn' + id);
	let checkBtn = document.getElementById('check-btn' + id);
	addToCartBtn.classList.add('active');
	checkBtn.classList.remove('d-none');
	// add item
	const addItemData = data.shoes.filter((item) => {
		return item.id == id;
	});
	shoppingCart.push(...addItemData);
	renderData(shoppingCart);
	totalProducts(total, id);
	addPriceTotal(shoppingCart);
}

// REMOVE CART
function handleDelete(id) {
	//unactive button variables + action
	let addToCartBtn = document.getElementById('add-btn' + id);
	let removeBtn = document.getElementById('remove-btn' + id);
	let checkBtn = document.getElementById('check-btn' + id);
	addToCartBtn.classList.remove('active');
	checkBtn.classList.add('d-none');
	// remove item
	shoppingCart = shoppingCart.filter((item) => {
		return item.id !== id;
	});

	renderData(shoppingCart);
}

// COUNT
function totalProducts(total, id) {
	total.map((item, index) => {
		let count = 1;
		//add
		document.querySelector('.plus-btn' + id).onclick = () => {
			count++;
			document.querySelector('.count-field' + id).textContent = count;
		};
		//sub
		document.querySelector('.minus-btn' + id).onclick = () => {
			if (count > 1) {
				count--;
				document.querySelector('.count-field' + id).textContent = count;
			} else {
				count == 1;
			}
		};
	});
}

// TOTAL

let totalField = document.getElementById('total');
function addPriceTotal(shoppingCart) {
	console.log('shopping cart:', shoppingCart);
	shoppingCart.reduce((previousValue, currentValue) => {
		console.log('previous:', 0, 'current:', currentValue.price);
	}, 0);
	// let priceItem = item[item.length - 1].price;
	// totalField.innerText += Number(priceItem);
}
