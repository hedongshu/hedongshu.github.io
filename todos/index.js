
//创建storage对象，有save和get方法
var storage = {
    save: function(key, value) {
        localStorage.setItem(key,JSON.stringify(value));
    },
    get: function(key) {
        return JSON.parse( localStorage.getItem(key) ) || [];
    }
}


var todos = storage.get('userTodos');

var vm = new Vue({
    el: '#main',
    data: {
        // todo列表
        todos: todos,
        // 记录当前要添加的todo
        todo: '',
        //过滤的状态
        filterState: 'all',
    },
    // 监听todos是否更新，更新就保存到localstorage
    watch: {
        todos: {
            // 深度监听
            handler: function () {
                storage.save('userTodos', todos);
            },
            deep: true
        }
    },
    methods: {
        // 添加todo
        addTodo: function (ev) {
            this.todos.push({
                title: this.todo,
                isChecked: false
            });
        },
        // 删除todo
        delTodo: function (item) {
            var index = this.todos.indexOf(item);
            this.todos.splice(index, 1);
        }
    },
    computed: {
        // 计算已完成和未完成的todo
        unfinished: function () {
            var finished = 0,
                unfinished = 0;
            this.todos.map(function (item) {
                if (item.isChecked === true) {
                    finished++;
                } else {
                    unfinished++;
                }
            });
            return unfinished;
        },
        //过滤， 有三种情况 all unfinished finished
        filteredTodos: function() {
            //创建filter对象
            var filter = {
                all: function(todos){
                    return todos;
                },
                unfinished: function(todos){
                    return todos.filter(function(item) {
                        return !item.isChecked;
                    })
                },
                finished: function(){
                    return todos.filter(function(item) {
                        return item.isChecked;
                    })
                }
            }
            return filter[this.filterState](this.todos);
        }

    }
});

//hash函数
var watchHash = function(){
    var hash = location.hash.slice(1);
    vm.filterState = hash || 'all';
}
watchHash();
window.addEventListener('hashchange',watchHash)