// JavaScript Document

// DISPLAY CART FUNCTION: 

$(".add-to-cart").click(function (event) {
	event.preventDefault();
	var name = $(this).attr("data-name");
	var price = Number($(this).attr("data-price"));

	shoppingCart.addItemToCart(name, price, 1);
	displayCart();
});

$(".clear-cart").click(function (event) {
	shoppingCart.clearCart();
	displayCart();
});

function displayCart() {
	var cartArray = shoppingCart.listCart();
	var output = "";

	for (var i in cartArray) {
		output += "<li>" +
			cartArray[i].name +
			" <input class='item-count' data-name='" +
			cartArray[i].name +
			"' value='" + cartArray[i].count + "' >" +
			" x " + cartArray[i].price +
			" = " + cartArray[i].total +
			" <button class='add-item' data-name='" +
			cartArray[i].name + "'>+</button>" +
			" <button class='subtract-item'  data-name='" +
			cartArray[i].name + "'>-</button>" +
			" <button class='delete-item' data-name='" +
			cartArray[i].name + "'>X</button>" +
			"</li>"
	}

	$("#show-cart").html(output);
	$("#count-cart").html(shoppingCart.countCart());
	$("#total-cart").html(shoppingCart.totalCart());
}

$("#show-cart").on("click", ".delete-item", function (event) {
	var name = $(this).attr("data-name");
	shoppingCart.removeItemFromCartAll(name);
	displayCart();
});

$("#show-cart").on("click", ".subtract-item", function (event) {
	var name = $(this).attr("data-name");
	shoppingCart.removeItemFromCart(name);
	displayCart();
});

$("#show-cart").on("click", ".add-item", function (event) {
	var name = $(this).attr("data-name");
	shoppingCart.addItemToCart(name, 0, 1);
	displayCart();
});

$("#show-cart").on("change", ".item-count", function (event) {
	var name = $(this).attr("data-name");
	var count = Number($(this).val());
	shoppingCart.setCountForItem(name, count);
	displayCart();
});





// **********************************************************
// Shopping Cart functions
var shoppingCart = (function () {
	// Private properties
	var cart = [];

	function Item(name, price, count) {
		this.name = name
		this.price = price
		this.count = count
	};

	function saveCart() {
		localStorage.setItem("shoppingCart", JSON.stringify(cart));
	}


	function loadCart() {
		cart = JSON.parse(localStorage.getItem("shoppingCart"));
	}

	loadCart();

	// Public properties
	var obj = {};

	obj.addItemToCart = function (name, price, count) {
		for (var i in cart) {
			if (cart[i].name === name) {
				cart[i].count += count;
				saveCart();
				return;
			}
		}

		var item = new Item(name, price, count);
		cart.push(item);
		saveCart();
	}

	obj.setCountForItem = function (name, count) {
		for (var i in cart) {
			if (cart[i].name === name) {
				cart[i].count = count;
				break;
			}
		}
		saveCart();
	}

	obj.removeItemFromCart = function (name) {
		for (var i in cart) {
			if (cart[i].name === name) {
				cart[i].count--;
				if (cart[i].count === 0) {
					cart.splice(i, 1);
				}
				break;
			}
		}
		saveCart();
	};

	obj.removeItemFromCartAll = function (name) {
		for (var i in cart) {
			if (cart[i].name === name) {
				cart.splice(i, 1);
				break;
			}
		}
		saveCart();
	}

	obj.clearCart = function () {
		cart = [];
		saveCart();
	}

	obj.countCart = function () {
		var totalCount = 0;
		for (var i in cart) {
			totalCount += cart[i].count;
		}
		return totalCount;
	}

	obj.totalCart = function () {
		var totalCost = 0;
		for (var i in cart) {
			totalCost += cart[i].price * cart[i].count;
		}
		return totalCost.toFixed(2);
	}

	obj.listCart = function () {
		var cartCopy = [];
		for (var i in cart) {
			var item = cart[i];
			var itemCopy = {};
			for (var p in item) {
				itemCopy[p] = item[p];
			}
			itemCopy.total = (item.price * item.count).toFixed(2);
			cartCopy.push(itemCopy);
		}
		return cartCopy;
	}


	return obj;
})();



displayCart();