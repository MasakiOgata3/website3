// ===================================
// TAILWIND CSS CONFIGURATION
// ===================================
// Global Tailwind configuration used across all pages
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#1e40af',
                secondary: '#3b82f6'
            },
            borderRadius: {
                'none': '0px',
                'sm': '4px',
                DEFAULT: '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '20px',
                '2xl': '24px',
                '3xl': '32px',
                'full': '9999px',
                'button': '8px'
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // 相談内容ドロップダウン
    // ==========================================
    const selectButton = document.getElementById('consultation-select');
    const options = [
        '社会保険手続きについて',
        '労働保険手続きについて',
        '人事制度構築について',
        '労務相談・顧問契約について',
        '助成金申請について',
        'その他'
    ];
    let isOpen = false;
    let dropdown = null;

    if (selectButton) {
        selectButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (isOpen) {
                closeDropdown();
                return;
            }
            dropdown = document.createElement('div');
            dropdown.className = 'absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1 dropdown-enter';
            
            options.forEach(option => {
                const optionElement = document.createElement('button');
                optionElement.type = 'button';
                optionElement.className = 'w-full px-4 py-3 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors';
                optionElement.textContent = option;
                optionElement.addEventListener('click', function() {
                    selectButton.textContent = option;
                    closeDropdown();
                });
                dropdown.appendChild(optionElement);
            });
            
            selectButton.parentElement.appendChild(dropdown);
            isOpen = true;
        });
    }

    function closeDropdown() {
        if (dropdown) {
            dropdown.remove();
            dropdown = null;
        }
        isOpen = false;
    }

    document.addEventListener('click', function(e) {
        if (selectButton && !selectButton.parentElement.contains(e.target)) {
            closeDropdown();
        }
    });

    // ==========================================
    // モバイルメニュー
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBar1 = document.getElementById('menu-bar-1');
    const menuBar2 = document.getElementById('menu-bar-2');
    const menuBar3 = document.getElementById('menu-bar-3');
    let isMenuOpen = false;

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;

            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                // ハンバーガーメニューをXに変形
                menuBar1.style.transform = 'rotate(45deg) translateY(5px)';
                menuBar2.style.opacity = '0';
                menuBar3.style.transform = 'rotate(-45deg) translateY(-5px)';
                
                // アクセシビリティ属性を更新
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenu.classList.add('hidden');
                // ハンバーガーメニューに戻す
                menuBar1.style.transform = 'rotate(0) translateY(0)';
                menuBar2.style.opacity = '1';
                menuBar3.style.transform = 'rotate(0) translateY(0)';
                
                // アクセシビリティ属性を更新
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // モバイルメニューのリンクをクリックしたら閉じる
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                isMenuOpen = false;
                mobileMenu.classList.add('hidden');
                menuBar1.style.transform = 'rotate(0) translateY(0)';
                menuBar2.style.opacity = '1';
                menuBar3.style.transform = 'rotate(0) translateY(0)';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================
    // スムーズスクロール
    // ==========================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // フォーム送信処理
    // ==========================================
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータを取得
            const formData = new FormData(contactForm);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // 送信中の表示
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="loading"></span> 送信中...';
            
            // 実際の送信処理（ここでは仮の処理）
            setTimeout(() => {
                alert('お問い合わせありがとうございます。\n24時間以内にご返信いたします。');
                contactForm.reset();
                selectButton.textContent = '相談内容を選択してください';
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }

    // ==========================================
    // ヘッダーのスクロール時の挙動（常に固定表示）
    // ==========================================
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    // ヘッダーを固定表示に設定
    if (header) {
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.left = '0';
        header.style.right = '0';
        header.style.zIndex = '50';
        header.style.transition = 'box-shadow 0.3s ease';
        
        // ヘッダーの高さ分だけbodyにpadding-topを追加
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
    }

    // スクロール時の影の追加
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    });

    // ==========================================
    // 画像の遅延読み込み
    // ==========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // IntersectionObserverがサポートされていない場合
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // ==========================================
    // ページトップへ戻るボタン
    // ==========================================
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 invisible z-40';
    backToTopButton.innerHTML = '<i class="ri-arrow-up-line text-xl"></i>';
    backToTopButton.setAttribute('aria-label', 'ページトップへ戻る');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100', 'visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================================
    // FAQ TOGGLE FUNCTIONALITY
    // ===================================
    // Handles collapsible FAQ sections with accordion behavior
    function initializeFAQ() {
        const faqToggles = document.querySelectorAll('.faq-toggle');
        
        faqToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('.faq-icon');
                const isVisible = content.style.display === 'block';
                
                // Close all other FAQ items (accordion behavior)
                faqToggles.forEach(otherToggle => {
                    if (otherToggle !== this) {
                        otherToggle.nextElementSibling.style.display = 'none';
                        otherToggle.querySelector('.faq-icon').className = 'ri-add-line text-xl text-gray-400 faq-icon';
                    }
                });
                
                // Toggle current FAQ item
                if (isVisible) {
                    content.style.display = 'none';
                    icon.className = 'ri-add-line text-xl text-gray-400 faq-icon';
                } else {
                    content.style.display = 'block';
                    icon.className = 'ri-subtract-line text-xl text-primary faq-icon';
                }
            });
        });
    }

    // ===================================
    // TESTIMONIAL CAROUSEL FUNCTIONALITY
    // ===================================
    // Handles customer testimonial slideshow with auto-play and manual navigation
    function initializeTestimonialCarousel() {
        const track = document.getElementById('testimonial-track');
        const dots = [document.getElementById('dot-0'), document.getElementById('dot-1')];
        
        if (!track || !dots[0] || !dots[1]) return;
        
        let currentSlide = 0;
        const totalSlides = 2;
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.className = index === currentSlide 
                    ? 'w-3 h-3 rounded-full bg-primary' 
                    : 'w-3 h-3 rounded-full bg-gray-300';
            });
        }
        
        // Add click handlers for manual navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
            });
        });
        
        // Auto-play carousel every 5 seconds
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }

    // ===================================
    // CHARTS AND VISUALIZATIONS
    // ===================================
    // Initializes ECharts for data visualization on case studies page
    function initializeCharts() {
        const efficiencyChartElement = document.getElementById('efficiency-chart');
        const costChartElement = document.getElementById('cost-chart');
        
        if (!efficiencyChartElement || !costChartElement) return;
        
        const efficiencyChart = echarts.init(efficiencyChartElement);
        const costChart = echarts.init(costChartElement);
        
        // Efficiency improvement chart configuration
        const efficiencyOption = {
            animation: false,
            grid: { top: 0, right: 0, bottom: 0, left: 0 },
            xAxis: {
                type: 'category',
                data: ['導入前', '1ヶ月後', '3ヶ月後', '6ヶ月後', '12ヶ月後'],
                axisLabel: { color: '#1f2937' }
            },
            yAxis: {
                type: 'value',
                axisLabel: { color: '#1f2937' }
            },
            series: [{
                data: [100, 85, 70, 50, 35],
                type: 'line',
                smooth: true,
                lineStyle: { color: 'rgba(87, 181, 231, 1)', width: 3 },
                itemStyle: { color: 'rgba(87, 181, 231, 1)' },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(87, 181, 231, 0.3)' },
                            { offset: 1, color: 'rgba(87, 181, 231, 0.1)' }
                        ]
                    }
                }
            }],
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                textStyle: { color: '#1f2937' }
            }
        };
        
        // Cost reduction chart configuration
        const costOption = {
            animation: false,
            grid: { top: 0, right: 0, bottom: 0, left: 0 },
            xAxis: {
                type: 'category',
                data: ['人件費', '外部委託費', '法的リスク', '効率化効果'],
                axisLabel: { color: '#1f2937' }
            },
            yAxis: {
                type: 'value',
                axisLabel: { color: '#1f2937' }
            },
            series: [{
                data: [280, 150, 200, -350],
                type: 'bar',
                itemStyle: {
                    color: function(params) {
                        const colors = [
                            'rgba(87, 181, 231, 1)',
                            'rgba(141, 211, 199, 1)',
                            'rgba(251, 191, 114, 1)',
                            'rgba(252, 141, 98, 1)'
                        ];
                        return colors[params.dataIndex];
                    }
                },
                borderRadius: [4, 4, 0, 0]
            }],
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                textStyle: { color: '#1f2937' },
                formatter: function(params) {
                    const value = params[0].value;
                    return params[0].name + ': ' + (value > 0 ? '+' : '') + value + '万円';
                }
            }
        };
        
        // Set chart options
        efficiencyChart.setOption(efficiencyOption);
        costChart.setOption(costOption);
        
        // Handle window resize for responsive charts
        window.addEventListener('resize', function() {
            efficiencyChart.resize();
            costChart.resize();
        });
    }

    // Initialize new functionality
    initializeFAQ();
    initializeTestimonialCarousel();
    initializeCharts();
});