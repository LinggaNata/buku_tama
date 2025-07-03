document.addEventListener('DOMContentLoaded', () => {
    const formPengunjung = document.getElementById('formPengunjung');
    const listTamuDiv = document.getElementById('list-tamu');
    const noDataMessage = document.getElementById('no-data-message');

    let daftarPengunjung = JSON.parse(localStorage.getItem('daftarPengunjung')) || [];

    
    function tampilkanDaftarPengunjung() {
        listTamuDiv.innerHTML = ''; 

        if (daftarPengunjung.length === 0) {
            noDataMessage.style.display = 'block';
        } else {
            noDataMessage.style.display = 'none';
            daftarPengunjung.forEach((pengunjung, index) => {
                const card = document.createElement('div');
                card.className = 'col-md-6 col-lg-4 mb-4'; 
                card.innerHTML = `
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">${pengunjung.nama}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${pengunjung.email}</h6>
                            <p class="card-text"><strong>Instansi:</strong> ${pengunjung.instansi}</p> <p class="card-text">${pengunjung.pesan}</p>
                            <small class="text-muted">${new Date(pengunjung.tanggal).toLocaleString()}</small>
                        </div>
                        <div class="card-footer bg-white border-top-0">
                            <button class="btn btn-danger btn-sm" data-index="${index}">Hapus</button>
                        </div>
                    </div>
                `;
                listTamuDiv.appendChild(card);
            });

            
            listTamuDiv.querySelectorAll('.btn-danger').forEach(button => {
                button.addEventListener('click', (event) => {
                    const indexToDelete = event.target.dataset.index;
                    hapusPengunjung(indexToDelete);
                });
            });
        }
    }

    
    function hapusPengunjung(index) {
        daftarPengunjung.splice(index, 1); 
        localStorage.setItem('daftarPengunjung', JSON.stringify(daftarPengunjung));
        tampilkanDaftarPengunjung(); 
        alert('Pengunjung berhasil dihapus!');
    }

   
    formPengunjung.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const instansi = document.getElementById('instansi').value; 
        const pesan = document.getElementById('pesan').value;
        const tanggal = new Date().toISOString(); 

        
        if (nama.trim() === '' || email.trim() === '' || instansi.trim() === '' || pesan.trim() === '') {
            alert('Semua kolom harus diisi!');
            return;
        }

        const newPengunjung = { nama, email, instansi, pesan, tanggal }; 
        daftarPengunjung.push(newPengunjung);
        localStorage.setItem('daftarPengunjung', JSON.stringify(daftarPengunjung)); 

        formPengunjung.reset(); 
        alert('Terima kasih, pesan Anda telah terkirim!');
        tampilkanDaftarPengunjung(); 
    });

    
    tampilkanDaftarPengunjung();
});