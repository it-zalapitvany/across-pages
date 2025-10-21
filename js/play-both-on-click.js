
AFRAME.registerComponent('play-both-on-click', {
    init: function () {
        this.onClick = this.onClick.bind(this);
    },
    play: function () {
        window.addEventListener('click', this.onClick);
    },
    pause: function () {
        window.removeEventListener('click', this.onClick);
    },
    onClick: function (evt) {
        console.log('play-both-on-click clicked')
        const video1 = document.querySelector('#video');
        const video2 = document.querySelector('#video2');


        // Show the videosphere (if hidden)
        const sphere = document.querySelector('a-videosphere');
        sphere.setAttribute('src', '#video')
        sphere.setAttribute('visible', true);

        // Play both videos
        video1.play();
        video1.addEventListener('ended', function () {
            console.log('video1 ended, starting video2');
            sphere.setAttribute('src', '#video2'); // switch to video2 texture
            video2.play();
        });
    }
});
