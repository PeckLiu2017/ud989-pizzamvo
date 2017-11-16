$(function() {

    // Model —— it store fundamental element
    var data = {
        lastID: 0,
        pizzas: []
    };

    // Controller
    var octopus = {
      // generate PizzaID
        addPizza: function() {
            var thisID = ++data.lastID;

            data.pizzas.push({
                id: thisID,
                visible: true
            });
            view.render();
        },

        // removePizza according to its ID
        removePizza: function(pizza) {
            // data = {lastID: 3, pizzas: Array(3)}
            var clickedPizza = data.pizzas[ pizza.id - 1 ];
            // clickedPizza = {id: 3, visible: true}
            clickedPizza.visible = false;
            view.render();
        },

        // 返回可见的即剩余的 pizza
        getVisiblePizzas: function() {
            var visiblePizzas = data.pizzas.filter(function(pizza) {
                return pizza.visible;
            });
            return visiblePizzas;
        },

        init: function() {
            view.init();
        }
    };

    // View
    var view = {
        init: function() {
            // add Pizza once click the button
            var addPizzaBtn = $('.add-pizza');
            addPizzaBtn.click(function() {
                octopus.addPizza();
            });

            // grab elements and html for using in the render function
            this.$pizzaList = $('.pizza-list');
            this.pizzaTemplate = $('script[data-template="pizza"]').html();

            // Delegated event to listen for removal clicks
            this.$pizzaList.on('click', '.remove-pizza', function(e) {
              // pizza = {id: 4}
                var pizza = $(this).parents('.pizza').data();
                octopus.removePizza(pizza);
                return false;
            });

            this.render();
        },

        render: function() {
            // Cache vars for use in forEach() callback (performance)
            var $pizzaList = this.$pizzaList,
                pizzaTemplate = this.pizzaTemplate;

            // Clear the previous html and rerender it based on array in model, css and html
            $pizzaList.html('');
            octopus.getVisiblePizzas().forEach(function(pizza) {
                // Replace template markers with data
                var thisTemplate = pizzaTemplate.replace(/{{id}}/g, pizza.id);
                $pizzaList.append(thisTemplate);
            });
        }
    };

    octopus.init();
}());
