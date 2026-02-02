// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                alert('請填寫所有必填欄位（標示 * 者）');
                return;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formData.email)) {
                alert('請輸入有效的 Email 地址');
                return;
            }

            // Show success message
            alert('感謝您的來信！我們會盡快回覆您。');

            // Log to console (for demo purposes)
            console.log('表單資料:', formData);

            // Reset form
            contactForm.reset();

            // In a real application, you would send this data to a server
            // Example:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('感謝您的來信！我們會盡快回覆您。');
            //     contactForm.reset();
            // })
            // .catch(error => {
            //     alert('發送失敗，請稍後再試。');
            //     console.error('Error:', error);
            // });
        });

        // Real-time validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailPattern.test(this.value)) {
                    this.style.borderColor = '#ff6b9d';
                } else {
                    this.style.borderColor = '#ddd';
                }
            });
        }
    }
});
