(function() {

    // JS loaded
    let body = document.body;
    body.classList.add('loaded');

    let smWidth;
    screen.width < 991 ? smWidth = true : smWidth = false;
    
    // Toggle Menu
    const toggleMenu = (toggleID, toggleNav) => {
        let toggleLink = document.querySelector(toggleID),
            toggleItem = document.querySelector(toggleNav),
            root = document.getElementsByTagName('html')[0];
        if (toggleLink && toggleItem) {
            toggleLink.onclick = () => {
                if (toggleItem.classList.contains('active')) {
                    root.classList.remove('hide-scroll');
                    toggleItem.classList.remove("active");
                } else {
                    root.classList.add('hide-scroll');
                    toggleItem.classList.add("active");
                }
            }
        }
    }
    toggleMenu('#toggleBtn', '#toggleNav');

  

    // Show Collapse with Wrapper JS 
    const showCollapseFunc = (collapseLinkID, collapseContentID, wrapperID) => {
        let collapseLinks = document.querySelectorAll(collapseLinkID),
            collapseContent = document.querySelectorAll(collapseContentID);

        if (collapseLinks && collapseContent && wrapperID) {
            const openCollapse = el => {
                let selectedLink = el.currentTarget,
                    showId = el.currentTarget.dataset.collapse,
                    currentCollapse = document.querySelector("#" + showId),
                    wrapperLinks = selectedLink.closest(wrapperID).querySelectorAll(collapseLinkID),
                    wrapperCollpase = currentCollapse.closest(wrapperID).querySelectorAll(collapseContentID);

                if (selectedLink.classList.contains('active')) {
                    selectedLink.classList.remove("active");
                    currentCollapse.style.height = '0px';
                    currentCollapse.classList.remove('active');
                } else {
                    wrapperLinks.forEach(el => {
                        el.classList.remove("active");
                    });

                    wrapperCollpase.forEach(el => {
                        el.classList.remove("active");
                        el.style.height = "0px";
                    });
                    selectedLink.classList.add("active");
                    currentCollapse.style.height = currentCollapse.scrollHeight + "px";
                    currentCollapse.classList.add('active');
                }
            }
            collapseLinks.forEach(el => {
                el.addEventListener("click", openCollapse);
            });
        }
    }
    showCollapseFunc('[data-collapse]', '.collapse', '[data-parent="collapse"]');


    // gsap animations
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    if (!smWidth) {
        ScrollSmoother.create({
            smooth: 1,               // how long (in seconds) it takes to "catch up" to the native scroll position
            effects: true,           // looks for data-speed and data-lag attributes on elements
            smoothTouch: 0.1,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
        });
    }


    ScrollTrigger.defaults({
        toggleActions: "play none none none",
        start: "top bottom",
    });

    // Animation Slide up
    const animateUp = document.querySelectorAll('.animate-up');
    if (animateUp) {
        gsap.set(".animate-up", {y: 50, opacity: 0});
        ScrollTrigger.batch(animateUp, {
            onEnter: elements => {
                gsap.to(elements, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.4,
                    duration: 1.5,
                    ease: "power4.out",
                    // delay: 0.5
                });
            },
            once: false
        });
    }


     // Header Animation
     const initShowHideHeader = () => {
        const header = document.querySelector('#header');
        const showHeaderAnim = gsap.from(header, {
            yPercent: -150,
            paused: true,
            duration: 0.3
        }).progress(1);

        ScrollTrigger.create({
            trigger: "#header",
            start: `+40px top`,
            // markers: true,
            end: 99999,
            onUpdate: (self) => {
                self.direction === -1 ? showHeaderAnim.play() : showHeaderAnim.reverse();
            }
        });
    }
    initShowHideHeader();


})();