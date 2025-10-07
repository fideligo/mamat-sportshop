function handleAuthForm(event, type) {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);
	const csrfToken = getCookie("csrftoken");

	let url = "";
	if (type === "login") url = "/api/auth/login/"; // ✅ fix
	else if (type === "register") url = "/api/auth/register/"; // ✅ fix

	const btn = form.querySelector("button[type='submit']");
	btn.disabled = true;
	const originalText = btn.textContent;
	btn.textContent = "Processing...";

	fetch(url, {
		method: "POST",
		headers: { "X-CSRFToken": csrfToken },
		body: formData,
	})
		.then(async (res) => {
			const data = await res.json();
			btn.disabled = false;
			btn.textContent = originalText;

			if (res.ok) {
				showToast(
					type === "login"
						? "Login successful!"
						: "Account created successfully!",
					"",
					"success"
				);

				setTimeout(() => {
					window.location.href = type === "login" ? "/" : "/login";
				}, 1000);
			} else {
				console.error("Auth error:", data);
				const msg =
					data?.errors && Object.keys(data.errors).length
						? Object.entries(data.errors)
								.map(
									([field, info]) =>
										`${field}: ${info[0]?.message || "Invalid"}`
								)
								.join("\n")
						: data?.detail || "Invalid form";
				showToast(msg, "", "error");
			}
		})
		.catch((err) => {
			console.error("Auth AJAX failed:", err);
			showToast("Server error, please try again", "", "error");
			btn.disabled = false;
			btn.textContent = originalText;
		});
}
