$(document).ready(function() {
    // Hero banner slider
    let currentSlide = 0;
    const slides = $('.hero-banner .slide');
    const totalSlides = slides.length;

    // Function to show the current slide and hide others with fade effect
    function showSlide(index) {
        slides.fadeOut(500); // Fade out all slides
        slides.eq(index).fadeIn(1000); // Fade in the current slide with 1s duration
    }

    // Initially show the first slide
    if (totalSlides > 0) {
        showSlide(currentSlide);
        setInterval(nextSlide, 10000); // Auto slider every 10 seconds
    }

    // Function to move to the next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides; // Cycle through slides
        showSlide(currentSlide);
    }

    // Function to move to the previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Set up event listeners for next and prev buttons
    $('.next-btn').on('click', nextSlide);
    $('.prev-btn').on('click', prevSlide);

    // Search functionality
    const sampleOptions = [
        'Apple', 'Banana', 'Orange', 'Mango', 'Grapes',
        'Watermelon', 'Pineapple', 'Strawberry', 'Blueberry'
    ];

    $('#searchBtn').on('click', function() {
        const query = $('#searchInput').val().trim().toLowerCase();
        const searchResults = $('#searchResults');
        searchResults.empty();

        if (query) {
            const filteredOptions = sampleOptions.filter(option =>
                option.toLowerCase().includes(query)
            );

            if (filteredOptions.length > 0) {
                searchResults.show();
                filteredOptions.forEach(option => {
                    searchResults.append('<li>' + option + '</li>');
                });
            } else {
                searchResults.hide();
            }
        } else {
            searchResults.hide();
        }
    });

    $('#searchResults').on('click', 'li', function() {
        const selectedOption = $(this).text();
        $('#searchInput').val(selectedOption); // Update the search input
        $('#searchResults').hide(); // Hide the results after selection
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('.search').length) {
            $('#searchResults').hide();
        }
    });

    // Product grid horizontal scroll
    $('.product-grid').css({
        'display': 'flex',
        'overflow-x': 'auto',
        'white-space': 'nowrap'
    });

    $('.grid-item').css({
        'flex': '0 0 auto',
        'width': '300px',
        'margin-right': '20px'
    });

    // Add throttle function for smooth scrolling
    function throttle(fn, wait) {
        let time = Date.now();
        return function() {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        }
    }

    // Scroll the grid with wheel events
    $('.product-grid').on('wheel', throttle(function(e) {
        e.preventDefault();
        if (e.originalEvent.deltaY > 0) {
            $(this).scrollLeft($(this).scrollLeft() + 100);
        } else {
            $(this).scrollLeft($(this).scrollLeft() - 100);
        }
    }, 100));
});
