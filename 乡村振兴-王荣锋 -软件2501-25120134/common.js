// 移动端汉堡菜单交互（新增）
function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            navList.classList.toggle('active');
            // 汉堡菜单动画
            hamburger.classList.toggle('active');
        });

        // 点击导航项关闭菜单
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
            });
        });
    }
}

// 通用表单验证（新增）
function validateForm(formId, rules) {
    const form = document.getElementById(formId);
    if (!form) return false;

    let isValid = true;
    // 清空所有错误提示
    document.querySelectorAll('.error-tip').forEach(tip => tip.style.display = 'none');

    // 遍历验证规则
    Object.keys(rules).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        const { required, reg, tip } = rules[fieldId];

        // 必填验证
        if (required && !value) {
            showErrorTip(fieldId, tip || '此项为必填项');
            isValid = false;
            return;
        }

        // 正则验证
        if (reg && value && !reg.test(value)) {
            showErrorTip(fieldId, tip);
            isValid = false;
        }
    });

    return isValid;
}

// 显示错误提示
function showErrorTip(fieldId, tip) {
    const errorTip = document.querySelector(`#${fieldId} + .error-tip`);
    if (errorTip) {
        errorTip.textContent = tip;
        errorTip.style.display = 'block';
    }
}

// 图片懒加载（新增，提升性能）
function initLazyLoad() {
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imgObserver.unobserve(img);
                }
            });
        });

        // 遍历所有懒加载图片
        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // 降级处理（兼容低版本浏览器）
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// 页面加载完成后初始化公共功能
document.addEventListener('DOMContentLoaded', () => {
    initHamburger();
    initLazyLoad();
});