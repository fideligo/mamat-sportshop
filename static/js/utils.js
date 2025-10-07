// utils.js

// Ambil CSRF token dari cookie (buat POST AJAX)
function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== "") {
		const cookies = document.cookie.split(";");
		for (let cookie of cookies) {
			cookie = cookie.trim();
			if (cookie.startsWith(name + "=")) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

// Toast notification
function showToast(title, message = "", type = "normal", duration = 3000) {
	const toast = document.getElementById("toast-component");
	const toastTitle = document.getElementById("toast-title");
	const toastMsg = document.getElementById("toast-message");

	if (!toast) return;

	toast.classList.remove("bg-green-50", "bg-red-50", "bg-white");
	toast.classList.add(
		type === "success"
			? "bg-green-50"
			: type === "error"
			? "bg-red-50"
			: "bg-white"
	);

	toastTitle.textContent = title;
	toastMsg.textContent = message;

	toast.classList.remove("opacity-0", "translate-y-64");
	toast.classList.add("opacity-100", "translate-y-0");

	setTimeout(() => {
		toast.classList.remove("opacity-100", "translate-y-0");
		toast.classList.add("opacity-0", "translate-y-64");
	}, duration);
}
