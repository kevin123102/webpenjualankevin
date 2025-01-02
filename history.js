// Menyimpan riwayat belanja ke LocalStorage
function addPurchaseToHistory(date, paymentMethod, address, total) {
    const historyData = JSON.parse(localStorage.getItem('shoppingHistory')) || [];
    historyData.push({ date, paymentMethod, address, total });
    localStorage.setItem('shoppingHistory', JSON.stringify(historyData));
}

// Fungsi untuk mengambil total belanja dan data pembayaran
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Mencegah reload halaman sebelum proses selesai

            const paymentMethod = document.getElementById('method').value;
            const address = paymentMethod === 'cod' 
                ? document.getElementById('address').value 
                : document.getElementById('alamat').value;
            const total = document.getElementById('cart-total-hidden').value;

            if (!paymentMethod || !total) {
                alert('Harap lengkapi semua data!');
                return;
            }

            // Simpan riwayat ke LocalStorage
            const date = new Date().toLocaleString();
            addPurchaseToHistory(date, paymentMethod, address, total);

            alert('Pembayaran berhasil! Riwayat belanja telah diperbarui.');

            // Kirim data ke server melalui form asli
            form.submit();
        });
    }
});

// Menampilkan riwayat belanja dari LocalStorage
document.addEventListener('DOMContentLoaded', function () {
    const historyData = JSON.parse(localStorage.getItem('shoppingHistory')) || [];
    const historyTableBody = document.getElementById('history-body');
    const emptyMessage = document.getElementById('empty-message');

    if (historyTableBody && historyData.length > 0) {
        emptyMessage.style.display = 'none';
        historyData.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.date}</td>
                <td>${entry.paymentMethod}</td>
                <td>${entry.address || '-'}</td>
                <td>Rp ${entry.total}</td>
            `;
            historyTableBody.appendChild(row);
        });
    } else if (emptyMessage) {
        emptyMessage.style.display = 'block';
    }
});
8