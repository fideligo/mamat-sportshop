// products_ajax.js

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const empty = document.getElementById("empty");
const grid = document.getElementById("grid");
const btnCreate = document.getElementById("btn-open-create");
const filterAll = document.getElementById("filter-all");
const filterMy = document.getElementById("filter-my");

let activeFilter = "all";
let allProducts = [];

function showState({
	showLoading = false,
	showError = false,
	showEmpty = false,
	showGrid = false,
}) {
	loading.classList.toggle("hidden", !showLoading);
	error.classList.toggle("hidden", !showError);
	empty.classList.toggle("hidden", !showEmpty);
	grid.classList.toggle("hidden", !showGrid);
}

// Build product card
function buildProductCard(item) {
	const fields = item.fields;
	const userOwns = String(fields.user) === String(CURRENT_USER_ID);
	const productId = item.pk;

	const card = document.createElement("div");
	card.className =
		"bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition flex flex-col";

	card.innerHTML = `
        <div class="relative bg-[#F3F5F7] w-full h-[349px] flex items-center justify-center rounded-t-lg overflow-hidden">
            ${
							fields.is_featured
								? `<span class="absolute top-2 left-2 bg-white text-black text-xs font-semibold px-2 py-1 rounded shadow">FEATURED</span>`
								: ""
						}
            ${
							userOwns
								? `
                <div class="absolute top-2 right-2 flex gap-1">
                    <button type="button" onclick="editProduct('${productId}')" class="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600">Edit</button>
                    <button type="button" onclick="confirmDelete('${productId}')" class="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600">Delete</button>
                </div>
            `
								: ""
						}
            ${
							fields.thumbnail
								? `<img src="${fields.thumbnail}" alt="${fields.name}" class="h-full w-full object-contain"/>`
								: ""
						}
        </div>
        <div class="p-3 h-[98px] flex flex-col justify-between">
            <h3 class="text-sm font-semibold text-gray-800 truncate">${
							fields.brand
						} - ${fields.name}</h3>
            <p class="text-xs text-gray-500">${fields.category}</p>
            <p class="mt-1 text-lg text-black font-bold">Rp${fields.price}</p>
        </div>
    `;

	return card;
}

function renderProducts(products) {
	grid.innerHTML = "";
	products.forEach((p) => grid.appendChild(buildProductCard(p)));
}

function renderFeatured(products) {
	const featuredSection = document.querySelector("#featured_products .grid");
	if (!featuredSection) return;
	featuredSection.innerHTML = "";

	const featured = products.filter((p) => p.fields.is_featured);
	if (featured.length === 0) {
		featuredSection.innerHTML = `<p class="text-gray-500">No featured products yet.</p>`;
		return;
	}

	featured.forEach((p) => {
		const card = buildProductCard(p);
		featuredSection.appendChild(card);
	});
}

function filterAndDisplay() {
	const filtered =
		activeFilter === "my"
			? allProducts.filter(
					(p) => String(p.fields.user) === String(CURRENT_USER_ID)
			  )
			: allProducts;

	if (filtered.length === 0) showState({ showEmpty: true });
	else {
		renderProducts(filtered);
		showState({ showGrid: true });
	}
}

async function fetchProducts() {
	try {
		// Reset semua state sebelum mulai fetch ulang
		showState({
			showLoading: true,
			showGrid: false,
			showError: false,
			showEmpty: false,
		});

		const res = await fetch(PRODUCT_JSON_URL, {
			headers: { Accept: "application/json" },
		});

		if (!res.ok) throw new Error("Failed to fetch products");
		allProducts = await res.json();
		filterAndDisplay();
		renderFeatured(allProducts); // 🔥 tambahkan di sini
	} catch (err) {
		console.error("Error fetching:", err);
		showState({ showError: true });
	}
}

filterAll?.addEventListener("click", () => {
	activeFilter = "all";
	filterAndDisplay();
});

filterMy?.addEventListener("click", () => {
	activeFilter = "my";
	filterAndDisplay();
});

btnCreate?.addEventListener("click", () => window.openCreateModal());

const refreshBtn = document.getElementById("refresh-products");

refreshBtn?.addEventListener("click", () => {
	showToast("Refreshing products...", "", "normal");
	fetchProducts();
});

document.addEventListener("productUpdated", fetchProducts);

// AUTO-LOAD ketika halaman dibuka
fetchProducts();
