# Tugas 2: Implementasi Model-View-Template (MVT) pada Django

# Mamat Sportshop

Link: [https://muhammad-rafi419-mamatsportshop.pbp.cs.ui.ac.id/](https://muhammad-rafi419-mamatsportshop.pbp.cs.ui.ac.id/)

---

## Jawaban dari Pertanyaan Tugas

### 1. Implementasi Checklist Step by Step

Saya memulai pengerjaan tugas ini secara bertahap sebagai berikut:

1. Membuat repository baru di GitHub melalui website GitHub.
2. Melakukan *clone* repository tersebut ke direktori lokal laptop.
3. Membuat dan mengaktifkan virtual environment.
4. Membuat `requirements.txt` dan menginstall seluruh dependensi dengan:

   ```bash
   pip install -r requirements.txt
   ```
5. Membuat project Django baru dengan:

   ```bash
   django-admin startproject mamat_sportshop
   ```
6. Membuat aplikasi bernama `main` dan mengerjakan logic utama secara berurutan:

   * `urls.py`
   * `views.py`
   * `models.py`
   * `templates/index.html`
7. Karena mengubah `models.py`, saya menjalankan:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
8. Menjalankan server lokal untuk memastikan proyek berjalan normal.
9. Membuat file `.gitignore` agar file sensitif seperti `.env`, `.env.prod`, dan folder `env` tidak masuk ke repository.
10. Membuat file `.env` dan `.env.prod`. Pada `.env.prod`, saya menggunakan scheme bernama `tugas_individu`.
11. Memodifikasi `settings.py` agar menggunakan environment variables, konfigurasi production, dan database.
12. Melakukan `git add`, `commit`, dan `push` ke GitHub.
13. Membuat project baru di PWS, lalu menyamakan konfigurasi *environs* di PWS dengan `.env.prod`.
14. Menjalankan perintah deployment sesuai panduan hingga aplikasi berhasil ter-deploy.

---

### 2. Bagan Alur Request dan Response Django
<img width="725" height="525" alt="image" src="https://github.com/user-attachments/assets/f1514745-82a5-4bda-b1ab-b70c0317fabb" />
**Penjelasan:**

* Pertama, `urls.py` mencocokkan URL yang diakses di browser dengan daftar path yang ada.
* Jika cocok, request diteruskan ke fungsi pada `views.py`.
* `views.py` memproses logika, dan bila perlu mengambil/menyimpan data lewat `models.py`.
* Setelah selesai, `views.py` merender `HTML` dari folder `templates`.
* Browser akhirnya menerima `HTTP response` berupa halaman web.

---

### 3. Peran `settings.py`

File `settings.py` berfungsi sebagai pusat konfigurasi proyek Django. Beberapa hal penting yang diatur di sini antara lain:

* **Konfigurasi Database**: menentukan engine dan kredensial database.
* **Installed Apps**: daftar aplikasi yang aktif dalam proyek.
* **Template dan Static Files**: mengatur lokasi file HTML, CSS, dan JS.
* **Konfigurasi Deployment**: seperti allowed hosts, environment variables, dsb.

---

### 4. Cara Kerja Migrasi Database di Django

Migrasi database adalah cara Django melacak perubahan pada model dan menyesuaikan struktur tabel database.

* `makemigrations` → membuat berkas migrasi berdasarkan perubahan di `models.py`.
* `migrate` → mengeksekusi berkas migrasi tersebut agar database mengikuti struktur terbaru.

Dengan migrasi, perubahan model (misalnya menambah field baru) dapat diterapkan ke database tanpa harus menghapus data lama.

---

### 5. Mengapa Django Dijadikan Permulaan?

Menurut saya, Django dipilih karena:

* Dokumentasinya lengkap dan komunitasnya luas.
* Struktur proyek jelas sehingga mudah untuk dipelajari pemula.
* Framework ini sudah batteries included (menyediakan banyak fitur bawaan seperti ORM, autentikasi, admin panel).
* Mendukung praktik best practice dalam pengembangan web sejak awal.

Dengan begitu, mahasiswa bisa fokus pada konsep fundamental pengembangan web tanpa harus membangun semuanya dari nol.

---

### 6. Feedback untuk Asisten Dosen

Menurut saya, tutorial 1 sudah sangat bagus. Panduannya jelas sehingga memudahkan saya dalam memahami langkah-langkah awal pengembangan proyek Django.

---

Sekian, Terimakasih
Fideligo
