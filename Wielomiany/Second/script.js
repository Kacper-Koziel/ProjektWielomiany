var currentPage = 1;
var firstUseOfPanel = true;
var activeIndex = 0;
var currentTop = 0;

function setActiveIndex(newIndex) {
    const animation = document.querySelector('.animation');
    const h1s = document.querySelectorAll('.panel h1');

    if (!h1s || h1s.length === 0) {
        console.warn("Brak elementów h1 w panelu!");
        return;
    }

    h1s.forEach(h => h.style.color = 'black');

    if (newIndex < 0) {
        activeIndex = 0;
    } else if (newIndex >= h1s.length) {
        activeIndex = h1s.length - 1;
    } else {
        activeIndex = newIndex;
    }

    currentTop = activeIndex * (100 / h1s.length);

    animation.style.top = `${currentTop}%`;
    h1s[activeIndex].style.color = 'white';
}

document.addEventListener('DOMContentLoaded', function () {
    const h1s = document.querySelectorAll('.panel h1');

    h1s.forEach(function (h1, index) {
        h1.addEventListener('click', function () {
            setActiveIndex(index);
        });

        h1.addEventListener('mouseenter', function () {
            const animation = document.querySelector('.animation');
            animation.style.top = `${index * (100 / h1s.length)}%`;
            h1s[activeIndex].style.color = 'black';
            h1.style.color = 'white';
        });

        h1.addEventListener('mouseleave', function () {
            const animation = document.querySelector('.animation');
            if (activeIndex !== index) {
                h1.style.color = 'black';
            }

            animation.style.top = `${currentTop}%`;
            h1s[activeIndex].style.color = 'white';
        });
    });
});

function animateStartButton() {
    const button = document.querySelector('.startBox a');
    const startBox = document.querySelector('.startBox');

    button.style.transition = '2s transform ease';
    button.style.zIndex = '5';
    button.style.transform = 'scale(10000)';

    setTimeout(() => {
        button.style.transition = '0.25s transform ease';
        button.style.transform = 'scale(0)';

        setTimeout(() => {
            startBox.style.display = 'none';
        }, 250);
    }, 800);
}

function handleClick() {
    const chatInput = "Znajdź miejsca zerowe wybranego wielomianu stopnia 4 przy użyciu twierdzenia o reszcie, delty oraz twierdzenia Bezouta";
    const input = document.querySelector('.input textarea');
    input.value = '';

    for (let i = 0; i < chatInput.length; i++) {
        setTimeout(() => {
            input.value += chatInput[i];
        }, i * 20);
    }

    input.style.cursor = 'default';
    document.querySelector('.input').style.cursor = 'default';

    document.querySelector('.input').removeEventListener('click', handleClick);
}

document.querySelector('.input').addEventListener('click', handleClick);

function startAnimation() {
    const inputBox = document.querySelector('.input');
    inputBox.style.transform = 'translateY(-40vh)';

    setTimeout(() => {
        inputBox.style.transition = 'none';
        inputBox.style.transform = 'translateY(0vh)';

        // Ustawienie activeIndex na 0
        activeIndex = 0;
        setActiveIndex(activeIndex);

        currentPage = 1;
        managePages(2, false);
    }, 1200);
}



function animatePages(pageName, buttonID, slideID, nextSlideID, hasInput = null) {
    const currentSlide = document.getElementById(slideID);
    const pageContent = document.getElementsByName(pageName);

    currentSlide.style.display = 'flex';

    setTimeout(() => {
        pageContent.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 300);
        });

        document.getElementById(buttonID).addEventListener('click', () => {
            pageContent.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(-10vh)';
                    item.style.opacity = '0';
                }, index * 200);
            });

            if (hasInput) {
                const input = document.querySelector('.input');
                input.style.opacity = '0';
                input.style.transform = 'translateY(-10vh)';
            }

            setTimeout(() => {
                currentSlide.style.display = 'none';
                currentPage = parseInt(nextSlideID.replace(/s/g, ''));

                setTimeout(() => {
                    if (currentPage === 6) {
                        managePages(1, false);
                    } else {
                        managePages(currentPage + 1, false);
                    }
                }, 100);
            }, pageContent.length * 300);
        });
    }, 100);
}

function clearPage(nextSlide, hasInput = null) {
    const pageContent = document.getElementsByName('p' + currentPage);

    pageContent.forEach(item => {
        item.style.transform = 'translateY(-10vh)';
        item.style.opacity = '0';
    });

    if (hasInput) {
        const input = document.querySelector('.input');
        input.style.opacity = '0';
        input.style.transform = 'translateY(-10vh)';
    }

    document.getElementById('s' + currentPage).style.display = 'none';

    currentPage = nextSlide - 1;
}

function managePages(pageNumber, isFromPanel = null) {

    if (isFromPanel) {
        if (firstUseOfPanel && pageNumber === 2) {
            startAnimation();
            firstUseOfPanel = false;
            return;
        }

        if (pageNumber === 1) {
            clearPage(currentPage, true);
            animatePages('p6', 'btn6', 's6', 's1', true);
            currentPage = 6;
            setActiveIndex(currentPage - 1);
            return;
        }

        clearPage(pageNumber, true);
        animatePages('p' + currentPage, 'btn' + currentPage, 's' + currentPage, 's' + pageNumber);
        setActiveIndex(currentPage - 1);
        return;
    }

    if (currentPage === 1) {
        animatePages('p' + currentPage, 'btn' + currentPage, 's' + currentPage, 's' + pageNumber, true);
    } else {
        animatePages('p' + currentPage, 'btn' + currentPage, 's' + currentPage, 's' + pageNumber);
    }

    setActiveIndex(currentPage - 1);
}



function mystery()
{
    let answer = prompt('Kto zabrał ciasteczko? ');

    if (answer.trim().toLowerCase().includes('marzanna') || answer.trim().toLowerCase().includes('grzeszczuk')) {
        const audio = new Audio('../Assets/Ricky.mp3');
        audio.play();
        audio.loop = true;
    } else {
        alert('Nie. Nawet nie blisko');
    }
    
}
