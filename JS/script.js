// Saat link menu diklik
document.querySelectorAll('.nav-link').forEach(link => {
 link.addEventListener('click', function () {
   document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
   this.classList.add('active');
 });
});

// Tambah/tukar icon hamburger jadi silang
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.getElementById('navbarNav');

navbarToggler.addEventListener('click', function () {
 this.classList.toggle('toggled'); // buat class baru
});

// Klik di luar navbar nutupin menu
document.addEventListener('click', function (e) {
 if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
   const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
     toggle: false
   });
   bsCollapse.hide();
   navbarToggler.classList.remove('toggled');
 }
});

// Tambahin class active ke menu yg diklik
document.querySelectorAll('.nav-link').forEach(link => {
 link.addEventListener('click', function () {
   document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
   this.classList.add('active');

   // Tutup navbar setelah klik menu
   const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
     toggle: false
   });
   bsCollapse.hide();
   navbarToggler.classList.remove('toggled');
 });
});