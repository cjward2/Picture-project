//Create Vue App
const app = Vue.createApp({
    data() {
        return {
            images: [
                {
                    class: "container1",
                    src: 'assets/img1.jpg',
                    score: null
                },
                {
                    class: "container1",
                    src: 'assets/img2.jpg',
                    score: null
                },
                {
                    class: "conatiner2",
                    src: 'assets/img3.jpg',
                    score: null
                },
                {
                    class: "container2",
                    src: 'assets/img4.jpg',
                    score: null
                },
            ]
        }
    },
    //When component mounts, fetch data from backend
    mounted() {
    fetch('/scores')
    .then(res => res.json())
    .then(data => {
        //Take data recieved filter to ensure score is set to correct image 
        this.images[0].score = data.filter(el => el.id === 0)[0].score
        this.images[1].score = data.filter(el => el.id === 1)[0].score
        this.images[2].score = data.filter(el => el.id === 2)[0].score
        this.images[3].score = data.filter(el => el.id === 3)[0].score
})
    },

    methods: {
        decreaseScore(image, index) {
            //Decrease score on front end
            image.score = image.score - 1;
            //Trigger Put route on backend. Sendiing score with the index of image clicked to keep track on backend
            fetch('/scores', {
                method: 'PUT',
                body: JSON.stringify({ imgIndex: index, score: image.score }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                //console. logs to check data coming back
                //console.log(data);
            })
            .catch(err => console.log(err))
        },
        increaseScore(image, index) {
            //Increase score on front end
            image.score = image.score + 1;
            //Trigger put route on backend and send score and image index
            fetch('/scores', {
                method: 'PUT',
                body: JSON.stringify({ imgIndex: index, score: image.score }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                //console. logs to check data coming back
                //console.log(data);
            })
            .catch(err => console.log(err))
        }
    }
})

//Tell app where to mount
app.mount('#app');