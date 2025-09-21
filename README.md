# Mamat Sportshop

# Tugas 2: Implementasi Model-View-Template (MVT) pada Django

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

sumber: Forum Diskusi Minggu Kedua - Course PBP SCELE (Discussion "Alur Django")

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

* Ditulis dengan Python, bahasa pemrograman yang simpel, populer, dan mudah dipelajari.
* Dokumentasinya lengkap serta didukung komunitas yang luas.
* Struktur proyeknya jelas sehingga ramah bagi pemula.
* Menganut filosofi *batteries included*, menyediakan banyak fitur bawaan seperti autentikasi, admin panel, ORM, form handling, hingga keamanan dasar.
* Mendukung praktik *best practice* seperti prinsip DRY (*Don’t Repeat Yourself*) dan konsistensi kode.
* Aman, skalabel, lintas platform, serta sudah terbukti digunakan oleh aplikasi besar seperti Instagram, Pinterest, dan Spotify.

Dengan begitu, mahasiswa bisa lebih fokus pada konsep fundamental pengembangan web tanpa harus membangun semuanya dari nol.

---

### 6. Feedback untuk Asisten Dosen

Menurut saya, tutorial 1 sudah sangat bagus. Panduannya jelas sehingga memudahkan saya dalam memahami langkah-langkah awal pengembangan proyek Django.

---

# Tugas 3: Implementasi Form dan Data Delivery pada Django

---

## Mengapa kita memerlukan data delivery dalam pengimplementasian sebuah platform?

Data delivery penting karena sebuah platform tidak pernah berdiri sendiri. Sebuah platform biasanya akan berhubungan dengan platform atau sistem lain, baik untuk bertukar informasi, mengambil data, maupun mengirimkan data. Tanpa adanya mekanisme data delivery, platform akan terisolasi dan tidak bisa berkomunikasi dengan ekosistem di sekitarnya. Dengan data delivery, proses integrasi antar-platform menjadi mungkin, sehingga layanan dapat saling melengkapi dan memberi pengalaman yang lebih kaya untuk pengguna.  

---
## Menurutmu, mana yang lebih baik antara XML dan JSON? Mengapa JSON lebih populer dibandingkan XML?  
Menurut saya, JSON lebih baik dibandingkan XML. JSON memiliki struktur sederhana berbentuk key-value pairs, mirip dengan dictionary di Python. Hal ini membuat JSON lebih mudah dibaca dan dipahami oleh manusia, sekaligus lebih mudah diolah oleh mesin.  

XML sebenarnya cukup powerful karena mendukung hal-hal kompleks seperti schema, namespaces, dan validasi, tetapi hal itu membuat XML lebih verbose dan sulit dibaca. JSON lebih populer karena sifatnya yang ringan, ringkas, cepat diproses, serta cocok digunakan dalam pengembangan web modern, terutama dengan API berbasis REST.

---
## Jelaskan fungsi dari method `is_valid()` pada form Django dan mengapa kita membutuhkan method tersebut?  
Method `is_valid()` pada form Django digunakan untuk memvalidasi data yang dikirimkan melalui form. Saat pengguna mengisi form dan mengirimkannya, Django akan memeriksa apakah data tersebut sesuai dengan aturan yang telah ditentukan di `forms.py` maupun di model terkait.  

Jika data valid, `is_valid()` akan mengembalikan `True`, sehingga kita bisa melanjutkan proses seperti menyimpan data ke database dengan `form.save()`. Jika tidak valid, maka `is_valid()` akan mengembalikan `False`, dan kita bisa menampilkan pesan error ke pengguna.  

Tanpa adanya validasi ini, data yang tidak sesuai (misalnya kosong, tidak dalam format yang benar, atau melanggar aturan model) bisa masuk ke database dan menyebabkan error atau inkonsistensi data.

---
## Mengapa kita membutuhkan `csrf_token` saat membuat form di Django? Apa yang dapat terjadi jika kita tidak menambahkan `csrf_token` pada form Django? Bagaimana hal tersebut dapat dimanfaatkan oleh penyerang?  
`csrf_token` digunakan untuk melindungi aplikasi web dari serangan **Cross-Site Request Forgery (CSRF)**. Serangan CSRF terjadi ketika penyerang membuat pengguna tanpa sadar mengirimkan request berbahaya ke server, misalnya mengirim form untuk mengubah password atau menghapus data, padahal pengguna tidak bermaksud melakukannya.  

Dengan adanya `csrf_token`, setiap request yang berisi form harus membawa token unik yang hanya server dan user tersebut tahu. Jika token tidak cocok, maka request akan ditolak.  

Jika kita tidak menambahkan `csrf_token`, penyerang dapat memanfaatkan kelemahan ini dengan membuat request palsu yang seolah-olah berasal dari pengguna, sehingga sistem bisa dieksploitasi untuk melakukan tindakan berbahaya.

---
## Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step  
Berikut langkah-langkah implementasi yang saya lakukan:  

1. Membuat **4 function views** di `views.py`, termasuk fungsi untuk menampilkan produk, menambahkan produk, dan menampilkan detail produk.  
2. Melakukan **routing views** dengan menambahkan URL pattern baru di `urls.py`.  
3. Membuat fungsi `add_product`, `show_product`, serta memodifikasi `main_page` agar dapat menampilkan daftar produk sekaligus tombol untuk menambah produk baru.  
4. Mengubah `index.html` supaya menyesuaikan dengan fitur-fitur baru, misalnya menampilkan daftar produk.  
5. Membuat file HTML baru di folder `templates`, yaitu `add_product.html` dan `product_details.html`.  
6. Membuat `forms.py` yang berisi `ProductForm` dengan field-field sesuai yang dibutuhkan ketika menambahkan produk.  
7. Menambahkan atribut `id` pada model `Product` agar setiap produk punya identitas unik.  
8. Menambahkan **CSRF trusted domains** di `settings.py` supaya form bisa digunakan dengan aman saat diakses melalui domain tertentu.
  
---
## Apakah ada feedback untuk asdos di tutorial 2?  
Tidak ada feedback, menurut saya tutorial sudah jelas dan membantu.

---
## Berikut screenshot dari hasil akses URL pada Postman:
1. XML

![XML](https://github.com/user-attachments/assets/3405b07d-00cb-4b2a-a4f3-1f937dc32330)

3. JSON

![JSON](https://github.com/user-attachments/assets/afe816d9-dc6f-40e4-9b72-62e3ca0eb1f8)

4. XML By ID

![XMLByID](https://github.com/user-attachments/assets/b3eeaf6e-ffc3-46bc-8331-b28acfd1181d)

6. JSON By ID

![JSONByID](https://github.com/user-attachments/assets/544610b7-c539-40da-9f24-b882b3572829)

---

# Tugas 4: Implementasi Autentikasi, Session, dan Cookies pada Django

---

## Apa itu Django AuthenticationForm? Jelaskan juga kelebihan dan kekurangannya.
`AuthenticationForm` adalah form bawaan Django yang digunakan untuk login. Form ini sudah menyediakan field `username` dan `password`, serta otomatis melakukan validasi ke database.

**Kelebihan:**
- Praktis, langsung bisa dipakai tanpa bikin form manual.
- Terintegrasi dengan sistem autentikasi Django.
- Sudah ada validasi keamanan bawaan.

**Kekurangan:**
- Kurang fleksibel jika ingin menambah field khusus (misalnya login dengan email).
- Tampilan default sangat sederhana, biasanya butuh dimodifikasi agar sesuai UI.

---

## Apa perbedaan antara autentikasi dan otorisasi? Bagaimana Django mengimplementasikan kedua konsep tersebut?
- **Autentikasi**: memastikan identitas pengguna benar (contoh: login dengan username & password).
- **Otorisasi**: menentukan hak akses pengguna setelah autentikasi berhasil (contoh: hanya admin bisa menghapus data).

**Implementasi di Django:**
- Autentikasi dilakukan dengan `django.contrib.auth` (model `User`, `AuthenticationForm`, fungsi login/logout).
- Otorisasi dilakukan dengan **permissions** dan **groups**, serta decorator seperti `@login_required` atau `@permission_required`.

---

## Apa saja kelebihan dan kekurangan session dan cookies dalam konteks menyimpan state di aplikasi web?

**Session:**
- Kelebihan: lebih aman karena data disimpan di server (browser hanya menyimpan session ID).
- Kekurangan: membebani server karena harus menyimpan data session tiap user.

**Cookies:**
- Kelebihan: lebih ringan karena disimpan di browser, tidak membebani server.
- Kekurangan: lebih rentan diubah/dicuri oleh user atau penyerang (misalnya lewat XSS).

---

## Apakah penggunaan cookies aman secara default dalam pengembangan web, atau apakah ada risiko potensial yang harus diwaspadai? Bagaimana Django menangani hal tersebut?
Cookies **tidak sepenuhnya aman secara default**. Risiko potensial:
- **XSS (Cross-Site Scripting):** penyerang bisa mencuri cookies.
- **Session hijacking:** cookie bisa dicuri lalu dipakai untuk menyamar sebagai user.

**Django menanganinya dengan:**
- `HttpOnly` → mencegah akses cookie lewat JavaScript.
- `Secure` → cookie hanya terkirim lewat HTTPS.
- Middleware CSRF → melindungi dari serangan CSRF.

---

## Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step
Langkah yang saya lakukan:
1. Membuat fungsi **login** dan **register** di `views.py`.
2. Menambahkan path `login` `register` dan  `logout` ke `urls.py`.
3. Membuat template HTML untuk login dan register.
4. Membuat fungsi **logout** dan menambahkan tombol logout di `main.html`.
5. Menambahkan path `logout` ke `urls.py`.
6. Menggunakan decorator `@login_required` untuk main page dan show product.
7. Menambahkan cookies: menyimpan cookies saat login, menghapus cookies saat logout, serta menampilkan **last login** di main page.
8. Menghubungkan product dengan user (supaya tahu siapa yang menambahkan produk).
9. Melakukan migration setelah mengedit `models.py`.
10. Memodifikasi `add_product` agar bisa assign user ke produk yang dibuat.
11. Memodifikasi main page untuk menambahkan fitur **filtering**.
12. Memodifikasi detail product agar menampilkan siapa user yang menambahkannya.
13. Melakukan add-commit-push ke GitHub dan PWS.

---

Sekian, Terimakasih
Fideligo
