Vue.component('test', {
    template: '#test',
    data: function() {
        return {
            data: '',
            answer: [],
            id: ''
        }
    },
    methods: {
        startTest: function() {
            var self = this;
            self.answer = [];
            self.id = '';

            fetch('http://127.0.0.1:8080/start', {
                method: 'GET',
                credentials: 'include',
                redirect: 'follow'
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                console.log(data);
                self.id = data.id;
                self.data = data;
            }).catch(function(err) {
                console.log(err);
            });
        },
        check: function() {
            var self = this;
            var payload = {
                'answer': self.answer,
                'id': self.id
            }

            var myheaders = new Headers();
            myheaders.append('Content-Type', 'application/json');

            fetch('http://127.0.0.1:8080/check', {
                method: 'POST',
                credentials: 'include',
                redirect: 'follow',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload) 
            }).then(function(response) {
                return response.text();
            }).then(function(data) {
                self.data = data;
            }).catch(function(err) {
                console.log(err);
            });
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        currentComponent: 'home'
    },
    components: {
        'home': {
            template: '#home'
        },
        'study': {
            template: '#study'
        },
        'about': {
            template: '#about'
        }
    },
    methods: {
        swapComponent: function(component) {
            this.currentComponent = component;
        }
    }
})
