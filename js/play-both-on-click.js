
AFRAME.registerComponent('play-both-on-click', {
    init: function () {
        this.onClick = this.onClick.bind(this);
        this.isPlaying = false
    },
    play: function () {
        window.addEventListener('click', this.onClick);
    },
    pause: function () {
        window.removeEventListener('click', this.onClick);
    },
    async onClick(evt) {

        console.log('play-both-on-click clicked')

        async function fadeOut() {
            //fade.style.opacity = "1";
            return new Promise(resolve => setTimeout(resolve, 1000));
        }

        async function fadeIn() {
            // fade.style.opacity = "0";
            return new Promise(resolve => setTimeout(resolve, 1000));
        }

        async function playExperience() {
            console.log('play experience clicked')

            if (this.isPlaying) {
                console.log('Already playing experience — ignoring click.');
                return; // prevent new playback while one is running
            }

            this.isPlaying = true;

            const voice1 = document.getElementById("voice1");
            const voice2 = document.getElementById("voice2");

            const skyEl = document.getElementById("sky");
            skyEl.object3D.visible = true
            skyEl.setAttribute("src", "#scene1");
            await fadeIn();
            console.log("Scene 1 showing");

            voice1.play();

            await new Promise(resolve => voice1.addEventListener("ended", resolve));

            await new Promise(resolve => {
                skyEl.setAttribute("src", "#scene2");
                skyEl.addEventListener("materialtextureloaded", () => {
                    console.log("Scene 2 texture loaded");
                    resolve();
                }, { once: true });
            });

            voice2.play();
            await new Promise(resolve => voice2.addEventListener("ended", resolve));
            isPlaying = false; 
            skyEl.object3D.visible = false
            console.log("set isPlaying to false")
        }

        await playExperience()
     

    }


});
