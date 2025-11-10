class Navigation {
  constructor() {
    this.indicator = document.querySelector(".logo-indicator")
    this.currentTarget = document.querySelector(".nav-item.logo")
    this.init();
  }

  init() {
    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.currentTarget = e.currentTarget;
    
    // Скрываем все секции
    document.querySelectorAll('.page-section').forEach(section => {
      section.style.display = 'none';
    });
    
    // Показываем нужную секцию
    this.updateIndicator(false);
    
    // Обновляем URL без перезагрузки
    const target = this.currentTarget.getAttribute('data-target');
    history.pushState(null, null, `#${target}`);
  }

  updateIndicator(instant=false) {
    const target = this.currentTarget.getAttribute('data-target');
    const targetElement = document.getElementById(target)
    targetElement.style.display = 'block';
    const linkRect = this.currentTarget.getBoundingClientRect();

    if (instant) {
      this.indicator.style.transition = `none`;
    } else {
      this.indicator.style.transition = `all 0.2s ease`;
    }
    if (target == "welcome") {
      this.indicator.style.width = `56px`;
      this.indicator.style.height = `48px`;
      this.indicator.style.transform = `translate(-4px, -1px)`;
    } else {
      this.indicator.style.width = `${linkRect.width+10}px`;
      this.indicator.style.height = `${linkRect.height+5}px`;
      this.indicator.style.transform = `translate(${linkRect.left-22}px, ${linkRect.top-10}px)`;
    }
  }
}

const navigation = new Navigation();
document.addEventListener('DOMContentLoaded', () => {
  navigation;
});

window.addEventListener('resize', function() {
  navigation.updateIndicator(instant=true); // Ваша функция
});