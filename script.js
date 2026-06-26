document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('voucherForm');
    const voucherResult = document.getElementById('voucherResult');
    const vName = document.getElementById('v-name');
    const vCode = document.getElementById('v-code');
    const downloadBtn = document.getElementById('downloadBtn');

    let generatedCode = '';
    let userNameText = '';

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        userNameText = document.getElementById('userName').value;
        
        // Generate a random 6-character alphanumeric code
        generatedCode = 'AREN-' + Math.random().toString(36).substring(2, 8).toUpperCase();

        // Populate Voucher Data
        vName.textContent = userNameText;
        vCode.textContent = generatedCode;

        // Hide Form, Show Voucher
        form.classList.add('hidden');
        voucherResult.classList.remove('hidden');
    });

    // Download Voucher logic using Canvas
    downloadBtn.addEventListener('click', () => {
        // Create an off-screen canvas
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 350;
        const ctx = canvas.getContext('2d');

        // Draw Matte Dark Background
        ctx.fillStyle = '#2b2b2b';
        ctx.beginPath();
        ctx.roundRect(0, 0, canvas.width, canvas.height, 24); // rounded corners
        ctx.fill();

        // Draw Header
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px Inter, sans-serif';
        ctx.fillText('🎁 Aren Store Sealed Voucher', 40, 60);

        // Draw Dashed Line
        ctx.beginPath();
        ctx.setLineDash([10, 10]);
        ctx.moveTo(40, 90);
        ctx.lineTo(560, 90);
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.stroke();

        // Draw Body Texts
        ctx.font = '22px Inter, sans-serif';
        ctx.fillText('Name:', 40, 140);
        ctx.fillText(userNameText, 120, 140);

        ctx.fillText('Secret Code:', 40, 190);
        
        // Code highlight
        ctx.fillStyle = '#f0c14b';
        ctx.font = 'bold 30px monospace';
        ctx.fillText(generatedCode, 190, 190);

        // Draw Footer Box
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.beginPath();
        ctx.roundRect(40, 250, 520, 60, 12);
        ctx.fill();

        // Draw Footer Text
        ctx.fillStyle = '#cccccc';
        ctx.font = '16px Inter, sans-serif';
        ctx.fillText('Instruction: Send this image to our Facebook Messenger to activate!', 55, 285);

        // Trigger Download
        const link = document.createElement('a');
        link.download = `ArenStore_Voucher_${generatedCode}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});