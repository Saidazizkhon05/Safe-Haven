// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Dashboard Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
    
    // Period Selector
    const periodBtns = document.querySelectorAll('.period-btn');
    
    if (periodBtns.length > 0) {
        periodBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                periodBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                updateEarningsChart(this.getAttribute('data-period'));
            });
        });
    }
    
    // Projection Sliders
    const contributionSlider = document.getElementById('contribution-slider');
    const retirementSlider = document.getElementById('retirement-slider');
    const returnSlider = document.getElementById('return-slider');
    
    function updateSliderValues() {
        if (contributionSlider) {
            const contributionValue = document.querySelector('#contribution-slider + .slider-value');
            contributionValue.textContent = `$${contributionSlider.value}`;
        }
        
        if (retirementSlider) {
            const retirementValue = document.querySelector('#retirement-slider + .slider-value');
            retirementValue.textContent = `${retirementSlider.value} years`;
        }
        
        if (returnSlider) {
            const returnValue = document.querySelector('#return-slider + .slider-value');
            returnValue.textContent = `${returnSlider.value}%`;
        }
        
        updateProjectionChart();
    }
    
    if (contributionSlider) {
        contributionSlider.addEventListener('input', updateSliderValues);
    }
    
    if (retirementSlider) {
        retirementSlider.addEventListener('input', updateSliderValues);
    }
    
    if (returnSlider) {
        returnSlider.addEventListener('input', updateSliderValues);
    }
    
    // Scroll Animation
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    function checkIfInView() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            if (rect.top <= windowHeight * 0.85 && rect.bottom >= 0) {
                el.style.visibility = 'visible';
            }
        });
    }
    
    // Hide elements initially
    animatedElements.forEach(el => {
        el.style.visibility = 'hidden';
    });
    
    // Check on load
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
    
    // Initialize Charts
    initializePortfolioCharts();
});

// Initialize Charts
function initializePortfolioCharts() {
    // Allocation Chart
    const allocationChartEl = document.getElementById('allocation-chart-container');
    
    if (allocationChartEl) {
        const allocationOptions = {
            series: [30, 40, 30],
            chart: {
                type: 'donut',
                height: 250,
            },
            labels: ['ETH', 'Stablecoins', 'RWAs'],
            colors: ['#4b3b7c', '#008f6e', '#195759'],
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%'
                    }
                }
            }
        };
        
        const allocationChart = new ApexCharts(allocationChartEl, allocationOptions);
        allocationChart.render();
    }
    
    // Earnings Chart
    const earningsChartEl = document.getElementById('earnings-chart-container');
    
    if (earningsChartEl) {
        const earningsOptions = {
            series: [{
                name: 'Earnings',
                data: [120, 150, 205, 190, 260, 280, 335, 400, 450, 500, 540, 580]
            }],
            chart: {
                type: 'area',
                height: 300,
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 3,
                colors: ['#008f6e']
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.3,
                    stops: [0, 90, 100],
                    colorStops: [
                        {
                            offset: 0,
                            color: '#008f6e',
                            opacity: 0.4
                        },
                        {
                            offset: 100,
                            color: '#fff',
                            opacity: 0
                        }
                    ]
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    style: {
                        colors: '#888'
                    }
                }
            },
            yaxis: {
                labels: {
                    formatter: function(value) {
                        return '$' + value;
                    },
                    style: {
                        colors: '#888'
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function(value) {
                        return '$' + value;
                    }
                }
            }
        };
        
        const earningsChart = new ApexCharts(earningsChartEl, earningsOptions);
        earningsChart.render();
        
        window.updateEarningsChart = function(period) {
            let data = [];
            let categories = [];
            
            switch(period) {
                case 'daily':
                    categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    data = [15, 18, 14, 20, 25, 22, 19];
                    break;
                case 'weekly':
                    categories = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                    data = [80, 120, 95, 140];
                    break;
                case 'monthly':
                    categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    data = [120, 150, 205, 190, 260, 280, 335, 400, 450, 500, 540, 580];
                    break;
                case 'yearly':
                    categories = ['2021', '2022', '2023', '2024', '2025'];
                    data = [2400, 3200, 4500, 5800, 7200];
                    break;
            }
            
            earningsChart.updateOptions({
                xaxis: {
                    categories: categories
                }
            });
            
            earningsChart.updateSeries([{
                name: 'Earnings',
                data: data
            }]);
        };
    }
    
    // Projection Chart
    const projectionChartEl = document.getElementById('projection-chart-container');
    
    if (projectionChartEl) {
        const projectionOptions = {
            series: [{
                name: 'Projected Balance',
                data: [228320, 280000, 350000, 450000, 580000, 750000, 950000, 1247530]
            }],
            chart: {
                type: 'area',
                height: 300,
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 3,
                colors: ['#4b3b7c']
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.3,
                    stops: [0, 90, 100],
                    colorStops: [
                        {
                            offset: 0,
                            color: '#4b3b7c',
                            opacity: 0.4
                        },
                        {
                            offset: 100,
                            color: '#fff',
                            opacity: 0
                        }
                    ]
                }
            },
            xaxis: {
                categories: ['Now', '2030', '2035', '2040', '2045', '2050', '2045', '2050'],
                labels: {
                    style: {
                        colors: '#888'
                    }
                }
            },
            yaxis: {
                labels: {
                    formatter: function(value) {
                        return '$' + new Intl.NumberFormat().format(Math.round(value));
                    },
                    style: {
                        colors: '#888'
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function(value) {
                        return '$' + new Intl.NumberFormat().format(Math.round(value));
                    }
                }
            }
        };
        
        const projectionChart = new ApexCharts(projectionChartEl, projectionOptions);
        projectionChart.render();
        
        window.updateProjectionChart = function() {
            const contributionSlider = document.getElementById('contribution-slider');
            const retirementSlider = document.getElementById('retirement-slider');
            const returnSlider = document.getElementById('return-slider');
            
            if (!contributionSlider || !retirementSlider || !returnSlider) return;
            
            const contribution = parseInt(contributionSlider.value);
            const years = parseInt(retirementSlider.value);
            const rate = parseFloat(returnSlider.value) / 100;
            
            const startingBalance = 228320;
            const projectedData = [startingBalance];
            const yearCategories = ['Now'];
            
            let currentBalance = startingBalance;
            const stepsToShow = 7;
            const yearStep = Math.max(1, Math.floor(years / stepsToShow));
            
            for (let i = yearStep; i <= years; i += yearStep) {
                if (projectedData.length >= stepsToShow + 1) break;
                
                for (let j = 0; j < yearStep; j++) {
                    currentBalance = currentBalance * (1 + rate) + contribution * 12;
                }
                
                projectedData.push(Math.round(currentBalance));
                yearCategories.push(`${2025 + i}`);
            }
            
            // Update projection stats
            const projectionValueEls = document.querySelectorAll('.projection-value');
            if (projectionValueEls.length >= 2) {
                projectionValueEls[3].textContent = '$' + new Intl.NumberFormat().format(Math.round(currentBalance));
                projectionValueEls[4].textContent = '$' + new Intl.NumberFormat().format(Math.round(currentBalance * 0.005));
            }
            
            projectionChart.updateOptions({
                xaxis: {
                    categories: yearCategories
                }
            });
            
            projectionChart.updateSeries([{
                name: 'Projected Balance',
                data: projectedData
            }]);
        };
    }
}

// Counter Animation
function animateCounter(element, targetValue, duration = 2000) {
    const startValue = 0;
    const increment = targetValue / (duration / 16);
    let currentValue = startValue;
    
    const counter = setInterval(function() {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            clearInterval(counter);
            element.textContent = targetValue;
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
}

// Animate Statistics on Scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statsElements = entry.target.querySelectorAll('.stat-number');
            statsElements.forEach(stat => {
                const value = stat.textContent;
                const numericValue = parseInt(value.replace(/,/g, '').replace(/\+/g, '').replace(/\$/g, ''));
                if (!isNaN(numericValue)) {
                    animateCounter(stat, numericValue);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats sections
document.addEventListener('DOMContentLoaded', function() {
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        statsObserver.observe(statsBar);
    }
    
    const projectionDetails = document.querySelector('.projection-details');
    if (projectionDetails) {
        statsObserver.observe(projectionDetails);
    }
});

// Smooth scroll to section on click
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.nav-links.active');
                    if (mobileMenu) {
                        mobileMenu.classList.remove('active');
                        document.querySelector('.mobile-menu-btn').classList.remove('active');
                    }
                }
            }
        });
    });
});