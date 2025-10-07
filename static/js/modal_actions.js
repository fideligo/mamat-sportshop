// modal_actions.js (replace whole file with this)

//
// Helpers (query elements at call time so we don't rely on DOM order)
//
function $id(id) {
	return document.getElementById(id);
}
function getForm() {
	return $id("productForm");
}
function getModal() {
	return $id("crudModal");
}
function getModalContent() {
	return $id("crudModalContent");
}
function getModalTitle() {
	return $id("modalTitle");
}
function getCSRF() {
	return typeof getCookie === "function" ? getCookie("csrftoken") : "";
}

//
// State
//
let editMode = false;
let currentProductId = null;

//
// Open "Create" modal (clear state)
//
function openCreateModal() {
	editMode = false;
	currentProductId = null;

	// Reset form (use dynamic getForm)
	const form = getForm();
	form?.reset();

	// Clear hidden id if present
	const pid = $id("productId");
	if (pid) pid.value = "";

	// Force-reset checkbox/select (some browsers/forms behave oddly)
	const featured = $id("f_featured");
	if (featured) featured.checked = false;
	const category = $id("f_category");
	if (category) category.selectedIndex = 0;

	// Title
	const title = getModalTitle();
	if (title) title.textContent = "Add New Product";

	// Show modal
	showModal();
}
window.openCreateModal = openCreateModal;

//
// Show / hide modal (query DOM at time-of-call)
//
function showModal() {
	const modal = getModal();
	const modalContent = getModalContent();

	if (!modal || !modalContent) {
		console.error("Modal element not found!");
		return;
	}

	modal.classList.remove("hidden");
	// animate in
	setTimeout(() => {
		modalContent.classList.remove("opacity-0", "scale-95");
		modalContent.classList.add("opacity-100", "scale-100");
	}, 50);
}

function hideModal() {
	const modal = getModal();
	const modalContent = getModalContent();
	if (!modal || !modalContent) return;

	// animate out
	modalContent.classList.add("opacity-0", "scale-95");

	// clear form and hidden id right away (so next open is clean)
	const form = getForm();
	form?.reset();
	const pid = $id("productId");
	if (pid) pid.value = "";

	// hide after animation
	setTimeout(() => {
		modal.classList.add("hidden");
		editMode = false;
		currentProductId = null;
		// reset title
		const title = getModalTitle();
		if (title) title.textContent = "Add New Product";
	}, 150);
}
window.hideModal = hideModal;

//
// Submit handler: use delegated 'submit' so it works even if form was not present at script load
//
document.addEventListener("submit", async (e) => {
	if (!e.target || e.target.id !== "productForm") return;
	e.preventDefault();

	const form = e.target;
	const formData = new FormData(form);

	const url = editMode ? `/product/${currentProductId}/edit` : ADD_PRODUCT_URL; // provided from template
	const method = "POST";

	try {
		const res = await fetch(url, {
			method,
			headers: { "X-CSRFToken": getCSRF() },
			body: formData,
		});

		if (res.ok) {
			hideModal();
			showToast(
				editMode ? "Product updated!" : "Product added!",
				"",
				"success"
			);
			document.dispatchEvent(new CustomEvent("productUpdated"));
		} else {
			showToast("Failed to save product", "", "error");
			console.error("Save error:", res.status, await res.text());
		}
	} catch (err) {
		console.error("Save exception:", err);
		showToast("Server error", "", "error");
	}
});

//
// Delete flows
//
function confirmDelete(productId) {
	const modalDelete = $id("deleteModal");
	if (modalDelete) showDeleteModal(productId);
	else if (confirm("Are you sure you want to delete this product?")) {
		deleteProduct(productId);
	}
}
window.confirmDelete = confirmDelete;

// Hide delete confirmation modal
function hideDeleteModal() {
	const modal = document.getElementById("deleteModal");
	if (!modal) return;
	modal.classList.add("hidden");
}

// Expose globally so onclick="hideDeleteModal()" in HTML works
window.hideDeleteModal = hideDeleteModal;

async function deleteProduct(productId) {
	try {
		const res = await fetch(`/product/${productId}/delete`, {
			method: "POST",
			headers: { "X-CSRFToken": getCSRF() },
		});
		if (res.ok) {
			showToast("Product deleted", "The product has been removed.", "success");
			document.dispatchEvent(new CustomEvent("productUpdated"));
		} else {
			showToast("Failed to delete product", "Please try again.", "error");
			console.error("Delete failed:", res.status, await res.text());
		}
	} catch (err) {
		console.error("Delete exception:", err);
		showToast("Server error", "Please check your connection.", "error");
	}
}

function showDeleteModal(productId) {
	const modal = $id("deleteModal");
	const confirmBtn = $id("confirmDeleteBtn");

	if (!modal || !confirmBtn) {
		if (confirm("Are you sure you want to delete this product?"))
			deleteProduct(productId);
		return;
	}

	modal.classList.remove("hidden");
	confirmBtn.onclick = () => {
		deleteProduct(productId);
		modal.classList.add("hidden");
	};
}

//
// Edit: fetch product detail (use trailing slash for JSON endpoint) and prefill
//
async function editProduct(productId) {
	editMode = true;
	currentProductId = productId;

	try {
		const res = await fetch(`/json/${productId}/`, {
			headers: { Accept: "application/json" },
		});
		if (!res.ok) throw new Error("Failed to fetch product data: " + res.status);
		const data = await res.json();

		// data from serializers.serialize is an array with {pk, fields}
		const product = data?.[0]?.fields;
		if (!product) throw new Error("Product data malformed");

		// set modal title
		const title = getModalTitle();
		if (title) title.textContent = "Edit Product";

		// Prefill fields (query fresh each time)
		$id("f_name").value = product.name ?? "";
		$id("f_price").value = product.price ?? "";
		$id("f_thumbnail").value = product.thumbnail ?? "";
		$id("f_category").value = product.category ?? "";
		$id("f_featured").checked = Boolean(product.is_featured);
		$id("f_stock").value = product.stock ?? "";
		$id("f_brand").value = product.brand ?? "";
		$id("f_description").value = product.description ?? "";

		// hidden productId
		const hidden = $id("productId");
		if (hidden) hidden.value = productId;

		showModal();
	} catch (err) {
		console.error("Edit load error:", err);
		showToast("Error loading product", "", "error");
	}
}
window.editProduct = editProduct;

//
// Close modal by clicking outside or pressing Escape
//
document.addEventListener("click", (e) => {
	const modal = getModal();
	if (!modal) return;
	if (e.target === modal) hideModal();
});

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") hideModal();
});
